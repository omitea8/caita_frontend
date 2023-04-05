import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const ImagePage: React.FC = () => {
  const { imageID } = useParams();
  const [caption, setCaption] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    fetch(`/images/${imageID}`)
      .then((response) => response.json())
      .then((data) => {
        setCaption(data.caption);
        setImageUrl(data.image_url);
      });
  }, [imageID]);

  return (
    <div>
      <p>{caption}</p>
      <img src={imageUrl} alt={caption} />
    </div>
  );
};
