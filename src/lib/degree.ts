export function getDegreeType(degree: string): string {
    switch (degree) {
        case "S1":
            return "Bachelor's Degree";
        case "S2":
            return "Master's Degree";
        case "S3":
            return "Doctorate Degree";
        case "D3":
            return "Associate's Degree / Diploma";
        case "D4":
            return "Bachelor's Degree (Vokasi)";
        default:
            return "Unknown Degree";
    }
}