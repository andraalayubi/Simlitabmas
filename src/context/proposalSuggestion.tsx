import { proposal_suggestion } from "prisma/interfaces";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import proposalSuggestionAction from "src/action/proposalSuggestionAction";
import { useSession } from "src/components/session/session";
import { getSession } from "src/lib/session";

interface ProposalSuggestionContextType {
  allProposals: proposal_suggestion[];
  filteredProposals: proposal_suggestion[];
  loading: boolean;
  addProposalSuggestion: (proposal: proposal_suggestion) => void;
}

const ProposalSuggestionContext = createContext<
  ProposalSuggestionContextType | undefined
>(undefined);

export const ProposalSuggestionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [allProposals, setAllProposals] = useState<proposal_suggestion[]>([]);
  const [filteredProposals, setFilteredProposals] = useState<
    proposal_suggestion[]
  >([]);
  const [loading, setLoading] = useState(true);
  
  const fetchProposals = useCallback(async () => {
    const sessions = await getSession();
    console.log(sessions);
    setLoading(true);
    const lecturerId = sessions?.lecturer_id || null;

    const response = await proposalSuggestionAction.getProposalSuggestion(
      "lecturer",
      setLoading,
      { research_group_id: -1 }
    );

    if (response.success) {
      setAllProposals(response.data);

      if (lecturerId) {
        const filtered = response.data.filter(
          (proposal: any) => proposal.lecturer_id === lecturerId
        );
        setFilteredProposals(filtered);
      }
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProposals();
  }, [fetchProposals]);
  
  const updateProposals = (
    prev: proposal_suggestion[],
    newProposal: proposal_suggestion
  ) => {
    const exists = prev.some((p) => p.id === newProposal.id);
    if (exists) {
      return prev;
    }
    return [...prev, newProposal];
  };

  const addProposalSuggestion = (newProposal: proposal_suggestion) => {
    console.log(newProposal);

    try{
      setAllProposals((prev) => updateProposals(prev, newProposal));
      setFilteredProposals((prev) => updateProposals(prev, newProposal));
    }catch(error){
      console.error(error);
    }
  };

  return (
    <ProposalSuggestionContext.Provider
      value={{
        allProposals,
        filteredProposals,
        loading,
        addProposalSuggestion,
      }}
    >
      {children}
    </ProposalSuggestionContext.Provider>
  );
};

export const useProposalSuggestion = () => {
  const context = useContext(ProposalSuggestionContext);
  if (!context) {
    throw new Error(
      "useProposalSuggestion must be used within a ProposalSuggestionProvider"
    );
  }
  return context;
};
