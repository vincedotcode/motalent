'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Briefcase, Calendar, DollarSign, MapPin, Info } from 'lucide-react'
import { getMatchesByUserId } from '@/services/matching'
import { useRouter } from 'next/navigation'
import { Match } from '@/helper/types'

export default function JobMatchesSection() {
  const [jobMatches, setJobMatches] = useState<Match[]>([])
  const [selectedJob, setSelectedJob] = useState<Match | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchJobMatches = async () => {
      try {
        const matches = await getMatchesByUserId()
        setJobMatches(matches)
      } catch (error) {
        console.error('Error fetching job matches:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchJobMatches()
  }, [])

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const handleApply = () => {
    if (selectedJob) {
      router.push(`/jobs/apply/${selectedJob.matchedJob?._id}`)
    }
  }

  if (loading) {
    return <div>Loading job matches...</div>
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">Your Job Matches</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobMatches.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">No matches found.</p>
          ) : (
            jobMatches.map((match) => (
              <Card key={match.matchedJob?._id} className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {match.matchedJob?.title}
                  </CardTitle>
                  <CardDescription className="text-gray-500 dark:text-gray-400">
                    {match.matchedJob?.company.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <MapPin className="mr-2 h-4 w-4" />
                      {match.matchedJob?.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <DollarSign className="mr-2 h-4 w-4" />
                      {match.matchedJob?.offeredSalary}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <Calendar className="mr-2 h-4 w-4" />
                      Posted on {match.matchedJob && formatDate(match.matchedJob.createdAt)}
                    </div>
                  </div>
                  <Badge className="mt-4 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                    {match.matchScore}% Match
                  </Badge>
                </CardContent>
                <CardFooter>
                  <div className="flex flex-col space-y-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                          onClick={() => setSelectedJob(match)}
                        >
                          <Briefcase className="mr-2 h-4 w-4" />
                          View Job
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px] bg-background text-foreground">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-semibold">{selectedJob?.matchedJob?.title}</DialogTitle>
                        </DialogHeader>
                        <div className="mt-4">
                          <h3 className="text-lg font-semibold mb-2">{selectedJob?.matchedJob?.company.name}</h3>
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center text-sm">
                              <MapPin className="mr-2 h-4 w-4" />
                              {selectedJob?.matchedJob?.location}
                            </div>
                            <div className="flex items-center text-sm">
                              <DollarSign className="mr-2 h-4 w-4" />
                              {selectedJob?.matchedJob?.offeredSalary}
                            </div>
                            <div className="flex items-center text-sm">
                              <Calendar className="mr-2 h-4 w-4" />
                              Posted on {selectedJob?.matchedJob?.createdAt ? formatDate(selectedJob.matchedJob.createdAt) : 'N/A'}
                            </div>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300">{selectedJob?.explanation}</p>
                          <div className="mt-6">
                            <Badge className="mb-4 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                              {selectedJob?.matchScore}% Match
                            </Badge>
                            <Button onClick={handleApply} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                              Apply Now
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    {/* 'Wanna Know Why?' Button */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                          <Info className="mr-2 h-4 w-4" />
                          Wanna Know Why?
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px] bg-background text-foreground">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-semibold">Why is this a Match?</DialogTitle>
                        </DialogHeader>
                        <div className="mt-4">
                          <p className="text-gray-700 dark:text-gray-300">{match.explanation}</p>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}