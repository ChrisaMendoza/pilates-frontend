import { Link, useSearchParams } from 'react-router-dom';
import styles from './PaymentPage.module.css';

type PlanContent = {
    name: string;
    amount: string;
    subtitle: string;
};

const planMapping: Record<string, PlanContent> = {
    decouverte: {
        name: 'Découverte',
        amount: '59€',
        subtitle: 'Pack 4 séances',
    },
    essentiel: {
        name: 'Essentiel',
        amount: '129€',
        subtitle: 'Abonnement mensuel',
    },
    illimite: {
        name: 'Illimité',
        amount: '189€',
        subtitle: 'Abonnement mensuel',
    },
};

export default function PaymentPage() {
    const [searchParams] = useSearchParams();
    const selectedPlan = searchParams.get('plan') ?? 'essentiel';
    const plan = planMapping[selectedPlan] ?? planMapping.essentiel;

    return (
        <div className={styles.page}>
            <section className={styles.container}>
                <h1>Paiement</h1>
                <p className={styles.subtitle}>Vous êtes sur le point de souscrire à l’offre suivante :</p>

                <div className={styles.summaryCard}>
                    <h2>{plan.name}</h2>
                    <p className={styles.amount}>{plan.amount}</p>
                    <p>{plan.subtitle}</p>
                </div>

                <form className={styles.form}>
                    <label>
                        Nom sur la carte
                        <input type="text" placeholder="Ex: Marie Dupont" />
                    </label>
                    <label>
                        Numéro de carte
                        <input type="text" placeholder="1234 5678 9012 3456" />
                    </label>
                    <div className={styles.row}>
                        <label>
                            Expiration
                            <input type="text" placeholder="MM/AA" />
                        </label>
                        <label>
                            CVC
                            <input type="text" placeholder="123" />
                        </label>
                    </div>

                    <button type="button" className={styles.payButton}>
                        Payer {plan.amount}
                    </button>
                </form>

                <Link to="/pricing" className={styles.backLink}>← Retour aux tarifs</Link>
            </section>
        </div>
    );
}
