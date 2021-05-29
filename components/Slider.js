import React, { useEffect, useState } from "react";
import styled from "styled-components";

const StyledSlider = styled.input`
  &:focus {
    outline: none;
  }
  width: 100%;

  /* Special styling for WebKit/Blink */
  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    border: 1px solid #000000;
    height: 16px;
    width: 16px;
    border-radius: 3px;
    background: #ffffff;
    cursor: pointer;
    margin-top: -2px; /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic */
    box-shadow: 2px 2px 0px #000000;
  }
  /* All the same stuff for Firefox */
  ::-moz-range-thumb {
    box-shadow: 2px 2px 0px #000000;
    border: 1px solid #000000;
    height: 16px;
    width: 16px;
    border-radius: 3px;
    background: #ffffff;
    cursor: pointer;
  }

  /* All the same stuff for IE */
  ::-ms-thumb {
    box-shadow: 2px 2px 0px #000000;
    border: 1px solid #000000;
    height: 16px;
    width: 16px;
    border-radius: 3px;
    background: #ffffff;
    cursor: pointer;
  }
  ::-webkit-slider-runnable-track {
    height: 16px;
    cursor: pointer;
    background: white;
    border-radius: 12px;
    border: 0.2px solid #010101;
  }
  :focus::-webkit-slider-runnable-track {
    background: #f3f3f3;
  }
  ::-moz-range-track {
    height: 16px;
    cursor: pointer;
    background: white;
    border-radius: 12px;
    border: 0.2px solid #010101;
  }
  :focus::-moz-range-track {
    background: #f3f3f3;
  }
  ::-moz-range-progress {
    height: 16px;
    cursor: pointer;
    background: black;
    border-radius: 12px;
    border: 0.2px solid #010101;
  }
  :focus::-moz-range-progress {
    background: #222;
  }
  ::-ms-track {
    height: 16px;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    border-width: 16px 0;
    color: transparent;
  }
  ::-ms-fill-lower {
    background: black;
    border: 0.2px solid #010101;
    border-radius: 12px;
  }
  :focus::-ms-fill-lower {
    background: #222;
  }
  ::-ms-fill-upper {
    background: white;
    border: 0.2px solid #010101;
    border-radius: 12px;
  }
  :focus::-ms-fill-upper {
    background: #f3f3f3;
  }
`;

const Slider = (props) => {
  const {
    min = 0,
    max = 100,
    step = 2,
    value = max / 2,
    onChange,
    ...others
  } = props;
  const [sliderValue, setSliderValue] = useState(value);

  useEffect(() => {
    setSliderValue(value);
  }, [value]);

  return (
    <div style={{ position: "relative" }}>
      <StyledSlider
        min={min}
        max={max}
        step={step}
        value={sliderValue}
        type="range"
        onChange={(e) => {
          setSliderValue(e.target.value);
          if (onChange) {
            onChange(e.target.value);
          }
        }}
        {...others}
      />
      <div
        style={{
          position: "absolute",
          top: 2,
          left: 2,
          width:
            "calc(" +
            ((sliderValue - min) / (max - min)) * 100 +
            "% - " +
            16 * ((sliderValue - min) / (max - min)) +
            "px)",
          height: 16,
          borderRadius: "16px 0px 0px 16px",
          background: "black",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

export default Slider;
