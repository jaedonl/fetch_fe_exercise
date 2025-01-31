import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBreeds, searchDogs, getDogDetails } from "../api/dogsApi";
import { checkAuthStatus } from "../api/authApi";
import { Dog } from "../types/dogTypes";
import DogCard from "../components/DogCard";
import AsideFilter from "../components/AsideFilter";
import styles from '../styles/pages/SearchPage.module.scss'
import filter from '../assets/filter-list.svg';
import close from '../assets/close.svg';
import { useFavorites } from "../context/FavoritesContext";


const SearchPage: React.FC = () => {
    const [dogs, setDogs] = useState<Dog[]>([]);
    const [breeds, setBreeds] = useState<string[]>([]);
    const [selectedBreed, setSelectedBreed] = useState<string>("");
    const { favorites, toggleFavorite } = useFavorites(); 
    const [totalResults, setTotalResults] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [sortOrder, setSortOrder] = useState<string>("asc")
    const [ageMin, setAgeMin] = useState<number | "">("");
    const [ageMax, setAgeMax] = useState<number | "">("");
    const [zipCodes, setZipCodes] = useState<string>("");
    const [isMobileFilterOn, setIsMobileFilterOn] = useState<boolean>(false);
    const pageSize = 12;
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
    }, [selectedBreed, currentPage, ageMin, ageMax, zipCodes, sortOrder, navigate]);

    const fetchDogs = async () => {
        try {
            const from = (currentPage - 1) * pageSize;
            const response = await searchDogs({ 
                breeds: selectedBreed ? [selectedBreed] : undefined, 
                ageMin: ageMin !== "" ? ageMin : undefined,
                ageMax: ageMax !== "" ? ageMax : undefined,
                zipCodes: zipCodes ? zipCodes.split(",") : undefined,
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
    
    const handleMatch = () => {
        if (favorites.length === 0) {
            alert("Please select at least one favorite dog.");
            return;
        }
        // const existingFavorites = JSON.parse(localStorage.getItem("favoriteDogs") || "[]");
        // const updatedFavorites = [...new Set([...existingFavorites, ...favorites])];

        // Store selected favorites in localStorage
        localStorage.setItem("favoriteDogs", JSON.stringify(favorites));
        navigate("/match");
    };

    const toggleFilter = () => {
        setIsMobileFilterOn(prev => !prev)
    }

    return (
        <main className={styles.searchPageMain}>
            <section className={styles.searchMain}>
                <div className={`${styles.asideContainer} ${isMobileFilterOn ? `${styles.open}` : `${styles.close}`}`}>   
                    <button className={styles.filterCloseBtn} onClick={() => setIsMobileFilterOn(prev => !prev)}>
                        <img src={close} alt="close icon" />
                    </button>
                    <AsideFilter
                        breeds={breeds}
                        selectedBreed={selectedBreed}
                        setSelectedBreed={setSelectedBreed}
                        ageMin={ageMin}
                        setAgeMin={setAgeMin}
                        ageMax={ageMax}
                        setAgeMax={setAgeMax}
                        zipCodes={zipCodes}
                        setZipCodes={setZipCodes}
                    />
                </div>
                <section>
                    <div className={styles.searchSectionHeader}>
                        <h1>Find Your Dog</h1>
                        <div className={styles.gridActionBtns}>
                            <button className={`${styles.filterSelect} ${styles.mobileFilter}`} onClick={toggleFilter}>
                                <span>Filter</span>
                                <img src={filter} alt="filter icon" />
                            </button>

                            <select className={styles.filterSelect} onChange={(e) => setSortOrder(e.target.value)}>                
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </select>
                        </div>                        
                    </div>
            
                    <div className={styles.cardGrid}>
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
                </section>
            </section>  

            <div className={styles.pagination}>
                <button onClick={handlePrevPage} disabled={currentPage === 1}>
                    Prev
                </button>
                <span> Page {currentPage} </span>
                <button onClick={handleNextPage} disabled={(currentPage * pageSize) >= totalResults}>
                    Next
                </button>
            </div>          
        </main>
    )
}

export default SearchPage