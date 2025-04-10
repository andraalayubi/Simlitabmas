import Dashboard from "@/app/(pages)/dashboard/page";
import axios from "axios";
import { external_document, user_type } from "prisma/interfaces";

const getExternalDocuments = async (
  user_type: user_type,
  proposal_suggestion_id: number | string,
  setLoading: (loading: boolean) => void
) => {
  setLoading(true);

  try {
    const response = await fetch(
      `/api/${user_type}/external-document/${proposal_suggestion_id}`,
      {
        method: "GET",
      }
    );
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

const createExternalDocument = async (
  external_document: external_document,
  proposal_suggestion_id: number,
  external_document_id: number,
  user_type: user_type,
  setLoading: (loading: boolean) => void
) => {
  setLoading(true);

  try {
    const response = await axios.post(
      `/api/${user_type}/external-document/${proposal_suggestion_id}`,
      external_document
    );
    if (response.status === 200 && response.data.success) {
      return {
        success: true,
        message: response.data?.message,
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

const updateExternalDocument = async (
  external_document: any,
  proposal_suggestion_id: number,
  external_document_id: number,
  user_type: user_type,
  setLoading: (loading: boolean) => void
) => {
  setLoading(true);

  try {
    const response = await axios.put(
      `/api/${user_type}/external-document/${proposal_suggestion_id}/${external_document_id}`,
      external_document
    );
    if (response.status === 200 && response.data.success) {
      return {
        success: true,
        message: response.data?.message,
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

const deleteExternalDocument = async (
  external_document_id: number,
  proposal_suggestion_id: number,
  user_type: user_type,
  setLoading: (loading: boolean) => void
) => {
  setLoading(true);

  try {
    const response = await axios.delete(
      `/api/${user_type}/external-document/${proposal_suggestion_id}/${external_document_id}`
    );

    if (response.status === 200 && response.data.success) {
      return {
        success: true,
        message: response.data?.message,
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

const externalDocumentAction = {
  getExternalDocuments,
  createExternalDocument,
  updateExternalDocument,
  deleteExternalDocument,
};

export default externalDocumentAction;
