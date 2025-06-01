import axios from "axios";
import { user_type } from "prisma/interfaces";

const getConditions = async (
  user_type: user_type,
  setLoading: (loading: boolean) => void
) => {
  setLoading(true);

  try {
    const response = await fetch(`/api/${user_type}/criterion/condition`, {
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
        message: result.message || "Gagal memuat data",
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

const createCriterion = async (
  user_type: user_type,
  data: any,
  setLoading: (loading: boolean) => void
) => {
  setLoading(true);

  try {
    const response = await axios.post(`/api/${user_type}/criterion`, data);

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

const getCriteria = async (
  user_type: user_type,
  setLoading: (loading: boolean) => void,
  filter: any | null
) => {
  setLoading(true);

  let url = `/api/${user_type}/criterion`;

  if (filter) {
    const params = new URLSearchParams(filter);
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

const deleteCriterion = async (user_type: user_type, criterion_id: number) => {
  try {
    const response = await axios.patch(
      `/api/${user_type}/criterion/${criterion_id}`
    );

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
        "Failed to delete. Please try again.",
    };
  }
};

const criterionAction = {
  getConditions,
  createCriterion,
  getCriteria,
  deleteCriterion,
};

export default criterionAction;
