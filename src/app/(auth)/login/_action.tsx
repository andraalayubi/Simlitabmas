import axios from "axios";

export const loginAction = async (
  values: { email: string; password: string },
  setLoading: (loading: boolean) => void
) => {
  setLoading(true);

  try {
    const response = await axios.post("/api/login", values);
    if (response.status === 200 && response.data.success) {
      return {
        success: true,
        message: "Login successful! Redirecting to dashboard...",
      };
    } else {
      return {
        success: false,
        message: response.data?.message || "Login failed. Please try again.",
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
