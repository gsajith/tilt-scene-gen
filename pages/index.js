import Head from "next/head";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { useDropzone } from "react-dropzone";
import FullScreen from "../components/FullScreen";
import Page from "../components/Page";
import ParallaxFrame from "../components/ParallaxFrame";
import ParallaxImage from "../components/ParallaxImage";
import SettingsButton from "../components/SettingsButton";
import SettingsSheet from "../widgets/SettingsSheet";
import { useAbsoluteViewportHeight, uuidv4 } from "../utils";
import Dropzone, { DEFAULT_SETTINGS } from "../widgets/Dropzone";
import ImagePreviews from "../widgets/ImagePreviews";
import ImageSettings from "../widgets/ImageSettings";

const Home = () => {
  // Overall settings
  // TODO: Tilt bg color
  // TODO: Matting color
  // TODO: Border color? border width?
  const [tiltAngle, setTiltAngle] = useState(25);
  const [perspective, setPerspective] = useState(1000);
  const [mattingWidth, setMattingWidth] = useState(1000);
  // TODO: Problem for another day
  // const [frameRadius, setFrameRadius] = useState(16);

  const [hoveringTiltView, setHoveringTiltView] = useState(false);
  const [settingsShown, setSettingsShown] = useState(false);
  useAbsoluteViewportHeight();
  const [addedImages, setAddedImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const { getRootProps, getInputProps } = useDropzone({
    noClick: true,
    noKeyboard: true,
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      console.log("ondrop");
      setAddedImages((addedImages) => {
        const newAddedImages = acceptedFiles.map((file) =>
          Object.assign(file, {
            url: URL.createObjectURL(file),
            settings: { ...DEFAULT_SETTINGS },
            key: uuidv4(),
          })
        );
        const updatedImages = addedImages.concat(newAddedImages);
        return updatedImages;
      });
    },
  });

  useEffect(() => {
    setAddedImages([
      {
        url: "https://i.imgur.com/92G2k5D.jpg",
        name: "92G2k5D.jpg",
        settings: {
          x: "50",
          y: "50",
          z: "-10",
          scale: "0.3",
        },
        key: uuidv4(),
      },
    ]);
  }, []);

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      console.log("cleanup");
      addedImages?.forEach((file) => URL.revokeObjectURL(file.url));
    },
    [addedImages]
  );

  return (
    <FullScreen
      onClick={() => setSelectedImage(null)}
      style={{ background: "black" }}>
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
        <ParallaxFrame
          gyroscope={true}
          onEnter={() => {
            setHoveringTiltView(true);
          }}
          onLeave={() => {
            setHoveringTiltView(false);
          }}
          mattingWidth={mattingWidth}
          perspective={perspective}
          tiltMaxAngleX={tiltAngle}
          tiltMaxAngleY={tiltAngle}
          tiltReverse={isMobile}>
          {addedImages.map((image, index) => (
            <ParallaxImage
              key={image.key}
              src={image.url}
              translateZ={
                image.settings.z ? image.settings.z : (index + 1) * -35
              }
              left={image.settings.x ? image.settings.x : 50}
              top={image.settings.y ? image.settings.y : 50}
              scale={image.settings.scale ? image.settings.scale : 1}
            />
          ))}
          <div
            style={{
              width: "100%",
              zIndex: 1,
            }}
            {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <div
              style={{
                width: "100%",
                paddingTop: "100%",
              }}
            />
          </div>
        </ParallaxFrame>

        <ImagePreviews
          fade={hoveringTiltView}
          images={addedImages}
          setImages={setAddedImages}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />

        <SettingsButton onClick={() => setSettingsShown(true)}>
          Settings
        </SettingsButton>

        <Dropzone setAddedImages={setAddedImages} />
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

      {selectedImage !== null && (
        <ImageSettings
          images={addedImages}
          setImages={setAddedImages}
          selectedImage={selectedImage}
        />
      )}
    </FullScreen>
  );
};

export default Home;
