"use client";

import React, { useState } from 'react';
import { LoadingButton } from "@/components/ui/loading-button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { createFeatureSuggestion } from '@/services/feature';
import { Button } from "@/components/ui/button";
import { getUserData } from '@/hooks/useAuth';

export function FeatureSuggestionDialog() {
    const [loading, setLoading] = useState(false);
    const [featureTitle, setFeatureTitle] = useState('');
    const [featureDescription, setFeatureDescription] = useState('');
    const { toast } = useToast();
    const userData = getUserData();
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        if (!userData) {
            toast({
                title: "Authentication Required",
                description: "You must be logged in to request features.",
                variant: "destructive",
            });
        } else {
            setOpen(true);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await createFeatureSuggestion({ featureTitle, featureDescription });
            toast({
                title: "Success!",
                description: "Feature suggestion submitted successfully!",
                variant: "default",
            });
            setFeatureTitle('');
            setFeatureDescription('');
            setOpen(false); // Close the modal on success
        } catch (error) {
            toast({
                title: "Error",
                description: "There was an error submitting your suggestion.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size={"lg"} variant={"outline"} onClick={handleOpen}>
                    Request Features
                </Button>
            </DialogTrigger>
            {userData && (
                <DialogContent className="sm:max-w-[425px] p-6">
                    <DialogHeader>
                        <DialogTitle>Request a Feature</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="title" className="text-right">
                                    Title
                                </Label>
                                <Input
                                    id="title"
                                    value={featureTitle}
                                    onChange={(e) => setFeatureTitle(e.target.value)}
                                    className="col-span-3"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="description" className="text-right">
                                    Description
                                </Label>
                                <Input
                                    id="description"
                                    value={featureDescription}
                                    onChange={(e) => setFeatureDescription(e.target.value)}
                                    className="col-span-3"
                                    required
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <LoadingButton type="submit" loading={loading}>
                                Submit
                            </LoadingButton>
                        </DialogFooter>
                    </form>
                </DialogContent>
            )}
        </Dialog>
    );
}
