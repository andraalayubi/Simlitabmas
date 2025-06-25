import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// get lecturer by ids
const getLecturerByIds = async (lecturerIds: number[] | number) => {
  const ids = Array.isArray(lecturerIds) ? lecturerIds.map(Number) : [Number(lecturerIds)];
  console.log(ids);

  const result = await prisma.lecturer.findMany({
    where: {
      id: {
        in: ids
      },
      deleted: false
    },
    include: {
      department: true
    }
  });

  return result;
};

const getLecturerMembers = async (proposal_suggestion_id: number) => {
  return await prisma.lecturer_member.findMany({
    where: {
      proposal_suggestion_id,
      deleted: false
    },
    include: {
      department: true
    }
  })
}

// get student members by proposal suggestion id
const getStudentMembers = async (proposal_suggestion_id: number) => {
  return await prisma.student_member.findMany({
    where: {
      proposal_suggestion_id,
      deleted: false
    },
    include: {
      department: true
    }
  })
}

const addStudentMember = async (data: any) => {
  return await prisma.student_member.create({
    data: {
      proposal_suggestion_id: data.proposal_suggestion_id,
      name: data.name,
      nrp: data.nrp,
      department_id: data.department_id,
    },
  });
}

// get vendor members by proposal suggestion id
const getVendorMembers = async (proposal_suggestion_id: number) => {
  return await prisma.vendor_member.findMany({
    where: {
      proposal_suggestion_id,
      deleted: false
    }
  })
}

const addVendorMember = async (data: any) => {
  return await prisma.vendor_member.create({
    data: {
      proposal_suggestion_id: data.proposal_suggestion_id,
      name: data.name,
      description: data.description || null,
    },
  });
}

// Soft delete lecturer member by ID
const deleteLecturerMember = async (id: number) => {
  return await prisma.lecturer_member.update({
    where: { id },
    data: { 
      deleted: true
    }
  });
}

// Soft delete student member by ID
const deleteStudentMember = async (id: number) => {
  return await prisma.student_member.update({
    where: { id },
    data: { 
      deleted: true
    }
  });
}

// Soft delete vendor member by ID
const deleteVendorMember = async (id: number) => {
  return await prisma.vendor_member.update({
    where: { id },
    data: { 
      deleted: true
    }
  });
}

const memberService = {
  getLecturerByIds,
  getLecturerMembers,
  getStudentMembers,
  addStudentMember,
  getVendorMembers,
  addVendorMember,
  deleteLecturerMember,
  deleteStudentMember,
  deleteVendorMember
}

export default memberService;