import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authApi";
import { checkAuthStatus } from "../api/authApi";
import styles from '../styles/pages/Login.module.scss'

const LoginPage: React.FC = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        const checkLoginStatus = async () => {
            const loggedIn = await checkAuthStatus();
            if (loggedIn) navigate('/search');
        }
        checkLoginStatus();
    }, [navigate])

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(name, email);
            navigate("/search");
        } catch (error) {
            alert("login failed. Please check your credentials.");
        }
    }

    return (
        <main className={styles.loginPage}>
            <h1 className={styles.loginTitle}>Login</h1>
            <form onSubmit={handleLogin}>
                <div className={styles.formElementWrapper}>
                    <label className={styles.loginLabel}>Name</label>
                    <input 
                        className={styles.loginInput}
                        type="text" 
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className={styles.formElementWrapper}>
                    <label className={styles.loginLabel}>Email</label>
                    <input 
                        className={styles.loginInput}
                        type="email" 
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </main>
    )
}

export default LoginPage