import axios from "axios";

export const proposalSuggestionAction = async (
  values: { email: string; password: string },
  setLoading: (loading: boolean) => void
) => {
  setLoading(true);

  try {
    const response = await fetch("/api/proposal-suggestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    
    const data = await response.json();
    
    if (response.status === 200 && data.success) {
      return {
        success: true,
        message: "Successfully created a proposal suggestion!",
      };
    } else {
      return {
        success: false,
        message: data?.message || "Failed to create a proposal suggestion. Please try again.",
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
