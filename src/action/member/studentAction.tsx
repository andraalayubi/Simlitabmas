import axios from "axios";
import { user_type } from "prisma/interfaces";

const getStudentMember = async (
  user_type: user_type,
  usulan_id: number,
  setLoading: (loading: boolean) => void
) => {
  setLoading(true);

  try {
    const response = await fetch(`/api/${user_type}/member/${usulan_id}/student`);
    const result = await response.json();
    console.log(result);
    
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

const getDepartments = async (
  user_type: user_type,
  setLoading: (loading: boolean) => void
) => {
  try {
    setLoading(true);

    const response = await fetch(`/api/${user_type}/department`);
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

const addStudentMember = async (
  user_type: user_type,
  values: {
    usulan_id: number;
    anggota: {
      name: string;
      nrp: number;
      department: string;
    };
  },
  setLoading: (loading: boolean) => void
) => {
  try {
    setLoading(true);

    const response = await axios.post(`/api/${user_type}/member/${values.usulan_id}/student`, {
      name: values.anggota.name,
      nrp: values.anggota.nrp.toString(),
      department: Number(values.anggota.department),
    });
    
    if (response.status === 201 && response.data.success) {
      return {
        success: true,
        message: "Successfully added the student to the proposal suggestion!",
      };
    } else {
      return {
        success: false,
        message: response.data?.message || "Failed to add the student to the proposal suggestion. Please try again.",
      };
    }
  } catch (error: any) {
    console.error("Error adding anggota:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Gagal menambahkan anggota",
    };
  } finally {
    setLoading(false);
  }
};

const deleteStudentMember = async (
  user_type: user_type,
  memberId: number,
  setLoading: (loading: boolean) => void
) => {
  try {
    setLoading(true);
    const response = await axios.delete(`/api/${user_type}/member/0/student?memberId=${memberId}`);

    if (response.status === 200 && response.data.success) {
      return {
        success: true,
        message: "Successfully deleted the student member",
      };
    } else {
      return {
        success: false,
        message: response.data?.message || "Failed to delete the student member. Please try again.",
      };
    }
  } catch (error: any) {
    console.error('Error deleting student member:', error);
    return {
      success: false,
      message: error.response?.data?.message || error.message || 'Gagal menghapus anggota mahasiswa'
    };
  } finally {
    setLoading(false);
  }
};

const memberAction = {
  getStudentMember,
  getDepartments,
  addStudentMember,
  deleteStudentMember
}

export default memberAction;