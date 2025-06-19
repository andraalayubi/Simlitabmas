import prisma from "src/client/prisma";

//get report for lecturers
const getLecturerPerformance = async (filter: any) => {
    // Pisahkan filter untuk lecturer dan untuk proposal_suggestion
    const lecturerFilter: any = {};
    const proposalFilter: any = {};

    // Filter untuk lecturer (hanya research_group_id)
    if (filter.research_group_id !== undefined) {
        lecturerFilter.research_group_id = filter.research_group_id;
    }

    // Filter untuk proposal_suggestion
    if (filter.type !== undefined) {
        if (filter.type === "penelitian") {
            proposalFilter.research_group_id = { not: null };
        } else if (filter.type === "pengabdian") {
            proposalFilter.research_group_id = null;
        }
    }

    if (filter.year_research_id !== undefined) {
        proposalFilter.year_research_id = filter.year_research_id;
    }

    // 1. Ambil semua dosen sesuai filter lecturer
    const lecturers = await prisma.lecturer.findMany({
        where: lecturerFilter,
        include: {
            department: true,
            research_group: true,
            position: true,
        }
    });

    // 2. Dapatkan ID dosen untuk proses agregasi
    const lecturerIds = lecturers.map(l => l.id);

    // 3. Hitung jumlah proposal_suggestion per dosen dengan filter tambahan
    const proposalCounts = await prisma.proposal_suggestion.groupBy({
        by: ['lecturer_id'],
        where: {
            lecturer_id: { in: lecturerIds },
            ...proposalFilter
        },
        _count: {
            lecturer_id: true
        }
    });

    // 4. Hitung jumlah lecturer_member per dosen (tanpa filter tambahan)
    const memberCounts = await prisma.lecturer_member.groupBy({
        by: ['lecturer_id'],
        where: {
            lecturer_id: { in: lecturerIds },
            proposal_suggestion: proposalFilter
        },
        _count: {
            lecturer_id: true
        }
    });

    // 5. Gabungkan hasil agregasi dengan data dosen
    return lecturers.map(lecturer => ({
        ...lecturer,
        _count: {
            proposal_suggestion: proposalCounts.find(p => p.lecturer_id === lecturer.id)?._count?.lecturer_id || 0,
            lecturer_member: memberCounts.find(m => m.lecturer_id === lecturer.id)?._count?.lecturer_id || 0
        }
    }));
};

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
    getLecturerPerformance,
    getLecturerByDepartmentId,
    getLecturerByResearchGroupId
};

export default reportService;
