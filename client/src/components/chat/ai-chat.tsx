"use client"

import React, { useState, useRef, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SendIcon } from 'lucide-react'

interface Message {
  sender: 'user' | 'ai'
  content: string
}

export default function AIRecruiterChat() {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'ai', content: "Hello! I'm motalent's ai bot, your AI Recruiter assistant. How can I help you with your job search today?" },
    { sender: 'user', content: "I'm looking for software engineering positions." },
    { sender: 'ai', content: "Great! I'd be happy to help you with that. Could you tell me a bit about your experience and skills in software engineering?" },
  ])
  const [input, setInput] = useState('')
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { sender: 'user', content: input }])
      setInput('')
      // Simulate AI response (in a real app, this would be an API call)
      setTimeout(() => {
        setMessages(prev => [...prev, { sender: 'ai', content: "Thank you for sharing that information. Based on your experience, I think you'd be a great fit for several positions I have available. Would you like me to tell you more about them?" }])
      }, 1000)
    }
  }

  return (
    <div className="flex items-center justify-center  bg-background p-4">
      <Card className="w-full max-w-4xl h-[calc(85vh-2rem)] flex flex-col">
        <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Sarah" />
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>Your Talent Bot</CardTitle>
              <p className="text-sm opacity-75">Always here to help</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-grow p-4 overflow-hidden">
          <ScrollArea className="h-full pr-4" ref={scrollAreaRef}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
        <CardFooter className="bg-muted p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSend()
            }}
            className="flex w-full space-x-2"
          >
            <Input
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit" size="icon">
              <SendIcon className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}