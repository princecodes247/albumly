"use client"

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Mail, Lock, Loader2, Globe, Bell, Key, Share2, Phone } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IconBrandFacebook, IconBrandInstagram, IconBrandLinkedin, IconBrandTwitter } from "@tabler/icons-react";

export default function SettingsPage() {
  const { data: session } = authClient.useSession();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // General Settings
    username: session?.user?.name || "",
    displayName: "",
    email: session?.user?.email || "",
    phone: "",
    bio: "",
    avatar: "",
    language: "en",
    // Social Links
    twitter: "",
    instagram: "",
    facebook: "",
    linkedin: "",
    // Privacy & Security
    currentPassword: "",
    newPassword: "",
    accountVisibility: "public",
    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    commentModeration: "auto",
    // API & Integrations
    apiKey: "",
    webhookUrl: "",
    autoShare: {
      instagram: false,
      twitter: false,
      facebook: false,
      linkedin: false
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Implement update logic
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="privacy">Privacy & Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="api">API & Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card className="p-6">
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <div className="relative">
                    <Input
                      id="username"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      className="pl-10"
                    />
                    <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="displayName">Display Name</Label>
                  <div className="relative">
                    <Input
                      id="displayName"
                      value={formData.displayName}
                      onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                      className="pl-10"
                    />
                    <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="pl-10"
                    />
                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="pl-10"
                    />
                    <Phone className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label>Language</Label>
                <Select
                  value={formData.language}
                  onValueChange={(value) => setFormData({ ...formData, language: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label>Social Links</Label>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: 'twitter', icon: IconBrandTwitter },
                    { name: 'instagram', icon: IconBrandInstagram },
                    { name: 'facebook', icon: IconBrandFacebook },
                    { name: 'linkedin', icon: IconBrandLinkedin }
                  ].map((social) => (
                    <div key={social.name} className="relative">
                      <Input
                        value={formData[social.name]}
                        onChange={(e) => setFormData({ ...formData, [social.name]: e.target.value })}
                        className="pl-10"
                        placeholder={`${social.name.charAt(0).toUpperCase() + social.name.slice(1)} URL`}
                      />
                      <social.icon className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </div>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="privacy">
          <Card className="p-6">
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type="password"
                    value={formData.currentPassword}
                    onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                    className="pl-10"
                  />
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type="password"
                    value={formData.newPassword}
                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                    className="pl-10"
                  />
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Account Visibility</Label>
                <Select
                  value={formData.accountVisibility}
                  onValueChange={(value) => setFormData({ ...formData, accountVisibility: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select visibility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                    <SelectItem value="unlisted">Unlisted</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="p-6">
            <form className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive email notifications about activity</p>
                </div>
                <Switch
                  checked={formData.emailNotifications}
                  onCheckedChange={(checked) => setFormData({ ...formData, emailNotifications: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive push notifications about activity</p>
                </div>
                <Switch
                  checked={formData.pushNotifications}
                  onCheckedChange={(checked) => setFormData({ ...formData, pushNotifications: checked })}
                />
              </div>

              <div className="space-y-2">
                <Label>Comment Moderation</Label>
                <Select
                  value={formData.commentModeration}
                  onValueChange={(value) => setFormData({ ...formData, commentModeration: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select moderation type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">Auto-approve</SelectItem>
                    <SelectItem value="manual">Manual Review</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="api">
          <Card className="p-6">
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="apiKey">API Key</Label>
                <div className="relative">
                  <Input
                    id="apiKey"
                    value={formData.apiKey}
                    onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
                    className="pl-10"
                  />
                  <Key className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="webhookUrl">Webhook URL</Label>
                <div className="relative">
                  <Input
                    id="webhookUrl"
                    value={formData.webhookUrl}
                    onChange={(e) => setFormData({ ...formData, webhookUrl: e.target.value })}
                    className="pl-10"
                  />
                  <Globe className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-4">
                <Label>Auto-Share to Social Media</Label>
                {Object.entries(formData.autoShare).map(([platform, enabled]) => (
                  <div key={platform} className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="capitalize">{platform}</Label>
                      <p className="text-sm text-muted-foreground">Automatically share new albums</p>
                    </div>
                    <Switch
                      checked={enabled}
                      onCheckedChange={(checked) =>
                        setFormData({
                          ...formData,
                          autoShare: { ...formData.autoShare, [platform]: checked }
                        })
                      }
                    />
                  </div>
                ))}
              </div>
            </form>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6">
        <Button type="submit" onClick={handleSubmit} disabled={loading} className="w-full">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving Changes...
            </>
          ) : (
            'Save Changes'
          )}
        </Button>
      </div>
    </div>
  );
}