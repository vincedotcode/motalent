'use client';

import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { FileText, User, Calendar, MapPin, Phone, Mail, Briefcase, GraduationCap, Star, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { JobApplication } from '@/helper/types';
import { getJobApplicationById } from '@/services/application';

interface ApplicationModalProps {
  applicationId: string;
}

export default function ApplicationModal({ applicationId }: ApplicationModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [score, setScore] = useState('');
  const [feedback, setFeedback] = useState('');
  const [interviewDate, setInterviewDate] = useState('');
  const [interviewTime, setInterviewTime] = useState('');
  const [interviewLocation, setInterviewLocation] = useState('');
  const [interviewNotes, setInterviewNotes] = useState('');
  const [application, setApplication] = useState<JobApplication | null>(null);
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch the job application when the modal is opened
  useEffect(() => {
    if (isOpen) {
      setLoading(true); // Set loading state to true while fetching
      getJobApplicationById(applicationId)
        .then((data) => {
          setApplication(data); // Store the fetched application data
          setStatus(data.currentStatus); // Set the current status from the application data
          setLoading(false); // Loading is finished
        })
        .catch((err) => {
          setError(err.message); // Set error if any occurs
          setLoading(false); // Stop loading on error
        });
    }
  }, [isOpen, applicationId]);

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    if (newStatus !== 'Interview Scheduled') {
      setInterviewDate('');
      setInterviewTime('');
      setInterviewLocation('');
      setInterviewNotes('');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Offer Extended':
      case 'Offer Negotiation':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'Rejected':
      case 'Withdrawn':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'Background Check':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  if (loading) return <p>Loading application...</p>;
  if (error) return <p>Error loading application: {error}</p>;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button onClick={() => setIsOpen(true)}>View Application</Button>
      <DialogContent className="sm:max-w-[90%] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {application ? `${application.resume?.personalInfo?.firstName} ${application.resume?.personalInfo?.lastName}'s Application` : 'Application'}
          </DialogTitle>
        </DialogHeader>
        {application && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            {/* Personal Information Card */}
            <Card className="col-span-1 lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center">
                  <User className="h-5 w-5 text-primary mr-2" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <p>{application.resume.personalInfo.email}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <p>{application.resume.personalInfo.phoneNumber}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <p>{application.resume.personalInfo.addressLine1}, {application.resume.personalInfo.country}</p>
                </div>
                <Separator />
                {/* Work Experience */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold flex items-center">
                    <Briefcase className="h-5 w-5 text-primary mr-2" />
                    Work Experience
                  </h3>
                  {application.resume.experience.map((exp, index) => (
                    <div className="pl-7" key={index}>
                      <h4 className="font-medium">{exp.jobTitle} at {exp.companyName}</h4>
                      <p className="text-sm text-muted-foreground">{exp.startDate.slice(0, 10)} - {exp.endDate.slice(0, 10)}</p>
                      <ul className="list-disc pl-5 mt-2 text-sm">
                        <li>{exp.responsibilities}</li>
                      </ul>
                    </div>
                  ))}
                </div>
                <Separator />
                {/* Education */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold flex items-center">
                    <GraduationCap className="h-5 w-5 text-primary mr-2" />
                    Education
                  </h3>
                  {application.resume.education.map((edu, index) => (
                    <div className="pl-7" key={index}>
                      <h4 className="font-medium">{edu.degree} in {edu.fieldOfStudy}</h4>
                      <p className="text-sm text-muted-foreground">{edu.institution}</p>
                      <p className="text-sm text-muted-foreground">{edu.startDate.slice(0, 10)} - {edu.endDate.slice(0, 10)}</p>
                    </div>
                  ))}
                </div>
                <Separator />
                {/* Skills */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold flex items-center">
                    <Star className="h-5 w-5 text-primary mr-2" />
                    Skills
                  </h3>
                  <div className="pl-7">
                    <p>{application.resume.skills.join(', ')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Application Status and Assessment Card */}
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Application Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Current Status */}
                <div className="space-y-2">
                  <Label htmlFor="status">Current Status</Label>
                  <Select onValueChange={handleStatusChange} value={status}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Submitted">Submitted</SelectItem>
                      <SelectItem value="Under Review">Under Review</SelectItem>
                      <SelectItem value="Interview Scheduled">Interview Scheduled</SelectItem>
                      <SelectItem value="Offer Extended">Offer Extended</SelectItem>
                      <SelectItem value="Rejected">Rejected</SelectItem>
                      <SelectItem value="Withdrawn">Withdrawn</SelectItem>
                      <SelectItem value="Background Check">Background Check</SelectItem>
                      <SelectItem value="Offer Negotiation">Offer Negotiation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Status Icon */}
                <div className="flex items-center space-x-2">
                  {getStatusIcon(status!)}
                  <span className="font-medium">{status}</span>
                </div>

                {/* Status History */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Status History</h3>
                  {application.statusHistory.map((history, index) => (
                    <div key={index} className="space-y-1">
                      <p>
                        <strong>{history.status}</strong> - {new Date(history.changedAt).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-muted-foreground">{history.comments}</p>
                      {history.assessment && (
                        <div className="ml-4 space-y-1">
                          <p className="text-sm">Assessment: {history.assessment.testName}</p>
                          <p className="text-sm">Score: {history.assessment.score}</p>
                          <p className="text-sm text-muted-foreground">{history.assessment.comments}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Assessment Section */}
                <div className="space-y-2">
                  <Label htmlFor="score">Assessment Score (Optional)</Label>
                  <Input
                    id="score"
                    type="number"
                    min="0"
                    max="100"
                    value={score}
                    onChange={(e) => setScore(e.target.value)}
                    placeholder="Enter score (0-100)"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="feedback">Feedback (Optional)</Label>
                  <Textarea
                    id="feedback"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows={3}
                    placeholder="Enter feedback"
                  />
                </div>

                {/* Interview Section */}
                {status === 'Interview Scheduled' && (
                  <>
                    <Separator />
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">Interview Details</h3>
                      <div className="space-y-2">
                        <Label htmlFor="interviewDate">Date</Label>
                        <Input
                          id="interviewDate"
                          type="date"
                          value={interviewDate}
                          onChange={(e) => setInterviewDate(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="interviewTime">Time</Label>
                        <Input
                          id="interviewTime"
                          type="time"
                          value={interviewTime}
                          onChange={(e) => setInterviewTime(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="interviewLocation">Location</Label>
                        <Input
                          id="interviewLocation"
                          value={interviewLocation}
                          onChange={(e) => setInterviewLocation(e.target.value)}
                          placeholder="Enter interview location"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="interviewNotes">Notes</Label>
                        <Textarea
                          id="interviewNotes"
                          value={interviewNotes}
                          onChange={(e) => setInterviewNotes(e.target.value)}
                          rows={3}
                          placeholder="Enter interview notes"
                        />
                      </div>
                    </div>
                  </>
                )}
                <Button className="w-full mt-4">Save Changes</Button>
              </CardContent>
            </Card>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
