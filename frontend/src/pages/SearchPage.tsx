import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBreeds, searchDogs, getDogDetails } from "../api/dogsApi";
import { logout, checkAuthStatus } from "../api/authApi";
import { Dog } from "../types/dogTypes";
import DogCard from "../components/DogCard";

const SearchPage: React.FC = () => {
    const [dogs, setDogs] = useState<Dog[]>([]);
    const [breeds, setBreeds] = useState<string[]>([]);
    const [selectedBreed, setSelectedBreed] = useState<string>("");
    const [favorites, setFavorites] = useState<string[]>([]);
    const [totalResults, setTotalResults] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [sortOrder, setSortOrder] = useState<string>("asc")
    const pageSize = 9;
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchBreeds = async () => {
            try {
                const loggedIn = await checkAuthStatus();
                if (!loggedIn) navigate('/');

                const breedList = await getBreeds();
                setBreeds(breedList);
            } catch (error) {
                console.log("Error fetching breeds:", error)
            }
        }
        fetchBreeds();
        fetchDogs();
    }, [selectedBreed, currentPage, sortOrder, navigate]);

    const fetchDogs = async () => {
        try {
            const from = (currentPage - 1) * pageSize;
            const response = await searchDogs({ 
                breeds: selectedBreed ? [selectedBreed] : undefined, 
                size: pageSize, 
                from,
                sort: `breed:${sortOrder}` 
            });

            if (!response || !response.resultIds) {
                console.error("Invalid API response:", response);
                return;
            }

            const dogDetails = await getDogDetails(response.resultIds);

            setDogs(dogDetails);
            setTotalResults(response.total);
        } catch (error) {
            console.error("Error fetching dogs:", error);
        }
    };

    const handleNextPage = () => {
        if ((currentPage * pageSize) < totalResults) {
            setCurrentPage((prev) => prev + 1);
        }
    };
    
      const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
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

            <select onChange={(e) => setSortOrder(e.target.value)}>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>
    
            <div style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginTop: 10}}>
                {dogs.map((dog) => (
                    <DogCard 
                        key={dog.id} 
                        dog={dog} 
                        isFavorite={favorites.includes(dog.id)}
                        onToggleFavorite={toggleFavorite}
                     />
                ))}
            </div>

            <div>
                <button onClick={handlePrevPage} disabled={currentPage === 1}>
                    Previous
                </button>
                <span> Page {currentPage} </span>
                <button onClick={handleNextPage} disabled={(currentPage * pageSize) >= totalResults}>
                    Next
                </button>
            </div>
    
            <button onClick={handleMatch} disabled={favorites.length === 0}>
                Find My Match
            </button>
        </div>
    )
}

export default SearchPage