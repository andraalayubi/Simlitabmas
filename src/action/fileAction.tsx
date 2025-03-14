import axios from "axios";

const uploadFile = async (
  file: File,
  setLoading: (loading: boolean) => void
) => {
  setLoading(true);
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(`/api/file`, formData);
    if (response.status === 200) {
      return {
        success: true,
        message: response.data?.message,
        data: response.data?.data,
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

const fileAction = {
  uploadFile,
};

export default fileAction;
