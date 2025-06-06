import { user_type } from "@prisma/client";
import axios from "axios";

const createReview = async (
  user_type: string,
  evaluation_id: number,
  reviewer_id: number
) => {
  try {
    const response = await fetch(`/api/${user_type}/review`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ evaluation_id, reviewer_id }),
    });

    const result = await response.json();

    if (response.status === 201 && result.success) {
      return {
        success: true,
        message: "Successfully created a review!",
      };
    } else {
      return {
        success: false,
        message:
          result?.message || "Failed to create a review. Please try again.",
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "An unexpected error occurred",
    };
  }
};

const getReviews = async (
  user_type: user_type,
  setLoading: (loading: boolean) => void,
  filter: any | null
) => {
  setLoading(true);
  console.log(filter);
  let url = `/api/${user_type}/review`;

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

const deleteReview = async (user_type: user_type, review_id: number) => {
  try {
    const response = await axios.delete(
      `/api/${user_type}/review/${review_id}`
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
        "Failed to delete review. Please try again.",
    };
  }
};

const getById = async (
  user_type: user_type,
  setLoading: (loading: boolean) => void,
  review_id: number,
  filter: any | null
) => {
  setLoading(true);

  let url = `/api/${user_type}/review/${review_id}`;

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

const updateById = async (
  user_type: user_type,
  setLoading: (loading: boolean) => void,
  review_id: number,
  data: any
) =>{
  setLoading(true);

  try {
    const response = await axios.patch(`/api/${user_type}/review/${review_id}`, data);

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

const reviewAction = {
  createReview,
  getReviews,
  deleteReview,
  getById,
  updateById
};

export default reviewAction;
