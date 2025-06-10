"use client";

import {
  Button,
  Skeleton,
  Card,
  FileButton,
  Text,
  Select,
  Textarea,
  NumberInput,
  Divider,
} from "@mantine/core";
import { useParams } from "next/navigation";
import { criterion_score, proposal_suggestion } from "prisma/interfaces";
import React, { useCallback, useEffect, useState } from "react";
import useNotification from "src/components/notification/notification";
import PdfViewer from "src/components/pdf/pdfViewer";
import { SessionPayload } from "src/lib/encrypt";
import { review, criterion } from "prisma/interfaces";
import criterionAction from "src/action/criterionAction";
import reviewAction from "src/action/reviewAction";
import criterionScoreAction from "src/action/criterionScoreAction";
import evaluationAction from "src/action/evaluationAction";
import proposalSuggestionAction from "src/action/proposalSuggestionAction";
import ReviewSummaryCard from "src/components/card/proposal_suggestion/ReviewSummaryCard";
import ProposalSuggestionSummaryCard from "src/components/card/proposal_suggestion/ProposalSuggestionSummaryCard.tsx";

const MonevLecturer = ({ session }: { session: SessionPayload }) => {
  const user_type = "lecturer";
  const evaluation_phase = "evaluasi_monev";
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const { showNotification } = useNotification();
  useState<proposal_suggestion | null>(null);
  const [review, setReview] = useState<review | null>(null);
  const [score, setScore] = useState<criterion_score[]>([]);
  const [criteria, setCriteria] = useState<criterion[]>([]);
  const review_id = params.id as string;
  const [scores, setScores] = useState<{ [key: number]: number }>({});
  const [newNote, setNewNote] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const proposal_suggestion_id = review?.evaluation?.proposal_suggestion_id;
  const [reviews, setReviews] = useState<review[]>([]);
  const averageScore = review?.average_score;
  const isReview = reviews.some(
    (r) => r.reviewer?.lecturer_id === session.lecturer_id
  );
  const isSamePhase = evaluation_phase === review?.evaluation?.evaluation_phase;

  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      // Ambil data review dulu
      const reviewResponse = await reviewAction.getById(
        user_type,
        setLoading,
        Number(review_id),
        {
          get_evaluation: true,
          get_proposal_suggestion: true,
          get_proposal: true,
        }
      );

      const reviewsResponse = await reviewAction.getReviews(
        user_type,
        setLoading,
        {
          get_criterion_score: true,
          get_reviewer: true,
          proposal_suggestion_id,
          evaluation_phase,
        }
      );

      const criterionScoreResponse = await criterionScoreAction.getScore(
        user_type,
        setLoading,
        {
          proposal_suggestion_id: Number(proposal_suggestion_id),
          evaluation_phase,
          get_criterion: true,
          get_reviewer: true,
        }
      );

      if (!reviewResponse.success) {
        showNotification({
          status: "error",
          message: reviewResponse.message,
        });
        return;
      }

      if (!reviewsResponse.success) {
        showNotification({
          status: "error",
          message: reviewsResponse.message,
        });
        return;
      }

      if (!criterionScoreResponse.success) {
        showNotification({
          status: "error",
          message: criterionScoreResponse.message,
        });
        return;
      }

      const data = reviewResponse.data;
      setReview(data);
      setReviews(reviewsResponse.data);
      setScore(criterionScoreResponse.data);

      // Lanjut ambil criterion berdasarkan evaluation yang berhasil diambil
      const criterionResponse = await criterionAction.getCriteria(
        user_type,
        setLoading,
        {
          category: data.evaluation.category,
          phase: evaluation_phase,
        }
      );

      if (!criterionResponse.success) {
        showNotification({
          status: "error",
          message: criterionResponse.message,
        });
        return;
      }

      setCriteria(criterionResponse.data);

      showNotification({
        status: "success",
        message: "Data berhasil dimuat",
      });
    } catch (error) {
      showNotification({
        status: "error",
        message: "Terjadi kesalahan saat memuat data",
      });
    }
  }, [user_type, review_id, proposal_suggestion_id]);

  const handleAddScore = async () => {
    let hasError = false;
    let totalScore = 0;
    let count = 0;

    for (const criterion of criteria) {
      const score = scores[criterion.id];
      const criterion_id = criterion.id;

      if (score === undefined || score === null || !selectedStatus || !newNote)
        continue;

      totalScore += score;
      count++;

      const response = await criterionScoreAction.create(
        user_type,
        {
          review_id: Number(review_id),
          score,
          criterion_id,
        },
        setLoading
      );

      if (!response.success) {
        hasError = true;
        showNotification({ status: "error", message: response.message });
      }
    }

    if (!hasError) {
      const averageScore = count > 0 ? totalScore / count : 0;
      handleUpdateReview(averageScore);
      showNotification({ status: "success", message: "Berhasil disimpan." });
    }
  };

  const handleUpdateReview = async (averageScore: number) => {
    if (!selectedStatus || isNaN(averageScore)) {
      showNotification({
        status: "warning",
        message: "Status atau skor tidak valid",
      });
      return;
    }

    const response = await reviewAction.updateById(
      user_type,
      setLoading,
      Number(review_id),
      {
        note: newNote,
        status: selectedStatus,
        average_score: Number(averageScore.toFixed(2)),
      }
    );
    if (response.success) {
      const statusMayoritas = await checkingReviews();
      console.log("statussss" + statusMayoritas)
      if (statusMayoritas) {
        updateStatus(statusMayoritas);
      }
      fetchData();
      showNotification({ status: "success", message: response.message });
    } else {
      showNotification({ status: "error", message: response.message });
    }
  };

  const checkingReviews = async (): Promise<"diterima" | "ditolak" | null> => {
   if (!review?.evaluation_id) return null;

  // Ambil semua review berdasarkan evaluation_id
  const response = await reviewAction.getReviews("lecturer", setLoading, {
    evaluation_id: review.evaluation_id,
  });

    if (!response.success) return null;

    const allReviews = response.data;

    // Jika jumlah reviewer belum mencapai 3, tidak lanjut
    if (allReviews.length < 3) return null;

    // Cek apakah semua sudah memberi skor
    const isAllReviewed = allReviews.every(
      (r: review) => r.average_score !== null
    );

    if (!isAllReviewed) return null;

    // Hitung mayoritas
    const count = {
      diterima: 0,
      ditolak: 0,
    };

    for (const r of allReviews) {
      if (r.status === "diterima") count.diterima++;
      else if (r.status === "ditolak") count.ditolak++;
    }

    if (count.diterima > count.ditolak) return "diterima";
    if (count.ditolak > count.diterima) return "ditolak";

    return null; // Tidak ada mayoritas
  };

  const updateStatus = async (statusMayoritas: "diterima" | "ditolak") => {
    const proposal_suggestion_id = Number(
      review?.evaluation?.proposal_suggestion?.id
    );

    // Update status pada tabel evaluation
    await evaluationAction.updateById(
      user_type,
      setLoading,
      Number(review?.evaluation_id),
      { status: statusMayoritas }
    );

    // Jika diterima, lanjut ke fase penetapan
    if (statusMayoritas === "diterima") {
      await proposalSuggestionAction.updateStatusPhase(
        user_type,
        "monev",
        "diterima",
        proposal_suggestion_id
      );
    } else {
      // Jika mayoritas ditolak, status langsung jadi ditolak dan phase tetap
      await proposalSuggestionAction.updateStatusPhase(
        user_type,
        "monev", // phase tidak diubah
        "ditolak",
        proposal_suggestion_id
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <div className="bg-white shadow sm:rounded-lg p-6">
        {/* Baris Judul, Status, dan Tahap Usulan */}
        <Skeleton visible={loading}>
          <ProposalSuggestionSummaryCard
            proposal_suggestion_name={
              review?.evaluation?.proposal_suggestion?.name!
            }
            status={review?.evaluation?.proposal_suggestion?.status!}
            phase={review?.evaluation?.proposal_suggestion?.phase!}
          />
        </Skeleton>
        {/* Grid utama dengan perbandingan 5:3 pada layar besar, 1 kolom pada layar kecil */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-[5fr_3fr] gap-6">
          {/* Kolom PDF Viewer (Lebih besar) */}
          <div>
            <Skeleton visible={loading}>
              <PdfViewer
                pdfUrl={
                  review?.evaluation?.proposal_suggestion?.proposal?.file_url
                    ? `/api/file?name=${review?.evaluation?.proposal_suggestion?.proposal?.file_url}`
                    : null
                }
              />
            </Skeleton>
          </div>

          {/* Kolom Tombol + Hasil Reviewer */}
          <Skeleton visible={loading}>
            {!isReview ? (
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex justify-center">
                    <Text size="lg" fw={600}>
                      Komentar Reviewer
                    </Text>
                  </div>
                  <Divider size="md" />
                  {reviews?.map((row) => (
                    <Card shadow="sm" padding="lg" key={row.id}>
                      <Text size="md" fw={600}>
                        {row.reviewer?.lecturer?.name}
                      </Text>
                      <Text size="sm">{row.note ?? "-"}</Text>
                    </Card>
                  ))}
                </div>
              </div>
            ) : !isSamePhase ? (
              reviews
                .filter(
                  (item) => item.reviewer?.lecturer_id === session.lecturer_id
                )
                .map((item) => (
                  <div key={item.id} className="flex flex-col gap-4">
                    <Card shadow="sm" padding="lg">
                      <Text size="lg" fw={600}>
                        Penilaian
                      </Text>
                      {item.criterion_score?.map((score_item) => (
                        <div
                          key={score_item.id}
                          className="items-center mt-2 flex justify-between"
                        >
                          <Text>{score_item.criterion?.name}</Text>
                          <Text>{score_item.score}</Text>
                        </div>
                      ))}
                    </Card>

                    <Card shadow="sm" padding="lg">
                      <Text size="lg" fw={600}>
                        Komentar
                      </Text>
                      <Text className="mt-2">{item.note}</Text>
                    </Card>

                    <Card shadow="sm" padding="lg">
                      <Text size="lg" fw={600}>
                        Status
                      </Text>
                      <Text className="mt-2 capitalize">{item.status}</Text>
                    </Card>
                  </div>
                ))
            ) : (
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 gap-4">
                  {averageScore === null ? (
                    <>
                      <Card shadow="sm" padding="lg">
                        <Text size="lg" fw={600}>
                          Penilaian
                        </Text>
                        {criteria.map((criterion) => (
                          <div
                            key={criterion.id}
                            className="items-center mt-2 flex justify-between"
                          >
                            <Text>{criterion.name}</Text>
                            <NumberInput
                              min={0}
                              max={100}
                              className="w-16"
                              placeholder="Nilai"
                              value={scores[criterion.id] || ""}
                              onChange={(value) => {
                                setScores((prev) => ({
                                  ...prev,
                                  [criterion.id]: value as number,
                                }));
                              }}
                            />
                          </div>
                        ))}
                      </Card>

                      <Card shadow="sm" padding="lg">
                        <Text size="lg" fw={600}>
                          Komentar
                        </Text>
                        <Textarea
                          placeholder=""
                          autosize
                          minRows={2}
                          maxRows={10}
                          value={newNote}
                          onChange={(e) => setNewNote(e.currentTarget.value)}
                        />
                      </Card>

                      <Card shadow="sm" padding="lg">
                        <div className="items-center mt-2 flex justify-between">
                          <Text size="lg" fw={600}>
                            Status :
                          </Text>{" "}
                          <Select
                            placeholder="Pilih Status"
                            data={[
                              { value: "ditolak", label: "Tolak" },
                              { value: "diterima", label: "Terima" },
                            ]}
                            value={selectedStatus}
                            onChange={setSelectedStatus}
                          />
                        </div>
                      </Card>
                      <div className="flex justify-end mt-4">
                        <Button
                          variant="outline"
                          onClick={() => {
                            handleAddScore();
                          }}
                        >
                          Simpan
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <Card shadow="sm" padding="lg">
                        <Text size="lg" fw={600}>
                          Penilaian
                        </Text>
                        {score
                          .filter(
                            (item) =>
                              item.review?.reviewer?.lecturer_id ===
                              session.lecturer_id
                          )
                          .map((item) => (
                            <div
                              key={item.id}
                              className="items-center mt-2 flex justify-between"
                            >
                              <Text>{item.criterion?.name}</Text>
                              <Text>{item.score}</Text>
                            </div>
                          ))}
                      </Card>
                      <Card shadow="sm" padding="lg">
                        <Text size="lg" fw={600}>
                          Komentar
                        </Text>
                        <Text className="mt-2">{review?.note}</Text>
                      </Card>

                      <Card shadow="sm" padding="lg">
                        <Text size="lg" fw={600}>
                          Status
                        </Text>
                        <Text className="mt-2 capitalize">
                          {review?.status}
                        </Text>
                      </Card>
                    </>
                  )}
                </div>
              </div>
            )}
          </Skeleton>
        </div>
      </div>
    </>
  );
};

export default MonevLecturer;
