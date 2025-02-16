import { user_type } from "prisma/interfaces";

const getProposalSuggestion = async (
  user_type: user_type,
  setLoading: (loading: boolean) => void,
  params: Record<string, string | number | boolean> = {}
) => {
  setLoading(true);

  try {
    console.log(params);
    
    // Construct URL with default and additional params
    const baseParams = new URLSearchParams({
      get_schema: 'true',
      get_lecturer: 'true',
      get_research_group: 'true',
    //   research_group_id: '-1',
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
    console.log(result);
    
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

const proposalSuggestionAction = {
  getProposalSuggestion
}

export default proposalSuggestionAction;