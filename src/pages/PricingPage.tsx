import { Link } from 'react-router-dom';
import styles from './PricingPage.module.css';

type Plan = {
    id: string;
    name: string;
    price: string;
    cadence: string;
    description: string;
    features: string[];
    cta: string;
    popular?: boolean;
};

const plans: Plan[] = [
    {
        id: 'decouverte',
        name: 'Découverte',
        price: '59€',
        cadence: '/4 séances',
        description: 'Parfait pour tester le studio à votre rythme pendant 1 mois.',
        features: [
            '4 séances Signature Core for All',
            'Réservation jusqu’à 7 jours à l’avance',
            'Validité de 30 jours',
        ],
        cta: 'Choisir Découverte',
    },
    {
        id: 'essentiel',
        name: 'Essentiel',
        price: '129€',
        cadence: '/mois',
        description: 'Notre formule la plus choisie pour progresser semaine après semaine.',
        features: [
            '8 séances par mois',
            '1 invitation ami offerte',
            'Accès prioritaire aux créneaux du soir',
        ],
        cta: 'Choisir Essentiel',
        popular: true,
    },
    {
        id: 'illimite',
        name: 'Illimité',
        price: '189€',
        cadence: '/mois',
        description: 'Pour les membres réguliers qui veulent des résultats rapides.',
        features: [
            'Séances illimitées',
            'Accès Signature + Advanced Core',
            'Placement liste d’attente prioritaire',
        ],
        cta: 'Choisir Illimité',
    },
];

const faqs = [
    {
        question: 'Y a-t-il un engagement ?',
        answer: 'Non, toutes nos formules mensuelles sont sans engagement. Vous pouvez suspendre ou arrêter à tout moment depuis votre espace membre.',
    },
    {
        question: 'Puis-je reporter une séance ?',
        answer: 'Oui. Toute annulation effectuée au moins 12h avant le cours vous recrédite automatiquement la séance.',
    },
    {
        question: 'Les débutants sont-ils acceptés ?',
        answer: 'Absolument. Les coachs adaptent les options en fonction de votre niveau, et la formule Découverte est conçue pour bien démarrer.',
    },
];

export default function PricingPage() {
    return (
        <div className={styles.page}>
            <section className={styles.hero}>
                <p className={styles.heroKicker}>Tarifs et abonnement</p>
                <h1 className={styles.heroTitle}>Un abonnement pensé pour votre progression</h1>
                <p className={styles.heroSubtitle}>
                    Choisissez la formule qui correspond à votre rythme et profitez d’un coaching premium
                    au cœur de Paris.
                </p>
                <Link to="/" className={styles.backHomeButton}>
                    ← Revenir à l’accueil
                </Link>
            </section>

            <section className={styles.plansSection}>
                <div className={styles.plansGrid}>
                    {plans.map((plan) => (
                        <article key={plan.name} className={`${styles.card} ${plan.popular ? styles.popular : ''}`}>
                            {plan.popular && <span className={styles.badge}>Le plus populaire</span>}
                            <h2 className={styles.cardTitle}>{plan.name}</h2>
                            <p className={styles.price}>{plan.price}<span>{plan.cadence}</span></p>
                            <p className={styles.description}>{plan.description}</p>
                            <ul className={styles.features}>
                                {plan.features.map((feature) => (
                                    <li key={feature}>{feature}</li>
                                ))}
                            </ul>
                            <Link to={`/payment?plan=${plan.id}`} className={styles.ctaButton}>{plan.cta}</Link>
                        </article>
                    ))}
                </div>
            </section>

            <section className={styles.detailsSection}>
                <h3>Ce qui est inclus dans tous les abonnements</h3>
                <div className={styles.detailsGrid}>
                    <div className={styles.detailItem}>
                        <h4>Coaching certifié</h4>
                        <p>Encadrement personnalisé par des coachs experts de la méthode CORE.</p>
                    </div>
                    <div className={styles.detailItem}>
                        <h4>Studios premium</h4>
                        <p>Équipements Reformer haut de gamme, vestiaires et espace d’accueil confortable.</p>
                    </div>
                    <div className={styles.detailItem}>
                        <h4>Réservation en ligne</h4>
                        <p>Gestion simple des séances, annulations et mises en liste d’attente en quelques clics.</p>
                    </div>
                </div>
            </section>

            <section className={styles.faqSection}>
                <h3>Questions fréquentes</h3>
                <div className={styles.faqList}>
                    {faqs.map((faq) => (
                        <details key={faq.question} className={styles.faqItem}>
                            <summary>{faq.question}</summary>
                            <p>{faq.answer}</p>
                        </details>
                    ))}
                </div>
            </section>
        </div>
    );
}
