'use client';

import { IAlbumLayout } from "@/db";
import { motion } from "framer-motion";

interface AlbumLayoutSelectProps {
  layout: IAlbumLayout;
  onLayoutChange: (layout: IAlbumLayout) => void;
}

export function AlbumLayoutSelect({ layout, onLayoutChange }: AlbumLayoutSelectProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <button
        onClick={() => onLayoutChange("grid")}
        className={`p-4 rounded-lg border transition-all ${layout === "grid" ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"}`}
      >
        <motion.div
          animate={{
            scale: layout === "grid" ? 1.05 : 1,
            transition: { type: "spring", stiffness: 300, damping: 20 }
          }}
          className="aspect-video bg-muted rounded-md mb-2 overflow-hidden"
        >
          <div className="grid grid-cols-3 gap-1 p-1">
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: layout === "grid" ? 1 : 0.8,
                  opacity: layout === "grid" ? 1 : 0.5
                }}
                transition={{
                  duration: 0.3,
                  delay: i * 0.05,
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
                className="aspect-square bg-primary/20 rounded"
              />
            ))}
          </div>
        </motion.div>
        <p className="text-sm font-medium">Grid</p>
      </button>

      <button
        onClick={() => onLayoutChange("focused")}
        className={`p-4 rounded-lg border transition-all ${layout === "focused" ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"}`}
      >
        <motion.div
          animate={{
            scale: layout === "focused" ? 1.05 : 1,
            transition: { type: "spring", stiffness: 300, damping: 20 }
          }}
          className="aspect-video bg-muted rounded-md mb-2 overflow-hidden"
        >
          <div className="flex flex-col">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: layout === "focused" ? 0.9 : 0.6,
                opacity: layout === "focused" ? 1 : 0.5
              }}
              transition={{ duration: 0.3 }}
              className="aspect-video bg-primary/20 rounded mb-0.5"
            />
            <div className="grid grid-cols-3 gap-1">
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: layout === "focused" ? 0.9 : 0.7,
                    opacity: layout === "focused" ? 0.7 : 0.3,
                    y: layout === "focused" ? 0 : -10
                  }}
                  transition={{ 
                    duration: 0.3, 
                    delay: i * 0.05,
                    type: "spring",
                    stiffness: 300,
                    damping: 25
                  }}
                  className="aspect-square bg-primary/20 rounded hover:opacity-90 transition-opacity"
                />
              ))}
            </div>
          </div>
        </motion.div>
        <p className="text-sm font-medium">Focused</p>
      </button>

      <button
        onClick={() => onLayoutChange("masonry")}
        className={`p-4 rounded-lg border transition-all ${layout === "masonry" ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"}`}
      >
        <motion.div
          animate={{
            scale: layout === "masonry" ? 1.05 : 1,
            transition: { type: "spring", stiffness: 300, damping: 20 }
          }}
          className="aspect-video bg-muted rounded-md mb-2 overflow-hidden"
        >
          <div className="grid grid-cols-3 gap-1 p-1">
            {[
              "aspect-[3/4]",
              "aspect-square",
              "aspect-[4/3]",
              "aspect-square",
              "aspect-[3/4]",
              "aspect-[4/3]"
            ].map((aspect, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: layout === "masonry" ? 1 : 0.8,
                  opacity: layout === "masonry" ? 1 : 0.5
                }}
                transition={{
                  duration: 0.3,
                  delay: i * 0.08,
                  type: "spring",
                  stiffness: 200
                }}
                className={`${aspect} bg-primary/20 rounded`}
              />
            ))}
          </div>
        </motion.div>
        <p className="text-sm font-medium">Masonry</p>
      </button>
    </div>
  );
}