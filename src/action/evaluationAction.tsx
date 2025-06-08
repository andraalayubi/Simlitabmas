import axios from "axios";
import { user_type } from "prisma/interfaces";
import { getSession } from "src/lib/session";

const getEvaluation = async (
  user_type: user_type,
  setLoading: (loading: boolean) => void,
  evaluation_id: number,
) => {
  setLoading(true);
  
  try {
    const response = await fetch(`/api/${user_type}/evaluation/${evaluation_id}`, {
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

const getEvaluations = async (
  user_type: user_type,
  setLoading: (loading: boolean) => void,
  data: any
) => {
  setLoading(true);

  let url = `/api/${user_type}/evaluation`;

  if (data) {
    const params = new URLSearchParams(data);
    url += `?${params.toString()}`;
  }

  const response = await fetch(url);
  const result = await response.json();
  try {
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

const updateById = async (
  user_type: user_type,
  setLoading: (loading: boolean) => void,
  evaluation_id: number,
  data: any
) =>{
  setLoading(true);

  try {
    const response = await axios.patch(`/api/${user_type}/evaluation/${evaluation_id}`, data);

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

const createEvaluation = async (
  user_type: user_type,
  data: any,
) => {

  try {
    const response = await axios.post(`/api/${user_type}/evaluation`, data);

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
  }
};

const evaluationAction = {
    getEvaluation,
    getEvaluations,
    updateById,
    createEvaluation
}


export default evaluationAction;
