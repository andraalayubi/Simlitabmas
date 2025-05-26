import React, { useCallback, useEffect, useState } from "react";
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
  evaluation,
  evaluation_phase,
  review,
  reviewer,
  user_type,
} from "prisma/interfaces";
import useNotification from "../notification/notification";
import TableLayout from "../table/tableLayout";
import { MRT_ColumnDef } from "mantine-react-table";
import ActionButton from "../button/actionButton";
import reviewAction from "src/action/reviewAction";

interface DrawerMenuProps {
  user_type: user_type;
  evaluation: evaluation;
  phase: evaluation_phase;
  type: string;
  reviewer: reviewer[];
  opened: boolean;
  onClose: () => void;
  loading: boolean;
  editable: boolean;
  onSuccess: () => void;
  existingReviewerCount: number;
}

const DrawerPlottingReviewer: React.FC<DrawerMenuProps> = ({
  user_type,
  evaluation,
  phase,
  type,
  reviewer,
  opened,
  onClose,
  loading,
  onSuccess,
  existingReviewerCount,
}) => {
  const [selectedReviewers, setSelectedReviewers] = useState<reviewer[]>([]);
  const { showNotification } = useNotification();
  const formattedPhase = (phase || "")
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const formattedType =
    (type || "").charAt(0).toUpperCase() + (type || "").slice(1);
  const totalReviewerCount = existingReviewerCount + selectedReviewers.length;

  const columns = React.useMemo<MRT_ColumnDef<reviewer>[]>(
    () => [
      {
        accessorKey: "lecturer.name",
        header: "Nama",
        size: 150,
      },
      {
        accessorFn: (row) =>
          Array.isArray(row.review)
            ? row.review.filter((r) => r.average_score == null).length
            : 0,
        id: "tugas_review",
        header: "Tugas Review",
        size: 100,
      },
      {
        header: "Aksi",
        size: 50,
        Cell: ({ row }) => (
          <ActionButton
            type="add"
            label="Tetapkan"
            onClick={() => handleSelectReviewer(row.original)}
          ></ActionButton>
        ),
      },
    ],
    []
  );

const handleSelectReviewer = (rev: reviewer) => {
  setSelectedReviewers((prev) => {
    const alreadyExists = prev.find((r) => r.id === rev.id);

    if (alreadyExists) return prev;

    return [...prev, rev];
  });
};



  const handleSave = async () => {
    for (const r of selectedReviewers) {
      const response = await reviewAction.createReview(
        user_type,
        evaluation.id,
        r.id
      );

      if (response.success) {
        showNotification({ status: "success", message: response.message });
        setSelectedReviewers([]);
      } else {
        showNotification({ status: "error", message: response.message });
      }
    }

    onSuccess();
  };

  return (
    <Skeleton visible={loading}>
      <Drawer
        position="right"
        opened={opened}
        onClose={onClose}
        title={"Tetapkan Reviewer " + formattedType}
      >
        {/* EDITABLE ACTION BY ROLE */}
        <Stack gap="sm">
          {/*============================================ ADMIN ACTIONS ============================================*/}
          <TableLayout columns={columns} data={reviewer} isLoading={loading} />
          <TextInput value={formattedPhase} readOnly></TextInput>
          {selectedReviewers.length > 0 && (
            <Box>
              <Divider
                label="Reviewer Terpilih"
                labelPosition="center"
                my="sm"
              />
              <Stack gap="xs">
                {selectedReviewers.map((r) => (
                  <Paper key={r.id} p="sm" withBorder>
                    <Flex justify="space-between" align="center">
                      <Text>{r.lecturer?.name}</Text>
                      <Button
                        color="red"
                        size="xs"
                        onClick={() =>
                          setSelectedReviewers(
                            selectedReviewers.filter((sr) => sr.id !== r.id)
                          )
                        }
                      >
                        Hapus
                      </Button>
                    </Flex>
                  </Paper>
                ))}
              </Stack>
            </Box>
          )}
          <Divider></Divider>
          {totalReviewerCount > 3 && (
            <Text color="red" size="sm">
              Telah terdapat 3 reviewer untuk tahap ini
            </Text>
          )}

          <Button
            variant="filled"
            color="blue"
            disabled={selectedReviewers.length === 0 || totalReviewerCount > 3}
            onClick={handleSave}
          >
            Simpan Perubahan
          </Button>
        </Stack>
      </Drawer>
    </Skeleton>
  );
};

export default DrawerPlottingReviewer;
