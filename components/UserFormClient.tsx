"use client";
import { useState } from "react";
import ReportForm from "@/components/ReportForm";
import CategoriesSelection from "@/components/CategoriesSelection";

export default function UserFormClient() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    if (!selectedCategory) {
        return <CategoriesSelection onCategorySelect={setSelectedCategory} />;
    }

    return <ReportForm category={selectedCategory} />;
}