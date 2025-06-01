import axios from "axios";
import { user_type } from "prisma/interfaces";

const create = async (
  user_type: user_type,
  data: any,
  setLoading: (loading: boolean) => void
) => {
  setLoading(true);
  
  try {
    const response = await axios.post(`/api/${user_type}/criterion_score`, data);

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

const getScore = async (
  user_type: user_type,
  setLoading: (loading: boolean) => void,
  filter: any | null
) => {
setLoading(true);

  let url = `/api/${user_type}/criterion_score`;

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
}

const criterionScoreAction = {
  create,
  getScore
};

export default criterionScoreAction;