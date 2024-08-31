/* eslint-disable react/no-unescaped-entities */
import React from "react";
import ResumeCard from "@/components/resume/resume-card";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface ResumeSectionProps {
  resumes: any[];
  onCreateCV: () => void;
  templateId: string; 
}

const ResumeSection: React.FC<ResumeSectionProps> = ({ resumes, onCreateCV, templateId }) => {
  const router = useRouter();

  const handleCreateResume = () => {
    router.push(`/profile/resume/create?templateid=${templateId}`);
  };

  return (
    <div id="resume-section" className="container mx-auto p-4 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Your Resumes</h2>
      {resumes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resumes.map((resume) => (
            <ResumeCard key={resume._id} resume={resume} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-6 bg-gray-100 border border-gray-300 rounded-lg">
          <PlusIcon className="w-12 h-12 text-gray-500 mb-4" />
          <p className="text-lg font-medium text-gray-700 mb-4">
            You don't have any resumes yet.
          </p>
          <Button
            onClick={handleCreateResume}
            className="bg-primary text-white hover:bg-primary-dark"
          >
            Create Your CV with This Template Now
          </Button>
        </div>
      )}
    </div>
  );
};

export default ResumeSection;
