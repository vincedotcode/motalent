"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { sendContactForm } from "@/services/contact"; // Adjust the path as needed
import { useToast } from "@/components/ui/use-toast";

export default function Component() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await sendContactForm(formData);
      toast({
        title: "Message Sent",
        description: "Your message has been sent successfully.",
        variant: "default",
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an issue sending your message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto space-y-8 p-6">
      <CardHeader>
        <h1 className="text-3xl font-bold">Contact Us</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Want to get in touch? Fill out the form below to send us a message.
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Enter your email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
                id="subject"
                placeholder="Enter the subject of your message"
                value={formData.subject}
                onChange={handleChange}
              />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Enter your message"
              className="min-h-[100px]"
              value={formData.message}
              onChange={handleChange}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Sending..." : "Send message"}
        </Button>
      </CardFooter>
    </Card>
  );
}
