"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { LeadHistoryModal } from "./lead-history-modal";

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: string;
  created_at: string;
}

export function LeadsTable() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [error, setError] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await fetch("/api/leads");
        const data = await response.json();
        if (data.success) {
          setLeads(data.leads);
        } else {
          setError("Failed to fetch leads");
        }
      } catch (err) {
      console.log("error", err)
        setError("An error occurred while fetching leads");
      }
    };

    fetchLeads();
  }, []);

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <>
      <div className="rounded-md border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-heading">Name</TableHead>
              <TableHead className="font-heading">Email</TableHead>
              <TableHead className="font-heading">Phone</TableHead>
              <TableHead className="font-heading">Status</TableHead>
              <TableHead className="font-heading">Created At</TableHead>
              <TableHead className="font-heading">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell>{lead.name}</TableCell>
                <TableCell>{lead.email}</TableCell>
                <TableCell>{lead.phone}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      lead.status === "New"
                        ? "bg-primary/10 text-primary"
                        : lead.status === "Contacted"
                        ? "bg-secondary/20 text-secondary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {lead.status}
                  </span>
                </TableCell>
                <TableCell>
                  {new Date(lead.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedLead(lead)}
                  >
                    View History
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {selectedLead && (
        <LeadHistoryModal
          lead={selectedLead}
          isOpen={!!selectedLead}
          onClose={() => setSelectedLead(null)}
        />
      )}
    </>
  );
}
