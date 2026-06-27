"use client";

import { useEffect, useState, useCallback } from "react";
import { Switch } from "@/components/ui/switch";
import { getNotificationPreferences, updateNotificationPreferences, type NotificationPreferences } from "@/lib/api/users";
import { Bell, BellOff, Smartphone, AppWindow, Loader2 } from "lucide-react";

type SectionKey = keyof NotificationPreferences;

const sectionLabels: Record<SectionKey, { title: string; description: string }> = {
  email: { title: "Email Notifications", description: "Receive notifications via email" },
  push: { title: "Push Notifications", description: "Receive push notifications on your device" },
  inApp: { title: "In-App Notifications", description: "Receive notifications within the app" },
};

const sectionIcons: Record<SectionKey, React.ReactNode> = {
  email: <Bell className="size-5" />,
  push: <Smartphone className="size-5" />,
  inApp: <AppWindow className="size-5" />,
};

const fieldLabels: Record<string, string> = {
  transactionSuccess: "Transaction Success",
  transactionFailed: "Transaction Failed",
  loginAlert: "Login Alerts",
  marketingUpdates: "Marketing Updates",
  weeklyStatement: "Weekly Statement",
  priceAlerts: "Price Alerts",
  systemAnnouncements: "System Announcements",
};

export function NotificationPreferences() {
  const [prefs, setPrefs] = useState<NotificationPreferences | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingFields, setLoadingFields] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);
  const [pushPermission, setPushPermission] = useState<NotificationPermission | "unsupported">(
    typeof Notification !== "undefined" ? Notification.permission : "unsupported"
  );

  useEffect(() => {
    async function fetch() {
      try {
        setLoading(true);
        const data = await getNotificationPreferences();
        setPrefs(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load preferences");
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, []);

  const handleToggle = useCallback(async (section: SectionKey, field: string, value: boolean) => {
    if (!prefs) return;

    const key = `${section}.${field}`;
    setLoadingFields((prev) => new Set(prev).add(key));

    const updated = {
      ...prefs,
      [section]: { ...prefs[section], [field]: value },
    };

    setPrefs(updated);

    try {
      await updateNotificationPreferences({ [section]: { [field]: value } } as Partial<NotificationPreferences>);
    } catch {
      setPrefs(prefs);
    } finally {
      setLoadingFields((prev) => {
        const next = new Set(prev);
        next.delete(key);
        return next;
      });
    }
  }, [prefs]);

  const requestPushPermission = async () => {
    try {
      const result = await Notification.requestPermission();
      setPushPermission(result);
    } catch {
      setPushPermission("denied");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        {error}
      </div>
    );
  }

  if (!prefs) return null;

  return (
    <div className="space-y-8">
      {(Object.keys(sectionLabels) as SectionKey[]).map((section) => (
        <div key={section} className="rounded-2xl border border-border/50 bg-card">
          <div className="flex items-center gap-3 px-5 pt-6 pb-4 border-b border-border/50">
            <span className="text-muted-foreground">{sectionIcons[section]}</span>
            <div>
              <h3 className="font-semibold text-base text-foreground">{sectionLabels[section].title}</h3>
              <p className="text-xs text-muted-foreground">{sectionLabels[section].description}</p>
            </div>

            {section === "push" && pushPermission === "default" && (
              <button
                onClick={requestPushPermission}
                className="ml-auto text-xs font-medium text-[#F39A00] hover:underline"
              >
                Enable push notifications
              </button>
            )}
            {section === "push" && pushPermission === "denied" && (
              <span className="ml-auto text-xs text-red-500 flex items-center gap-1">
                <BellOff className="size-3" /> Push blocked in browser settings
              </span>
            )}
          </div>

          <div className="space-y-4 px-5 py-4">
            {Object.keys(prefs[section]).map((field) => {
              const key = `${section}.${field}`;
              const isLoading = loadingFields.has(key);

              return (
                <div key={field} className="flex items-center justify-between gap-4">
                  <label
                    htmlFor={`pref-${section}-${field}`}
                    className="text-sm text-foreground font-medium cursor-pointer flex-1"
                  >
                    {fieldLabels[field] ?? field}
                  </label>
                  <div className="relative">
                    {isLoading && (
                      <Loader2 className="size-4 animate-spin text-muted-foreground absolute -left-6 top-1/2 -translate-y-1/2" />
                    )}
                    <Switch
                      id={`pref-${section}-${field}`}
                      checked={prefs[section][field as keyof typeof prefs[typeof section]]}
                      onCheckedChange={(checked) => handleToggle(section, field, checked)}
                      disabled={isLoading || (section === "push" && pushPermission !== "granted")}
                      size="lg"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
