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

// add new lecturer and also user with type lecturer
const createLecturer = async (
  user_type: user_type,
  payload: any,
  setLoading: (loading: boolean) => void
) => {
  setLoading(true);
};

// add new user for lecturer
const createUserLecturer = async (
  user_type: user_type,
  payload: any,
  setLoading: (loading: boolean) => void
) => {
  setLoading(true);
};

const userAction = {
  getUserLecturers,
  createUserLecturer,
  createLecturer,
};

export default userAction;
