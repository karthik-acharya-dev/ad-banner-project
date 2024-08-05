"use client";

import React, { useEffect, useState } from "react";
import BannerImageComp from "@/components/BannerImageComp";
import EditBannerTemplateBs from "@/components/EditBannerTemplateBs";
import styles from "./page.module.css";

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

const HomePage: React.FC = () => {
  const [banners, setBanners] = useState<any[]>([]);
  const [editBanner, setEditBanner] = useState<any>(null);

  useEffect(() => {
    fetch("/banners.json")
      .then((response) => response.json())
      .then((data) => {
        const bannersWithDefaultImage = data.map((banner: any) => ({
          ...banner,
          overlayImage: getRandomSampleImage(), // Set default random image
        }));
        setBanners(bannersWithDefaultImage);
      })
      .catch((error) => console.error("Error fetching banners:", error));
  }, []);

  const handleEdit = (banner: any) => {
    setEditBanner(banner);
  };

  const handleSave = (updatedBanner: any) => {
    setBanners((prevBanners) =>
      prevBanners.map((banner) =>
        banner.id === updatedBanner.id ? updatedBanner : banner
      )
    );
    setEditBanner(null);
  };

  return (
    <div className={styles.gridContainer}>
      {banners.map((banner) => (
        <div key={banner.id} className={styles.bannerItem}>
          <BannerImageComp {...banner} onEdit={() => handleEdit(banner)} />
        </div>
      ))}
      {editBanner && (
        <EditBannerTemplateBs
          banner={editBanner}
          onSave={handleSave}
          onClose={() => setEditBanner(null)}
        />
      )}
    </div>
  );
};

export default HomePage;
