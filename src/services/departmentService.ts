//File:psService.ts
import prisma from '../../../prisma';

export const getAuditDepartment = async () => {
  const auditDepartment: any = await prisma.$queryRaw`
  SELECT 
    lecturer.name AS lecturer_name,
    department.name AS department_name,
    COUNT(proposal.id) AS total_proposals
  FROM 
    user
  JOIN 
    lecturer ON user.id = lecturer.user_id
  JOIN 
    department ON lecturer.department_id = department.id
  LEFT JOIN 
    proposal_suggestion ON lecturer.id = proposal_suggestion.lecturer_id
  LEFT JOIN 
    proposal ON proposal_suggestion.id = proposal.proposal_suggestion_id
  WHERE 
    user.user_type = 'kaprodi'
  GROUP BY 
    lecturer.name, department.name;
  `;

  const auditDepartments = await prisma.user.findMany({
    where: {
      user_type: "kaprodi", // Filter untuk user dengan user_type 'kaprodi'
    },
    select: {
      lecturer: {
        select: {
          name: true, // Mengambil nama dari lecturer
          department: {
            select: {
              name: true, // Mengambil nama dari department
            },
          },
          proposal_suggestion: {
            select: {
              proposal: {
                select: {
                  id: true, // Mengambil ID proposal untuk menghitung jumlah
                },
              },
            },
          },
        },
      },
    },
  });

  // Menghitung jumlah proposal untuk setiap department
  const result = auditDepartments.map((user: any) => {
    const lecturerName = user.lecturer.name ?? "N/A";
    const departmentName = user.lecturer.department.name ?? "N/A";
    const totalProposals =
      user.lecturer.proposal_suggestion.reduce(
        (acc: any, suggestion: { proposal: string | any[] }) =>
          acc + suggestion.proposal.length,
        0
      ) ?? 0;

    return {
      lecturerName,
      departmentName,
      totalProposals,
    };
  });

  return result;
};
