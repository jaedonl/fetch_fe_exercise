import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authApi";
import { checkAuthStatus } from "../api/authApi";

const LoginPage: React.FC = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        const checkLoginStatus = async () => {
            const loggedIn = await checkAuthStatus();
            if (loggedIn) {
                navigate('/search');
            }
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
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input 
                    type="text" 
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <input 
                    type="email" 
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginPage