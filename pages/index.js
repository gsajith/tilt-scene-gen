import Head from "next/head";
import FullScreen from "../components/FullScreen";
import Tilt from "react-parallax-tilt";
import { useState } from "react";

export default function Home() {
  const [showGyro, setShowGyro] = useState(true);

  return (
    <FullScreen>
      <Head>
        <title>Parallax Maker</title>
        <meta name="description" content="Parallax Maker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <button
        onClick={() => {
          setShowGyro(false);
          setTimeout(() => setShowGyro(true), 1000);
        }}>
        Show gyro
      </button>
      {showGyro && (
        <Tilt gyroscope={true} tiltMaxAngleX={45} tiltMaxAngleY={45}>
          <img
            src="https://i.imgur.com/92G2k5D.jpg"
            style={{ width: "90vw", maxWidth: 500 }}
          />
        </Tilt>
      )}
    </FullScreen>
  );
}
