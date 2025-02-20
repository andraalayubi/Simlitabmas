import prisma from "../client/prisma";
import { lecturer } from "prisma/interfaces";

// get by id
const getById = async (id: number) => {
    return await prisma.lecturer.findUnique({
        where: { id: id },
    })
}

// get all active
const getAllActive = async () => {
    return await prisma.lecturer.findMany({
        where: { deleted: false },
    });
};

// get lecturer member for each proposal suggestion
const getLecturerMember = async (proposalSuggestionId: number) => {
    // Query pertama: Mengambil lecturer dari proposal_suggestion
    const proposal = await prisma.proposal_suggestion.findUnique({
        where: { id: proposalSuggestionId },
        include: {
            lecturer: {
                include: {
                    department: true
                }
            }
        }
    });

    // Query kedua: Mengambil lecturer dari lecturer_member
    const members = await prisma.lecturer_member.findMany({
        where: { proposal_suggestion_id: proposalSuggestionId },
        select: {
            lecturer: {
                select: {
                    id: true,
                    name: true,
                    nip: true,
                    department: {
                        select: { name: true }
                    }
                }
            }
        }
    });

    // Gabungkan hasil
    const lecturers = [];

    // Tambahkan Ketua jika ada
    if (proposal?.lecturer) {
        lecturers.push({
            lecturer_id: proposal.lecturer.id,
            name: proposal.lecturer.name,
            nip: proposal.lecturer.nip,
            jabatan: "Ketua",
            department_name: proposal.lecturer.department?.name ?? null
        });
    }

    // Tambahkan Anggota
    members.forEach(member => {
        if (member.lecturer) {
            lecturers.push({
                lecturer_id: member.lecturer.id,
                name: member.lecturer.name,
                nip: member.lecturer.nip,
                jabatan: "Anggota",
                department_name: member.lecturer.department?.name ?? null
            });
        }
    });

    const data = {
        proposal, lecturers
    }
    
    return data;
}

// get available lecturer for multiselect
const getAvailableLecturers = async (proposalSuggestionId: number) => {
    return await prisma.lecturer.findMany({
        where: {
            deleted: false,
            lecturer_member: {
                none: { proposal_suggestion_id: proposalSuggestionId }
            },
            proposal_suggestion: {
                none: { id: proposalSuggestionId }
            }
        }
    });
};

// add lecturer to proposal suggestion
const addLecturerMember = async (proposalSuggestionId: number, lecturerIds: number[] | number) => {
    const ids = Array.isArray(lecturerIds) ? lecturerIds : [lecturerIds];

    const result = await prisma.lecturer_member.createMany({
        data: ids.map((lecturerId) => ({
            proposal_suggestion_id: proposalSuggestionId,
            lecturer_id: Number(lecturerId),
        })),
        skipDuplicates: true,
    });

    return result;
};



const lecturerService = {
    getById,
    getAllActive,
    getLecturerMember,
    getAvailableLecturers,
    addLecturerMember,
}

export default lecturerService;