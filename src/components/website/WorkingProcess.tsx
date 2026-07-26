"use client";

import { useRef, useState } from "react";
import { ProcessHeader, ProcessMarquee, ProcessTimeline } from "@/components/process";

export default function WorkingProcess() {
  const containerRef = useRef(null);
  const [isMarqueeHovered, setIsMarqueeHovered] = useState(false);

  return (
    <section ref={containerRef} className="py-24 overflow-hidden bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <ProcessHeader />
        <ProcessTimeline />
      </div>
      <ProcessMarquee
        isHovered={isMarqueeHovered}
        onHoverChange={setIsMarqueeHovered}
      />
    </section>
  );
}
