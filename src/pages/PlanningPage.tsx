import { useState, useMemo, useRef, useEffect } from 'react';
import styles from './PlanningPage.module.css';
import studioHero from '../assets/studio-hero.png';

interface Session {
    id: string;
    time: string;
    duration: string;
    title: string;
    instructor: string;
    type: string;
    level: string; // 'Débutant', 'Intermédiaire', 'Avancé'
    date: string; // ISO string without time
}

const INSTRUCTORS = ['Mélanie', 'Thomas', 'Sarah', 'Julie', 'Antoine'];
const LEVELS = ['Débutant', 'Intermédiaire', 'Avancé'];

// Generate extensive mock data for 14 days
const generateMockData = (): Session[] => {
    const sessions: Session[] = [];
    const baseDate = new Date();

    for (let i = 0; i < 14; i++) {
        const currentDate = new Date();
        currentDate.setDate(baseDate.getDate() + i);
        const dateStr = currentDate.toISOString().split('T')[0];

        // Add 3-5 sessions per day
        const sessionCount = 3 + (i % 3);
        for (let j = 0; j < sessionCount; j++) {
            const hour = 9 + (j * 2);
            const time = `${hour.toString().padStart(2, '0')}:00`;
            const instructor = INSTRUCTORS[(i + j) % INSTRUCTORS.length];
            const level = LEVELS[(i + j) % LEVELS.length];

            sessions.push({
                id: `${i}-${j}`,
                time,
                duration: '50 min',
                title: `Cours de pilates reformer - niveau ${level.toLowerCase()}`,
                instructor,
                type: 'PILATES REFORMER',
                level,
                date: dateStr
            });
        }
    }
    return sessions;
};

const MOCK_SESSIONS = generateMockData();

export default function PlanningPage() {
    const today = new Date();
    const [selectedDate, setSelectedDate] = useState(today.toISOString().split('T')[0]);
    const [filterType, setFilterType] = useState('Tous');
    const [filterInstructor, setFilterInstructor] = useState('Tous');
    const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
    const [isInstructorDropdownOpen, setIsInstructorDropdownOpen] = useState(false);

    const dateListRef = useRef<HTMLDivElement>(null);

    // Generate next 14 days
    const dates = useMemo(() => {
        const result = [];
        for (let i = 0; i < 14; i++) {
            const d = new Date();
            d.setDate(today.getDate() + i);
            result.push({
                iso: d.toISOString().split('T')[0],
                dayName: i === 0 ? "aujourd'hui" : d.toLocaleDateString('fr-FR', { weekday: 'short' }),
                dayNumber: d.getDate(),
                fullDisplay: d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'short' })
            });
        }
        return result;
    }, []);

    const filteredSessions = MOCK_SESSIONS.filter(s => {
        const matchesDate = s.date === selectedDate;
        const matchesType = filterType === 'Tous' || s.level === filterType;
        const matchesInstructor = filterInstructor === 'Tous' || s.instructor === filterInstructor;
        return matchesDate && matchesType && matchesInstructor;
    });

    const selectedDateObj = dates.find(d => d.iso === selectedDate);

    const scrollDates = (direction: 'left' | 'right') => {
        if (dateListRef.current) {
            const scrollAmount = 200;
            dateListRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const handleDateClick = (iso: string) => {
        setSelectedDate(iso);
    };

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = () => {
            setIsTypeDropdownOpen(false);
            setIsInstructorDropdownOpen(false);
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const ChevronDown = () => (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
    );

    const ChevronLeft = () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
    );

    const ChevronRight = () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
    );

    return (
        <div className={styles.container}>
            <section className={styles.hero}>
                <img
                    src={studioHero}
                    alt="Studio Pilates"
                    className={styles.heroImage}
                />
                <div className={styles.heroContent}>
                    <h1>Planning et réservation</h1>
                </div>
            </section>

            <section className={styles.searchSection}>
                <div className={styles.searchHeader}>
                    <div>
                        <h2>Trouver un cours</h2>
                        <span className={styles.monthLabel}>
                            {new Date(selectedDate).toLocaleDateString('fr-FR', { month: 'long' })}
                        </span>
                    </div>
                    <div className={styles.filters}>
                        {/* Type de cours filter */}
                        <div className={styles.filterWrapper} onClick={(e) => e.stopPropagation()}>
                            <div
                                className={styles.filter}
                                onClick={() => {
                                    setIsTypeDropdownOpen(!isTypeDropdownOpen);
                                    setIsInstructorDropdownOpen(false);
                                }}
                            >
                                <ChevronDown /> Type de cours: {filterType}
                            </div>
                            {isTypeDropdownOpen && (
                                <div className={styles.dropdown}>
                                    <div
                                        className={`${styles.dropdownItem} ${filterType === 'Tous' ? styles.active : ''}`}
                                        onClick={() => { setFilterType('Tous'); setIsTypeDropdownOpen(false); }}
                                    >
                                        Tous les types
                                    </div>
                                    {LEVELS.map(level => (
                                        <div
                                            key={level}
                                            className={`${styles.dropdownItem} ${filterType === level ? styles.active : ''}`}
                                            onClick={() => { setFilterType(level); setIsTypeDropdownOpen(false); }}
                                        >
                                            {level}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Instructeur filter */}
                        <div className={styles.filterWrapper} onClick={(e) => e.stopPropagation()}>
                            <div
                                className={styles.filter}
                                onClick={() => {
                                    setIsInstructorDropdownOpen(!isInstructorDropdownOpen);
                                    setIsTypeDropdownOpen(false);
                                }}
                            >
                                <ChevronDown /> Instructeur: {filterInstructor}
                            </div>
                            {isInstructorDropdownOpen && (
                                <div className={styles.dropdown}>
                                    <div
                                        className={`${styles.dropdownItem} ${filterInstructor === 'Tous' ? styles.active : ''}`}
                                        onClick={() => { setFilterInstructor('Tous'); setIsInstructorDropdownOpen(false); }}
                                    >
                                        Tous les instructeurs
                                    </div>
                                    {INSTRUCTORS.map(name => (
                                        <div
                                            key={name}
                                            className={`${styles.dropdownItem} ${filterInstructor === name ? styles.active : ''}`}
                                            onClick={() => { setFilterInstructor(name); setIsInstructorDropdownOpen(false); }}
                                        >
                                            {name}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className={styles.datePicker}>
                    <button className={styles.navButton} onClick={() => scrollDates('left')}><ChevronLeft /></button>
                    <div className={styles.dateList} ref={dateListRef}>
                        {dates.map((date) => (
                            <div
                                key={date.iso}
                                className={`${styles.dateItem} ${selectedDate === date.iso ? styles.active : ''}`}
                                onClick={() => handleDateClick(date.iso)}
                            >
                                <span className={styles.dayName}>{date.dayName}</span>
                                <div className={styles.dayNumber}>{date.dayNumber}</div>
                            </div>
                        ))}
                    </div>
                    <button className={styles.navButton} onClick={() => scrollDates('right')}><ChevronRight /></button>
                </div>

                <div className={styles.sessionListHeader}>
                    <h3>{selectedDateObj?.fullDisplay}</h3>
                </div>

                <div className={styles.sessionList}>
                    {filteredSessions.length > 0 ? (
                        filteredSessions.map((session) => (
                            <div key={session.id} className={styles.sessionCard}>
                                <div className={styles.sessionTimeInfo}>
                                    <span className={styles.time}>{session.time}</span>
                                    <span className={styles.duration}>{session.duration}</span>
                                </div>
                                <div className={styles.sessionMainInfo}>
                                    <span className={styles.sessionTitle}>{session.title}</span>
                                    <span className={styles.instructor}>{session.instructor}</span>
                                    <span className={styles.detailsToggle}>
                                        Afficher les détails <ChevronDown />
                                    </span>
                                </div>
                                <div className={styles.sessionType}>
                                    {session.type}
                                </div>
                                <a href="#" className={styles.bookButton} onClick={(e) => e.preventDefault()}>
                                    S'inscrire
                                </a>
                            </div>
                        ))
                    ) : (
                        <div style={{ padding: '2rem 0', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
                            Aucune séance prévue pour ce jour avec ces filtres.
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
