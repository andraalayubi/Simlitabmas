import axios from "axios";
import { department, user_type } from "prisma/interfaces";
import { getSession } from "src/lib/session";

// get department list
const getDepartment = async (
  user_type: user_type,
  setLoading: (loading: boolean) => void
) => {
  setLoading(true);

  try {
    const response = await fetch(`/api/${user_type}/department`, {
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

// get department detail
const getDepartmentDetail = async (
  user_type: user_type,
  id: number,
  setLoading: (loading: boolean) => void
) => {
  setLoading(true);

  try {
    const response = await fetch(`/api/${user_type}/department/${id}`, {
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

// create new department
const createDepartment = async (
  user_type: user_type,
  data: any,
  setLoading: (loading: boolean) => void
) => {
  setLoading(true);

  try {
    const response = await axios.post(`/api/${user_type}/department`, data);

    if (response.status === 200 || response.data.success == true) {
      return {
        success: true,
        message: response.data.message,
        data: response.data.data,
      };
    } else {
      return {
        success: false,
        message: response.data.message,
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

const departmentAction = {
  getDepartment,
  getDepartmentDetail,
  createDepartment,
};

export default departmentAction;
