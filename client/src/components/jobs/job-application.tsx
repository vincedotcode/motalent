import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { LoadingButton } from "@/components/ui/loading-button";
import { getResumesByUserId, Resume } from '@/services/resume';
import { getUserData } from '@/hooks/useAuth';
import { createJobApplication } from '@/services/application';
import AlertModal from "@/components/shared/alert";

interface JobApplicationProps {
    isOpen: boolean;
    onClose: () => void;
    jobId: string;
}

const JobApplication: React.FC<JobApplicationProps> = ({ jobId, isOpen, onClose }) => {
    const [resumes, setResumes] = useState<Resume[]>([]);
    const [selectedResume, setSelectedResume] = useState<string | undefined>(undefined);
    const [description, setDescription] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [alertOpen, setAlertOpen] = useState<boolean>(false);
    const [alertType, setAlertType] = useState<'success' | 'error'>('success');
    const [alertMessage, setAlertMessage] = useState<string>('');

    useEffect(() => {
        const fetchResumes = async () => {
            const user = getUserData();

            if (user) {
                try {
                    const fetchedResumes = await getResumesByUserId(user._id);
                    setResumes(fetchedResumes);
                } catch (error) {
                    console.error('Error fetching resumes:', error);
                }
            }
        };

        if (isOpen) {
            fetchResumes();
        }
    }, [isOpen]);
    const handleSubmit = async () => {
        if (!selectedResume) return;
    
        setLoading(true);
        try {
            const applicationData = {
                jobId: jobId,  
                resumeId: selectedResume,
                comments: description,
            };
            await createJobApplication(applicationData);
            setAlertType('success');
            setAlertMessage('Your application has been submitted successfully.');
            onClose(); 
        } catch (error) {
            setAlertType('error');
            if (error instanceof Error) {
                setAlertMessage(error.message);
            } else {
                setAlertMessage('Failed to submit your application.');
            }
        } finally {
            setLoading(false);
            setAlertOpen(true);
        }
    };
    
    return (
        <>
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="sm:max-w-[480px]">
                    <DialogHeader>
                        <DialogTitle>You are applying for the Senior Software Engineer role</DialogTitle>
                        <DialogDescription>Please select the resume you would like to use for this application.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="flex items-center flex-col">
                            <div className='w-full flex justify-items-start my-3'>
                                <Label htmlFor="resume">Resume</Label>
                            </div>
                            <Select value={selectedResume} onValueChange={setSelectedResume}>
                                <SelectTrigger id="resume">
                                    <SelectValue placeholder="Select resume" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {resumes.map((resume) => (
                                            <SelectItem key={resume._id} value={resume._id}>
                                                <div className="flex items-center justify-between">
                                                    <span>{resume.resumeName}</span>
                                                    <span className="text-muted-foreground text-sm mx-3">{new Date(resume.updatedAt).toLocaleDateString()}</span>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                placeholder="Enter a description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <div className='mx-2 my-2 w-full flex flex-col justify-between'>
                            <LoadingButton
                                onClick={handleSubmit}
                                loading={loading}
                                disabled={!selectedResume || loading}
                            >
                                Submit Application
                            </LoadingButton>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Alert Modal */}
            <AlertModal
                isOpen={alertOpen}
                onClose={() => setAlertOpen(false)}
                title={alertType === 'success' ? 'Success' : 'Error'}
                message={alertMessage}
                type={alertType}
            />
        </>
    );
};

export default JobApplication;
