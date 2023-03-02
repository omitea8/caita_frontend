import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const ImagePage: React.FC = () => {
  const { imageID } = useParams();
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    fetch(`${imageID}`)
      .then((response) => response.json())
      .then((data) => {
        setTitle(data.title);
        setCaption(data.caption);
        setImageUrl(data.image_url);
      });
  }, [imageID]);

  return (
    <div>
      <p>{title}</p>
      <p>{caption}</p>
      <img src={imageUrl} alt={title} />
    </div>
  );
};
