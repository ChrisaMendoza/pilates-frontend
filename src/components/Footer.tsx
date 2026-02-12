import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                <div className={styles.leftSection}>
                    <Link to="/" className={styles.logo}>
                        <img
                            src="/src/assets/core-logo.png"
                            alt="CORE"
                            className={styles.logoIcon}
                        />
                        <span className={styles.logoText}>CORE</span>
                    </Link>

                    <div className={styles.contactInfo}>
                        <p className={styles.contactItem}>06 20 03 62 99</p>
                        <p className={styles.contactItem}>contact@corepilates.fr</p>
                        <br />
                        <p className={styles.contactItem}>34 Boulevard Beaumarchais,</p>
                        <p className={styles.contactItem}>75011 Paris, France</p>
                    </div>

                    <div className={styles.socialIcons}>
                        <a href="#" className={styles.socialIcon} aria-label="Facebook">f</a>
                        <a href="#" className={styles.socialIcon} aria-label="Instagram">i</a>
                        <a href="#" className={styles.socialIcon} aria-label="X">x</a>
                        <a href="#" className={styles.socialIcon} aria-label="TikTok">t</a>
                    </div>
                </div>

                <div className={styles.rightSection}>
                    <nav className={styles.footerLinks}>
                        <Link to="#" className={styles.footerLink}>Politique de confidentialité</Link>
                        <Link to="#" className={styles.footerLink}>Déclaration d'accessibilité</Link>
                        <Link to="#" className={styles.footerLink}>Conditions générales</Link>
                        <Link to="#" className={styles.footerLink}>Politique de remboursement</Link>
                    </nav>
                </div>
            </div>

            <div className={styles.bottomBar}>
                <p>© {new Date().getFullYear()} by CORE STUDIO.</p>
            </div>
        </footer>
    );
}

