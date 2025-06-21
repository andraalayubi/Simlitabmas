import { user_type } from "prisma/interfaces";

const getLecturer = async (
  user_type: user_type,
  setLoading: (loading: boolean) => void,
  filter: any | null
) => {
  setLoading(true);

  try {
    let url = `/api/${user_type}/report/lecturer`;

    if (filter) {
      const params = new URLSearchParams(filter);
      url += `?${params.toString()}`;
    }

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

const getLecturerResearch = async (
  user_type: user_type,
  setLoading: (loading: boolean) => void,
  filter: any | null
) => {
  setLoading(true);

  try {
    let url = `/api/${user_type}/report/lecturer_research`;

    if (filter) {
      const params = new URLSearchParams(filter);
      url += `?${params.toString()}`;
    }

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

const getResearchGroup = async (
  user_type: user_type,
  setLoading: (loading: boolean) => void,
  filter: any | null
) => {
  setLoading(true);

  try {
    let url = `/api/${user_type}/report/research_group`;

    if (filter) {
      const params = new URLSearchParams(filter);
      url += `?${params.toString()}`;
    }

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

const reportAction = {
  getLecturer,
  getLecturerResearch,
  getResearchGroup
};

export default reportAction;
