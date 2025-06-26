import { Card, Group, Text } from "@mantine/core";
import { IconFile } from "@tabler/icons-react";
import { proposal_suggestion, user_type } from "prisma/interfaces";
import ProposalSuggestionStatusBadge from "src/components/badge/proposal_suggestion/ProposalSuggestionStatusBadge";
import Link from "next/link";
import { useEffect } from "react";

interface HistoryCardProps {
  proposal_suggestion: proposal_suggestion;
  user_type: user_type;
}

const HistoryCard: React.FC<HistoryCardProps> = ({
  proposal_suggestion,
  user_type,
}) => {
  const evaluasiProposal = proposal_suggestion.evaluation?.find(
    (e) => e.evaluation_phase === "evaluasi_proposal"
  );

  useEffect(() => {
    console.log("Evaluasi Proposal:", proposal_suggestion);
  });

  const cardContent = (
    <Card
      key={proposal_suggestion.id}
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      className={user_type === "lecturer" ? "cursor-default" : "cursor-pointer"}
    >
      <Group justify="space-between">
        <Group gap="sm">
          <IconFile size={24} />
          <div>
            <Group gap="sm">
              <Text fw={500}>{proposal_suggestion.name} </Text>
              <ProposalSuggestionStatusBadge
                status={proposal_suggestion.status!}
              />
            </Group>

            <Group gap="sm">
              <Text size="sm" c="dimmed">
                Usulan{" "}
                {evaluasiProposal?.category
                  ? evaluasiProposal.category.charAt(0).toUpperCase() +
                    evaluasiProposal.category.slice(1)
                  : "-"}
                ,
              </Text>
              <Text size="sm" c="dimmed">
                Tahun: {proposal_suggestion.year_research?.year}
              </Text>
            </Group>
          </div>
        </Group>

        <Group gap="lg">
          <div className="flex flex-col items-center justify-center">
            <Text size="sm" c="dimmed">
              Skor Proposal
            </Text>
            <Text size="lg" c="dimmed">
              {evaluasiProposal?.score !== null
                ? `${evaluasiProposal?.score!}`
                : "-"}
            </Text>
          </div>
        </Group>
      </Group>
    </Card>
  );

  return user_type === "lecturer" ? (
    cardContent
  ) : (
    <Link href={`/usulan/${proposal_suggestion.id}`} passHref>
      {cardContent}
    </Link>
  );
};

export default HistoryCard;
