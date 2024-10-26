import axios from "axios";

export const loginAction = async (
  values: { email: string; password: string },
  setLoading: (loading: boolean) => void,
  setError: (error: string | null) => void,
  setSuccess: (success: boolean) => void,
  router: any
) => {
  setLoading(true);
  setError(null); // Reset error before new request
  try {
    const response = await axios.post("/api/login", values);
    if (response.status === 200 && response.data.success) {
      setSuccess(true);
      setTimeout(() => {
        router.push("/dashboard"); // Redirect to dashboard page
      }, 2000);
    } else {
      setError(response.data?.message || "Login failed. Please try again.");
    }
  } catch (error: any) {
    setError(error.response?.data?.message || "An unexpected error occurred");
  } finally {
    setLoading(false);
  }
};
