"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Send } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: number;
  content: string;
  sender: "lead" | "agent";
  timestamp: string;
}

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: string;
}

interface LeadHistoryModalProps {
  lead: Lead;
  isOpen: boolean;
  onClose: () => void;
}

export function LeadHistoryModal({
  lead,
  isOpen,
  onClose,
}: LeadHistoryModalProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`/api/leads/${lead.id}/messages`);
        const data = await response.json();
        if (data.success) {
          setMessages(data.messages);
        } else {
          setError("Failed to fetch messages");
        }
      } catch (err) {
      console.log("error", err)
        setError("An error occurred while fetching messages");
      }
    };

    if (isOpen) {
      fetchMessages();
    }
  }, [lead.id, isOpen]);

  const handleSendMessage = async () => {
    try {
      const response = await fetch(`/api/leads/${lead.id}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: newMessage,
          sender: "agent",
        }),
      });
      const data = await response.json();
      if (data.success) {
        setMessages([...messages, data.message]);
        setNewMessage("");
        router.refresh(); // Refresh the page to update the leads table
      } else {
        setError("Failed to send message");
      }
    } catch (err) {
      console.log("error", err)
      setError("An error occurred while sending message");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Lead History</DialogTitle>
          <DialogDescription>
            View conversation history and send messages to the lead.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <h3 className="font-semibold">{lead.name}</h3>
          <p>{lead.email}</p>
          <p>{lead.phone}</p>
          <p>Status: {lead.status}</p>
        </div>
        <ScrollArea className="h-[300px] w-full rounded-md border p-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-2 p-2 rounded ${
                message.sender === "agent"
                  ? "bg-primary text-primary-foreground ml-auto"
                  : "bg-muted"
              } max-w-[80%] ${
                message.sender === "agent" ? "text-right" : "text-left"
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(message.timestamp).toLocaleString()}
              </p>
            </div>
          ))}
        </ScrollArea>
        <div className="mt-4 flex items-center space-x-2">
          <Input
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
          />
          <Button onClick={handleSendMessage} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </DialogContent>
    </Dialog>
  );
}
