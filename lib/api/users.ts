import { apiClient } from "../api-client";

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  isVerified?: boolean;
  walletAddress?: string;
}

export interface UpdateProfileDto {
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface NotificationPreferences {
  email: {
    transactionSuccess: boolean
    transactionFailed: boolean
    loginAlert: boolean
    marketingUpdates: boolean
    weeklyStatement: boolean
  }
  push: {
    transactionSuccess: boolean
    transactionFailed: boolean
    loginAlert: boolean
    priceAlerts: boolean
  }
  inApp: {
    transactionSuccess: boolean
    transactionFailed: boolean
    loginAlert: boolean
    systemAnnouncements: boolean
  }
}

export const getNotificationPreferences = (): Promise<NotificationPreferences> =>
  apiClient("/users/notification-preferences", { method: "GET", useProxy: false })

export const updateNotificationPreferences = (updates: Partial<NotificationPreferences>): Promise<NotificationPreferences> =>
  apiClient("/users/notification-preferences", { method: "PATCH", useProxy: false, body: JSON.stringify(updates) })

export async function deleteProfile (): Promise<void> {
  return apiClient("/users/profile", {
    method: "DELETE",
    useProxy: false,
  });
}

export async function getProfile (): Promise<UserProfile> {
  return apiClient("/users/profile", {
    method: "GET",
    useProxy: false,
  });
}

export async function updateProfile (data: UpdateProfileDto): Promise<UserProfile> {
  return apiClient("/users/profile", {
    method: "PATCH",
    useProxy: false,
    body: JSON.stringify(data),
  });
}
