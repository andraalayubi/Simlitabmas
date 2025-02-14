import { proposal_suggestion } from "@prisma/client";
import axios from "axios";
import { proposal, user_type } from "prisma/interfaces";

// update proposal content by section
const updateProposalSection = async (
  proposal_suggestion_id: number,
  section: string, // bagian proposal (name, abstract, dll.)
  content: string,
  user_type: string
) => {
  if (!proposal_suggestion_id) return;

  try {
    const response = await fetch(
      `/api/${user_type}/proposal/${proposal_suggestion_id}/${section}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to save ${section}, status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error saving ${section}:`, error);
    return null;
  }
};

// update proposal
const updateProposal = async (
  proposal: any,
  proposal_suggestion_id: number,
  user_type: user_type,
  setLoading: (loading: boolean) => void
) => {
  setLoading(true);

  try {
    const response = await axios.put(
      `/api/${user_type}/proposal/${proposal_suggestion_id}`,
      proposal
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

const getProposal = async (
  user_type: user_type,
  usulan_id: string,
  setLoading: (loading: boolean) => void
) => {
  setLoading(true);

  try {
    const response = await fetch(`/api/${user_type}/proposal/${usulan_id}`, {
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

// upload proposal pdf
const uploadProposalFile = async (
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

const proposalAction = {
  updateProposalSection,
  updateProposal,
  getProposal,
  uploadProposalFile,
};

export default proposalAction;
