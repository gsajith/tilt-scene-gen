import React from "react";

const DebugPanel = ({ scheme, variation, hue, colors }) => {
  return (
    <div
      style={{
        pointerEvents: "none",
        position: "absolute",
        top: 16,
        left: 0,
        zIndex: 15,
      }}>
      Scheme: {scheme.current}
      <br />
      Variation: {variation.current}
      <br />
      <div style={{ display: "flex", flexDirection: "row" }}>
        Hue:{" "}
        <div
          style={{
            width: 30,
            height: 30,
            backgroundColor: "hsl(" + hue.current + ", 100%, 50%)",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: 8,
          flexWrap: "wrap",
        }}>
        Colors:
        {colors.current.map((color, index) => (
          <div
            key={"color" + index}
            style={{
              width: 30,
              height: 30,
              backgroundColor: color.color,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default DebugPanel;
