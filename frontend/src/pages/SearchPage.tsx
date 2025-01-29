import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBreeds, searchDogs, getDogDetails } from "../api/dogsApi";
import { logout } from "../api/authApi";
import { Dog } from "../types/dogTypes";
import DogCard from "../components/DogCard";

const SearchPage: React.FC = () => {
    const [dogs, setDogs] = useState<Dog[]>([]);
    const [breeds, setBreeds] = useState<string[]>([]);
    const [selectedBreed, setSelectedBreed] = useState<string>("");
    const [favorites, setFavorites] = useState<string[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        // const authToken = document.cookie.includes("fetch-access-token");
        // if (!authToken) {
        //     navigate("/");
        //     return;
        // }
        const fetchBreeds = async () => {
            try {
                const breedList = await getBreeds();
                setBreeds(breedList);
            } catch (error) {
                console.log("Error fetching breeds:", error)
            }
        }
        fetchBreeds();
        fetchDogs();
    }, [selectedBreed, navigate]);

    const fetchDogs = async () => {
        try {
            const dogIds = await searchDogs({ 
                breeds: selectedBreed ? [selectedBreed] : undefined,
                size: 10,
                sort: "breed:asc"
            });
            const dogDetails = await getDogDetails(dogIds);
            setDogs(dogDetails);
        } catch (error) {
            console.error("Error fetching dogs:", error);
        }
    };

    const toggleFavorite = (dogId: string) => {
        setFavorites((prevFavorites) => {
            if (prevFavorites.includes(dogId)) {
                return prevFavorites.filter(id => id !== dogId);
            } else {
                return [...prevFavorites, dogId];
            }
        });
    };
    
    const handleMatch = () => {
        if (favorites.length === 0) {
            alert("Please select at least one favorite dog.");
            return;
        }
        // Store selected favorites in localStorage
        localStorage.setItem("favoriteDogs", JSON.stringify(favorites));
        navigate("/match");
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/')
        } catch (error) {
            console.error("error logging out: ", error);
        }
    }

    return (
        <div>
            <button onClick={handleLogout}>Log out</button>
            <h1>Find Your Dog</h1>
            <select onChange={(e) => setSelectedBreed(e.target.value)}>
                <option value="">All Breeds</option>
                {breeds.map((breed) => (
                    <option key={breed} value={breed}>{breed}</option>
                ))}
            </select>
    
            <div>
                {dogs.map((dog) => (
                    <DogCard 
                        key={dog.id} 
                        dog={dog} 
                        isFavorite={favorites.includes(dog.id)}
                        onToggleFavorite={toggleFavorite}
                     />
                ))}
            </div>
    
            <button onClick={handleMatch} disabled={favorites.length === 0}>
                Find My Match
            </button>
        </div>
    )
}

export default SearchPage