import axios from "axios";
import { user_type } from "prisma/interfaces";

const getConfiguration = async (
  user_type: user_type,
  setLoading: (loading: boolean) => void
) => {
  setLoading(true);

  try {
    const response = await fetch(`/api/${user_type}/configuration`, {
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

const updateConfiguration = async (
  configuration: any,
  user_type: user_type,
  setLoading: (loading: boolean) => void
) => {
  try {
    setLoading(true);
    const response = await axios.put(
      `/api/${user_type}/configuration`, 
      configuration
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


const configurationAction = {
  getConfiguration,
  updateConfiguration,
};

export default configurationAction;
