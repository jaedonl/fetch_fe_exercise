import React from 'react';
import { Dog } from '../types/dogTypes';
import styles from '../styles/components/DogCard.module.scss'
import heartOutlined from '../assets/heart-outline.svg';
import heartFilled from '../assets/heart-fill.svg';


interface DogCardProps {
    dog: Dog;
    isFavorite?: boolean;
    onToggleFavorite?: (dogId: string) => void;
}

const DogCard: React.FC<DogCardProps> = ({dog, isFavorite, onToggleFavorite}) => {
  return (
    <div className={styles.dogCard}>
        <img src={dog.img} alt={dog.name} width="100%" height="200" style={{objectFit: "cover"}} />
        <div className={styles.cardDescription}>
          <div className={styles.NameAndBreed}>
            <h2>{dog.name}</h2>
            <span style={{ fontSize: '5px'}}>&#128992;</span>
            <span className={styles.breed}>{dog.breed}</span>
          </div>
          
          <p>Age: {dog.age} years old</p>
          <p>Zipcode: {dog.zip_code}</p>          
        </div>
        {onToggleFavorite && (
          <button className={styles.heartBtn} onClick={() => onToggleFavorite(dog.id)}>
              {/* {isFavorite ? "Remove from favorites" : "Add to favorites"} */}
              
              { isFavorite 
                ? (<img src={heartFilled} alt='heart filled' className={styles.heart} />) 
                : (<img src={heartOutlined} alt='heart outlined' className={styles.heart} />) }
          </button>
        )}
    </div>
  )
}

export default DogCard