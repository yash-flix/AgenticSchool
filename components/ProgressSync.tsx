"use client";

import { useEffect } from "react";
import { syncProgress } from "@/lib/useProgress";

/**
 * Mounted once in the layout. Pulls server-side progress and merges it with
 * whatever this browser already had, then keeps writes flowing both ways.
 */
export default function ProgressSync() {
  useEffect(() => {
    void syncProgress();
  }, []);

  return null;
}
