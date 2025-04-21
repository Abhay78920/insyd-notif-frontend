"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Activity, postActivity } from '@/lib/api';
import { Label } from '@/components/ui/label';
import { UserSelector } from '@/components/user-selector';
import { ActivityButtons } from '@/components/activity-buttons';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
import { Spinner } from '@/components/ui/spinner';

export default function TriggerPage() {
  const [actorId, setActorId] = useState<string>('user1');
  const [targetId, setTargetId] = useState<string>('user2');
  const [loading, setLoading] = useState<boolean>(false); // New loading state
  const { toast } = useToast();

  const handleActivityTrigger = async (type: Activity['type']) => {
    setLoading(true); // Set loading to true when the request starts
    try {
      const activity: Activity = {
        actorId,
        targetId,
        type
      };
      
      await postActivity(activity);
      
      toast({
        title: 'Activity Triggered',
        description: `${actorId} ${type} activity sent to ${targetId}`,
        variant: 'default',
      });
    } catch (error) {
      console.error('Failed to trigger activity:', error);
      toast({
        title: 'Error',
        description: 'Failed to trigger activity. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false); // Set loading to false when the request completes
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Trigger Activities</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>User Selection</CardTitle>
          <CardDescription>Select the actor and target users for the activity</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <UserSelector 
            actorId={actorId} 
            targetId={targetId} 
            onActorChange={setActorId} 
            onTargetChange={setTargetId} 
            disabled={loading} // Disable user selection while loading
          />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Activity Type</CardTitle>
          <CardDescription>Select an activity to trigger</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center">
              <Spinner /> {/* Show a spinner while loading */}
            </div>
          ) : (
            <ActivityButtons onTriggerActivity={handleActivityTrigger} disabled={loading} />
          )}
        </CardContent>
      </Card>
      
      <Toaster />
    </div>
  );
}