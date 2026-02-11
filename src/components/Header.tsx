import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function Header() {
    const { account, signOut } = useAuth();

    return (
        <header style={{ display: 'flex', gap: 20, padding: 20 }}>
            <Link to="/">Accueil</Link>
            <Link to="/planning">Planning et réservations</Link>
            <Link to="/pricing">Tarifs et abonnement</Link>
            <Link to="/more">A propos de nous</Link>

            <div style={{ marginLeft: 'auto' }}>
                {account ? (
                    <>
                        <Link to="/dashboard">Mon compte</Link>
                        <button onClick={signOut}>Déconnexion</button>
                    </>
                ) : (
                    <Link to="/login">Se connecter</Link>
                )}
            </div>
        </header>
    );
}
