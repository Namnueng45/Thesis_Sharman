import React from "react";
import { ReactLenis } from "@studio-freight/react-lenis";

export default function SmoothScrolling({ children }) {
  return (
    <ReactLenis
      root
      options={{
        smoothWheel: true,
        lerp: 0.5, // ค่า interpolation สูงพอ → ดีเลย์น้อย
      }}
    >
      {children}
    </ReactLenis>
  );
}
