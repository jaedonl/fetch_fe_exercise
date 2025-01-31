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
            if (loggedIn) {
                setTimeout(() => navigate('/search'), 500);
            }
        }
        checkLoginStatus();
    }, [navigate])

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(name, email);
            setName(name);
            setEmail(email);
            localStorage.setItem("isLoggedIn", "true");
            setTimeout(() => navigate("/search"), 500);
        } catch (error) {
            alert("login failed. Please check your credentials.");
        }
    }

    return (
        <main className={styles.loginPage}>
            <h1 className={styles.loginTitle}>Login</h1>
            <form onSubmit={handleLogin} autoComplete="off" noValidate>
                <div className={styles.formElementWrapper}>
                    <label className={styles.loginLabel}>Name</label>
                    <input 
                        className={styles.loginInput}
                        type="text" 
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        autoComplete="off"
                    />
                </div>

                <div className={styles.formElementWrapper}>
                    <label className={styles.loginLabel}>Email</label>
                    <input 
                        className={styles.loginInput}
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="off"
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </main>
    )
}

export default LoginPage