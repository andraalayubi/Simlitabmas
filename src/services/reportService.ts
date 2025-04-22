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

//get report for research group
const getResearchGroup = async () => {
    return await prisma.research_group.findMany({
        where: {
            deleted: false,
        },
        include: {
            _count: {
                select: {
                    proposal_suggestion: true
                }
            }
        }
    });
}

//get report for department
const getDepartment = async () => {
    return await prisma.department.findMany({
        where: {
            deleted: false,
        },
        include: {
            _count: {
                select: {
                    proposal_suggestion: true
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

const evaluationService = {
    getLecturer,
    getResearchGroup,
    getDepartment,
    getLecturerByDepartmentId
};

export default evaluationService;
