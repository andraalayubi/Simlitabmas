import axios from "axios";

export const proposalSuggestionAction = async (
  values: { name: string; year_research_id: string; schema_id: string; research_group_id?: string },
  setLoading: (loading: boolean) => void,
  type: "penelitian" | "pengmas" = "penelitian"
) => {
  setLoading(true);

  try {
    const response = await axios.post(
      type === "penelitian"
        ? "/api/lecturer/proposal-suggestion"
        : "/api/lecturer/proposal-suggestion-pengmas",
      values
    );

    if (response.status === 201 && response.data.success) {
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

export const fetchYearResearches = async () => {
  try {
    const response = await fetch('/api/lecturer/year_research');
    const result = await response.json();

    if (result.success) {
      return result.data.map((yearResearch: { id: number; year: number }) => ({
        value: yearResearch.id.toString(),
        label: yearResearch.year.toString()
      }));
    }

    return [];
  } catch (error) {
    console.error('Failed to fetch year researches:', error);
    return [];
  }
}

export const fetchResearchGroups = async () => {
  try {
    const response = await fetch('/api/lecturer/research_group');
    const result = await response.json();

    if (result.success) {
      return result.data.map((researchGroup: { id: number; name: string }) => ({
        value: researchGroup.id.toString(),
        label: researchGroup.name
      }));
    }

    return [];
  } catch (error) {
    console.error('Failed to fetch research groups:', error);
    return [];
  }
}