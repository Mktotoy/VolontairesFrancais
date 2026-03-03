"use client";

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

type QuestionType = 'select' | 'multi-select' | 'range' | 'text' | 'email' | 'info';

interface Question {
    id: string;
    type: QuestionType;
    label: string;
    description?: string;
    options?: string[];
    min?: number;
    max?: number;
    step?: number;
    condition?: (answers: Record<string, any>) => boolean;
    required?: boolean;
    placeholder?: string;
}

const QUESTIONS: Question[] = [
    {
        id: 'intro',
        type: 'info',
        label: 'RETEX – Questionnaire Volontaires',
        description: 'Merci de prendre quelques minutes pour partager votre expérience en tant que volontaire aux Jeux de Milano Cortina 2026.',
    },
    // 1) Qui sont les volontaires ?
    {
        id: 'age',
        type: 'select',
        label: 'Catégorie d’âge',
        options: ['18 – 25 ans', '26 – 35 ans', '36 – 45 ans', '46 – 55 ans', '56 – 65 ans', '+ 65 ans'],
        required: true
    },
    {
        id: 'genre',
        type: 'select',
        label: 'Genre',
        options: ['Femme', 'Homme', 'Non binaire'],
        required: true
    },
    {
        id: 'region',
        type: 'select',
        label: 'Région géographique',
        options: [
            'Auvergne-Rhône-Alpes', 'Bourgogne-Franche-Comté', 'Bretagne', 'Centre-Val de Loire',
            'Corse', 'Grand Est', 'Hauts-de-France', 'Île-de-France', 'Normandie',
            'Nouvelle-Aquitaine', 'Occitanie', 'Pays de la Loire', 'Provence-Alpes-Côte d’Azur',
            'Guadeloupe', 'Martinique', 'Guyane', 'La Réunion', 'Mayotte', 'Expatrié(e) français(e)'
        ],
        required: true
    },
    {
        id: 'region_expat',
        type: 'text',
        label: 'Précisez votre pays d’expatriation',
        condition: (a) => a.region === 'Expatrié(e) français(e)',
        required: true
    },
    {
        id: 'accompagnement',
        type: 'select',
        label: 'Aviez-vous besoin d’un accompagnement particulier durant votre mission ?',
        options: ['Oui', 'Non'],
        required: true
    },
    {
        id: 'paris2024',
        type: 'select',
        label: 'Étiez-vous volontaire aux Jeux d’été de Paris 2024 ?',
        options: ['Oui', 'Non'],
        required: true
    },
    {
        id: 'autres_jo',
        type: 'select',
        label: 'Aviez-vous participé à d’autres Jeux olympiques comme volontaire ?',
        options: ['Oui', 'Non'],
        required: true
    },
    {
        id: 'autres_hiver',
        type: 'select',
        label: 'Aviez-vous déjà participé à d’autres Jeux d’hiver comme volontaire ?',
        options: ['Oui', 'Non'],
        required: true
    },
    {
        id: 'benevole_hiver',
        type: 'select',
        label: 'Êtes-vous bénévole lors d’événements internationaux de sports d’hiver ?',
        options: ['Oui', 'Non'],
        required: true
    },
    {
        id: 'reserviste',
        type: 'select',
        label: 'Étiez-vous réserviste avant d’obtenir une mission ?',
        options: ['Oui', 'Non'],
        required: true
    },
    // 2) Quel rôle lors des Jeux ?
    {
        id: 'type_jeux',
        type: 'select',
        label: 'Vous étiez missionné(e) :',
        options: ['Sur les Jeux Olympiques', 'Sur les Jeux Paralympiques', 'Sur les deux'],
        required: true
    },
    {
        id: 'sites_affectation',
        type: 'multi-select',
        label: 'Sur quel(s) site(s) étiez-vous affecté(e) ?',
        options: ['MILAN', 'CORTINA D’AMPEZZO', 'VERONA', 'VAL DI FIEMME', 'VALTELLINA', 'ANTERSELVA'],
        required: true
    },
    // Sub-site questions (Open Text Field for "Autres" items)
    {
        id: 'milan_venues',
        type: 'multi-select',
        label: 'Précisez votre site à MILAN',
        condition: (a) => a.sites_affectation?.includes('MILAN'),
        options: [
            'San Siro', 'Milano Speed Skating Stadium', 'Milano Ice Hockey Arena', 'Milano Rho Hockey Arena',
            'Ice Skating Arena', 'Piazza Duomo', 'Village olympique', 'Chauffeur', 'Media Center', 'Autres (une précision vous sera demandée juste après)'
        ],
        required: true
    },
    {
        id: 'milan_autres',
        type: 'text',
        label: 'Veuillez préciser (MILAN)',
        condition: (a) => a.milan_venues?.some((v: string) => v.startsWith('Autres')),
        required: true
    },
    {
        id: 'cortina_venues',
        type: 'multi-select',
        label: 'Précisez votre site à CORTINA D’AMPEZZO',
        condition: (a) => a.sites_affectation?.includes('CORTINA D’AMPEZZO'),
        options: ['Tofane', 'Sliding Centre', 'Curling Stadium', 'Village olympique', 'Chauffeur', 'Media Center', 'Autres (une précision vous sera demandée juste après)'],
        required: true
    },
    {
        id: 'cortina_autres',
        type: 'text',
        label: 'Veuillez préciser (CORTINA)',
        condition: (a) => a.cortina_venues?.some((v: string) => v.startsWith('Autres')),
        required: true
    },
    {
        id: 'verona_venues',
        type: 'multi-select',
        label: 'Précisez votre site à VERONA',
        condition: (a) => a.sites_affectation?.includes('VERONA'),
        options: ['Arènes de Vérone', 'Autres (une précision vous sera demandée juste après)'],
        required: true
    },
    {
        id: 'verona_autres',
        type: 'text',
        label: 'Veuillez préciser (VERONA)',
        condition: (a) => a.verona_venues?.some((v: string) => v.startsWith('Autres')),
        required: true
    },
    {
        id: 'fiemme_venues',
        type: 'multi-select',
        label: 'Précisez votre site à VAL DI FIEMME',
        condition: (a) => a.sites_affectation?.includes('VAL DI FIEMME'),
        options: ['Predazzo', 'Tesero', 'Village olympique', 'Chauffeur', 'Media Center', 'Autres (une précision vous sera demandée juste après)'],
        required: true
    },
    {
        id: 'fiemme_autres',
        type: 'text',
        label: 'Veuillez préciser (VAL DI FIEMME)',
        condition: (a) => a.fiemme_venues?.some((v: string) => v.startsWith('Autres')),
        required: true
    },
    {
        id: 'valtellina_venues',
        type: 'multi-select',
        label: 'Précisez votre site à VALTELLINA',
        condition: (a) => a.sites_affectation?.includes('VALTELLINA'),
        options: ['Livigno', 'Bormio Stelvio', 'Village olympique', 'Chauffeur', 'Media Center', 'Autres (une précision vous sera demandée juste après)'],
        required: true
    },
    {
        id: 'valtellina_autres',
        type: 'text',
        label: 'Veuillez préciser (VALTELLINA)',
        condition: (a) => a.valtellina_venues?.some((v: string) => v.startsWith('Autres')),
        required: true
    },
    {
        id: 'anterselva_venues',
        type: 'multi-select',
        label: 'Précisez votre site à ANTERSELVA',
        condition: (a) => a.sites_affectation?.includes('ANTERSELVA'),
        options: ['Südtirol Arena', 'Village olympique', 'Chauffeur', 'Media Center', 'Autres (une précision vous sera demandée juste après)'],
        required: true
    },
    {
        id: 'anterselva_autres',
        type: 'text',
        label: 'Veuillez préciser (ANTERSELVA)',
        condition: (a) => a.anterselva_venues?.some((v: string) => v.startsWith('Autres')),
        required: true
    },
    {
        id: 'mission_principale',
        type: 'select',
        label: 'Quelle était votre mission principale ?',
        options: ['EVS', 'Assistant Famille Olympique', 'Accréditations / Uniformes', 'Médias', 'Sports', 'Chauffeur', 'Fonction support', 'Autres (une précision vous sera demandée juste après)'],
        required: true
    },
    {
        id: 'mission_autres',
        type: 'text',
        label: 'Veuillez préciser votre mission',
        condition: (a) => a.mission_principale?.startsWith('Autres'),
        required: true
    },
    {
        id: 'satisfaction_globale',
        type: 'range',
        label: 'Êtes-vous satisfait(e) de votre expérience globale ?',
        description: '1 = Pas du tout | 10 = Tout à fait',
        min: 1, max: 10, step: 1, required: true
    },
    {
        id: 'commentaires_libres',
        type: 'text',
        label: 'Autres commentaires',
        placeholder: 'Pleine expression libre...',
        required: false
    },
    {
        id: 'email',
        type: 'email',
        label: 'Votre adresse e-mail',
        description: '(Facultatif) Pour recevoir les résultats',
        required: false
    },
    {
        id: 'merci',
        type: 'info',
        label: 'Merci !',
        description: 'Vos réponses sont enregistrées. Retourner sur le site ?',
    }
];

export default function Questionnaire() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, any>>({});
    const [isLoaded, setIsLoaded] = useState(false);

    const visibleQuestions = QUESTIONS.filter(q => !q.condition || q.condition(answers));
    const currentQuestion = visibleQuestions[currentIndex];

    // UI Logic
    const percentage = Math.round(((currentIndex + 1) / visibleQuestions.length) * 100);
    const getNPSColor = (num: number) => {
        if (num <= 3) return '#eb2f50'; // Red
        if (num <= 6) return '#fcb133'; // Yellow/Orange
        if (num <= 8) return '#86c232'; // Light Green
        return '#07a459'; // Green
    };

    useEffect(() => {
        const savedAnswers = localStorage.getItem('retex_survey_v2_answers');
        if (savedAnswers) setAnswers(JSON.parse(savedAnswers));

        const savedIndex = localStorage.getItem('retex_survey_v2_index');
        if (savedIndex) setCurrentIndex(parseInt(savedIndex, 10));

        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('retex_survey_v2_answers', JSON.stringify(answers));
            localStorage.setItem('retex_survey_v2_index', currentIndex.toString());
        }
    }, [answers, currentIndex, isLoaded]);

    const resetSurvey = () => {
        if (confirm("Voulez-vous recommencer l'enquête à zéro ?")) {
            localStorage.removeItem('retex_survey_v2_answers');
            localStorage.removeItem('retex_survey_v2_index');
            setAnswers({});
            setCurrentIndex(0);
        }
    };

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    // CONFIGURATION: Remplacez cette URL par l'URL de votre application web Google Apps Script
    const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwYDdn2KAYaWc-AwO6MYO6Tx7aFBvK-5BN4CuLiHdBQHLqhoE5e1PZ_PI1MGm97O8Fs/exec";

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const response = await fetch(APPS_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', // Apps Script requires no-cors if not handling preflight/headers specifically
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(answers)
            });

            // Note: with no-cors, we won't get a proper JSON response back but the data is sent
            setIsSubmitted(true);
            localStorage.removeItem('retex_survey_v2_answers');
            localStorage.removeItem('retex_survey_v2_index');
        } catch (error) {
            console.error("Submission error:", error);
            setSubmitError("Une erreur est survenue lors de l'envoi. Veuillez réessayer.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleNext = useCallback(() => {
        if (currentIndex < visibleQuestions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    }, [currentIndex, visibleQuestions.length]);

    const handlePrev = useCallback(() => {
        if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
    }, [currentIndex]);

    const setValue = (val: any) => {
        setAnswers(prev => ({ ...prev, [currentQuestion.id]: val }));
    };

    const toggleMultiValue = (opt: string) => {
        const selected = answers[currentQuestion.id] || [];
        const isActive = selected.includes(opt);
        if (isActive) setValue(selected.filter((s: string) => s !== opt));
        else setValue([...selected, opt]);
    };

    const canGoNext = () => {
        if (!currentQuestion || currentQuestion.type === 'info') return true;
        if (!currentQuestion.required) return true;
        const answer = answers[currentQuestion.id];
        if (currentQuestion.type === 'multi-select') return Array.isArray(answer) && answer.length > 0;
        if (currentQuestion.type === 'range') return typeof answer === 'number';
        return !!answer;
    };

    if (!isLoaded) return null;

    return (
        <div className="survey-immersive">
            <div className="survey-content">
                <header className="survey-header">
                    <div className="header-nav">
                        <Link href="/" className="site-link">
                            <i className="fas fa-chevron-left"></i> Retour au site
                        </Link>
                        {currentIndex > 0 && (
                            <button onClick={resetSurvey} className="reset-link">
                                <i className="fas fa-redo"></i> Recommencer
                            </button>
                        )}
                    </div>
                    <div className="progress-wrap">
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${percentage}%` }}></div>
                        </div>
                        <span className="step-count">{currentIndex + 1} / {visibleQuestions.length} ({percentage}%)</span>
                    </div>
                </header>

                <main className="survey-question">
                    <h1 className="label-text">{currentQuestion.label}</h1>
                    {currentQuestion.description && <p className="desc-text">{currentQuestion.description}</p>}

                    <div className="input-area">
                        {currentQuestion.type === 'select' && (
                            <div className="select-grid">
                                {currentQuestion.options?.map(opt => (
                                    <button
                                        key={opt}
                                        className={`bubble-btn ${answers[currentQuestion.id] === opt ? 'active' : ''}`}
                                        onClick={() => { setValue(opt); setTimeout(handleNext, 300); }}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        )}

                        {currentQuestion.type === 'multi-select' && (
                            <div className="select-grid">
                                {currentQuestion.options?.map(opt => {
                                    const selected = answers[currentQuestion.id] || [];
                                    const isActive = selected.includes(opt);
                                    return (
                                        <button
                                            key={opt}
                                            className={`bubble-btn multi ${isActive ? 'active' : ''}`}
                                            onClick={() => toggleMultiValue(opt)}
                                        >
                                            {opt}
                                            {isActive && <i className="fas fa-check-circle ml-2"></i>}
                                        </button>
                                    );
                                })}
                            </div>
                        )}

                        {currentQuestion.type === 'range' && (
                            <div className="nps-container">
                                <div className="nps-grid">
                                    {Array.from({ length: (currentQuestion.max || 10) - (currentQuestion.min || 1) + 1 }, (_, i) => (currentQuestion.min || 1) + i).map(num => (
                                        <button
                                            key={num}
                                            className={`nps-btn ${answers[currentQuestion.id] === num ? 'active' : ''}`}
                                            style={{
                                                '--hover-color': getNPSColor(num),
                                                borderColor: answers[currentQuestion.id] === num ? getNPSColor(num) : 'rgba(255,255,255,0.1)',
                                                backgroundColor: answers[currentQuestion.id] === num ? getNPSColor(num) : 'rgba(255,255,255,0.05)',
                                                color: answers[currentQuestion.id] === num ? '#fff' : '#fff'
                                            } as any}
                                            onClick={() => {
                                                setValue(num);
                                                setTimeout(handleNext, 400);
                                            }}
                                        >
                                            {num}
                                        </button>
                                    ))}
                                </div>
                                <div className="nps-labels">
                                    <span>{currentQuestion.description?.split('|')[0] || 'Pas du tout'}</span>
                                    <span>{currentQuestion.description?.split('|')[1] || 'Tout à fait'}</span>
                                </div>
                            </div>
                        )}

                        {(currentQuestion.type === 'text' || currentQuestion.type === 'email') && (
                            <input
                                type={currentQuestion.type}
                                value={answers[currentQuestion.id] || ''}
                                onChange={(e) => setValue(e.target.value)}
                                placeholder={currentQuestion.placeholder || '...'}
                                className="open-input"
                                autoFocus
                                onKeyDown={(e) => e.key === 'Enter' && canGoNext() && handleNext()}
                            />
                        )}

                        {currentQuestion.type === 'info' && (
                            <div className="info-decor">
                                <i className={`fas ${currentQuestion.id === 'merci' ? 'fa-check-circle' : 'fa-star'} fa-4x`}></i>
                                {currentQuestion.id === 'merci' && (
                                    <div className="submit-status">
                                        {isSubmitting && <p className="status-text loading"><i className="fas fa-spinner fa-spin"></i> Envoi en cours...</p>}
                                        {isSubmitted && (
                                            <div className="success-area">
                                                <p className="status-text success"><i className="fas fa-check"></i> Vos réponses ont été enregistrées !</p>
                                                <div className="finish-ctas">
                                                    <Link href="/" className="cta-box">
                                                        <i className="fas fa-search"></i>
                                                        <span>Découvrir l'association</span>
                                                    </Link>
                                                    <Link href="/adhesion" className="cta-box highlight">
                                                        <i className="fas fa-id-card"></i>
                                                        <span>Adhérer à l'association</span>
                                                    </Link>
                                                </div>
                                            </div>
                                        )}
                                        {submitError && <p className="status-text error"><i className="fas fa-exclamation-triangle"></i> {submitError}</p>}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </main>

                <footer className="survey-footer">
                    <div className="logo-area">
                        <img src="/assets/favicon.ico" alt="Logo" className="logo" />
                        <span className="logo-name">Volontaires français</span>
                    </div>

                    <div className="nav-area">
                        {currentIndex > 0 && !isSubmitted && (
                            <button onClick={handlePrev} className="nav-btn prev">Précédent</button>
                        )}
                        {currentIndex < visibleQuestions.length - 1 ? (
                            <button onClick={handleNext} disabled={!canGoNext()} className="nav-btn next">Suivant</button>
                        ) : (
                            <>
                                {!isSubmitted ? (
                                    <button
                                        onClick={handleSubmit}
                                        disabled={isSubmitting}
                                        className="nav-btn finish pulse"
                                    >
                                        {isSubmitting ? 'Envoi...' : 'Envoyer mes réponses'}
                                    </button>
                                ) : (
                                    <Link href="/" className="nav-btn site-back">Retour au site principal</Link>
                                )}
                            </>
                        )}
                    </div>
                </footer>
            </div>

            <style jsx global>{`
                .survey-immersive {
                    width: 100vw;
                    height: 100vh;
                    display: flex;
                    flex-direction: column;
                    color: white;
                    font-family: Arial, sans-serif;
                }
                .survey-content {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    max-width: 900px;
                    width: 100%;
                    margin: 0 auto;
                    padding: 0 2rem;
                }
                .survey-header { height: 120px; display: flex; flex-direction: column; justify-content: center; gap: 15px; }
                .header-nav { display: flex; justify-content: space-between; align-items: center; width: 100%; }
                .site-link { color: rgba(255,255,255,0.7); text-decoration: none; font-weight: bold; font-size: 0.9rem; transition: color 0.2s; display: flex; align-items: center; gap: 8px; }
                .site-link:hover { color: white; }
                .reset-link { background: none; border: none; color: rgba(255,255,255,0.5); font-size: 0.8rem; cursor: pointer; display: flex; align-items: center; gap: 5px; transition: color 0.2s; }
                .reset-link:hover { color: #eb2f50; }
                
                .progress-wrap { width: 100%; display: flex; align-items: center; gap: 20px; }
                .progress-bar { flex: 1; height: 4px; background: rgba(255,255,255,0.1); border-radius: 2px; }
                .progress-fill { height: 100%; background: #fcb133; transition: width 0.5s ease; }
                .step-count { font-size: 0.8rem; font-weight: bold; opacity: 0.6; }

                .survey-question { flex: 1; display: flex; flex-direction: column; justify-content: center; padding-bottom: 50px; }
                .label-text { font-size: 2.5rem; font-weight: 900; line-height: 1.1; margin-bottom: 1rem; }
                .desc-text { font-size: 1.2rem; opacity: 0.8; margin-bottom: 2.5rem; }

                .select-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; }
                .bubble-btn {
                    padding: 1.2rem;
                    background: rgba(255,255,255,0.05);
                    border: 2px solid rgba(255,255,255,0.1);
                    border-radius: 12px;
                    color: white;
                    font-size: 1.1rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s;
                    text-align: left;
                }
                .bubble-btn:hover { background: rgba(255,255,255,0.1); border-color: white; }
                .bubble-btn.active { background: white; color: #067fcc; box-shadow: 0 10px 30px rgba(0,0,0,0.2); }

                .nps-container { width: 100%; max-width: 600px; margin: 0 auto; }
                .nps-grid { display: flex; justify-content: space-between; gap: 8px; margin-bottom: 1.5rem; flex-wrap: wrap; }
                .nps-btn {
                    flex: 1;
                    min-width: 45px;
                    height: 60px;
                    background: rgba(255,255,255,0.05);
                    border: 2px solid rgba(255,255,255,0.1);
                    border-radius: 10px;
                    color: white;
                    font-size: 1.2rem;
                    font-weight: 800;
                    cursor: pointer;
                    transition: all 0.2s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .nps-btn:hover { border-color: var(--hover-color) !important; background: rgba(255,255,255,0.1); }
                .nps-btn.active { transform: scale(1.1); box-shadow: 0 10px 20px rgba(0,0,0,0.2); }
                .nps-labels { display: flex; justify-content: space-between; font-size: 0.9rem; font-weight: 700; opacity: 0.7; color: white; text-transform: uppercase; letter-spacing: 0.5px; }

                .progress-info { display: flex; justify-content: space-between; width: 100%; font-size: 0.8rem; font-weight: 700; color: white; margin-bottom: 4px; opacity: 0.8; }

                .finish-ctas { display: flex; gap: 1rem; justify-content: center; margin-top: 2rem; }
                .cta-box {
                    flex: 1;
                    max-width: 200px;
                    padding: 1.5rem 1rem;
                    background: rgba(255,255,255,0.1);
                    border: 2px solid rgba(255,255,255,0.1);
                    border-radius: 12px;
                    color: white;
                    text-decoration: none;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0.75rem;
                    transition: all 0.2s;
                    font-weight: 700;
                    text-align: center;
                }
                .cta-box i { font-size: 1.5rem; }
                .cta-box span { font-size: 0.9rem; }
                .cta-box:hover { background: rgba(255,255,255,0.2); transform: translateY(-3px); border-color: white; }
                .cta-box.highlight { background: #fcb133; color: #333; border-color: #fcb133; }
                .cta-box.highlight:hover { background: #ffc25b; transform: translateY(-3px); }

                .open-input {
                    width: 100%;
                    padding: 1rem 0;
                    background: transparent;
                    border: none;
                    border-bottom: 4px solid rgba(255,255,255,0.2);
                    font-size: 2rem;
                    color: white;
                    font-weight: 700;
                    outline: none;
                }
                .open-input::placeholder { color: rgba(255,255,255,0.2); }
                .open-input:focus { border-color: #fcb133; }

                .survey-footer { height: 120px; display: flex; align-items: center; justify-content: space-between; border-top: 1px solid rgba(255,255,255,0.1); }
                .logo-area { display: flex; align-items: center; gap: 12px; }
                .logo { height: 36px; }
                .logo-name { font-weight: 800; text-transform: uppercase; font-size: 0.9rem; letter-spacing: 1px; opacity: 0.8; }
                
                .nav-area { display: flex; gap: 15px; }
                .nav-btn {
                    padding: 0.8rem 1.6rem;
                    border-radius: 10px;
                    font-weight: 700;
                    border: 2px solid white;
                    background: transparent;
                    color: white;
                    cursor: pointer;
                    transition: all 0.2s;
                    text-decoration: none;
                }
                .nav-btn.next, .nav-btn.finish { background: white; color: #067fcc; }
                .nav-btn.site-back { background: #07a459; color: white; border-color: #07a459; }
                .nav-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.2); }
                .nav-btn:disabled { opacity: 0.3; cursor: not-allowed; }

                .pulse { animation: ripple 2s infinite; }
                @keyframes ripple {
                    0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4); }
                    70% { box-shadow: 0 0 0 20px rgba(255, 255, 255, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
                }

                .submit-status { margin-top: 2rem; }
                .status-text { font-size: 1.1rem; font-weight: 600; }
                .status-text.loading { color: #fcb133; }
                .status-text.success { color: #07a459; }
                .status-text.error { color: #eb2f50; }

                @media (max-width: 600px) {
                    .label-text { font-size: 1.8rem; }
                    .open-input { font-size: 1.5rem; }
                    .logo-name { display: none; }
                }
            `}</style>
        </div>
    );
}
