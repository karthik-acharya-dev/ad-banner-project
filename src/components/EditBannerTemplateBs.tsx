"use client";

import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faDownload,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import html2canvas from "html2canvas";
import styles from "./EditBannerTemplateBs.module.css";

interface EditBannerProps {
  banner: {
    id: number;
    title: string;
    description: string;
    cta: string;
    image: string;
    background: string;
    overlayImage: string | null;
  };
  onSave: (banner: any) => void;
  onClose: () => void;
}

const EditBannerTemplateBs: React.FC<EditBannerProps> = ({
  banner,
  onSave,
  onClose,
}) => {
  const [title, setTitle] = useState(banner.title);
  const [description, setDescription] = useState(banner.description);
  const [cta, setCta] = useState(banner.cta);
  const [image, setImage] = useState(banner.image);
  const [overlayImage, setOverlayImage] = useState<string | null>(
    banner.overlayImage
  );
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTitle(banner.title);
    setDescription(banner.description);
    setCta(banner.cta);
    setImage(banner.image);
    setOverlayImage(banner.overlayImage ?? getRandomSampleImage());
  }, [banner]);

  const handleSave = async () => {
    if (previewRef.current) {
      try {
        const titleElement = previewRef.current.querySelector(
          `.${styles.title}`
        );
        const descriptionElement = previewRef.current.querySelector(
          `.${styles.description}`
        );
        const ctaElement = previewRef.current.querySelector(
          `.${styles.ctaButton}`
        );

        if (titleElement && descriptionElement && ctaElement) {
          titleElement.style.visibility = "hidden";
          descriptionElement.style.visibility = "hidden";
          ctaElement.style.visibility = "hidden";
        }

        const canvas = await html2canvas(previewRef.current, {
          backgroundColor: null,
          scale: 2,
          useCORS: true,
        });

        if (titleElement && descriptionElement && ctaElement) {
          titleElement.style.visibility = "visible";
          descriptionElement.style.visibility = "visible";
          ctaElement.style.visibility = "visible";
        }

        const combinedImage = canvas.toDataURL("image/png");

        const updatedBanner = {
          ...banner,
          title,
          description,
          cta,
          image: combinedImage,
          overlayImage,
        };

        onSave(updatedBanner);
      } catch (error) {
        console.error("Error capturing or saving image:", error);
      }
    }
  };

  const handleDownload = async () => {
    if (previewRef.current) {
      try {
        const canvas = await html2canvas(previewRef.current, {
          backgroundColor: null,
          scale: 2,
          useCORS: true,
        });

        const imageDataUrl = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = imageDataUrl;
        link.download = `${title}.png`;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error("Error capturing or downloading image:", error);
      }
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setOverlayImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectImage = (img: string) => {
    setOverlayImage(img);
  };

  const sampleImages = [
    "https://media.istockphoto.com/id/940373682/photo/cute-little-preschool-kid-boy-planting-green-salad-seedlings-in-spring.jpg?s=2048x2048&w=is&k=20&c=7qZHPIPX3p3iT187ejfe-m3pTev2mWIz_E81z2dP2ng=",
    "https://cdn.pixabay.com/photo/2016/11/02/11/08/monk-1791113_640.jpg",
    "https://cdn.pixabay.com/photo/2023/05/23/15/42/bengal-tiger-8013012_1280.jpg",
    "https://images.pexels.com/photos/9028884/pexels-photo-9028884.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  ];

  const getRandomSampleImage = () => {
    const randomIndex = Math.floor(Math.random() * sampleImages.length);
    return sampleImages[randomIndex];
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.bottomSheet}>
        <h2 className={styles.heading}>Edit Banner</h2>
        <button onClick={onClose} className={styles.closeButton}>
          <FontAwesomeIcon icon={faTimes} />
        </button>

        <div className={styles.scrollContainer}>
          <div
            className={styles.preview}
            ref={previewRef}
            id={`banner-${banner.id}`}
            style={{ background: banner.background }}
          >
            <img src={image} alt={title} className={styles.image} />
            {overlayImage && (
              <img
                src={overlayImage}
                alt="Overlay"
                className={styles.overlayImage}
              />
            )}
            <div className={styles.overlay}>
              <h3 className={styles.title}>{title}</h3>
              <p className={styles.description}>{description}</p>
              <button className={styles.ctaButton}>{cta}</button>
            </div>
          </div>
          <div className={styles.form}>
            <label className={styles.formLabel}>
              Image:
              <div className={styles.imageUploadRow}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className={styles.fileInput}
                  id="file-input"
                />
                <label htmlFor="file-input" className={styles.imageUploadIcon}>
                  <FontAwesomeIcon icon={faUpload} />
                </label>
                <div className={styles.sampleImages}>
                  {sampleImages.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Sample ${idx}`}
                      className={`${styles.sampleImage} ${
                        overlayImage === img ? styles.selected : ""
                      }`}
                      onClick={() => handleSelectImage(img)}
                    />
                  ))}
                </div>
              </div>
            </label>
            <label className={styles.formLabel}>
              Title:
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={styles.formInput}
              />
            </label>
            <label className={styles.formLabel}>
              Description:
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={styles.formTextarea}
              />
            </label>
            <label className={styles.formLabel}>
              Button Text:
              <input
                type="text"
                value={cta}
                onChange={(e) => setCta(e.target.value)}
                className={styles.formInput}
                id={styles.btnText}
              />
            </label>
          </div>
        </div>
        <div className={styles.fixedButtons}>
          <button onClick={handleSave} className={styles.saveButton}>
            Done
          </button>
          <button onClick={handleDownload} className={styles.downloadButton}>
            <FontAwesomeIcon icon={faDownload} /> Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBannerTemplateBs;
