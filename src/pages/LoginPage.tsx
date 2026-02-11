import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth';
import { useAuth } from '../auth/AuthContext';

export default function LoginPage() {
    const nav = useNavigate();
    const { refresh } = useAuth();
    const [username, setUsername] = useState('user');
    const [password, setPassword] = useState('user');
    const [error, setError] = useState<string | null>(null);

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        console.log("LOGIN CLICKED");
        setError(null);
        try {
            await login(username, password);
            await refresh();
            nav('/events');
        } catch (err: any) {
            console.error("LOGIN ERROR:", err);
            setError(err?.message || "Login failed");
        }

    };

    return (
        <form onSubmit={onSubmit}>
            <h1>Login</h1>
            <input value={username} onChange={e => setUsername(e.target.value)} placeholder="username" />
            <input value={password} onChange={e => setPassword(e.target.value)} placeholder="password" type="password" />
            <button type="submit">Sign in</button>
            {error && <p style={{ color: 'crimson' }}>{error}</p>}
        </form>
    );


}
