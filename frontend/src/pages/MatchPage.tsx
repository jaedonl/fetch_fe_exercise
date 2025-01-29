import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { matchDog, getDogDetails } from "../api/dogsApi";
import { Dog } from '../types/dogTypes';
import DogCard from '../components/DogCard';

const MatchPage: React.FC = () => {
    const [matchedDog, setMatchedDog] = useState<Dog | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const favoriteDogs = JSON.parse(localStorage.getItem("favoriteDogs") || "[]");

        if (favoriteDogs.length === 0) {
            alert("No favorite dogs selected. Returning to search.");
            navigate("/search");
            return;
        }
        fetchMatch(favoriteDogs);
    }, [navigate])
    
    const fetchMatch = async (favoriteDogs: string[]) => {
        try {
            const matchResult = await matchDog(favoriteDogs);
            const dogDetails = await getDogDetails([matchResult.match])

            setMatchedDog(dogDetails[0]);
        } catch (error) {
            console.error("error fetching match: ", error)
        }
    }

    return (
        <div>
            <h1>Your Matched Dog</h1>
            {matchedDog
                ? (
                    <DogCard dog={matchedDog} />
                )   
                : (
                    <p>Finding your perfect match...</p>
                )
            }
        </div>
    )
}

export default MatchPage