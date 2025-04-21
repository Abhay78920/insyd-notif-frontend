"use client";

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface UserSelectorProps {
  actorId: string;
  targetId: string;
  onActorChange: (userId: string) => void;
  onTargetChange: (userId: string) => void;
  mode?: 'trigger' | 'notifications';
}

// Mock user data
const users = [
  { id: 'user1', name: 'John Architect' },
  { id: 'user2', name: 'Sarah Designer' },
];

export function UserSelector({
  actorId,
  targetId,
  onActorChange,
  onTargetChange,
  mode = 'trigger',
}: UserSelectorProps) {
  return (
    <div className={mode === 'trigger' ? "grid grid-cols-1 md:grid-cols-2 gap-6" : ""}>
      {mode === 'trigger' && (
        <>
          <div className="space-y-2">
            <Label htmlFor="actor">Actor (Who is performing the action)</Label>
            <Select value={actorId} onValueChange={onActorChange}>
              <SelectTrigger id="actor" className="w-full">
                <SelectValue placeholder="Select actor" />
              </SelectTrigger>
              <SelectContent>
                {users.map(user => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.name} ({user.id})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="target">Target (Who receives the notification)</Label>
            <Select value={targetId} onValueChange={onTargetChange}>
              <SelectTrigger id="target" className="w-full">
                <SelectValue placeholder="Select target" />
              </SelectTrigger>
              <SelectContent>
                {users.map(user => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.name} ({user.id})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </>
      )}

      {mode === 'notifications' && (
        <div className="space-y-2">
          <Label htmlFor="user">Select User</Label>
          <Select value={actorId} onValueChange={onActorChange}>
            <SelectTrigger id="user" className="w-full">
              <SelectValue placeholder="Select user" />
            </SelectTrigger>
            <SelectContent>
              {users.map(user => (
                <SelectItem key={user.id} value={user.id}>
                  {user.name} ({user.id})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}
