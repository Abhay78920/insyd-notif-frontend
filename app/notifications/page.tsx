"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getNotifications, markNotificationAsRead, Notification } from '@/lib/api';
import { NotificationList } from '@/components/notification-list';
import { UserSelector } from '@/components/user-selector';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';

export default function NotificationsPage() {
  const [userId, setUserId] = useState<string>('user2');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');
  // Function to fetch notifications
  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const data = await getNotifications(userId);
      setNotifications(data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch notifications when the component mounts or when userId changes
  useEffect(() => {
    fetchNotifications();
  }, [userId]);

  // Split notifications by read status
  const unreadNotifications = notifications.filter(notification => !notification.read);
  const readNotifications = notifications.filter(notification => notification.read);

  useEffect(() => {
    const markUnreadAsRead = async () => {
      if (activeTab === 'unread' && unreadNotifications.length > 0) {
        console.log('Marking unread notifications as read', unreadNotifications);
        await Promise.all(unreadNotifications.map(n => markNotificationAsRead(n._id)));
        fetchNotifications();
      }
    };

    markUnreadAsRead();
  }, [activeTab]);

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Notifications</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>User Selection</CardTitle>
          <CardDescription>Select user to view notifications for</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="max-w-xs">
            <UserSelector 
              actorId={userId} 
              targetId={userId} 
              onActorChange={setUserId} 
              onTargetChange={() => {}} 
              mode="notifications" 
            />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" onValueChange={(val) => setActiveTab(val as 'all' | 'unread')}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">Unread ({unreadNotifications.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center p-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <NotificationList notifications={notifications} />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="unread">
          <Card>
            <CardHeader>
              <CardTitle>Unread Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center p-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <NotificationList notifications={unreadNotifications} />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}