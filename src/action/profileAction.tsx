import { user_type } from "prisma/interfaces";

const getProfile = async (
  user_type: user_type,
  id: number,
  setLoading: (loading: boolean) => void
) => {
  setLoading(true);

  try {
    const response = await fetch(`/api/${user_type}/dashboard/profile/${id}`, {
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

const positionAction = {
  getProfile,
};

export default positionAction;
