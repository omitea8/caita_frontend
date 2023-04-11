import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Image {
  caption: string;
  image_url: string;
  id: string;
}

export const ImageList: React.FC = () => {
  const { creatorID } = useParams();
  const [images, setImages] = useState<Image[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/images/creator/${creatorID ?? ""}`)
      .then((response) => response.json())
      .then((data: Image[]) => {
        setImages(data);
      })
      .catch((error) => {
        console.error(error);
        navigate("/error-page");
      });
  }, [creatorID]);

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
          onClick={() => {
            navigate(`/images/${image.id}`);
          }}
        >
          <img src={image.image_url} alt={image.caption} />
        </div>
      ))}
    </div>
  );
};
