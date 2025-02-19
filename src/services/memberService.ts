import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

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
  getStudentMembers,
  getVendorMembers
}

export default memberService;