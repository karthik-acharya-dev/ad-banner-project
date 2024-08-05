import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons/faEdit";
import styles from "./BannerImageComp.module.css";

interface BannerProps {
  id: number;
  title: string;
  description: string;
  cta: string;
  image?: string;
  background: string;
  onEdit: () => void;
}

const BannerImageComp: React.FC<BannerProps> = ({
  title,
  description,
  cta,
  image,
  background,
  onEdit,
}) => {
  return (
    <div className={styles.container} style={{ background }}>
      <img src={image} alt={title} className={styles.image} />
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <button className={styles.ctaButton}>{cta}</button>
      </div>
      <button onClick={onEdit} className={styles.editButton}>
        <FontAwesomeIcon icon={faEdit} />
      </button>
    </div>
  );
};

export default BannerImageComp;
