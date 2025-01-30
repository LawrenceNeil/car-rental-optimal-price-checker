import { useState } from "react";
import PropTypes from "prop-types";

const images = import.meta.glob("/src/assets/images/*");

function ImageComponent({ filename, ...imageProps }) {
  const [imageSrc, setImageSrc] = useState("");

  // Dynamically import the image
  if (images[`/src/assets/images/${filename}`]) {
    images[`/src/assets/images/${filename}`]().then((module) => {
      setImageSrc(module.default);
    });
  } else {
    console.error("Image not found:", filename);
  }

  return <img src={imageSrc} alt={filename} {...imageProps} />;
}

ImageComponent.propTypes = {
  filename: PropTypes.string,
  imageProps: PropTypes.object,
};

export default ImageComponent;
