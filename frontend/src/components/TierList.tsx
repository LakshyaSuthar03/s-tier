import { useEffect, useState } from "react";
import Tier from "./Tier";
import axios from "axios";
import { backend } from "../../config.json";
import { Buffer } from "buffer";

const TierList = () => {
  const [images, setImages] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDragStart = (e: React.DragEvent, drag: string) => {
    e.dataTransfer.setData("widgetType", drag);
  };

  const displayImages = (images: Array<string>) => {
    return images.map((image: string, index: number) => {
      // Convert hex string back to a buffer
      const buffer = Buffer.from(image, "hex");

      // Create a blob from the buffer
      const blob = new Blob([buffer], { type: "image/png" }); // Adjust type based on your image format

      // Create a URL for the blob
      const url = URL.createObjectURL(blob);

      return (
        <div
          key={index}
          className="h-24 w-24"
          draggable
          onDragStart={(e) => handleDragStart(e, url)}
        >
          <img
            src={url}
            alt={`user-uploaded-${index}`}
            className="h-full w-full object-cover"
          />
        </div>
      );
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      console.log(e.target.files[0]);

      setSelectedFile(e.target.files[0]);
    }
  };

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    const id = localStorage.getItem("token");

    if (!selectedFile || !id) {
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("id", id);

    try {
      const response = await axios.post(`${backend}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("File uploaded successfully:", response.data);
      // Optionally, update the images state to include the new image
      setImages((prevImages) => [...prevImages, response.data.filePath]);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  useEffect(() => {
    const id = localStorage.getItem("token");
    if (id) {
      axios
        .post(`${backend}/file`, { id })
        .then((res) => {
          setImages(res.data.images);
          console.log(res.data.images);
        })
        .catch((error) => {
          console.error("Error fetching images:", error);
        });
    }
  }, []);
  return (
    <div className="h-dvh w-svw">
      <Tier tierName="S" tierColor="rgb(255, 127, 127)" />
      <Tier tierName="A" tierColor="rgb(255, 191, 127)" />
      <Tier tierName="B" tierColor="rgb(255, 223, 127)" />
      <Tier tierName="C" tierColor="rgb(255, 255, 127)" />
      <Tier tierName="D" tierColor="rgb(191, 255, 127)" />

      <div className=" w-svw  flex">{displayImages(images)}</div>

      <form onSubmit={handleFileUpload}>
        <input type="file" name="file" onChange={handleFileChange} required />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default TierList;
