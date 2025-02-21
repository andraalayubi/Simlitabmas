import axios from "axios";
import { user_type } from "prisma/interfaces";

const getLecturerMember = async (
  user_type: user_type,
  usulan_id: number,
  setLoading: (loading: boolean) => void
) => {
  setLoading(true);

  try {
    const response = await fetch(
      `/api/${user_type}/member/${usulan_id}/lecturer`
    );
    const result = await response.json();
    console.log("get lecturer member");
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

const getAvailableLecturerMember = async (
  user_type: user_type,
  usulan_id: number,
  setLoading: (loading: boolean) => void
) => {
  setLoading(true);

  try {
    const response = await fetch(
      `/api/${user_type}/member/${usulan_id}/available`
    );
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

const addLecturerMember = async (
  values: {
    usulan_id: number;
    anggota: string[];
  },
  setLoading: (loading: boolean) => void
) => {
  try {
    setLoading(true);

    // Then, add the lecturer to the proposal suggestion
    const response = await axios.post(
      `/api/lecturer/member/${values.usulan_id}`,
      {
        lecturerId: values.anggota,
      }
    );

    if (response.status === 201 && response.data.success) {
      return {
        success: true,
        message: "Successfully added the lecturer to the proposal suggestion!",
      };
    } else {
      return {
        success: false,
        message:
          response.data?.message ||
          "Failed to add the lecturer to the proposal suggestion. Please try again.",
      };
    }
  } catch (error: any) {
    console.error("Error adding anggota:", error);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "Gagal menambahkan anggota",
    };
  } finally {
    setLoading(false);
  }
};

// get lecturer by id
const createLecturer = async (user_type: user_type, lecturer: any) => {
  try {
    const response = await axios.post(`/api/${user_type}/lecturer`, lecturer);

    if (response.status === 201 || response.data.success) {
      return {
        success: true,
        message: response.data?.message,
      };
    } else {
      return {
        success: false,
        message: response.data?.message,
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "Failed to create lecturer. Please try again.",
    };
  }
};

const deleteLecturer = async (
  user_type: user_type,
  lecturer_id: number,
) => {
  try {
    const response = await axios.delete(`/api/${user_type}/lecturer/${lecturer_id}`);

    if (response.status === 200 || response.data.success) {
      return {
        success: true,
        message: response.data?.message,
      };
    } else {
      return {
        success: false,
        message: response.data?.message,
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "Failed to delete lecturer. Please try again.",
    };
  }
};

const lecturerAction = {
  getLecturerMember,
  getAvailableLecturerMember,
  addLecturerMember,
  createLecturer,
  deleteLecturer,
};

export default lecturerAction;
