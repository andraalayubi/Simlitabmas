
export const updateProposalSection = async (
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
