//File:psService.ts
import prisma from "src/client/prisma";

// get by id
const getById = async (id: number) => {
  return await prisma.department.findUnique({
    where: { id: id },
  })
}


// get all active
const getAllActive = async () => {
  return await prisma.department.findMany({
    where: { deleted: false },
  });
};

// insert a new department
const create = async (data: any) => {
  return await prisma.department.create({ data });
}

// get summary
const getSummaryList = async () => {
  const [departments, lecturerCount, proposalSuggestionCount] = await prisma.$transaction([
    prisma.$queryRaw<{ id: bigint; name: string; description: string; createdAt: Date; updatedAt: Date; deleted: boolean; kaprodi_id: bigint | null; kaprodi_name: string | null }[]>`
    SELECT 
      d.id AS "id",
      d.name AS "name",
      d.description AS "description",
      d."createdAt" AS "createdAt",
      d."updatedAt" AS "updatedAt",
      d.deleted AS "department_deleted",
      l.id AS "kaprodi_id",
      l.name AS "kaprodi_name"
    FROM departments d
    LEFT JOIN lecturers l 
      ON l.department_id = d.id AND l.is_kaprodi = TRUE
    WHERE d.deleted = FALSE
    GROUP BY 
      d.id, 
      d.name, 
      d.description, 
      l.id, 
      l.name,  
      d."createdAt", 
      d."updatedAt"
    ORDER BY d.id ASC;
    `,
    prisma.$queryRaw<{ id: bigint; lecturer_count: bigint }[]>`
      SELECT 
        d.id AS "id", 
        count(l.id) AS "lecturer_count"
      FROM departments d
      LEFT JOIN lecturers l ON d.id = l.department_id
      GROUP BY d.id
      ORDER BY d.id ASC;
    `,
    prisma.$queryRaw<{ id: bigint; proposal_suggestion_count: bigint }[]>`
      SELECT 
        d.id AS "id", 
        count(ps.id) AS "proposal_suggestion_count"
      FROM departments d
      LEFT JOIN proposal_suggestions ps ON d.id = ps.department_id
      GROUP BY d.id
      ORDER BY d.id ASC;
    `
  ]);

  // map count lecturer and proposal_suggestion
  const lecturerMap = Object.fromEntries(lecturerCount.map(item => [Number(item.id), Number(item.lecturer_count)]));
  const proposalSuggestionMap = Object.fromEntries(proposalSuggestionCount.map(item => [Number(item.id), Number(item.proposal_suggestion_count)]));

  const formattedResult = departments.map(group => ({
    id: Number(group.id),
    name: group.name,
    description: group.description,
    createdAt: group.createdAt,
    updatedAt: group.updatedAt,
    deleted: group.deleted,
    kaprodi_name: group.kaprodi_name,
    proposal_suggestion_count: proposalSuggestionMap[Number(group.id)] || 0,
    lecturer_count: lecturerMap[Number(group.id)] || 0,
    kaprodi: {
        id: group.kaprodi_id ? Number(group.kaprodi_id) : null,
        name: group.kaprodi_name,
    },
    lecturer: {
        count: lecturerMap[Number(group.id)] || 0
    },
    proposal_suggestion: {
        count: proposalSuggestionMap[Number(group.id)] || 0
    }
}));

return formattedResult;

}

const departmentService = {
  create,
  getById,
  getAllActive,
  getSummaryList,
}


export default departmentService