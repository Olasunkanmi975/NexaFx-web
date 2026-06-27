"use client";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AccountIcon, SecurityIcon, IdentityIcon } from "../icons";
import { AccountInfo } from "./account-info";
import { Security } from "./security";
import { Notification } from "./notification";
import { NotificationPreferences } from "./notification-preferences";
import { WebAuthnSection } from "./webauthn-section";
import { Bell } from "lucide-react";
import { ProfileOverview } from "../profile/profile-overview";
import { PersonalInfo } from "../profile/personal-info";
import { VerificationBanner } from "../profile/verification-banner";
import { FAQSection } from "../profile/faq-section";

export function TabsSettings() {
  const [isActiveTap, setIsActiveTap] = useState<undefined | string>();

  return (
    <Tabs
      defaultValue="account"
      onValueChange={(tap) => {
        setIsActiveTap(tap);
      }}
    >
      <TabsList variant="line" className="gap-1 sm:gap-2 mb-7.5 sm:mb-9">
        <TabsTrigger value="account">
          <AccountIcon
            color={isActiveTap === "account" ? "#000" : ""}
            className="size-3.5"
          />
          Account Info
        </TabsTrigger>
        <TabsTrigger value="security">
          <SecurityIcon
            color={isActiveTap === "security" ? "#000" : ""}
            className="size-3.5"
          />
          Security
        </TabsTrigger>
        <TabsTrigger value="notifications">
          <Bell
            color={isActiveTap === "notifications" ? "#000" : ""}
            className="size-3.5"
          />
          Notifications
        </TabsTrigger>
        <TabsTrigger value="push-notification">
          <SecurityIcon
            color={isActiveTap === "push-notification" ? "#000" : ""}
            className="size-3.5"
          />
          Push Notifications
        </TabsTrigger>
        <TabsTrigger value="identity">
          <IdentityIcon
            color={isActiveTap === "identity" ? "#000" : ""}
            className="size-3.5"
          />
          Identity Verification
        </TabsTrigger>
      </TabsList>

      <TabsContent value="account">
        <AccountInfo />
      </TabsContent>
      <TabsContent value="security">
        <Security />
        <div className="mt-8 rounded-2xl border border-border/50 bg-card p-5">
          <WebAuthnSection />
        </div>
      </TabsContent>
      <TabsContent value="notifications">
        <NotificationPreferences />
      </TabsContent>
      <TabsContent value="push-notification">
        <Notification />
      </TabsContent>
      <TabsContent value="identity">
        {" "}
        {/* Identity Verification Header */}
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6 items-start">
          {/* Left Column: Profile Card */}
          <div className="h-full">
            <ProfileOverview />
          </div>

          {/* Right Column: Content Stack */}
          <div className="space-y-6">
            <PersonalInfo />
            <VerificationBanner />
          </div>
        </div>
        {/* Full Width FAQ Section */}
        <div className="w-full">
          <FAQSection />
        </div>
      </TabsContent>
    </Tabs>
  );
}
