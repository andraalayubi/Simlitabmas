import { user_type } from "prisma/interfaces";

const getLecturerMember = async (
  user_type: user_type,
  usulan_id: number,
  setLoading: (loading: boolean) => void
) => {
  setLoading(true);

  try {
    const response = await fetch(`/api/${user_type}/member/${usulan_id}`);
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

const memberAction = {
  getLecturerMember
}

export default memberAction;