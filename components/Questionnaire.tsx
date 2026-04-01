"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

import type { Question } from '@/lib/survey-questions';
import { SECTIONS, QUESTIONS } from '@/lib/survey-questions';
export type { QuestionType, Question } from '@/lib/survey-questions';
export { SECTIONS, QUESTIONS } from '@/lib/survey-questions';

const INTRO_MESSAGE = `Bonjour,
Les Jeux d'hiver de Milano Cortina se sont achevés ce dimanche 15 mars. En tant que Français(e) engagé(e) sur le terrain, vous avez eu l’honneur de vivre l'événement de l'intérieur.
Notre association Volontaires français lance une grande consultation auprès des 550 volontaires français mobilisés en Italie.

Pourquoi cette démarche ?
Dans quatre ans, la France accueillera les Jeux d'hiver (Alpes 2030). Les organisateurs vont bientôt concevoir le futur programme des volontaires. Pour s'assurer que les conditions d'accueil, d'hébergement et de mission soient optimales, nous avons besoin de nous appuyer sur votre réalité de terrain. Ce qui a fonctionné, ce qui a posé problème, et ce qu'il faut absolument éviter en France.

Nous avons préparé ce questionnaire de retour d'expérience (RETEX). Vos réponses nous permettront de construire un bilan concret que nous porterons auprès des futurs organisateurs.
Cela vous prendra une dizaine de minutes.

À la fin de ce questionnaire, si vous souhaitez prolonger l'aventure et garder le lien avec notre communauté des volontaires pour de futurs événements, vous trouverez les informations pour rejoindre notre association.

Un grand merci par avance pour le temps que vous accorderez à cette enquête. Bon retour et bon repos !

Sportivement,
L'équipe de l'association Volontaires français`;


export default function Questionnaire({ onBack }: { onBack?: () => void }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, any>>({});
    const [isLoaded, setIsLoaded] = useState(false);

    const visibleQuestions = QUESTIONS.filter(
        (q) => !q.condition || q.condition(answers),
    );
    const currentQuestion = visibleQuestions[currentIndex];

    // UI Logic
    const percentage = Math.round(
        ((currentIndex + 1) / visibleQuestions.length) * 100,
    );
    const getNPSColor = (num: number) => {
        if (num <= 3) return "#eb2f50"; // Red
        if (num <= 6) return "#fcb133"; // Yellow/Orange
        if (num <= 8) return "#86c232"; // Light Green
        return "#07a459"; // Green
    };

    const [hasProgress, setHasProgress] = useState(false);
    const [startTime] = useState(Date.now());

    useEffect(() => {
        const savedAnswers = localStorage.getItem("retex_survey_v4_answers");
        const savedIndex = localStorage.getItem("retex_survey_v4_index");

        if (savedAnswers && savedIndex) {
            setAnswers(JSON.parse(savedAnswers));
            setCurrentIndex(parseInt(savedIndex, 10));
            setHasProgress(true);
        }

        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem(
                "retex_survey_v4_answers",
                JSON.stringify(answers),
            );
            localStorage.setItem(
                "retex_survey_v4_index",
                currentIndex.toString(),
            );
        }
    }, [answers, currentIndex, isLoaded]);

    const resetSurvey = () => {
        if (confirm("Voulez-vous recommencer l'enquête à zéro ?")) {
            localStorage.removeItem("retex_survey_v4_answers");
            localStorage.removeItem("retex_survey_v4_index");
            setAnswers({});
            setCurrentIndex(0);
        }
    };

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    // CONFIGURATION: Remplacez cette URL par l'URL de votre application web Google Apps Script
    const APPS_SCRIPT_URL =
        "https://script.google.com/macros/s/AKfycbwYDdn2KAYaWc-AwO6MYO6Tx7aFBvK-5BN4CuLiHdBQHLqhoE5e1PZ_PI1MGm97O8Fs/exec";

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setSubmitError(null);

        // Tracking metadata
        const metadata = {
            user_agent: navigator.userAgent,
            screen_res: `${window.screen.width}x${window.screen.height}`,
            window_size: `${window.innerWidth}x${window.innerHeight}`,
            duration_seconds: Math.floor((Date.now() - startTime) / 1000),
            submit_time: new Date().toISOString(),
        };

        const finalData = {
            email: answers.email || null,
            answers: { ...answers, _metadata: metadata },
            version: "V4",
        };

        try {
            const response = await fetch("/api/enquete/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(finalData),
            });

            if (!response.ok) throw new Error("Failed to submit to database");

            // Also keep sending to Google Apps Script as backup
            try {
                await fetch(APPS_SCRIPT_URL, {
                    method: "POST",
                    mode: "no-cors",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(finalData),
                });
            } catch (e) {
                console.warn("GAS submission backup failed:", e);
            }

            setIsSubmitted(true);
            localStorage.removeItem("retex_survey_v4_answers");
            localStorage.removeItem("retex_survey_v4_index");
        } catch (error) {
            console.error("Submission error:", error);
            setSubmitError(
                "Une erreur est survenue lors de l'envoi. Veuillez réessayer.",
            );
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
        setAnswers((prev) => ({ ...prev, [currentQuestion.id]: val }));
    };

    const toggleMultiValue = (opt: string) => {
        const selected = answers[currentQuestion.id] || [];
        const isActive = selected.includes(opt);
        if (isActive) setValue(selected.filter((s: string) => s !== opt));
        else setValue([...selected, opt]);
    };

    const canGoNext = () => {
        if (!currentQuestion || currentQuestion.type === "info") return true;

        const answer = answers[currentQuestion.id];

        // Check email format if answer is provided
        if (currentQuestion.type === "email" && answer) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(answer)) return false;
        }

        if (!currentQuestion.required) return true;

        if (currentQuestion.type === "multi-select")
            return Array.isArray(answer) && answer.length > 0;
        if (currentQuestion.type === "range") return typeof answer === "number";
        return !!answer;
    };

    if (!isLoaded) return null;

    return (
        <div className="survey-immersive">
            <div className="survey-content">
                <header className="survey-header">
                    <div className="header-top">
                        <button
                            onClick={resetSurvey}
                            className="site-link"
                            style={{
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                padding: 0,
                            }}
                        >
                            <i className="fas fa-redo-alt"></i> Recommencer
                        </button>

                        <div className="section-stepper">
                            {SECTIONS.map((s, idx) => {
                                const isCurrent = currentQuestion.section === s;
                                const isPast =
                                    SECTIONS.indexOf(currentQuestion.section) >
                                    idx;
                                return (
                                    <div
                                        key={s}
                                        className={`section-dot-wrap ${isCurrent ? "active" : ""} ${isPast ? "past" : ""}`}
                                    >
                                        <div className="section-dot"></div>
                                        <span className="section-label">
                                            {s}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="progress-wrap">
                        <div className="progress-bar">
                            <div
                                className="progress-fill"
                                style={{ width: `${percentage}%` }}
                            ></div>
                        </div>
                        <span className="step-count">{percentage}%</span>
                    </div>
                </header>

                <main className="survey-question">
                    <div className="section-badge">
                        {currentQuestion.section}
                    </div>
                    <h1 className="label-text">{currentQuestion.label}</h1>
                    {currentQuestion.description && (
                        <p className="desc-text">
                            {currentQuestion.description}
                        </p>
                    )}

                    <div className="input-area">
                        {currentQuestion.type === "select" && (
                            <div className="select-grid">
                                {currentQuestion.options?.map((opt) => (
                                    <button
                                        key={opt}
                                        className={`bubble-btn ${answers[currentQuestion.id] === opt ? "active" : ""}`}
                                        onClick={() => {
                                            setValue(opt);
                                            setTimeout(handleNext, 800);
                                        }}
                                    >
                                        <div className="btn-content">
                                            <span>{opt}</span>
                                            {answers[currentQuestion.id] ===
                                                opt && (
                                                <i className="fas fa-check-circle animate-check"></i>
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}

                        {currentQuestion.type === "multi-select" && (
                            <div className="select-grid">
                                {currentQuestion.options?.map((opt) => {
                                    const selected =
                                        answers[currentQuestion.id] || [];
                                    const isActive = selected.includes(opt);
                                    return (
                                        <button
                                            key={opt}
                                            className={`bubble-btn multi ${isActive ? "active" : ""}`}
                                            onClick={() =>
                                                toggleMultiValue(opt)
                                            }
                                        >
                                            {opt}
                                            {isActive && (
                                                <i className="fas fa-check-circle ml-2"></i>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        )}

                        {currentQuestion.type === "range" && (
                            <div className="nps-container">
                                <div className="nps-grid">
                                    {Array.from(
                                        {
                                            length:
                                                (currentQuestion.max || 10) -
                                                (currentQuestion.min || 1) +
                                                1,
                                        },
                                        (_, i) =>
                                            (currentQuestion.min || 1) + i,
                                    ).map((num) => (
                                        <button
                                            key={num}
                                            className={`nps-btn ${answers[currentQuestion.id] === num ? "active" : ""}`}
                                            style={
                                                {
                                                    "--hover-color":
                                                        getNPSColor(num),
                                                    borderColor:
                                                        answers[
                                                            currentQuestion.id
                                                        ] === num
                                                            ? getNPSColor(num)
                                                            : "rgba(255,255,255,0.1)",
                                                    backgroundColor:
                                                        answers[
                                                            currentQuestion.id
                                                        ] === num
                                                            ? getNPSColor(num)
                                                            : "rgba(255,255,255,0.05)",
                                                    color:
                                                        answers[
                                                            currentQuestion.id
                                                        ] === num
                                                            ? "#fff"
                                                            : "#fff",
                                                } as any
                                            }
                                            onClick={() => {
                                                setValue(num);
                                                setTimeout(handleNext, 800);
                                            }}
                                        >
                                            {num}
                                        </button>
                                    ))}
                                </div>
                                <div className="nps-labels">
                                    {(() => {
                                        const parts = (
                                            currentQuestion.description || ""
                                        )
                                            .split("|")
                                            .map((s) => s.trim());
                                        if (parts.length >= 3) {
                                            return (
                                                <>
                                                    <span>{parts[0]}</span>
                                                    <span
                                                        style={{
                                                            textAlign: "center",
                                                        }}
                                                    >
                                                        {parts[1]}
                                                    </span>
                                                    <span
                                                        style={{
                                                            textAlign: "right",
                                                        }}
                                                    >
                                                        {parts[2]}
                                                    </span>
                                                </>
                                            );
                                        }
                                        return (
                                            <>
                                                <span>
                                                    {parts[0] || "Pas du tout"}
                                                </span>
                                                <span>
                                                    {parts[1] || "Tout à fait"}
                                                </span>
                                            </>
                                        );
                                    })()}
                                </div>
                            </div>
                        )}

                        {(currentQuestion.type === "text" ||
                            currentQuestion.type === "email") && (
                            <div className="input-group">
                                <input
                                    type={currentQuestion.type}
                                    value={answers[currentQuestion.id] || ""}
                                    onChange={(e) => setValue(e.target.value)}
                                    placeholder={
                                        currentQuestion.placeholder || "..."
                                    }
                                    className="open-input"
                                    autoFocus
                                    onKeyDown={(e) =>
                                        e.key === "Enter" &&
                                        canGoNext() &&
                                        handleNext()
                                    }
                                />
                                {currentQuestion.type === "email" &&
                                    answers[currentQuestion.id] &&
                                    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                                        answers[currentQuestion.id],
                                    ) && (
                                        <p className="validation-error">
                                            <i className="fas fa-exclamation-circle"></i>{" "}
                                            Veuillez entrer une adresse e-mail
                                            valide.
                                        </p>
                                    )}
                            </div>
                        )}

                        {currentQuestion.type === "info" && (
                            <div className="info-decor">
                                <i
                                    className={`fas ${currentQuestion.id === "merci" ? "fa-check-circle" : "fa-star"} fa-4x`}
                                ></i>
                                {currentQuestion.id === "merci" && (
                                    <div className="submit-status">
                                        {isSubmitting && (
                                            <p className="status-text loading">
                                                <i className="fas fa-spinner fa-spin"></i>{" "}
                                                Envoi en cours...
                                            </p>
                                        )}
                                        {isSubmitted && (
                                            <div className="success-area">
                                                <p className="status-text success">
                                                    <i className="fas fa-check"></i>{" "}
                                                    Vos réponses ont été
                                                    enregistrées !
                                                </p>
                                                <div className="finish-ctas">
                                                    <Link
                                                        href="/"
                                                        className="cta-box"
                                                    >
                                                        <i className="fas fa-search"></i>
                                                        <span>
                                                            Découvrir
                                                            l'association
                                                        </span>
                                                    </Link>
                                                    <Link
                                                        href="/adhesion"
                                                        className="cta-box highlight"
                                                    >
                                                        <i className="fas fa-id-card"></i>
                                                        <span>
                                                            Adhérer à
                                                            l'association
                                                        </span>
                                                    </Link>
                                                </div>
                                            </div>
                                        )}
                                        {submitError && (
                                            <p className="status-text error">
                                                <i className="fas fa-exclamation-triangle"></i>{" "}
                                                {submitError}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </main>

                <footer className="survey-footer">
                    <div className="logo-area">
                        <img
                            src="/assets/logos-typos/LOGO_NOIR_COULEUR_1.png"
                            alt="Logo Volontaires français"
                            className="logo"
                            style={{ height: "48px", objectFit: "contain" }}
                        />
                    </div>

                    <div className="nav-area">
                        {currentIndex > 0 && !isSubmitted && (
                            <button
                                onClick={handlePrev}
                                className="nav-btn prev"
                            >
                                Précédent
                            </button>
                        )}
                        {currentIndex < visibleQuestions.length - 1 ? (
                            <button
                                onClick={handleNext}
                                disabled={!canGoNext()}
                                className="nav-btn next"
                            >
                                {!currentQuestion?.required &&
                                !answers[currentQuestion?.id] &&
                                currentQuestion?.type !== "info"
                                    ? "Passer cette étape"
                                    : "Suivant"}
                            </button>
                        ) : (
                            <>
                                {!isSubmitted ? (
                                    <button
                                        onClick={handleSubmit}
                                        disabled={isSubmitting}
                                        className="nav-btn finish pulse"
                                    >
                                        {isSubmitting
                                            ? "Envoi..."
                                            : "Envoyer mes réponses"}
                                    </button>
                                ) : (
                                    <Link
                                        href="/"
                                        className="nav-btn site-back"
                                    >
                                        Retour au site principal
                                    </Link>
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
                    height: 100dvh;
                    display: flex;
                    flex-direction: column;
                    color: white;
                    font-family: Arial, sans-serif;
                    overflow: hidden;
                    background: linear-gradient(
                        135deg,
                        #067fcc 0%,
                        #fcb133 100%
                    );
                }

                .survey-content {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    max-width: 900px;
                    width: 100%;
                    margin: 0 auto;
                    padding: 0 1.5rem;
                    height: 100%;
                }
                .survey-header {
                    padding: 1rem 0;
                    flex-shrink: 0;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    gap: 15px;
                }
                .header-top {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                    gap: 10px;
                }
                .site-link {
                    color: rgba(255, 255, 255, 0.7);
                    text-decoration: none;
                    font-weight: bold;
                    font-size: 0.8rem;
                    transition: color 0.2s;
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    white-space: nowrap;
                }
                .site-link:hover {
                    color: white;
                }

                .reset-link {
                    background: none;
                    border: none;
                    color: rgba(255, 255, 255, 0.5);
                    font-size: 1rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    transition: color 0.2s;
                    padding: 5px;
                }
                .reset-link:hover {
                    color: #eb2f50;
                }
                .reset-hover-text {
                    font-size: 0.7rem;
                    font-weight: bold;
                    margin-left: 5px;
                    opacity: 0;
                    transform: translateX(-5px);
                    transition: all 0.2s;
                    pointer-events: none;
                }
                .reset-link:hover .reset-hover-text {
                    opacity: 0.7;
                    transform: translateX(0);
                }

                /* Section Stepper */
                .section-stepper {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 6px;
                    flex: 1;
                }
                .section-dot-wrap {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    position: relative;
                }
                .section-dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.2);
                    transition: all 0.3s ease;
                }
                .section-label {
                    position: absolute;
                    top: 15px;
                    font-size: 0.6rem;
                    font-weight: bold;
                    white-space: nowrap;
                    opacity: 0;
                    transform: translateY(5px);
                    transition: all 0.3s ease;
                    pointer-events: none;
                }
                .section-dot-wrap.active .section-dot {
                    background: #fcb133;
                    transform: scale(1.4);
                    box-shadow: 0 0 10px rgba(252, 177, 51, 0.5);
                }
                .section-dot-wrap.active .section-label {
                    opacity: 1;
                    transform: translateY(0);
                    color: #fcb133;
                }
                .section-dot-wrap.past .section-dot {
                    background: white;
                }

                .progress-wrap {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    margin-top: 5px;
                }
                .progress-bar {
                    flex: 1;
                    height: 4px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 2px;
                }
                .progress-fill {
                    height: 100%;
                    background: #fcb133;
                    transition: width 0.5s ease;
                    border-radius: 2px;
                }
                .step-count {
                    font-size: 0.7rem;
                    font-weight: bold;
                    opacity: 0.6;
                    min-width: 40px;
                    text-align: right;
                }

                .survey-question {
                    flex: 1;
                    overflow-y: auto;
                    padding: 1.5rem 0;
                    -webkit-overflow-scrolling: touch;
                }
                .section-badge {
                    display: inline-block;
                    padding: 4px 12px;
                    background: rgba(252, 177, 51, 0.15);
                    color: #fcb133;
                    border-radius: 20px;
                    font-size: 0.75rem;
                    font-weight: bold;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    margin-bottom: 1rem;
                }
                .label-text {
                    font-size: 2.2rem;
                    font-weight: 900;
                    line-height: 1.1;
                    margin-bottom: 0.8rem;
                }
                .desc-text {
                    font-size: 1.1rem;
                    opacity: 0.8;
                    margin-bottom: 2rem;
                }

                .select-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
                    gap: 12px;
                }
                .bubble-btn {
                    padding: 1.1rem 1.6rem;
                    background: linear-gradient(
                        180deg,
                        rgba(255, 255, 255, 0.08) 0%,
                        rgba(255, 255, 255, 0.02) 100%
                    );
                    border: 1px solid rgba(255, 255, 255, 0.12);
                    border-radius: 14px;
                    color: white;
                    font-size: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    text-align: left;
                    position: relative;
                    overflow: hidden;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
                }
                .btn-content {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                }
                .bubble-btn:hover {
                    background: rgba(255, 255, 255, 0.12);
                    border-color: rgba(255, 255, 255, 0.4);
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
                }
                .bubble-btn.active {
                    background: white;
                    color: #067fcc;
                    box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.15);
                    transform: scale(0.97);
                    animation: selected-pulse 0.4s ease-out;
                }
                .animate-check {
                    color: #067fcc;
                    font-size: 1.2rem;
                    animation: check-pop 0.4s
                        cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }

                @keyframes selected-pulse {
                    0% {
                        transform: scale(1);
                    }
                    40% {
                        transform: scale(0.92);
                        box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.2);
                    }
                    100% {
                        transform: scale(0.97);
                    }
                }
                @keyframes check-pop {
                    0% {
                        transform: scale(0);
                        opacity: 0;
                    }
                    100% {
                        transform: scale(1);
                        opacity: 1;
                    }
                }

                .nps-container {
                    width: 100%;
                    max-width: 600px;
                    margin: 0 auto;
                }
                .nps-grid {
                    display: flex;
                    justify-content: space-between;
                    gap: 6px;
                    margin-bottom: 1rem;
                    flex-wrap: wrap;
                }
                .nps-btn {
                    flex: 1;
                    min-width: 42px;
                    height: 58px;
                    background: linear-gradient(
                        180deg,
                        rgba(255, 255, 255, 0.1) 0%,
                        rgba(255, 255, 255, 0.02) 100%
                    );
                    border: 1px solid rgba(255, 255, 255, 0.15);
                    border-radius: 12px;
                    color: white;
                    font-size: 1.15rem;
                    font-weight: 800;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                }
                .nps-btn:hover {
                    border-color: var(--hover-color) !important;
                    background: rgba(255, 255, 255, 0.15);
                    transform: translateY(-3px);
                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
                }
                .nps-btn.active {
                    transform: scale(0.9);
                    box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.2);
                    z-index: 10;
                    animation: selected-pulse 0.4s ease-out;
                }
                .nps-labels {
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.8rem;
                    font-weight: 700;
                    opacity: 0.7;
                    color: white;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .finish-ctas {
                    display: flex;
                    gap: 1rem;
                    justify-content: center;
                    margin-top: 1.5rem;
                    flex-wrap: wrap;
                }
                .cta-box {
                    flex: 1;
                    min-width: 160px;
                    padding: 1.2rem 1rem;
                    background: rgba(255, 255, 255, 0.1);
                    border: 2px solid rgba(255, 255, 255, 0.1);
                    border-radius: 12px;
                    color: white;
                    text-decoration: none;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0.5rem;
                    transition: all 0.2s;
                    font-weight: 700;
                    text-align: center;
                }
                .cta-box i {
                    font-size: 1.3rem;
                }
                .cta-box span {
                    font-size: 0.85rem;
                }
                .cta-box:hover {
                    background: rgba(255, 255, 255, 0.2);
                    transform: translateY(-3px);
                    border-color: white;
                }
                .cta-box.highlight {
                    background: #fcb133;
                    color: #333;
                    border-color: #fcb133;
                }
                .cta-box.highlight:hover {
                    background: #ffc25b;
                    transform: translateY(-3px);
                }

                .open-input {
                    width: 100%;
                    padding: 0.8rem 0;
                    background: transparent;
                    border: none;
                    border-bottom: 3px solid rgba(255, 255, 255, 0.2);
                    font-size: 1.8rem;
                    color: white;
                    font-weight: 700;
                    outline: none;
                }
                .open-input::placeholder {
                    color: rgba(255, 255, 255, 0.2);
                }
                .open-input:focus {
                    border-color: #fcb133;
                }

                .validation-error {
                    color: #eb2f50;
                    font-size: 0.95rem;
                    margin-top: 10px;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }

                .survey-footer {
                    height: 100px;
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                }
                .logo-area {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                .logo {
                    height: 32px;
                }
                .logo-name {
                    font-weight: 800;
                    text-transform: uppercase;
                    font-size: 0.8rem;
                    letter-spacing: 1px;
                    opacity: 0.7;
                }

                .nav-area {
                    display: flex;
                    gap: 10px;
                }
                .nav-btn {
                    padding: 0.8rem 1.8rem;
                    border-radius: 12px;
                    font-weight: 700;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    background: rgba(255, 255, 255, 0.05);
                    color: white;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    text-decoration: none;
                    font-size: 0.95rem;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                }
                .nav-btn.next,
                .nav-btn.finish {
                    background: white;
                    color: #067fcc;
                    border-color: white;
                }
                .nav-btn.site-back {
                    background: #07a459;
                    color: white;
                    border-color: #07a459;
                }
                .nav-btn:hover:not(:disabled) {
                    transform: translateY(-3px);
                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
                }
                .nav-btn:disabled {
                    opacity: 0.3;
                    cursor: not-allowed;
                }

                .pulse {
                    animation: ripple 2s infinite;
                }
                @keyframes ripple {
                    0% {
                        box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
                    }
                    70% {
                        box-shadow: 0 0 0 20px rgba(255, 255, 255, 0);
                    }
                    100% {
                        box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
                    }
                }

                .submit-status {
                    margin-top: 1.5rem;
                }
                .status-text {
                    font-size: 1rem;
                    font-weight: 600;
                }
                .status-text.loading {
                    color: #fcb133;
                }
                .status-text.success {
                    color: #07a459;
                }
                .status-text.error {
                    color: #eb2f50;
                }

                @media (max-width: 1024px) {
                    .survey-content {
                        padding: 0 1rem;
                    }
                    .header-nav .site-link span {
                        display: none;
                    }
                    .header-nav .site-link i {
                        font-size: 1.2rem;
                    }

                    .survey-header {
                        height: 80px;
                        gap: 8px;
                    }
                    .survey-footer {
                        height: 90px;
                    }

                    .label-text {
                        font-size: 1.6rem;
                        margin-bottom: 0.6rem;
                    }
                    .desc-text {
                        font-size: 0.95rem;
                        margin-bottom: 1.5rem;
                    }

                    .bubble-btn {
                        padding: 0.8rem;
                        font-size: 0.9rem;
                        border-radius: 10px;
                    }
                    .nps-grid {
                        flex-direction: column;
                        gap: 8px;
                    }
                    .nps-btn {
                        height: 50px;
                        width: 100%;
                        font-size: 1.1rem;
                        border-radius: 8px;
                    }
                    .nps-labels {
                        font-size: 0.7rem;
                    }

                    .open-input {
                        font-size: 1.4rem;
                        border-bottom-width: 2px;
                    }
                    .logo-name {
                        display: none;
                    }

                    .nav-btn {
                        padding: 0.6rem 1.1rem;
                        font-size: 0.85rem;
                    }

                    .finish-ctas {
                        flex-direction: column;
                        width: 100%;
                    }
                    .cta-box {
                        max-width: none;
                        width: 100%;
                        padding: 1rem;
                    }
                }
            `}</style>
        </div>
    );
}
