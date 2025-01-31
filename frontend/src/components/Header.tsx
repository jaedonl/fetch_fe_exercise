import {useState, useEffect} from 'react'
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../api/authApi";
import styles from "../styles/components/Header.module.scss";
import heartFilled from '../assets/heart-fill.svg';
import { checkAuthStatus } from '../api/authApi';
import { useFavorites } from "../context/FavoritesContext";

const Header = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const { favorites } = useFavorites();

    useEffect(() => {
        const isLoggedIn = async () => {
            try {
                const loggedIn = await checkAuthStatus();
                if (!loggedIn) setIsLoggedIn(false)
                else setIsLoggedIn(true)
    
            } catch (error) {
                console.log("Error fetching breeds:", error)
            }
        }
        isLoggedIn();
    }, [navigate])

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/')
        } catch (error) {
            console.error("error logging out: ", error);
        }
    }

    const handleMatch = () => {
        if (favorites.length === 0) {
            alert("Please select at least one favorite dog.");
            return;
        }
        const existingFavorites = JSON.parse(localStorage.getItem("favoriteDogs") || "[]");
        const updatedFavorites = [...new Set([...existingFavorites, ...favorites])];

        // Store selected favorites in localStorage
        localStorage.setItem("favoriteDogs", JSON.stringify(updatedFavorites));
        navigate("/match");
    };

    return (
        <header>
            <div className={styles.headerWrapper}>
                {/* <p style={{ color: "#fff", fontSize: '24px', fontWeight: 800, margin: 0}}>Jaedon Loves Dogs :)</p> */}
                <Link to="/" className={styles.logo}>Jaedon Loves Dogs <span style={{color: '#FFa900'}}>:)</span></Link>


                <div className={styles.headerLink}>
                    {isLoggedIn && (
                        <button onClick={handleMatch} disabled={!favorites} className={styles.matchLink}>
                            <img src={heartFilled} alt='heart filled' className={styles.heart} />
                            <span className={styles.hideOnMobile}>Find My Match</span>                        
                        </button>
                    )}
                    
                    <button onClick={handleLogout}>
                        {isLoggedIn ? ('Logout') : ('Login')}                        
                    </button>
                </div>
                
            </div>
        </header>
    )
}

export default Header