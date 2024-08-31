import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { MapPinIcon, BriefcaseIcon, PaperclipIcon, MoreVerticalIcon, CalendarIcon } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { JobApplication } from "@/helper/types";

type ApplicationStatus = 'Submitted' | 'Under Review' | 'Interview Scheduled' | 'Offer Extended' | 'Rejected' | 'Withdrawn' | 'Background Check' | 'Offer Negotiation';

const statusOrder: ApplicationStatus[] = [
    'Submitted',
    'Under Review',
    'Interview Scheduled',
    'Background Check',
    'Offer Extended',
    'Offer Negotiation',
    'Rejected',
    'Withdrawn',
];

const getStatusColor = (status: ApplicationStatus) => {
    switch (status) {
        case 'Submitted':
        case 'Under Review':
            return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100';
        case 'Interview Scheduled':
        case 'Background Check':
            return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100';
        case 'Offer Extended':
        case 'Offer Negotiation':
            return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100';
        case 'Rejected':
        case 'Withdrawn':
            return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100';
        default:
            return 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100';
    }
};

const getStatusProgress = (status: ApplicationStatus) => {
    const index = statusOrder.indexOf(status);
    return ((index + 1) / statusOrder.length) * 100;
};

interface JobApplicationCardProps {
    application: JobApplication;
}

export default function JobApplicationCard({ application }: JobApplicationCardProps) {
    const { job, resume, currentStatus, submittedAt } = application;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Card className="w-full max-w-md overflow-hidden border border-[#3B82F6] dark:border-[#1D4ED8]">
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    <CardHeader className="space-y-1 bg-white dark:bg-gray-900">
                        <div className="flex items-start justify-between">
                            <div>
                                <motion.h3
                                    className="text-2xl font-bold text-[#00091D] dark:text-white"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    {job.title}
                                </motion.h3>
                                <motion.p
                                    className="text-sm text-[#3B82F6] dark:text-[#60A5FA]"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    {job.company.name}
                                </motion.p>
                            </div>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                <Badge variant="outline" className={`${getStatusColor(currentStatus as ApplicationStatus)} border-none`}>
                                    {currentStatus}
                                </Badge>
                            </motion.div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-6 bg-white dark:bg-gray-900">
                        <div className="flex items-center justify-between text-sm">
                            <motion.div
                                className="flex items-center space-x-2"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <MapPinIcon className="h-4 w-4 text-[#3B82F6] dark:text-[#60A5FA]" />
                                <span className="text-[#00091D] dark:text-white">{job.location}</span>
                            </motion.div>
                            <motion.div
                                className="flex items-center space-x-2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <BriefcaseIcon className="h-4 w-4 text-[#3B82F6] dark:text-[#60A5FA]" />
                                <span className="text-[#00091D] dark:text-white">{job.type}</span>
                            </motion.div>
                        </div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex items-center space-x-2 text-sm text-[#00091D] dark:text-white"
                        >
                            <CalendarIcon className="h-4 w-4 text-[#3B82F6] dark:text-[#60A5FA]" />
                            <span>Submitted on {new Date(submittedAt).toLocaleDateString()}</span>
                        </motion.div>
                        <motion.div
                            className="space-y-2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-[#00091D] dark:text-white">Application Status</span>
                            </div>
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 0.8, duration: 0.5 }}
                            >
                                <Progress
                                    value={getStatusProgress(currentStatus as ApplicationStatus)}
                                    className="h-2 w-full bg-blue-100 dark:bg-blue-900"
                                    style={{
                                        '--progress-indicator-color': '#3B82F6',
                                    } as React.CSSProperties}
                                />
                            </motion.div>
                        </motion.div>
                        <motion.div
                            className="flex items-center space-x-2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9 }}
                        >
                            <PaperclipIcon className="h-4 w-4 text-[#3B82F6] dark:text-[#60A5FA]" />
                            <span className="text-sm text-[#00091D] dark:text-white">Resume: {resume.resumeName}</span>
                        </motion.div>
                    </CardContent>
                    <CardFooter className="flex justify-between bg-white dark:bg-gray-900">
                        <Button className="w-full mr-2 bg-[#3B82F6] text-white hover:bg-[#2563EB] dark:bg-[#1D4ED8] dark:hover:bg-[#1E40AF] transition-all duration-300">
                            View Application
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon" className="hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-300 border-[#3B82F6] text-[#3B82F6] dark:border-[#60A5FA] dark:text-[#60A5FA]">
                                    <MoreVerticalIcon className="h-4 w-4" />
                                    <span className="sr-only">More options</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>Edit Application</DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600 dark:text-red-400">
                                    Withdraw Application
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </CardFooter>
                </motion.div>
            </Card>
        </motion.div>
    );
}