import { user_type } from "prisma/interfaces";
import { getSession } from "src/lib/session";

// get research group list
const getResearchGroup = async (
  user_type: user_type,
  setLoading: (loading: boolean) => void
) => {
  setLoading(true);

  try {
    const response = await fetch(`/api/${user_type}/research_group`, {
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


// create research group
const createResearchGroup = async () => {

}

const researchGroupAction = {
    getResearchGroup,
    createResearchGroup
}


export default researchGroupAction;
