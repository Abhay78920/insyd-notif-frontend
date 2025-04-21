import axios from 'axios';


const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export interface Activity {
  actorId: string;
  targetId: string;
  type: 'follow' | 'post' | 'comment';
}

export interface Notification {
  _id: string;
  message: string;
  link: string;
  createdAt: string;
  read: boolean;
}

export const postActivity = async (activity: Activity): Promise<any> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/activity`, activity);
    return response.data;
  } catch (error) {
    console.error('Error posting activity:', error);
    throw error;
  }
};

export const getNotifications = async (userId: string): Promise<Notification[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/notifications/${userId}`);
    return response.data.data; 
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
};

export const markNotificationAsRead = async (notificationId: string): Promise<void> => {
  try {
    await axios.patch(`${API_BASE_URL}/notifications/${notificationId}/read`);
  } catch (error) {
    console.error('Error marking notification as read:', error);
  }
};


