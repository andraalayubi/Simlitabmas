import React, { useCallback, useEffect, useState } from "react";
import { Button, Card, Divider, Spoiler, Text } from "@mantine/core";
import { SessionPayload } from "src/lib/encrypt";
import { Skeleton } from "@mantine/core";
import { useParams } from "next/navigation";
import proposalSuggestionAction from "src/action/proposalSuggestionAction";
import useNotification from "src/components/notification/notification";
import { proposal_suggestion, proposal_suggestion_phase, proposal_suggestion_status } from "prisma/interfaces";
import ProposalSuggestionPhaseBadge from "src/components/badge/proposal_suggestion/ProposalSuggestionPhaseBadge";
import ProposalSuggestionStatusBadge from "src/components/badge/proposal_suggestion/ProposalSuggestionStatusBadge";
import DrawerProposalSuggestion from "src/components/drawer/ProposalSuggestionDrawer";
import { Workflow } from "src/lib/workflow";
import { IconInfoCircle } from "@tabler/icons-react";

interface OverviewLecturerProps {
  session: SessionPayload;
}

const OverviewLecturer: React.FC<OverviewLecturerProps> = ({ session }) => {
  const user_type = "lecturer";
  const [loading, setLoading] = useState(true);
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [proposalSuggestion, setProposalSuggestion] =
    useState<proposal_suggestion | null>(null);
  const [editable, setEditable] = useState<boolean>(false);

  const workflow = new Workflow();

  const { showNotification } = useNotification();
  const params = useParams();
  const usulan_id = params.usulan_id as string;

  const getProposalSuggestion = useCallback(async () => {
    const response = await proposalSuggestionAction.getById(
      user_type,
      usulan_id,
      setLoading
    );

    if (response.success) {
      showNotification({ status: "success", message: response.message });
      setProposalSuggestion(response.data);

      //check editable
            const isEditableByLecturer =
              response.data.lecturer_id === session.lecturer_id;
      
            // check by workflow
            type PartialEditableRules = Partial<
              Record<proposal_suggestion_phase, proposal_suggestion_status[]>
            >;
            const editableRules: PartialEditableRules = {
              pengajuan: ["menunggu_proposal", "tersimpan"],
              evaluasi_proposal: [],
              penetapan: [],
              monev: [],
              evaluasi_akhir: [],
              penetapan_akhir: [],
            };
      
            const isEditableByConditions =
              editableRules[
                response.data.phase as proposal_suggestion_phase
              ]?.includes(response.data.status as proposal_suggestion_status) ||
              false;
      
            // check by year research
            const isEditableByYear = response.data.open;
      
            setEditable(
              isEditableByLecturer && isEditableByYear && isEditableByConditions
            );
    } else {
      showNotification({ status: "error", message: response.message });
    }
    setLoading(false);
  }, [usulan_id, user_type]);

  const handleSuccess = useCallback(() => {
    getProposalSuggestion();
    setDrawerOpened(false);
  }, [getProposalSuggestion]);

  useEffect(() => {
    getProposalSuggestion();
  }, [getProposalSuggestion]);

  return (
    <>
      {proposalSuggestion && (
        <DrawerProposalSuggestion
          user_type={user_type}
          proposal_suggestion={proposalSuggestion}
          opened={drawerOpened}
          onClose={() => setDrawerOpened(false)}
          editable={editable}
          loading={loading}
          onSuccess={handleSuccess}
          setLoading={setLoading}
        />
      )}
      <Skeleton visible={loading}>
        <Card shadow="sm" padding="lg" mb="lg">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold">Ringkasan Usulan</h2>
            <div className="flex space-x-4">
              <Button color="blue" onClick={() => setDrawerOpened(true)}>
                Proses Usulan
              </Button>
            </div>
          </div>
          <Divider my="sm" />

          <div className="grid grid-cols-[auto_auto_1fr] gap-x-8 gap-y-4 mb-8 items-baseline">
            {/* Baris Judul Usulan */}
            <Text className="font-medium">Judul Usulan</Text>
            <Text>:</Text>
            <Text className="col-span-1">{proposalSuggestion?.name}</Text>

            {/* Baris Tipe Usulan */}
            <Text className="font-medium">Tipe Usulan</Text>
            <Text>:</Text>
            <Text>
              {proposalSuggestion?.research_group_id != null
                ? "Penelitian"
                : "Pengabdian Masyarakat"}
            </Text>

            {/* Baris Status Usulan */}
            <Text className="font-medium">Status Usulan</Text>
            <Text>:</Text>
            <div>
              <ProposalSuggestionStatusBadge
                status={proposalSuggestion?.status!}
              />
            </div>

            {/* Baris Tahap Usulan */}
            <Text className="font-medium">Tahap Usulan</Text>
            <Text>:</Text>
            <div>
              <ProposalSuggestionPhaseBadge
                phase={proposalSuggestion?.phase!}
              />
            </div>

            {/* Baris Proses */}
            <Text className="font-medium">Proses</Text>
            <Text>:</Text>
            <div className="flex text-blue-600">
              <span>
                <IconInfoCircle />
              </span>
              <Spoiler
                maxHeight={30}
                showLabel="lihat"
                hideLabel="sembunyi"
                className="text-gray-600"
              >
                {
                  workflow.getAll(
                    proposalSuggestion?.status!,
                    proposalSuggestion?.phase!,
                    proposalSuggestion?.research_group_id! != null
                      ? "penelitian"
                      : "pengmas"
                  ).info
                }
              </Spoiler>
            </div>

            {/* Baris Skema Penelitian */}
            <Text className="font-medium">Skema Penelitian</Text>
            <Text>:</Text>
            <Text>{proposalSuggestion?.schema?.name}</Text>

            {/* Baris Tahun */}
            <Text className="font-medium">Tahun</Text>
            <Text>:</Text>
            <Text>{proposalSuggestion?.year_research?.year}</Text>

            {/* Baris Research Group / Program Studi */}
            {proposalSuggestion?.research_group_id != null ? (
              <>
                <Text className="font-medium">Research Group</Text>
                <Text>:</Text>
                <Text>{proposalSuggestion?.research_group?.name}</Text>
              </>
            ) : (
              <>
                <Text className="font-medium">Program Studi</Text>
                <Text>:</Text>
                <Text>{proposalSuggestion?.department?.name}</Text>
              </>
            )}
          </div>
        </Card>
      </Skeleton>

    </>
  );
};

export default OverviewLecturer;
