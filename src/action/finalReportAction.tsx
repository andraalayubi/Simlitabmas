import axios from "axios";
import { user_type } from "prisma/interfaces";

const getFinalReports = async (
  user_type: user_type,
  proposal_suggestion_id: string,
  setLoading: (loading: boolean) => void
) => {
  setLoading(true);

  try {
    const response = await fetch(
      `/api/${user_type}/final_report/${proposal_suggestion_id}`,
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

const updateFinalReport = async (
  final_report: any,
  proposal_suggestion_id: number,
  final_report_id: number,
  user_type: user_type,
  setLoading: (loading: boolean) => void
) => {
  setLoading(true);
  try {
    const response = await axios.put(
      `/api/${user_type}/final_report/${proposal_suggestion_id}/${final_report_id}`,
      final_report
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


const uploadFinalReportFile =  async (
  file: File,
  setLoading: (loading: boolean) => void
) => {
  setLoading(true);
  const formData = new FormData();
  formData.append("file", file);
}

const finalReportAction = {
  getFinalReports,
  updateFinalReport
};

export default finalReportAction;
