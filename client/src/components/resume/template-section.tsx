"use client";

import React, { useEffect, useState, useRef } from "react";
import ResumeTemplateCard from "@/components/resume/template-card";
import ResumeSection from "@/components/resume/resume-section";
import { getAllTemplates, Template } from "@/services/template";
import { getResumesByUserId, Resume } from "@/services/resume";
import { getUserData } from "@/hooks/useAuth";

const TemplateSection: React.FC = () => {
    const [templates, setTemplates] = useState<Template[]>([]);
    const [resumeCounts, setResumeCounts] = useState<Record<string, number>>({});
    const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
    const [filteredResumes, setFilteredResumes] = useState<Resume[] | null>(null); 
    const [allResumes, setAllResumes] = useState<Resume[]>([]);
    const resumeSectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchTemplatesAndResumes = async () => {
            try {
                const fetchedTemplates = await getAllTemplates();
                setTemplates(fetchedTemplates);

                const counts: Record<string, number> = {};
                const user = getUserData();

                if (user) {
                    const allUserResumes = await getResumesByUserId(user._id);
                    setAllResumes(allUserResumes);

                    fetchedTemplates.forEach(template => {
                        const templateResumes = allUserResumes.filter(resume => resume.template === template._id);
                        counts[template._id] = templateResumes.length;
                    });
                }

                setResumeCounts(counts);
            } catch (error) {
                console.error("Error fetching templates or resume counts", error);
            }
        };

        fetchTemplatesAndResumes();
    }, []);

    const handleSelectTemplate = (templateId: string) => {
        setSelectedTemplateId(templateId);

        // Filter resumes related to the selected template
        const filteredResumesForTemplate = allResumes.filter(resume => resume.template === templateId);
        setFilteredResumes(filteredResumesForTemplate.length > 0 ? filteredResumesForTemplate : null);

        if (resumeSectionRef.current) {
            resumeSectionRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Choose a Resume Template</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {templates.map((template) => (
                    <ResumeTemplateCard
                        key={template._id}
                        template={template}
                        cvCount={resumeCounts[template._id] || 0}
                        onSelect={handleSelectTemplate}
                        isSelected={template._id === selectedTemplateId}
                    />
                ))}
            </div>

            <div ref={resumeSectionRef}>
                {selectedTemplateId && (
                    <ResumeSection
                        resumes={filteredResumes || []}
                        templateId={selectedTemplateId}
                        onCreateCV={() => {
                            console.log("Create CV button clicked");
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default TemplateSection;
