import ColorScheme from "color-scheme";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import seedrandom from "seedrandom";
import FullScreen from "../components/FullScreen";
import Page from "../components/Page";
import ParallaxFrame from "../components/ParallaxFrame";
import SettingsButton from "../components/SettingsButton";
import SvgContainer from "../components/SvgContainer";
import { drawGround } from "../svgUtils";
import { useAbsoluteViewportHeight, uuidv4, colorShade } from "../utils";
import SettingsSheet from "../widgets/SettingsSheet";

const DynamicDebugPanel = dynamic(() => import("../components/DebugPanel"), {
  ssr: false,
});

const SCHEMES = ["mono", "contrast", "triade", "tetrade", "analogic"];
const VARIATIONS = ["default", "pastel", "soft", "light", "hard", "pale"];
const FRAME_SIZE = 500;

const Home = ({ query }) => {
  const router = useRouter();

  // Overall settings
  // TODO: Tilt bg color
  // TODO: Matting color
  // TODO: Border color? border width?
  const [tiltAngle, setTiltAngle] = useState(25);
  const [perspective, setPerspective] = useState(1000);
  const [mattingWidth, setMattingWidth] = useState(1000);
  // TODO: Problem for another day
  // const [frameRadius, setFrameRadius] = useState(16);

  const [settingsShown, setSettingsShown] = useState(false);
  useAbsoluteViewportHeight();

  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  if (typeof window !== "undefined" && query.redirect) {
    if (query.id && typeof query.id !== "undefined" && query.id.length > 0) {
      router.push("/scene1?id=" + query.id);
    } else {
      router.push("/scene1?id=" + uuidv4());
    }
  }
  const rng = useRef(seedrandom(query.id));

  const hue = useRef(0);
  const scheme = useRef(0);
  const variation = useRef(0);

  const grounds = useRef([]);

  const redraw = () => {
    hue.current = Math.floor(rng.current() * 255);
    scheme.current = SCHEMES[Math.floor(rng.current() * SCHEMES.length)];
    variation.current =
      VARIATIONS[Math.floor(rng.current() * VARIATIONS.length)];

    grounds.current = new ColorScheme()
      .from_hue(hue.current)
      .scheme(scheme.current)
      .variation(variation.current)
      .colors()
      .map((color) => {
        const translateZ = rng.current() * perspective - (perspective - 200);
        const height = rng.current() * 25 + 25;
        let scale =
          FRAME_SIZE /
          Math.min(
            FRAME_SIZE,
            FRAME_SIZE * (perspective / (perspective - translateZ))
          );
        if (translateZ < 0) {
          scale -= translateZ / 700;
        }
        return {
          color: "#" + color,
          height: height,
          translateZ: translateZ,
          scale: scale,
        };
      })
      .slice(0, 4);
    forceUpdate();
  };

  useEffect(() => {
    rng.current = seedrandom(query.id);
  }, [query]);

  useEffect(() => {
    redraw();
  }, [rng.current]);

  return (
    <FullScreen style={{ background: "black" }}>
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
        <DynamicDebugPanel
          scheme={scheme}
          variation={variation}
          hue={hue}
          colors={grounds}
        />
        <ParallaxFrame
          gyroscope={true}
          mattingWidth={mattingWidth}
          perspective={perspective}
          tiltMaxAngleX={tiltAngle}
          tiltMaxAngleY={tiltAngle}
          tiltReverse={isMobile}>
          {/* {addedImages.map((image, index) => (
            <ParallaxImage
              key={image.key}
              src={image.url}
              translateZ={image.settings.z}
              left={image.settings.x}
              top={image.settings.y}
              scale={image.settings.scale}
            />
          ))} */}
          {grounds.current.map((item, index) => (
            <SvgContainer
              key={"index" + index}
              translateZ={item.translateZ}
              scale={item.scale}
              top={0}
              left={0}>
              <svg width="100%" height="100%" viewBox="0 0 100 100">
                <path
                  d={drawGround(item.height, rng.current, 4)}
                  fill={"url(#MyGradient" + index + ")"}
                />
                <defs>
                  <linearGradient id={"MyGradient" + index}>
                    <stop offset="5% " stop-color={item.color} />
                    <stop
                      offset={item.height + "%"}
                      stop-color={colorShade(item.color, 40)}
                    />
                    <stop offset="95%" stop-color={item.color} />
                  </linearGradient>
                </defs>
              </svg>
            </SvgContainer>
          ))}
          <div
            style={{
              width: "100%",
              paddingTop: "100%",
            }}
          />
        </ParallaxFrame>
        <SettingsButton onClick={() => setSettingsShown(true)}>
          Settings
        </SettingsButton>
        <SettingsButton
          style={{ top: 40 }}
          onClick={() => {
            router.query.id = uuidv4();
            router.push("/scene1");
          }}>
          Random
        </SettingsButton>
      </Page>

      {settingsShown && (
        <SettingsSheet
          closeSettings={() => setSettingsShown(false)}
          mattingWidth={mattingWidth}
          setMattingWidth={setMattingWidth}
          perspective={perspective}
          setPerspective={setPerspective}
          tiltAngle={tiltAngle}
          setTiltAngle={setTiltAngle}
        />
      )}
    </FullScreen>
  );
};

Home.getInitialProps = ({ query }) => {
  if (
    query.id !== null &&
    typeof query.id !== "undefined" &&
    query.id.length > 0
  ) {
    return { query };
  } else {
    return { query: { ...query, id: uuidv4(), redirect: true } };
  }
};

export default Home;
