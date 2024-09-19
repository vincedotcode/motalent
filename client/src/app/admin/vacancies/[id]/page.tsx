'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Calendar, DollarSign, MapPin, Users } from "lucide-react"
import { Bar, BarChart as RechartsBarChart, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getJobById } from "@/services/job"
import { Job } from "@/helper/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link"
import { ModeToggle } from "@/helper/darkmode"
import { ChevronLeft } from "lucide-react"

const funnelData = [
    { name: 'Total Applicants', value: 45 },
    { name: 'Qualified Applicants', value: 30 },
    { name: 'Interviews Scheduled', value: 15 },
    { name: 'Offers Extended', value: 5 },
    { name: 'Offers Accepted', value: 3 },
]

const sourcesData = [
    { name: 'Job Board', value: 20 },
    { name: 'Company Website', value: 15 },
    { name: 'Employee Referral', value: 5 },
    { name: 'LinkedIn', value: 3 },
    { name: 'Other', value: 2 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

export default function AdminVacancyView() {
    const { id } = useParams();
    const [vacancy, setVacancy] = useState<Job | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState("overview")


    useEffect(() => {
        if (id) {
            getJobById(id as string)
                .then((data) => {
                    setVacancy(data);
                    setLoading(false);
                })
                .catch((err) => {
                    setError(err.message);
                    setLoading(false);
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
                                        <TableHead>Email</TableHead>
                                        <TableHead>Phone</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {vacancy.applicants.map((applicant) => (
                                        <TableRow key={applicant._id}>
                                            <TableCell>
                                                <div className="flex items-center space-x-2">
                                                    <Avatar>
                                                        <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${applicant.firstName} ${applicant.lastName}`} />
                                                        <AvatarFallback>{applicant.firstName[0]}{applicant.lastName[0]}</AvatarFallback>
                                                    </Avatar>
                                                    <span>{applicant.firstName} {applicant.lastName}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>{applicant.email}</TableCell>
                                            <TableCell>{applicant.phoneNumber}</TableCell>
                                            <TableCell>
                                                <Button variant="outline" size="sm">View</Button>
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
                                    {funnelData.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell>{item.value}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                    <div className="grid gap-6 mt-6 md:grid-cols-2">
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
                        <Card>
                            <CardHeader>
                                <CardTitle>Application Sources</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                            data={sourcesData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="value"
                                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        >
                                            {sourcesData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>

            <div className="mt-8 flex justify-end space-x-4">
                <Button variant="outline">Edit Vacancy</Button>
                <Button variant="destructive">Close Vacancy</Button>
            </div>
        </div>
    )
}