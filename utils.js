import { useEffect } from "react";
import { isMobile } from "react-device-detect";
import * as htmlToImage from "html-to-image";

export const useAbsoluteViewportHeight = () => {
  useEffect(() => {
    if (isMobile) {
      // https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
      // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
      let vh = window.innerHeight * 0.01;
      // Then we set the value in the --vh custom property to the root of the document
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }
  }, [isMobile]);
};

export const renderImage = (ref) => {
  console.log(ref);
  htmlToImage
    .toPng(ref, {
      // width: 800,
      // height: 800,
      // canvasWidth: 800,
      // canvasHeight: 800,
    })
    .then(function (dataUrl) {
      var link = document.createElement("a");
      link.download = "my-image-name.png";
      link.href = dataUrl;
      link.click();
    })
    .catch(function (error) {
      console.error("oops, something went wrong!", error);
    });
};
