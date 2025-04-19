import axios from "axios";
import { user_type } from "prisma/interfaces";

const getLogbooks = async (
  user_type: user_type,
  proposal_suggestion_id: string,
  setLoading: (loading: boolean) => void
) => {
  setLoading(true);

  try {
    const response = await fetch(
      `/api/${user_type}/logbook/${proposal_suggestion_id}`,
      {
        method: "GET",
      }
    );

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

const updateLogbook = async (
  logbook: any,
  proposal_suggestion_id: number,
  logbook_id: number,
  user_type: user_type,
  setLoading: (loading: boolean) => void
) => {
  setLoading(true);
  try {
    const response = await axios.put(
      `/api/${user_type}/logbook/${proposal_suggestion_id}/${logbook_id}`,
      logbook
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

const logbookAction = {
  getLogbooks,
  updateLogbook,
};

export default logbookAction;
