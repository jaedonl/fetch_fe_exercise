import React from 'react'
import styles from '../styles/components/AsideFilter.module.scss';

interface AsideFilterProps {
    breeds: string[];
    selectedBreed: string;
    setSelectedBreed: (breed: string) => void;
    ageMin: number | "";
    setAgeMin: (age: number | "") => void;
    ageMax: number | "";
    setAgeMax: (age: number | "") => void;
    zipCodes: string;
    setZipCodes: (zip: string) => void;
}

const AsideFilter: React.FC<AsideFilterProps> = ({
    breeds, selectedBreed, setSelectedBreed, ageMin, setAgeMin, ageMax, setAgeMax, zipCodes, setZipCodes
}) => {

    return (
        <aside className={`${styles.asideFilter}`}>
            <h2>Filters</h2>

            <div className={styles.formElementWrapper}>
                <label className={styles.filterLabel}>Breed:</label>
                <select className={styles.filterSelect} value={selectedBreed} onChange={(e) => setSelectedBreed(e.target.value)}>
                    <option value="">All Breeds</option>
                    {breeds.map((breed) => (
                        <option key={breed} value={breed}>{breed}</option>
                    ))}
                </select>
            </div>
            
            
            <div className={styles.formElementWrapper}>
                <label className={styles.filterLabel}>Age Min:</label>
                <input
                    className={styles.filterInput}
                    type="number"
                    value={ageMin}
                    onChange={(e) => setAgeMin(e.target.value === "" ? "" : Number(e.target.value))}
                    placeholder="Min Age"
                />
            </div>

            <div className={styles.formElementWrapper}>
                <label className={styles.filterLabel}>Age Max:</label>
                <input
                    className={styles.filterInput}
                    type="number"
                    value={ageMax}
                    onChange={(e) => setAgeMax(e.target.value === "" ? "" : Number(e.target.value))}
                    placeholder="Max Age"
                />
            </div>
    
            <div className={styles.formElementWrapper}>
                <label className={styles.filterLabel}>Zip Codes:</label>
                <input
                    className={styles.filterInput}
                    type="text"
                    value={zipCodes}
                    onChange={(e) => setZipCodes(e.target.value)}
                    placeholder="Enter Zip Codes"
                />
            </div>
            
      </aside>
    )
}

export default AsideFilter