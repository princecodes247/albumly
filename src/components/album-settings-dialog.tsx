'use client';

import { IAlbum, IAlbumVisibility } from "@/db";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface AlbumSettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  albumSettings: {
    title: string;
    description: string;
    visibility: IAlbumVisibility;
    password: string;
    hasWatermark: boolean;
    canDownload: boolean;
    hasPublicUpload: boolean;
  };
  onSettingsChange: (settings: any) => void;
}

export function AlbumSettingsDialog({ 
  open, 
  onOpenChange, 
  albumSettings, 
  onSettingsChange 
}: AlbumSettingsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Album Settings</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Album Title</Label>
            <Input
              id="title"
              value={albumSettings.title}
              onChange={(e) => onSettingsChange({ ...albumSettings, title: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={albumSettings.description}
              onChange={(e) => onSettingsChange({ ...albumSettings, description: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label>Privacy</Label>
            <Select
              value={albumSettings.visibility}
              onValueChange={(value) => onSettingsChange({ ...albumSettings, visibility: value as IAlbumVisibility })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select visibility setting" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="unlisted">Unlisted</SelectItem>
                <SelectItem value="private">Private</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {albumSettings.visibility === "private" && (
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={albumSettings.password}
                onChange={(e) => onSettingsChange({ ...albumSettings, password: e.target.value })}
              />
            </div>
          )}
          <div className="flex items-center justify-between">
            <Label htmlFor="watermark">Enable Watermark</Label>
            <Switch
              id="watermark"
              checked={albumSettings.hasWatermark}
              onCheckedChange={(checked) => onSettingsChange({ ...albumSettings, hasWatermark: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="download">Allow Downloads</Label>
            <Switch
              id="download"
              checked={albumSettings.canDownload}
              onCheckedChange={(checked) => onSettingsChange({ ...albumSettings, canDownload: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="hasPublicUpload">Allow Public Uploads</Label>
            <Switch
              id="hasPublicUpload"
              checked={albumSettings.hasPublicUpload}
              onCheckedChange={(checked) => onSettingsChange({ ...albumSettings, hasPublicUpload: checked })}
            />
          </div>
        </div>
        <Button onClick={() => onOpenChange(false)} className="w-full">Save Changes</Button>
      </DialogContent>
    </Dialog>
  );
}