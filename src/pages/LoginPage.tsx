import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api/auth';
import { useAuth } from '../auth/AuthContext';
import styles from './LoginPage.module.css';

export default function LoginPage() {
    const nav = useNavigate();
    const { refresh } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
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
        <div className={styles.loginContainer}>
            <Link to="/" className={styles.backLink}>
                ← Accueil
            </Link>

            <h1 className={styles.title}>Bienvenue !</h1>

            <form onSubmit={onSubmit} className={styles.form}>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Email / Numéro de téléphone</label>
                    <input
                        className={styles.input}
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        placeholder=""
                        required
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>Mot de passe</label>
                    <input
                        className={styles.input}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder=""
                        type="password"
                        required
                    />
                </div>

                <div className={styles.buttonGroup}>
                    <button type="submit" className={styles.submitButton}>
                        Se connecter
                    </button>
                    <Link to="/register" className={styles.registerButton}>
                        S'inscrire
                    </Link>
                </div>

                {error && <p className={styles.error}>{error}</p>}
            </form>
        </div>
    );
}

