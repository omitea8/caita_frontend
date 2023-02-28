import React, { useState, useEffect } from "react";

type Image = {
  title: string;
  caption: string;
  image_url: string;
  id: string;
};

export const ImageList: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    fetch("images/imagedata")
      .then((response) => response.json())
      .then((data) => {
        setImages(data);
      });
  }, [setImages]);

  // Grid flex layout
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "start",
      }}
    >
      {images.map((image) => (
        <div
          style={{
            // no margin
            margin: 0,
            height: "300px",
            borderRight: "1px solid #fff",
            borderBottom: "1px solid #fff",
          }}
        >
          <img src={image.image_url} alt={image.title} />
        </div>
      ))}
    </div>
  );
};
