'use client'

import { useState } from 'react'
import { Calendar as BigCalendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar as DatePicker } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { InterviewEvent } from '@/helper/types'
const localizer = momentLocalizer(moment)



// Removed the hardcoded interviewEvents array

const EventComponent = ({ event }: { event: InterviewEvent }) => (
  <div className={cn(
    "p-2 rounded-md text-xs",
    event.status === 'Scheduled' && "bg-blue-500 text-white",
    event.status === 'Completed' && "bg-green-500 text-white",
    event.status === 'Cancelled' && "bg-red-500 text-white line-through"
  )}>
    <div className="font-semibold">{event.title}</div>
    <div className="opacity-80">{event.isInterviewOnline ? 'Online' : event.interviewLocation}</div>
  </div>
)

const Legend = () => (
  <div className="flex justify-center space-x-4 mb-4">
    <Badge variant="secondary" className="bg-blue-500 text-white">Scheduled</Badge>
    <Badge variant="secondary" className="bg-green-500 text-white">Completed</Badge>
    <Badge variant="secondary" className="bg-red-500 text-white">Cancelled</Badge>
  </div>
)

type InterviewCalendarProps = {
  interviews: InterviewEvent[]
}

export default function InterviewCalendar({ interviews }: InterviewCalendarProps) {
  const [view, setView] = useState(Views.MONTH)
  const [date, setDate] = useState(new Date())
  const [selectedEvent, setSelectedEvent] = useState<InterviewEvent | null>(null)

  const handleNavigate = (newDate: Date) => {
    setDate(newDate)
  }

  const handleSelectEvent = (event: InterviewEvent) => {
    setSelectedEvent(event)
  }

  return (
    <Card className="h-screen">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Button onClick={() => handleNavigate(moment(date).add(-1, view).toDate())}>Back</Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date.toLocaleDateString()}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <DatePicker
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => newDate && handleNavigate(newDate)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Button onClick={() => handleNavigate(moment(date).add(1, view).toDate())}>Next</Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Legend />
        <div className="h-[calc(100vh-12rem)]">
          <BigCalendar
            localizer={localizer}
            events={interviews}
            startAccessor="start"
            endAccessor="end"
            views={['month', 'week', 'day']}
            view={view as any}
            onView={(newView) => setView(newView)}
            date={date}
            onNavigate={handleNavigate}
            onSelectEvent={handleSelectEvent}
            components={{
              event: EventComponent,
            }}
          />
        </div>
      </CardContent>
      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedEvent?.title}</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            {selectedEvent && (
              <div className="space-y-2">
                <p><strong>Application:</strong> {selectedEvent.applicationName}</p>
                <p><strong>Date:</strong> {selectedEvent.start.toLocaleDateString()}</p>
                <p><strong>Time:</strong> {selectedEvent.start.toLocaleTimeString()} - {selectedEvent.end.toLocaleTimeString()}</p>
                <p><strong>Location:</strong> {selectedEvent.isInterviewOnline ? 'Online' : selectedEvent.interviewLocation}</p>
                <p><strong>Status:</strong> {selectedEvent.status}</p>
                <p>
        <strong>Applicant:</strong>{' '}
        {typeof selectedEvent.applicantId === 'string'
          ? selectedEvent.applicantId
          : `${selectedEvent.applicantId.firstName} ${selectedEvent.applicantId.lastName}`}
      </p>
              </div>
            )}
          </DialogDescription>
        </DialogContent>
      </Dialog>
      <style jsx global>{`
        .rbc-calendar {
          font-family: inherit;
        }
        .rbc-event {
          background-color: transparent !important;
          border: none !important;
        }
        .rbc-today {
          background-color: rgba(var(--primary), 0.1);
        }
        .rbc-selected {
          background-color: rgba(var(--primary), 0.2) !important;
        }
        .rbc-toolbar button {
          color: hsl(var(--primary));
        }
        .rbc-toolbar button:hover {
          background-color: rgba(var(--primary), 0.1);
        }
        .rbc-toolbar button.rbc-active {
          background-color: hsl(var(--primary));
          color: hsl(var(--primary-foreground));
        }
        .rbc-toolbar button.rbc-active:hover {
          background-color: hsl(var(--primary));
        }
        .rbc-month-view, .rbc-time-view, .rbc-agenda-view {
          border-color: hsl(var(--border));
        }
        .rbc-off-range-bg {
          background-color: hsl(var(--muted));
        }
        .rbc-header, .rbc-time-header-cell {
          border-bottom: 1px solid hsl(var(--border));
        }
        .rbc-time-content {
          border-top: 1px solid hsl(var(--border));
        }
        .rbc-day-bg + .rbc-day-bg,
        .rbc-month-row + .rbc-month-row {
          border-color: hsl(var(--border));
        }
      `}</style>
    </Card>
  )
}
