import axios from "axios";
import { user_type } from "prisma/interfaces";

const getAdditionalDocuments = async (
  user_type: user_type,
  proposal_suggestion_id: string,
  setLoading: (loading: boolean) => void
) => {
  setLoading(true);

  try {
    const response = await fetch(
      `/api/${user_type}/additional_document/${proposal_suggestion_id}`,
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

const uploadAdditionalDocument =  async (
  user_type: user_type,
  proposal_suggestion_id: string,
  name: string,
  fileUrl: string,
  setLoading: (loading: boolean) => void
) => {
  setLoading(true);

  try {
    const response = await axios.post(`/api/${user_type}/additional_document/${proposal_suggestion_id}`, {name, fileUrl});

    if (response.status === 201) {
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

const updateAdditionalDocument = async (
  user_type: user_type,
  proposal_suggestion_id: string,
  id: number,
  name: string,
  fileUrl: string,
  setLoading: (loading: boolean) => void
) => {
  setLoading(true);

  try {
    const response = await axios.put(`/api/${user_type}/additional_document/${proposal_suggestion_id}`, { id, name, fileUrl });

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

const deleteAdditionalDocument = async (
  id: number,
  proposal_suggestion_id: string,
  user_type: user_type,
  setLoading: (loading: boolean) => void
) => {
  setLoading(true);

  try {
    const response = await axios.delete(`/api/${user_type}/additional_document/${proposal_suggestion_id}`, { data: { id } });

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

const additionalDocumentAction = {
  getAdditionalDocuments,
  uploadAdditionalDocument,
  updateAdditionalDocument,
  deleteAdditionalDocument,
};

export default additionalDocumentAction;
