import { ReportCategories } from "@/app/types";

const reportCategoryMapper: {[key: ReportCategories]: string} = {
    "road_damage": "Dégât sur la voie",
    "signage": "Problème de signalisation",
    "lighting": "Éclairage défectueux",
    "obstruction": "Encombrement / Voie bloquée",
};

export { reportCategoryMapper };
