import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface Template {
    _id: string;
    name: string;
    description: string;
    thumbnail: string;
    templateFile: string;
    isDefault: boolean;
}

interface ResumeTemplateCardProps {
    template: Template;
    cvCount: number;
    onSelect: (templateId: string) => void;
    isSelected: boolean;
}

const ResumeTemplateCard: React.FC<ResumeTemplateCardProps> = ({ template, cvCount, onSelect, isSelected }) => {
    return (
        <Card
            onClick={() => onSelect(template._id)}
            className={`block w-full max-w-sm rounded-lg border-2 ${isSelected ? 'border-blue-500' : 'border-gray-300'} shadow-sm transition-all hover:shadow-md focus:outline-none cursor-pointer `}
        >
            <CardHeader className="relative h-40 overflow-hidden rounded-t-lg p-0">
                <img src={template.thumbnail} alt={template.name} className="object-cover w-full h-full" />
            </CardHeader>
            <CardContent className="p-4">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-semibold">{template.name}</CardTitle>

                    </div>
                    <div className="flex justify-end">
                        <Badge variant="default" >
                            {cvCount} CVs
                        </Badge>
                    </div>
                    <CardDescription className="text-sm text-muted-foreground">{template.description}</CardDescription>
                </div>
            </CardContent>
        </Card>
    );
};

export default ResumeTemplateCard;
