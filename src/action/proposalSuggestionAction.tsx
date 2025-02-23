import axios from "axios";
import { user_type } from "prisma/interfaces";

const getProposalSuggestion = async (
  user_type: user_type,
  setLoading: (loading: boolean) => void,
  params: Record<string, string | number | boolean> = {}
) => {
  setLoading(true);

  try {
    const baseParams = new URLSearchParams({
      get_schema: 'true',
      get_lecturer: 'true',
      get_research_group: 'true',
      ...Object.fromEntries(
        Object.entries(params).map(([key, value]) => [key, String(value)])
      )
    });
    console.log(baseParams.toString());
    

    const response = await fetch(
      `/api/${user_type}/proposal-suggestion?${baseParams.toString()}`,
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

const createProposalSuggestion = async (
    user_type: user_type,
    values: { name: string; year_research_id: string; schema_id: string; research_group_id?: string },
    setLoading: (loading: boolean) => void,
    lecturer_id: number
  ) => {
    setLoading(true);
  
    try {
      const lecturer = await fetch(`/api/${user_type}/lecturer/${lecturer_id}`);
      const lecturerData = await lecturer.json();
      
      const response = await axios.post(
        `/api/${user_type}/proposal-suggestion`,{
          ...values,
          lecturer: lecturerData.data
        }
      );

      console.log('action', response);
      if (response.status === 201 && response.data.success) {
        console.log(response.data);
        
        return {
          success: true,
          message: "Successfully created a proposal suggestion!",
          data: response.data.data
        };
      } else {
        return {
          success: false,
          message: response.data?.message || "Failed to create a proposal suggestion. Please try again.",
        };
      }
    } catch (error: any) {
      console.error(error);
      return {
        success: false,
        message: error.response?.data?.message || "An unexpected error occurred",
      };
    } finally {
      setLoading(false);
    }
  };

const proposalSuggestionAction = {
  getProposalSuggestion,
  createProposalSuggestion
}

export default proposalSuggestionAction;