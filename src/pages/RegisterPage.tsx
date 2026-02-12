import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../api/auth';
import styles from './RegisterPage.module.css';

export default function RegisterPage() {
    const nav = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        birthDate: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);

        if (formData.password !== formData.confirmPassword) {
            setError("Les mots de passe ne correspondent pas");
            return;
        }

        try {
            setLoading(true);
            await register(formData);
            alert("Inscription réussie ! Veuillez vous connecter.");
            nav('/login');
        } catch (err: any) {
            console.error("REGISTER ERROR:", err);
            setError(err?.response?.data?.title || err?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.registerContainer}>
            <Link to="/" className={styles.backLink}>
                ← Accueil
            </Link>

            <h1 className={styles.title}>Bienvenue !</h1>

            <form onSubmit={onSubmit} className={styles.form}>
                <div className={styles.grid}>
                    {/* Row 1 */}
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Prénom</label>
                        <input
                            name="firstName"
                            className={styles.input}
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Nom</label>
                        <input
                            name="lastName"
                            className={styles.input}
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Row 2 */}
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Date de naissance</label>
                        <input
                            name="birthDate"
                            type="date"
                            className={styles.input}
                            value={formData.birthDate}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Empty Slot */}
                    <div className={styles.inputGroup}></div>

                    {/* Row 3 */}
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Mail</label>
                        <input
                            name="email"
                            type="email"
                            className={styles.input}
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Téléphone</label>
                        <input
                            name="phone"
                            type="tel"
                            className={styles.input}
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Row 4 */}
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Mot de passe</label>
                        <input
                            name="password"
                            type="password"
                            className={styles.input}
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Confirmation de mot de passe</label>
                        <input
                            name="confirmPassword"
                            type="password"
                            className={styles.input}
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <button type="submit" className={styles.submitButton} disabled={loading}>
                    {loading ? 'Inscription...' : 'S\'inscrire'}
                </button>

                {error && <p className={styles.error}>{error}</p>}
            </form>


        </div>
    );
}
