import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

interface FilterComponentProps {
    filter: {
        jobType: string | null;
        workArrangement: string | null;
        experienceLevel: string | null;
        industry: string | null;
        sortByDate: string | null;
    };
    onFilterChange: (newFilter: Partial<FilterComponentProps["filter"]>) => void;
}

export default function FilterComponent({ filter, onFilterChange }: FilterComponentProps) {
    const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

    const filters = [
        { label: "Job Type", value: filter.jobType, setValue: (value: string | null) => onFilterChange({ jobType: value }), options: ["Full-time", "Part-time", "Contract", "Temporary", "Internship"] },
        { label: "Work Arrangement", value: filter.workArrangement, setValue: (value: string | null) => onFilterChange({ workArrangement: value }), options: ["On-site", "Remote", "Hybrid"] },
        { label: "Experience Level", value: filter.experienceLevel, setValue: (value: string | null) => onFilterChange({ experienceLevel: value }), options: ["Junior", "Middle", "Senior"] },
        { label: "Industry", value: filter.industry, setValue: (value: string | null) => onFilterChange({ industry: value }), options: ["Information Technology", "Finance", "Marketing", "Design", "Engineering"] },
        { label: "Sort By Date", value: filter.sortByDate, setValue: (value: string | null) => onFilterChange({ sortByDate: value }), options: ["Latest", "Oldest"] },
    ];

    const handleRemoveFilter = (key: keyof FilterComponentProps["filter"]) => {
        onFilterChange({ [key]: null });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Filter Jobs</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4 md:space-y-0 md:space-x-4">
                {/* Display Filters (Hidden on Mobile) */}
                <div className="hidden md:flex flex-wrap justify-center gap-4 my-3">
                    {filters.map((filterItem, index) => (
                        <Select key={index} value={filterItem.value ?? undefined} onValueChange={filterItem.setValue}>
                            <SelectTrigger className="w-36">
                                <SelectValue placeholder={`Select ${filterItem.label}`} />
                            </SelectTrigger>
                            <SelectContent>
                                {filterItem.options.map((option, i) => (
                                    <SelectItem key={i} value={option.toLowerCase()}>
                                        {capitalize(option)}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    ))}
                </div>

                {/* Mobile Modal Trigger */}
                <div className="md:hidden mt-4">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline">Filter Your Jobs</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Filters</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                {filters.map((filterItem, index) => (
                                    <div key={index} className="grid gap-2">
                                        <Label>{filterItem.label}</Label>
                                        <Select value={filterItem.value ?? undefined} onValueChange={filterItem.setValue}>
                                            <SelectTrigger>
                                                <SelectValue placeholder={`Select ${filterItem.label}`} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {filterItem.options.map((option, i) => (
                                                    <SelectItem key={i} value={option.toLowerCase()}>
                                                        {capitalize(option)}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                ))}
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Display Tags for Selected Filters */}
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                    {filters.map(
                        (filterItem, index) =>
                            filterItem.value && (
                                <Button
                                    key={index}
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleRemoveFilter(filterItem.label.toLowerCase().replace(" ", "") as keyof FilterComponentProps["filter"])}
                                    className="flex items-center"
                                >
                                    {filterItem.label}: {capitalize(filterItem.options.find(option => option.toLowerCase() === filterItem.value) || "")}
                                    <X className="ml-2 h-4 w-4" />
                                </Button>
                            )
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
