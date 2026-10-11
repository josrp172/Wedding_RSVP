import { ImageResponse } from "next/og";
import { wedding } from "@/content/wedding";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  const [a, b] = wedding.couple.monogram;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 64,
          background: "#fcf2f2",
          border: "3px solid #cf6f8c",
          color: "#3e1f2c",
          fontSize: 26,
          fontStyle: "italic",
          fontFamily: "serif",
        }}
      >
        {a}
        <span style={{ color: "#cf6f8c", fontSize: 18, margin: "0 1px" }}>&</span>
        {b}
      </div>
    ),
    size,
  );
}
