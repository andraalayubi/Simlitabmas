import axios from "axios";

export const proposalSuggestionAction = async (
  values: { email: string; password: string },
  setLoading: (loading: boolean) => void
) => {
  setLoading(true);

  try {
    const response = await axios.post("/api/proposal-suggestion", values);
    
    if (response.status === 200 && response.data.success) {
      return {
        success: true,
        message: "Successfully created a proposal suggestion!",
      };
    } else {
      return {
        success: false,
        message: response.data?.message || "Failed to create a proposal suggestion. Please try again.",
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

export const fetchSchemas = async () => {
  try {
    const response = await fetch('/api/lecturer/schema');
    const result = await response.json();
    console.log(result);

    if (result.success) {
      return result.data.map((schema: { id: number; name: string }) => ({
        value: schema.id.toString(),
        label: schema.name
      }));
    }

    return [];
  } catch (error) {
    console.error('Failed to fetch schemas:', error);
    return [];
  }
}