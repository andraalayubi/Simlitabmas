import { user_type } from "prisma/interfaces";

const getSchemas = async (
  user_type: user_type,
  setLoading: (loading: boolean) => void,
  filter: any | null
) => {
  setLoading(true);

  try {
    let url = `/api/${user_type}/schema`;
    
    // build filter to param
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

const getSchemasSummary = async (
  user_type: user_type,
  setLoading: (loading: boolean) => void,
) => {
  setLoading(true);

  try {
    const response = await fetch(`/api/${user_type}/schema/summary`);
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
}

const schemaAction = {
  getSchemas,
  getSchemasSummary
};

export default schemaAction;
