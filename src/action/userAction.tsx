import axios from "axios";
import { user_type } from "prisma/interfaces";

const getUserLecturers = async (
  user_type: user_type,
  setLoading: (loading: boolean) => void,
  include_user: boolean = false,
  include_department: boolean = false,
  include_research_group: boolean = false
) => {
  setLoading(true);

  try {
    const params = new URLSearchParams();
    if (include_user) params.append("get_user", "true");
    if (include_department) params.append("get_department", "true");
    if (include_research_group) params.append("get_research_group", "true");

    const url = `/api/${user_type}/lecturer?${params.toString()}`;

    const response = await fetch(url);
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

// add new user for lecturer
const createUserLecturer = async (
  user_type: user_type,
  lecturer_id: number,
  user: any
) => {
  try {
    const response = await axios.post(`/api/${user_type}/user`, {
      ...user,
      lecturer_id: lecturer_id,
    });

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
        "Failed to create user lecturer. Please try again.",
    };
  }
};

const deleteUserLecturer = async (user_type: user_type, user_id: number) => {
  try {
    const response = await axios.delete(`/api/${user_type}/user/${user_id}`);

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
        "Failed to delete user lecturer. Please try again.",
    };
  }
};

const userAction = {
  getUserLecturers,
  createUserLecturer,
  deleteUserLecturer,
};

export default userAction;
