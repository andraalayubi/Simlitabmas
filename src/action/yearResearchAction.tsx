import axios from "axios";
import { user_type } from "prisma/interfaces";

const getYearResearches = async (
  user_type: user_type,
  setLoading: (loading: boolean) => void
) => {
  setLoading(true);

  try {
    const response = await fetch(`/api/${user_type}/year_research`);
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

// create year research
const createYearResearch = async (
  user_type: user_type,
  data: any,
  setLoading: (loading: boolean) => void
) => {
  setLoading(true);

  try {
    console.log(data);
    
    const response = await axios.post(`/api/${user_type}/year_research`, data);

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
    console.log(error);
    return {
      success: false,
      message: error.response?.data?.message || "An unexpected error occurred",
    };
  } finally {
    setLoading(false);
  }
};

const yearResearchAction = {
  getYearResearches,
  createYearResearch,
};

export default yearResearchAction;
