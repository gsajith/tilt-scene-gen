import Head from "next/head";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { useDropzone } from "react-dropzone";
import FullScreen from "../components/FullScreen";
import Page from "../components/Page";
import ParallaxFrame from "../components/ParallaxFrame";
import ParallaxImage from "../components/ParallaxImage";
import SettingsButton from "../components/SettingsButton";
import SettingsSheet from "../components/SettingsSheet";
import { useAbsoluteViewportHeight } from "../utils";
import Dropzone from "../widgets/Dropzone";
import ImagePreviews from "../widgets/ImagePreviews";

const Home = () => {
  const [tiltAngle, setTiltAngle] = useState(25);
  const [perspective, setPerspective] = useState(1000);
  const [hideOverflow, setHideOverflow] = useState(false);
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
          })
        );
        const updatedImages = addedImages.concat(newAddedImages);
        return updatedImages;
      });
    },
  });

  useEffect(() => {
    setAddedImages([{ url: "https://i.imgur.com/92G2k5D.jpg" }]);
  }, []);

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      addedImages?.forEach((file) => URL.revokeObjectURL(file.url));
    },
    [addedImages]
  );

  return (
    <FullScreen onClick={() => setSelectedImage(null)}>
      <Head>
        <title>Parallax Maker</title>
        <meta name="description" content="Parallax Maker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page>
        <ParallaxFrame
          gyroscope={true}
          perspective={perspective}
          tiltMaxAngleX={tiltAngle}
          tiltMaxAngleY={tiltAngle}
          tiltReverse={isMobile}>
          <div
            style={{ width: "100%" }}
            {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <div style={{ width: "100%", paddingTop: "100%" }} />
          </div>
          {addedImages.map((image, index) => (
            <ParallaxImage
              src={image.url}
              style={{
                width: (index + 1) * 200,
                transform: " translateZ(" + index * -35 + "px)",
              }}
            />
          ))}
        </ParallaxFrame>

        <ImagePreviews
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
        <SettingsSheet closeSettings={() => setSettingsShown(false)} />
      )}
    </FullScreen>
  );
};

export default Home;
