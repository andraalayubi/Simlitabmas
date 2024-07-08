interface ResearchGroup {
    id: number;
    name: string;
    leader: string;
    memberCount: number;
    researchCount: number;
}

interface Dosen {
    id: number;
    nama: string;
    nip: string;
    rg: string;
    prodi: string;
}

interface ProgramStudi {
    id: number;
    name: string;
    head: string;
    serviceCount: number;
}
