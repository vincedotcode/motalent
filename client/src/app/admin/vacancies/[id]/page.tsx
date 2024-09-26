'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Calendar, DollarSign, MapPin, Users } from "lucide-react"
import { Bar, BarChart as RechartsBarChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getJobById } from "@/services/job"
import { Job, JobApplication } from "@/helper/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link"
import { ModeToggle } from "@/helper/darkmode"
import { ChevronLeft } from "lucide-react"
import ApplicationModal from "@/components/admin-panel/vacancy/application-admin-modal"
import { getJobApplicationsByJobId } from "@/services/application"

const funnelData = [
    { name: 'Total Applicants', value: 45 },
    { name: 'Qualified Applicants', value: 30 },
    { name: 'Interviews Scheduled', value: 15 },
    { name: 'Offers Extended', value: 5 },
    { name: 'Offers Accepted', value: 3 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

export default function AdminVacancyView() {
    const { id } = useParams();
    const [vacancy, setVacancy] = useState<Job | null>(null);
    const [applications, setApplications] = useState<JobApplication[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState("overview")

    useEffect(() => {
        if (id) {
            // Fetch job details
            getJobById(id as string)
                .then((data) => {
                    setVacancy(data);
                    setLoading(false);
                })
                .catch((err) => {
                    setError(err.message);
                    setLoading(false);
                });

            // Fetch job applications
            getJobApplicationsByJobId(id as string)
                .then((data) => {
                    setApplications(data);
                })
                .catch((err) => {
                    setError(err.message);
                });
        }
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!vacancy) {
        return <p>No vacancy found</p>;
    }

    const { company } = vacancy;

    // Analytics
    const totalApplicants = applications.length;
    const interviewScheduled = applications.filter(app => app.currentStatus === "Interview Scheduled").length;
    const offersExtended = applications.filter(app => app.currentStatus === "Offer Extended").length;

    const experienceBreakdown = {
        "0-2 years": applications.filter(app => app.resume.experience.length <= 2).length,
        "3-5 years": applications.filter(app => app.resume.experience.length >= 3 && app.resume.experience.length <= 5).length,
        "6+ years": applications.filter(app => app.resume.experience.length > 5).length
    };

    const skillsCount: { [key: string]: number } = {};

    applications.forEach(app => {
        // Check if the resume and skills array exist
        if (app.resume?.skills) {
            app.resume.skills.forEach(skill => {
                // Increment the skill count or initialize it if not present
                skillsCount[skill] = (skillsCount[skill] || 0) + 1;
            });
        }
    });

    // Get the top 5 skills by sorting the entries
    const topSkills = Object.entries(skillsCount)
        .sort((a, b) => (b[1] as number) - (a[1] as number))
        .slice(0, 5)
        .map(([skill, count]) => ({ skill, count: count as number }));

    return (
        <div className="container mx-auto py-8">
            <div className="self-start my-5 flex justify-between w-full">
                <Link href="/admin/vacancies">
                    <Button className="mx-3">
                        <ChevronLeft className="mr-2 h-4 w-4" /> Back to Vacancies
                    </Button>
                </Link>
                <div className="mx-3">
                    <ModeToggle />
                </div>
            </div>
            {/* Company Banner and Logo */}
            {company && (
                <div className="relative">
                    <img src={company.bannerImage} alt={`${company.name} banner`} className="w-full h-48 object-cover" />
                    <div className="absolute bottom-[-40px] left-4">
                        <img src={company.logo} alt={`${company.name} logo`} className="h-24 w-24 object-cover rounded-full border-2 border-white" />
                    </div>
                </div>
            )}

            {/* Vacancy Title */}
            <h1 className="text-3xl font-bold mt-16 mb-6">{vacancy?.title || 'Untitled Vacancy'}</h1>

            {/* Tabs for Vacancy Details */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="applicants">Applicants</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="mt-6">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle>Total Applicants</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{vacancy?.applicationCount || 0}</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle>Salary Range</CardTitle>
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{vacancy?.offeredSalary || 'Not specified'}</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle>Location</CardTitle>
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{vacancy?.location || 'Not specified'}</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle>Closing Date</CardTitle>
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {vacancy?.closingDate ? new Date(vacancy.closingDate).toLocaleDateString() : 'Not specified'}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Company Info Card */}
                    {company && (
                        <Card className="mt-6">
                            <CardHeader>
                                <CardTitle>{company.name}</CardTitle>
                                <CardDescription>
                                    <a href={company.website} target="_blank" rel="noopener noreferrer" className="underline">
                                        {company.website}
                                    </a>
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>{company.description}</p>
                                <div className="mt-4">
                                    <p><strong>Address:</strong> {company.addressLine1}, {company.city}, {company.state}, {company.postalCode}, {company.country}</p>
                                    <p><strong>Phone:</strong> {company.phoneNumber}</p>
                                    <p><strong>Email:</strong> {company.email}</p>
                                    <p><strong>Industry:</strong> {company.industry}</p>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </TabsContent>

                {/* Job Details Tab */}
                <TabsContent value="details" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Job Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <dt className="font-medium">Category</dt>
                                    <dd>{vacancy?.category || 'Not specified'}</dd>
                                </div>
                                <div>
                                    <dt className="font-medium">Type</dt>
                                    <dd>{vacancy?.type || 'Not specified'}</dd>
                                </div>
                                <div>
                                    <dt className="font-medium">Experience Level</dt>
                                    <dd>{vacancy?.experienceLevel || 'Not specified'}</dd>
                                </div>
                                <div>
                                    <dt className="font-medium">Experience</dt>
                                    <dd>{vacancy?.experience || 'Not specified'}</dd>
                                </div>
                                <div>
                                    <dt className="font-medium">Remote Work Option</dt>
                                    <dd>{vacancy?.remoteWorkOption ? "Yes" : "No"}</dd>
                                </div>
                                <div>
                                    <dt className="font-medium">Expatriate Eligibility</dt>
                                    <dd>{vacancy?.expatriateEligibility ? "Yes" : "No"}</dd>
                                </div>
                                <div>
                                    <dt className="font-medium">Key Responsibilities</dt>
                                    <dd>{vacancy?.keyResponsibilities || 'Not specified'}</dd>
                                </div>
                                <div>
                                    <dt className="font-medium">Hard Skills</dt>
                                    <dd>{vacancy?.hardSkills?.join(", ") || 'Not specified'}</dd>
                                </div>
                                <div>
                                    <dt className="font-medium">Soft Skills</dt>
                                    <dd>{vacancy?.softSkills?.join(", ") || 'Not specified'}</dd>
                                </div>
                            </dl>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Applicants Tab */}
                <TabsContent value="applicants" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Applicants</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {vacancy.applicants.map((applicant) => (
                                        <TableRow key={applicant._id}>
                                            <TableCell>
                                                <div className="flex items-center space-x-2">
                                                    <Avatar>
                                                        <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${applicant.applicantName}`} />
                                                        <AvatarFallback>{applicant.applicantName[0]}</AvatarFallback>
                                                    </Avatar>
                                                    <span>{applicant.applicantName}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <ApplicationModal applicationId={applicant.applicationId} />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Analytics Tab */}
                <TabsContent value="analytics" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Vacancy Analytics</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Metric</TableHead>
                                        <TableHead>Value</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Total Applicants</TableCell>
                                        <TableCell>{totalApplicants}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Interviews Scheduled</TableCell>
                                        <TableCell>{interviewScheduled}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Offers Extended</TableCell>
                                        <TableCell>{offersExtended}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                    <div className="grid gap-6 mt-6 md:grid-cols-2">
                        {/* Application Funnel */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Application Funnel</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={300}>
                                    <RechartsBarChart data={funnelData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                        <XAxis type="number" />
                                        <YAxis dataKey="name" type="category" />
                                        <Tooltip />
                                        <Bar dataKey="value" fill="#8884d8" />
                                    </RechartsBarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        {/* Top Skills */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Top Skills</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Skill</TableHead>
                                            <TableHead>Count</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {topSkills.map(({ skill, count }) => (
                                            <TableRow key={skill}>
                                                <TableCell>{skill}</TableCell>
                                                <TableCell>{count}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
