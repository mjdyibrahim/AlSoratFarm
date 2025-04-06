import * as React from "react";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    pannellum: any;
  }
}

interface HotSpot {
  pitch: number;
  yaw: number;
  text: string;
}

interface PannellumViewerProps {
  image: string;
  pitch?: number;
  yaw?: number;
  hfov?: number;
  hotSpots?: HotSpot[];
  onLoad?: () => void;
  onError?: () => void;
}

export function PannellumViewer({
  image,
  pitch = 0,
  yaw = 0,
  hfov = 110,
  hotSpots = [],
  onLoad,
  onError,
}: PannellumViewerProps) {
  const viewerRef = useRef<HTMLDivElement>(null);
  const viewer = useRef<any>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const linkRef = useRef<HTMLLinkElement | null>(null);

  useEffect(() => {
    if (!viewerRef.current) return;

    const script = document.createElement("script");
    scriptRef.current = script;
    script.src = "https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js";
    script.async = true;

    const link = document.createElement("link");
    linkRef.current = link;
    link.rel = "stylesheet";
    link.href = "https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css";

    script.onload = () => {
      if (window.pannellum && viewerRef.current) {
        try {
          viewer.current = window.pannellum.viewer(viewerRef.current, {
            type: "equirectangular",
            panorama: image,
            pitch: pitch,
            yaw: yaw,
            hfov: hfov,
            autoLoad: true,
            hotSpots: hotSpots.map((spot) => ({
              ...spot,
              type: "info",
            })),
          });

          if (onLoad) {
            onLoad();
          }
        } catch (error) {
          console.error("Error initializing Pannellum viewer:", error);
          if (onError) {
            onError();
          }
        }
      }
    };

    script.onerror = () => {
      console.error("Failed to load Pannellum script");
      if (onError) {
        onError();
      }
    };

    document.head.appendChild(link);
    document.head.appendChild(script);

    return () => {
      if (viewer.current) {
        viewer.current.destroy();
      }
      if (scriptRef.current && document.head.contains(scriptRef.current)) {
        document.head.removeChild(scriptRef.current);
      }
      if (linkRef.current && document.head.contains(linkRef.current)) {
        document.head.removeChild(linkRef.current);
      }
    };
  }, [image, pitch, yaw, hfov, hotSpots, onLoad, onError]);

  return <div ref={viewerRef} style={{ width: "100%", height: "100%" }} />;
}