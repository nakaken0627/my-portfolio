"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";

import { CompanyLayout } from "../CompanyLayout";

type Image = {
  image_url: string;
  imageUrl: string;
  caption: string;
};

export default function Sample() {
  const [file, setFile] = useState<File | undefined>();
  const [caption, setCaption] = useState("");
  const [images, setImages] = useState<Image[]>([]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    formData.append("caption", caption);

    await fetch("http://localhost:3001/s3/image", {
      method: "POST",
      body: formData,
    });

    setFile(undefined);
    setCaption("");
  };

  const fetchImages = async () => {
    const res = await fetch("http://localhost:3001/s3/image");
    const data: Image[] = await res.json();
    setImages(data);
  };

  useEffect(() => {
    void fetchImages();
  }, []);

  return (
    <CompanyLayout>
      <div>
        <h1>テスト</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (!e.target.files) return;
              const inputFile = e.target.files[0];
              setFile(inputFile);
            }}
          />
          <input
            type="text"
            value={caption}
            onChange={(e) => {
              setCaption(e.target.value);
            }}
          />
          <button type="submit">登録</button>
        </form>
        <div>
          {images.map((image) => (
            <Image
              key={image.image_url}
              src={image.imageUrl}
              alt="uploaded"
              width={400}
              height={300}
            />
          ))}
        </div>
      </div>
    </CompanyLayout>
  );
}
