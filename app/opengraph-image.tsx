import { ImageResponse } from "next/og";
import { wedding } from "@/content/wedding";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Wedding invitation";

export default function OgImage() {
  const { partnerOne, partnerTwo } = wedding.couple;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(circle at 30% 20%, #f9d3dc 0%, #fcf2f2 50%, #f3dcd0 100%)",
          color: "#3e1f2c",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 36,
            border: "1.5px solid rgba(207,111,140,0.6)",
            display: "flex",
          }}
        />
        <div style={{ fontSize: 22, letterSpacing: 10, textTransform: "uppercase", color: "#7b5662" }}>
          Together with their families
        </div>
        <div style={{ display: "flex", alignItems: "center", fontSize: 120, marginTop: 28, fontStyle: "italic" }}>
          {partnerOne}
          <span style={{ color: "#cf6f8c", fontSize: 90, margin: "0 36px" }}>&</span>
          {partnerTwo}
        </div>
        <div style={{ fontSize: 30, marginTop: 30, letterSpacing: 6, color: "#9b3a5c" }}>
          {`${wedding.date.short} · ${wedding.date.city}`}
        </div>
      </div>
    ),
    size,
  );
}
