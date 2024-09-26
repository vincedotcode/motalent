"use client"

import React, { useState, useRef, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SendIcon } from 'lucide-react'
import { sendChatQuery } from '@/services/chat' // Import the chat service
import { ChatRequest, ChatResponse } from '@/helper/types'
import { Skeleton } from "@/components/ui/skeleton"
import { useRouter } from 'next/navigation'
import { getUserData } from '@/hooks/useAuth' // Import your useAuth hook

interface Message {
  sender: 'user' | 'ai'
  content: string
}

// Helper function to format AI response with bold text for specific keywords and clean line breaks
const formatAIResponse = (content: string) => {
  // Use regular expressions to find and replace bold markers (**) with strong tags
  const formattedContent = content
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Replace stars with <strong> for bold
    .split('\n') // Split by newlines for separate paragraphs or bullet points
    .filter((line) => line.trim() !== '');

  return (
    <div>
      {formattedContent.map((line, index) => (
        <p key={index} dangerouslySetInnerHTML={{ __html: line }} className="mb-2"></p>
      ))}
    </div>
  );
};

export default function AIRecruiterChat() {
  const router = useRouter();
  const user = getUserData(); // Get user data from useAuth hook

  // Redirect to login page if the user is not logged in
  if (!user) {
    return (
      <div className="flex items-center justify-center bg-background p-4 h-[calc(100vh-2rem)]">
        <Card className="w-full max-w-sm text-center">
          <CardHeader>
            <CardTitle>Not Logged In</CardTitle>
          </CardHeader>
          <CardContent>
            <p>You must be logged in to access this page.</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => router.push('/auth/login')}>Go to Login</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // If logged in, show the AI recruiter chat
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'ai', content: "Hello! I'm MoTalent's AI bot, your AI Recruiter assistant. How can I help you with your job search today?" },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async () => {
    if (input.trim()) {
      // Add user message to the conversation
      setMessages([...messages, { sender: 'user', content: input }])

      // Reset the input field
      setInput('')

      // Set loading state
      setLoading(true)

      // Prepare the request payload
      const chatRequest: ChatRequest = { query: input }

      try {
        // Call the chat service to get the AI response
        const aiResponse: ChatResponse = await sendChatQuery(chatRequest)

        // Add AI response to the conversation
        setMessages((prev) => [
          ...prev,
          { sender: 'ai', content: aiResponse.content },
        ])
      } catch (error) {
        console.error("Error in chat service:", error)
        setMessages((prev) => [
          ...prev,
          { sender: 'ai', content: "Sorry, something went wrong. Please try again." },
        ])
      } finally {
        // Reset loading state
        setLoading(false)
      }
    }
  }

  return (
    <div className="flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-4xl h-[calc(85vh-2rem)] flex flex-col">
        <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="AI Bot" />
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
                  {message.sender === 'ai'
                    ? formatAIResponse(message.content) // Format AI responses with bold text
                    : message.content}
                </div>
              </div>
            ))}
            {loading && (
              // Show skeleton loader while waiting for AI response
              <div className="flex justify-start mb-4">
                <div className="max-w-[80%] p-3 rounded-lg bg-secondary text-secondary-foreground">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px] mt-2" />
                </div>
              </div>
            )}
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
              disabled={loading} // Disable input while waiting for AI response
            />
            <Button type="submit" size="icon" disabled={loading}>
              <SendIcon className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}
