// lib/Workflow.ts

import { proposal_suggestion_status } from "@prisma/client";
import { proposal_suggestion_phase } from "prisma/interfaces";

type Action = "input" | "approval" | "next" | null;

interface PlotDetail {
    status: proposal_suggestion_status;
    info: string;
    role: string | null;
    action: Action;
}

interface PlotPhase {
    phase: proposal_suggestion_phase;
    details: {
        penelitian: PlotDetail[];
        pengmas?: PlotDetail[];
    };
}

export class Workflow {
    public plot: PlotPhase[];

    constructor() {
        // Mapping plot sebagai panduan workflow
        this.plot = [
            {
                phase: "pengajuan",
                details: {
                    penelitian: [
                        {
                            status: "menunggu_proposal",
                            info: "Menunggu pengusul mengunggah proposal",
                            role: "lecturer",
                            action: "input",
                        },
                        {
                            status: "tersimpan",
                            info: "Proposal terunggah, menunggu pengusul mengajukan usulan",
                            role: "lecturer",
                            action: "approval",
                        },
                        {
                            status: "menunggu_rg",
                            info: "Menunggu persetujuan ketua research group",
                            role: "ketua_rg",
                            action: "approval",
                        },
                        {
                            status: "ditolak",
                            info: "Usulan ditolak ketua research group",
                            role: null,
                            action: null,
                        },
                        {
                            status: "diterima",
                            info: "Usulan diterima ketua research group, menunggu konfirmasi admin ke tahap evaluasi proposal",
                            role: "admin",
                            action: "next",
                        },
                    ],
                    pengmas: [
                        {
                            status: "menunggu_proposal",
                            info: "Menunggu pengusul mengunggah proposal",
                            role: "lecturer",
                            action: "input",
                        },
                        {
                            status: "tersimpan",
                            info: "Proposal terunggah, menunggu pengusul mengajukan usulan",
                            role: "lecturer",
                            action: "approval",
                        },
                        {
                            status: "menunggu_kaprodi",
                            info: "Menunggu persetujuan ketua program studi",
                            role: "kaprodi",
                            action: "approval",
                        },
                        {
                            status: "ditolak",
                            info: "Usulan ditolak ketua program studi",
                            role: null,
                            action: null,
                        },
                        {
                            status: "diterima",
                            info: "Usulan diterima ketua program studi, menunggu konfirmasi admin ke tahap evaluasi proposal",
                            role: "admin",
                            action: "next",
                        },
                    ],
                }
            },
            {
                phase: "evaluasi_proposal",
                details: {
                    penelitian: [
                        {
                            status: "menunggu_admin",
                            info: "Menunggu admin memilih reviewer",
                            role: "admin",
                            action: null,
                        },
                        {
                            status: "menunggu_review",
                            info: "Reviewer telah dipilih, menunggu reviewer memberikan evaluasi",
                            role: null,
                            action: null,
                        },
                        {
                            status: "ditolak",
                            info: "Usulan ditolak reviewer",
                            role: null,
                            action: null,
                        },
                        {
                            status: "diterima",
                            info: "Usulan diterima reviewer, menunggu konfirmasi admin ke tahap penetapan",
                            role: "admin",
                            action: "next",
                        },
                    ],
                }
            },
            {
                phase: "penetapan",
                details: {
                    penelitian: [
                        {
                            status: "menunggu_admin",
                            info: "Menunggu admin menetapkan usulan penelitian",
                            role: "admin",
                            action: "next",
                        },
                        {
                            status: "menunggu_revisi",
                            info: "Menunggu pengusul melakukan revisi",
                            role: "lecturer",
                            action: "input",
                        },
                        {
                            status: "tersimpan",
                            info: "Pengusul telah mengunggah revisi, menunggu pengusul mengajukan revisi",
                            role: "lecturer",
                            action: "next",
                        },
                    ],
                }
            },
            {
                phase: "monev",
                details: {
                    penelitian: [
                        {
                            status: "menunggu_laporan",
                            info: "Menunggu pengusul mengunggah laporan",
                            role: "lecturer",
                            action: "input",
                        },
                        {
                            status: "tersimpan",
                            info: "Laporan terunggah, menunggu pengusul mengajukan laporan",
                            role: "lecturer",
                            action: "approval",
                        },
                        {
                            status: "menunggu_admin",
                            info: "Menunggu admin memilih reviewer",
                            role: "admin",
                            action: null,
                        },
                        {
                            status: "menunggu_review",
                            info: "Reviewer telah dipilih, menunggu reviewer memberikan evaluasi",
                            role: null,
                            action: null,
                        },
                        {
                            status: "ditolak",
                            info: "Usulan ditolak reviewer",
                            role: null,
                            action: null,
                        },
                        {
                            status: "diterima",
                            info: "Usulan diterima reviewer, menunggu konfirmasi admin ke tahap penetapan",
                            role: "admin",
                            action: "next",
                        },
                    ],
                }
            },
            {
                phase: "evaluasi_akhir",
                details: {
                    penelitian: [
                        {
                            status: "menunggu_laporan",
                            info: "Menunggu pengusul mengunggah laporan",
                            role: "lecturer",
                            action: "input",
                        },
                        {
                            status: "tersimpan",
                            info: "Laporan terunggah, menunggu pengusul mengajukan laporan",
                            role: "lecturer",
                            action: "approval",
                        },
                        {
                            status: "menunggu_admin",
                            info: "Menunggu admin memilih reviewer",
                            role: "admin",
                            action: null,
                        },
                        {
                            status: "menunggu_review",
                            info: "Reviewer telah dipilih, menunggu reviewer memberikan evaluasi",
                            role: null,
                            action: null,
                        },
                        {
                            status: "ditolak",
                            info: "Usulan ditolak reviewer",
                            role: null,
                            action: null,
                        },
                        {
                            status: "diterima",
                            info: "Usulan diterima reviewer, menunggu konfirmasi admin ke tahap penetapan",
                            role: "admin",
                            action: "next",
                        },
                    ],
                }
            },
            {
                phase: "penetapan_akhir",
                details: {
                    penelitian: [
                        {
                            status: "menunggu_admin",
                            info: "Menunggu konfirmasi admin untuk pengesahan",
                            role: "admin",
                            action: "approval",
                        },
                        {
                            status: "selesai",
                            info: "Usulan penelitian telah selesai",
                            role: null,
                            action: null,
                        },
                    ],
                }
            },
        ];
    }

    // Helper function untuk mendapatkan details berdasarkan phase dan type
    private getDetailsForPhaseAndType(phase: string, type: string = 'penelitian'): any[] {
        const phaseObj = this.plot.find((p) => p.phase === phase);
        if (!phaseObj) return [];

        return (phaseObj.details as any)[type] || phaseObj.details['penelitian'] || [];
    }

    // Method untuk mendapatkan fase dan status selanjutnya berdasarkan fase dan status saat ini
    public getNextPhaseAndStatus(
        currentPhase: string,
        currentStatus: string,
        type: string = 'penelitian'
    ): { nextPhase: string | null; nextStatus: string | null } {
        const phaseIndex = this.plot.findIndex((p) => p.phase === currentPhase);
        if (phaseIndex === -1) return { nextPhase: null, nextStatus: null };

        const currentPhaseDetails = this.getDetailsForPhaseAndType(currentPhase, type);
        const detailIndex = currentPhaseDetails.findIndex(
            (detail) => detail.status === currentStatus
        );
        if (detailIndex === -1) return { nextPhase: null, nextStatus: null };

        // Jika masih ada detail berikutnya di fase yang sama
        if (detailIndex < currentPhaseDetails.length - 1) {
            return {
                nextPhase: currentPhase,
                nextStatus: currentPhaseDetails[detailIndex + 1].status,
            };
        }

        // Jika detail terakhir dengan action "next", pindah ke fase berikutnya
        if (
            currentPhaseDetails[detailIndex].action === "next" &&
            phaseIndex < this.plot.length - 1
        ) {
            const nextPhaseObj = this.plot[phaseIndex + 1];
            const nextPhaseDetails = this.getDetailsForPhaseAndType(nextPhaseObj.phase, type);
            return {
                nextPhase: nextPhaseObj.phase,
                nextStatus: nextPhaseDetails[0]?.status || null,
            };
        }

        return { nextPhase: null, nextStatus: null };
    }

    // Method untuk mendapatkan action berdasarkan status, phase, role, dan type
    public getAction(status: string, phase: string, role: string, type: string = 'default'): Action {
        const details = this.getDetailsForPhaseAndType(phase, type);
        const detail = details.find(
            (d) => d.status === status && d.role === role
        );
        return detail ? detail.action : null;
    }

    // Method untuk mendapatkan info berdasarkan status, phase, role, dan type
    public getInfo(status: string, phase: string, role: string, type: string = 'default'): String {
        const details = this.getDetailsForPhaseAndType(phase, type);
        const detail = details.find(
            (d) => d.status === status && d.role === role
        );
        return detail ? detail.info : '';
    }
}
