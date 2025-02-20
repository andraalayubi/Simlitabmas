import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// get proposal schema by proposal suggestion id
const getProposalSchema = async (proposal_suggestion_id: number) => {
  return await prisma.proposal_suggestion.findUnique({
    where: {
      id: proposal_suggestion_id
    },
    include: {
      schema: true,
      lecturer: true
    }
  })
}

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

// get vendor members by proposal suggestion id
const getVendorMembers = async (proposal_suggestion_id: number) => {
  return await prisma.vendor_member.findMany({
    where: {
      proposal_suggestion_id,
      deleted: false
    }
  })
}

const memberService = {
  getProposalSchema,
  getLecturerMembers,
  getStudentMembers,
  getVendorMembers
}

export default memberService;