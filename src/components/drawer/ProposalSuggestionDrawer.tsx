import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Drawer,
  Flex,
  Paper,
  Skeleton,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import {
  proposal_suggestion,
  proposal_suggestion_phase,
  proposal_suggestion_status,
  user_type,
} from "prisma/interfaces";
import ProposalSuggestionStatusBadge from "../badge/proposal_suggestion/ProposalSuggestionStatusBadge";
import ProposalSuggestionPhaseBadge from "../badge/proposal_suggestion/ProposalSuggestionPhaseBadge";
import { DateInput } from "@mantine/dates";
import { IconAlertCircle } from "@tabler/icons-react";
import { Workflow } from "src/lib/workflow";
import proposalSuggestionAction from "src/action/proposalSuggestionAction";
import useNotification from "../notification/notification";
import evaluationAction from "src/action/evaluationAction";

interface DrawerMenuProps {
  user_type: user_type;
  proposal_suggestion: proposal_suggestion;
  opened: boolean;
  onClose: () => void;
  loading: boolean;
  editable: boolean;
  onSuccess: () => void;
}

const DrawerProposalSuggestion: React.FC<DrawerMenuProps> = ({
  user_type,
  proposal_suggestion,
  opened,
  onClose,
  loading,
  editable,
  onSuccess,
}) => {
  const { showNotification } = useNotification();
  const [type, setType] = useState("penelitian");

  // Set action for each role
  const [currentPhase, setCurrentPhase] = useState<string | null>();
  const [currentStatus, setCurrentStatus] = useState<string | null>();
  const [roleAction, setRoleAction] = useState<string | null>(null);
  const [infoAction, setInfoAction] = useState<string>("");
  const workflow = new Workflow();
  const isPenelitian = proposal_suggestion?.research_group_id !== null;

  // handle each role status phase condition
  const handleUpdate = async (approved: boolean = true) => {
    const { nextPhase, nextStatus } = workflow.getNextPhaseAndStatus(
      currentPhase!,
      currentStatus!,
      type
    );

    // valu for api
    let phase = null;
    let status = null;

    // handle for admin
    if (user_type == "admin") {
      if (roleAction == "next") {
        phase = nextPhase;
        status = nextStatus;
      } else if (roleAction == "approval") {
        phase = nextPhase;
        status = nextStatus;
      }

      //  handle for ketua rg
    } else if (user_type == "ketua_rg") {
      if (roleAction == "approval") {
        if (approved) {
          phase = currentPhase;
          status = "diterima";
        } else {
          phase = currentPhase;
          status = "ditolak";
        }
      }

      //handle for kaprodi
    } else if (user_type == "kaprodi") {
      if (roleAction == "approval") {
        if (approved) {
          phase = currentPhase;
          status = "diterima";
        } else {
          phase = currentPhase;
          status = "ditolak";
        }
      }
    }
    //handle for lecturer
    else if (user_type == "lecturer") {
      if (roleAction == "approval" || roleAction == "input") {
        if (approved) {
          phase = currentPhase;
          status = nextStatus;
        } else {
          phase = currentPhase;
          status = currentStatus;
        }
      }

      if (roleAction == "next") {
        phase = nextPhase;
        status = nextStatus;
      }
    }

    const response = await proposalSuggestionAction.updateStatusPhase(
      user_type,
      phase as proposal_suggestion_phase,
      status as proposal_suggestion_status,
      proposal_suggestion.id
    );

    if (response.success) {
      showNotification({ status: "success", message: response.message });

      if (approved && roleAction === "approval") {
        const isPenelitianSuggestion = isPenelitian ? "penelitian" : "pengmas";

        if (user_type === "ketua_rg") {
          createEvaluation("penelitian", "evaluasi_proposal");
        } else if (user_type === "kaprodi") {
          createEvaluation("pengmas", "evaluasi_proposal");
        } else if (user_type === "lecturer") {
          let evaluationPhase: "evaluasi_monev" | "evaluasi_akhir" | null =
            null;
          if (currentPhase === "monev") {
            evaluationPhase = "evaluasi_monev";
          } else if (currentPhase === "evaluasi_akhir") {
            evaluationPhase = "evaluasi_akhir";
          }
          if (evaluationPhase) {
            createEvaluation(isPenelitianSuggestion, evaluationPhase);
          }
        }
      }

      handleClose();
    } else {
      showNotification({ status: "error", message: response.message });
      handleClose();
    }
  };

  const createEvaluation = async (
    category: string,
    evaluation_phase: string
  ) => {
    return await evaluationAction.createEvaluation(user_type, {
      proposal_suggestion_id: proposal_suggestion.id,
      category,
      evaluation_phase,
    });
  };

  // close drawer and reload parent data
  const handleClose = () => {
    onSuccess();
    onClose();
  };

  useEffect(() => {
    console.log("fase apaaa " + currentPhase);
    if (proposal_suggestion?.research_group_id === null) {
      setType("pengmas");
    }

    if (proposal_suggestion?.phase && proposal_suggestion?.status) {
      const action = workflow.getAction(
        proposal_suggestion.status,
        proposal_suggestion.phase,
        user_type,
        type
      );
      const info = workflow.getInfo(
        proposal_suggestion.status,
        proposal_suggestion.phase,
        user_type,
        type
      );
      setRoleAction(action);
      setInfoAction(info as string);

      setCurrentPhase(proposal_suggestion.phase);
      setCurrentStatus(proposal_suggestion.status);
    }
  }, [
    proposal_suggestion?.phase!,
    proposal_suggestion?.status!,
    user_type,
    type,
  ]);

  return (
    <Skeleton visible={loading}>
      <Drawer
        position="right"
        opened={opened}
        onClose={onClose}
        title={`Ringkasan Usulan ${
          proposal_suggestion?.research_group?.id
            ? "Penelitian : "
            : "Pengabdian Masyarakat : "
        }`}
      >
        {/* EDITABLE ACTION BY ROLE */}
        <Stack gap="sm">
          {/*============================================ ADMIN ACTIONS ============================================*/}
          {user_type === "admin" && roleAction && (
            <>
              <Paper
                withBorder
                className="border-2 border-yellow-500 rounded-lg p-4"
              >
                <Flex align="center" gap="xs" mb="md">
                  <IconAlertCircle size={20} className="text-yellow-500" />
                  <Text fw={600}>Audit Usulan Diperlukan !</Text>
                </Flex>

                {roleAction === "approval" ? (
                  <>
                    <Text size="sm" mb="sm" c="dimmed">
                      Tetapkan usulan
                    </Text>
                    <Flex gap="md">
                      <Button
                        fullWidth
                        color="green"
                        onClick={() => handleUpdate(true)}
                      >
                        Terima
                      </Button>
                      <Button
                        fullWidth
                        variant="outline"
                        color="red"
                        onClick={() => handleUpdate(false)}
                      >
                        Tolak
                      </Button>
                    </Flex>
                  </>
                ) : roleAction === "next" ? (
                  <>
                    <Text size="sm" mb="sm" c="dimmed">
                      Lanjutkan ke tahap berikutnya
                    </Text>
                    <Button
                      fullWidth
                      color="blue"
                      onClick={() => handleUpdate()}
                    >
                      Lanjutkan Tahap
                    </Button>
                  </>
                ) : null}
              </Paper>
              <Divider my="sm" />
            </>
          )}

          {/*============================================ KETUA RG ACTIONS ============================================*/}
          {user_type === "ketua_rg" && roleAction && (
            <>
              <Paper
                withBorder
                className="border-2 border-yellow-500 rounded-lg p-4"
              >
                <Flex align="center" gap="xs" mb="md">
                  <IconAlertCircle size={20} className="text-yellow-500" />
                  <Text fw={600}>Persetujuan Ketua Research Group</Text>
                </Flex>

                {roleAction === "approval" ? (
                  <>
                    <Text size="sm" mb="sm" c="dimmed">
                      Setuju usulan
                    </Text>
                    <Flex gap="md">
                      <Button
                        fullWidth
                        color="green"
                        onClick={() => handleUpdate(true)}
                      >
                        Setujui
                      </Button>
                      <Button
                        fullWidth
                        variant="outline"
                        color="red"
                        onClick={() => handleUpdate(false)}
                      >
                        Tolak
                      </Button>
                    </Flex>
                  </>
                ) : null}
              </Paper>
              <Divider my="sm" />
            </>
          )}

          {/*============================================ KAPRODI ACTIONS ============================================*/}
          {user_type === "kaprodi" && roleAction && (
            <>
              <Paper
                withBorder
                className="border-2 border-yellow-500 rounded-lg p-4"
              >
                <Flex align="center" gap="xs" mb="md">
                  <IconAlertCircle size={20} className="text-yellow-500" />
                  <Text fw={600}>Persetujuan Kaprodi</Text>
                </Flex>

                {roleAction === "approval" ? (
                  <>
                    <Text size="sm" mb="sm" c="dimmed">
                      Setuju usulan
                    </Text>
                    <Flex gap="md">
                      <Button
                        fullWidth
                        color="green"
                        onClick={() => handleUpdate(true)}
                      >
                        Setujui
                      </Button>
                      <Button
                        fullWidth
                        variant="outline"
                        color="red"
                        onClick={() => handleUpdate(false)}
                      >
                        Tolak
                      </Button>
                    </Flex>
                  </>
                ) : null}
              </Paper>
              <Divider my="sm" />
            </>
          )}

          {/*============================================ LECTURER ACTIONS ============================================*/}
          {user_type === "lecturer" && roleAction && (
            <>
              <Paper
                withBorder
                className="border-2 border-yellow-500 rounded-lg p-4"
              >
                <Flex align="center" gap="xs" mb="md">
                  <IconAlertCircle size={20} className="text-yellow-500" />
                  <Text fw={600}>Persetujuan Pengusul</Text>
                </Flex>

                {roleAction === "approval" ? (
                  <>
                    <Text size="sm" mb="sm" c="dimmed">
                      Setuju usulan
                    </Text>
                    <Flex gap="md">
                      <Button
                        fullWidth
                        color="green"
                        onClick={() => handleUpdate(true)}
                      >
                        Setujui
                      </Button>
                      <Button
                        fullWidth
                        variant="outline"
                        color="red"
                        onClick={() => handleUpdate(false)}
                      >
                        Tolak
                      </Button>
                    </Flex>
                  </>
                ) : roleAction === "input" ? (
                  <>
                    <Text size="sm" mb="sm" c="dimmed">
                      {workflow.getInfo(
                        currentStatus!,
                        currentPhase!,
                        user_type
                      )}
                    </Text>
                    <Button
                      fullWidth
                      color="blue"
                      onClick={() => handleUpdate()}
                    >
                      Unggah Lampiran dan Lanjutkan Tahap
                    </Button>
                  </>
                ) : roleAction === "next" ? (
                  <>
                    <Text size="sm" mb="sm" c="dimmed">
                      Lanjutkan ke tahap selajutnya
                    </Text>
                    <Button
                      fullWidth
                      color="blue"
                      onClick={() => handleUpdate()}
                    >
                      Lanjutkan Tahap
                    </Button>
                  </>
                ) : null}
              </Paper>
              <Divider my="sm" />
            </>
          )}

          <TextInput
            label="Judul"
            defaultValue={proposal_suggestion?.name}
            readOnly
          />
          <TextInput
            label="Pengusul"
            defaultValue={proposal_suggestion?.lecturer?.name}
            readOnly
          />

          {proposal_suggestion?.research_group?.id ? (
            <>
              <TextInput
                label="Research Group"
                defaultValue={proposal_suggestion?.research_group?.name}
                readOnly
              />
            </>
          ) : (
            <>
              <TextInput
                label="Program Studi"
                defaultValue={proposal_suggestion?.department?.name}
                readOnly
              />
            </>
          )}

          <TextInput
            label="Skema"
            defaultValue={proposal_suggestion?.schema?.name}
            readOnly
          />
          <DateInput
            value={new Date(proposal_suggestion?.year_research?.open_date!)}
            readOnly
            label="Tahun Usulan"
            placeholder="Pilih tanggal"
            valueFormat="YYYY"
          />
          <div className="grid grid-cols-3">
            <Text size="sm">Status Usulan : </Text>
            <ProposalSuggestionStatusBadge
              status={proposal_suggestion?.status!}
            />
          </div>
          <div className="grid grid-cols-3">
            <Text size="sm">Tahap Usulan : </Text>
            <ProposalSuggestionPhaseBadge phase={proposal_suggestion?.phase!} />
          </div>
          <Button variant="filled" color="blue" disabled={!editable}>
            Simpan Perubahan
          </Button>
        </Stack>
      </Drawer>
    </Skeleton>
  );
};

export default DrawerProposalSuggestion;
