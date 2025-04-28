import prisma from "src/client/prisma";

//get report for lecturers
const getLecturer = async () => {
    return await prisma.lecturer.findMany({
        where: {
            deleted: false,
        },
        include: {
            department: true,
            _count: {
                select: {
                    proposal_suggestion: true,
                    lecturer_member: true
                }
            }
        }
    });
}

//get report lecturer by department id
const getLecturerByDepartmentId = async (departmentId: number) => {
    return await prisma.lecturer.findMany({
        where: {
            department_id: departmentId,
            deleted: false,
        },
        include: {
            _count: {
                select: {
                    proposal_suggestion: true,
                    lecturer_member: true
                }
            }
        }
    });
}

//get report lecturer by research group id
const getLecturerByResearchGroupId = async (researchGroupId: number) => {
    return await prisma.lecturer.findMany({
        where: {
            research_group_id: researchGroupId,
            deleted: false,
        },
        include: {
            _count: {
                select: {
                    proposal_suggestion: true,
                    lecturer_member: true
                }
            }
        }
    });
}

const reportService = {
    getLecturer,
    getLecturerByDepartmentId,
    getLecturerByResearchGroupId
};

export default reportService;
