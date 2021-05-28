import Head from "next/head";
import FullScreen from "../components/FullScreen";
import Tilt from "react-parallax-tilt";

export default function Home() {
  return (
    <FullScreen>
      <Head>
        <title>Parallax Maker</title>
        <meta name="description" content="Parallax Maker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Tilt gyroscope={true} tiltMaxAngleX={45} tiltMaxAngleY={45}>
        <img
          src="https://i.imgur.com/92G2k5D.jpg"
          style={{ width: "90vw", maxWidth: 500 }}
        />
      </Tilt>
    </FullScreen>
  );
}
