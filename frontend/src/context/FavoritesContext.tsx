import React, { createContext, useContext, useState, useEffect } from "react";

interface FavoritesContextType {
    favorites: string[];
    toggleFavorite: (id: string) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [favorites, setFavorites] = useState<string[]>(() => {
        return JSON.parse(localStorage.getItem("favoriteDogs") || "[]");
    });

    useEffect(() => {
        localStorage.setItem("favoriteDogs", JSON.stringify(favorites));
    }, [favorites]);
  
    const toggleFavorite = (id: string) => {
        setFavorites((prev) => {
            const updatedFavorites = prev.includes(id)
                ? prev.filter((fav) => fav !== id)
                : [...prev, id];
            localStorage.setItem("favoriteDogs", JSON.stringify(updatedFavorites));
            return updatedFavorites;
        });
    };
  
    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error("useFavorites must be used within a FavoritesProvider");
    }
    return context;
};
  