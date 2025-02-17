'use client';

import { IAlbum, IAlbumVisibility } from "@/db";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { AlbumLayoutSelect } from "./album-layout-select";
import { EditAlbumInput } from "@/actions/album.actions";

interface AlbumSettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  albumSettings: Partial<EditAlbumInput>
  onSettingsChange: (settings: any) => void;
  handleChange: () => Promise<void>;
}

export function AlbumSettingsDialog({ 
  open, 
  onOpenChange, 
  albumSettings, 
  onSettingsChange,
  handleChange
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
                value={albumSettings?.password ?? ""}
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
            <Label htmlFor="allowPublicUpload">Allow Public Uploads</Label>
            <Switch
              id="allowPublicUpload"
              checked={albumSettings.allowPublicUpload}
              onCheckedChange={(checked) => onSettingsChange({ ...albumSettings, allowPublicUpload: checked })}
            />
          </div>
          <div className="space-y-4">
            <Label>Layout Settings</Label>
            <AlbumLayoutSelect
              layout={albumSettings?.layout ?? "grid"}
              onLayoutChange={(layout) => onSettingsChange({ ...albumSettings, layout })}
            />

            {albumSettings.layout === "grid" && (
              <div className="grid gap-2">
                <Label htmlFor="gridColumns">Grid Columns</Label>
                <Select
                  value={albumSettings?.gridColumns?.toString()}
                  onValueChange={(value) => onSettingsChange({ ...albumSettings, gridColumns: parseInt(value) })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select number of columns" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2 Columns</SelectItem>
                    <SelectItem value="3">3 Columns</SelectItem>
                    <SelectItem value="4">4 Columns</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </div>
        <Button onClick={async () => {
            await handleChange()
            onOpenChange(false)
            }} className="w-full">Save Changes</Button>
      </DialogContent>
    </Dialog>
  );
}