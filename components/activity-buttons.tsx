"use client";

import { Button } from "@/components/ui/button";
import { Activity } from "@/lib/api";
import { UserPlus, FileText, MessageSquare } from "lucide-react";

interface ActivityButtonsProps {
  onTriggerActivity: (type: Activity['type']) => void;
  disabled?: boolean;
}

export function ActivityButtons({ onTriggerActivity }: ActivityButtonsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Button 
        onClick={() => onTriggerActivity('follow')}
        className="h-auto py-6 flex flex-col items-center gap-2"
        variant="outline"
      >
        <UserPlus className="h-6 w-6" />
        <span>Follow</span>
      </Button>
      
      <Button 
        onClick={() => onTriggerActivity('post')}
        className="h-auto py-6 flex flex-col items-center gap-2"
        variant="outline"
      >
        <FileText className="h-6 w-6" />
        <span>Post Blog</span>
      </Button>
      
      <Button 
        onClick={() => onTriggerActivity('comment')}
        className="h-auto py-6 flex flex-col items-center gap-2"
        variant="outline"
      >
        <MessageSquare className="h-6 w-6" />
        <span>Comment on Blog</span>
      </Button>
    </div>
  );
}