import React from 'react';
import { Dog } from '../types/dogTypes';

interface DogCardProps {
    dog: Dog;
    isFavorite?: boolean;
    onToggleFavorite?: (dogId: string) => void;
}

const DogCard: React.FC<DogCardProps> = ({dog, isFavorite, onToggleFavorite}) => {
  return (
    <div style={{ border: '1px solid black', padding: '10px', borderRadius: 5}}>
        <img src={dog.img} alt={dog.name} width="200" height="200" style={{objectFit: "cover"}} />
        <h2>{dog.name}</h2>
        <p>Breed: {dog.breed}</p>
        <p>Age: {dog.age} years old</p>
        <p>Location: {dog.zip_code}</p>

        {onToggleFavorite && (
            <button onClick={() => onToggleFavorite(dog.id)}>
                {isFavorite ? "Remove from favorites" : "Add to favorites"}
            </button>
        )}
        
    </div>
  )
}

export default DogCard