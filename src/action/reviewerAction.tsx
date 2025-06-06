import axios from "axios";
import { user_type } from "prisma/interfaces";

const createReviewer = async (
  user_type: user_type,
  data: any,
  setLoading: (loading: boolean) => void
) => {
  setLoading(true);

  try {
    const response = await axios.post(`/api/${user_type}/reviewer`, data);

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

const getReviewers = async (
  user_type: user_type,
  setLoading: (loading: boolean) => void,
  filter: any | null
) => {
  setLoading(true);

  let url = `/api/${user_type}/reviewer`;

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

const updateReviewer = async (
  user_type: user_type,
  setLoading: (loading: boolean) => void,
  reviewer_id: number,
  reviewer: any
) => {
  setLoading(true);

  console.log("action ", reviewer);

  try {
    const response = await axios.patch(
      `/api/${user_type}/reviewer/${reviewer_id}`,
      reviewer
    );

    if (response.status === 200 && response.data.success) {
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
      message: error.response?.data?.message || "An unexpected error occurred",
    };
  } finally {
    setLoading(false);
  }
};

const deleteReviewer = async (
  user_type: user_type,
  reviewer_id: number,
  reviewer: any
) => {
  try {
    const response = await axios.patch(
      `/api/${user_type}/reviewer/${reviewer_id}`,
      reviewer
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
        "Failed to delete lecturer. Please try again.",
    };
  }
};

const reviewerAction = {
  createReviewer,
  getReviewers,
  updateReviewer,
  deleteReviewer
};

export default reviewerAction;
