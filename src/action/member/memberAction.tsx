import axios from "axios";
import { user_type } from "prisma/interfaces";

const getProposalSchema = async (
  user_type: user_type,
  usulan_id: number,
  setLoading: (loading: boolean) => void
) => {
  setLoading(true);

  try {
    const response = await fetch(`/api/${user_type}/member/${usulan_id}`);
    const result = await response.json();

    if (result.status === 200 || result.success == true) {
      return {
        success: true,
        message: result.message,
        data: result.data,
      };
    } else {
      return {
        success: false,
        message: result.message,
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "An unexpected error occurred",
    };
  } finally {
    setLoading(false);
  }
};

const getAvailableLecturerMember = async (
  user_type: user_type,
  usulan_id: number,
  setLoading: (loading: boolean) => void
) => {
  setLoading(true);

  try {
    const response = await fetch(`/api/${user_type}/member/${usulan_id}/available`);
    const result = await response.json();

    if (result.status === 200 || result.success == true) {
      return {
        success: true,
        message: result.message,
        data: result.data,
      };
    } else {
      return {
        success: false,
        message: result.message,
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "An unexpected error occurred",
    };
  } finally {
    setLoading(false);
  }
};

const addLecturerMember = async (
  user_type: user_type,
  values: {
    usulan_id: number;
    anggota: string[]
  },
  setLoading: (loading: boolean) => void
) => {
  try {
    setLoading(true);

    const lecturers = await axios.post(`/api/${user_type}/member/${values.usulan_id}/available`, {
      anggota: values.anggota
    });

    // Then, add the lecturer to the proposal suggestion
    const response = await axios.post(`/api/${user_type}/member/${values.usulan_id}/lecturer`, {
      anggota: lecturers.data.data
    });
    console.log('response', response);

    if (response.status === 201 && response.data.success) {
      return {
        success: true,
        message: "Successfully added the lecturer to the proposal suggestion!",
      };
    } else {
      return {
        success: false,
        message: response.data?.message || "Failed to add the lecturer to the proposal suggestion. Please try again.",
      };
    }
  } catch (error: any) {
    console.error('Error adding anggota:', error);
    return {
      success: false,
      message: error.response?.data?.message || error.message || 'Gagal menambahkan anggota'
    };
  } finally {
    setLoading(false);
  }
};

const deleteLecturerMember = async (
  user_type: user_type,
  memberId: number,
  setLoading: (loading: boolean) => void
) => {
  try {
    setLoading(true);
    const response = await axios.delete(`/api/${user_type}/member/0/lecturer?memberId=${memberId}`);

    if (response.status === 200 && response.data.success) {
      return {
        success: true,
        message: "Successfully deleted the lecturer member",
      };
    } else {
      return {
        success: false,
        message: response.data?.message || "Failed to delete the lecturer member. Please try again.",
      };
    }
  } catch (error: any) {
    console.error('Error deleting lecturer member:', error);
    return {
      success: false,
      message: error.response?.data?.message || error.message || 'Gagal menghapus anggota dosen'
    };
  } finally {
    setLoading(false);
  }
};

const memberAction = {
  getProposalSchema,
  getAvailableLecturerMember,
  addLecturerMember,
  deleteLecturerMember
}

export default memberAction;