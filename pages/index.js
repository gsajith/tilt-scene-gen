import dynamic from "next/dynamic";
import Head from "next/head";
import FullScreen from "../components/FullScreen";
import Page from "../components/Page";
import Link from "next/link";

const DynamicDebugPanel = dynamic(() => import("../components/DebugPanel"), {
  ssr: false,
});

const Home = () => {
  return (
    <FullScreen>
      <Head>
        <title>Parallax Maker</title>
        <meta name="description" content="Parallax Maker" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins&display=swap"
          rel="stylesheet"></link>
      </Head>
      <Page>
        <div>Hi</div>
        <Link href="/scene1">Scene1</Link>
      </Page>
    </FullScreen>
  );
};

export default Home;
