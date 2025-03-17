import axios from "axios";
import { user_type } from "prisma/interfaces";

const getLecturerMember = async (
  user_type: user_type,
  usulan_id: number,
  setLoading: (loading: boolean) => void
) => {
  setLoading(true);

  try {
    const response = await fetch(`/api/${user_type}/member/${usulan_id}/lecturer`);
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

const getProfile = async (
  user_type: user_type,
  id: number,
  setLoading: (loading: boolean) => void
) => {
  setLoading(true);

  try {
    const response = await fetch(`/api/${user_type}/profile/${id}`, {
      method: "GET",
    });

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

const lecturerAction = {
  getLecturerMember,
  createLecturer,
  deleteLecturer,
  getProfile

}

export default lecturerAction;