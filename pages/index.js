import Head from "next/head";
import FullScreen from "../components/FullScreen";
import Tilt from "react-parallax-tilt";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";

export default function Home() {
  const [showGyro, setShowGyro] = useState(false);

  useEffect(() => {
    if (isMobile) {
      // https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
      // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
      let vh = window.innerHeight * 0.01;
      // Then we set the value in the --vh custom property to the root of the document
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }
  }, [isMobile]);

  return (
    <FullScreen>
      <Head>
        <title>Parallax Maker</title>
        <meta name="description" content="Parallax Maker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <button
        onClick={() => {
          setShowGyro(true);
          // setTimeout(() => setShowGyro(true), 1000);
        }}>
        Show gyro
      </button>
      {showGyro && (
        <Tilt gyroscope={true} tiltMaxAngleX={45} tiltMaxAngleY={45}>
          <img
            src="https://i.imgur.com/92G2k5D.jpg"
            style={{ width: "90vw", maxWidth: 500, background: "red" }}
          />
        </Tilt>
      )}
    </FullScreen>
  );
}
