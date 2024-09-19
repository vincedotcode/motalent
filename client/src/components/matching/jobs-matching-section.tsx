'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Briefcase, FileText } from 'lucide-react';
import { getResumesByUserId, Resume } from '@/services/resume';
import { getUserData } from '@/hooks/useAuth';
import { createMatch } from '@/services/matching';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import AlertModal from '@/components/shared/alert'; // Importing AlertModal for showing alerts

interface MatchResult {
  matchedJob?: { id: string; title: string };
  score: number | null;
  explanation: string;
}

export default function JobMatchingSection() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [selectedResume, setSelectedResume] = useState<string | undefined>(undefined);
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isResultDialogOpen, setIsResultDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false); // Alert state
  const [resumeAlertOpen, setResumeAlertOpen] = useState(false); // Resume alert state
  const router = useRouter();

  const [alertProps, setAlertProps] = useState<{
    title: string;
    message: string;
    type: 'success' | 'error';
  }>({
    title: '',
    message: '',
    type: 'success',
  });

  const user = getUserData(); // Fetch user data

  const fetchResumes = async () => {
    if (user) {
      try {
        const fetchedResumes = await getResumesByUserId(user._id);
        setResumes(fetchedResumes);
      
      } catch (error) {
        console.error('Error fetching resumes:', error);
      }
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const handleFindMatch = () => {
    if (!user) {
      setAlertProps({
        title: 'Not Logged In',
        message: 'You must be logged in to perform this action.',
        type: 'error',
      });
      setIsAlertOpen(true);
    } else if (resumes.length === 0) {
      setResumeAlertOpen(true);
    } else {
      setIsDialogOpen(true);
    }
  };

  const triggerConfetti = () => {
    const end = Date.now() + 3 * 1000;
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];
    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  };

  const handleSubmit = async () => {
    if (!selectedResume) return;
    setLoading(true);
    try {
      const matchData = { resumeId: selectedResume };
      const match = await createMatch(matchData);

      if (match.matchedJobs && match.matchedJobs.length > 0) {
        const firstMatch = match.matchedJobs[0].match;
        setMatchResult({
          matchedJob: { id: firstMatch.jobId, title: match.matchedJobs[0].job.title },
          score: firstMatch.matchScore,
          explanation: firstMatch.explanation,
        });
        triggerConfetti();
      } else {
        setMatchResult({
          score: null,
          explanation: match.explanation,
        });
      }

      setIsDialogOpen(false);
      setIsResultDialogOpen(true);
    } catch (error) {
      console.error('Error creating match:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewMatches = () => {
    setIsResultDialogOpen(false);
    router.push('/profile/matches');
  };

  const handleResultDialogClose = () => {
    setIsResultDialogOpen(false);
    setMatchResult(null);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleResumeAlertClose = () => {
    setResumeAlertOpen(false);
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900 dark:text-gray-100">
              Find Your Perfect Job Match
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Let our AI-powered system match you with the ideal job opportunity. Upload your resume and get started!
            </p>
          </div>
          <Button onClick={handleFindMatch} size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Briefcase className="mr-2 h-4 w-4" />
            Find Match Now
          </Button>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
          <DialogContent className="sm:max-w-[425px] bg-background text-foreground">
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold">Find Your Job Match</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex items-center flex-col">
                <div className='w-full flex justify-items-start my-3'>
                  <Label htmlFor="resume" className="text-sm font-medium text-gray-700 dark:text-gray-300">Resume</Label>
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
            </div>
            <Button
              onClick={handleSubmit}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={loading}
            >
              <FileText className="mr-2 h-4 w-4" />
              {loading ? 'Loading...' : 'Submit'}
            </Button>
          </DialogContent>
        </Dialog>

        <Dialog open={isResultDialogOpen} onOpenChange={handleResultDialogClose}>
          <DialogContent className="sm:max-w-[425px] bg-background text-foreground">
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold">
                {matchResult?.matchedJob ? 'We Found a Match for You!' : 'No Match Found'}
              </DialogTitle>
            </DialogHeader>
            <div className="py-4">
              {matchResult?.matchedJob ? (
                <div className="mb-4">
                  <strong>Matched Job:</strong> {matchResult.matchedJob.title}
                  <br />
                  <strong>Match Score:</strong> {matchResult.score}%
                  <br />
                  <strong>Explanation:</strong> {matchResult.explanation}
                  <br />
                  <Button onClick={handleViewMatches} className="mt-4 bg-primary text-primary-foreground">
                    View Matches
                  </Button>
                </div>
              ) : (
                <div>
                  <strong>Explanation:</strong> {matchResult?.explanation}
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Alert for user not logged in */}
        <AlertModal
          isOpen={isAlertOpen}
          onClose={() => setIsAlertOpen(false)}
          title={alertProps.title}
          message={alertProps.message}
          type={alertProps.type}
        />

        {/* Dialog for no resume */}
        <Dialog open={resumeAlertOpen} onOpenChange={handleResumeAlertClose}>
          <DialogContent className="sm:max-w-[425px] bg-background text-foreground">
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold">No Resume Found</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p>You need to have a resume in order to find job matches. A resume helps us understand your skills and experience to provide better job recommendations.</p>
              <Button onClick={() => router.push('/profile/resume')} className="mt-4 bg-primary text-primary-foreground">
                Create Resume
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}