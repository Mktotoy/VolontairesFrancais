"use client";

import { useState, useEffect } from 'react';
import SurveyResults from '@/components/SurveyResults';
import { Lock } from 'lucide-react';

export default function ResultsPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Check if already authenticated in this session
  useEffect(() => {
    const savedPass = sessionStorage.getItem('survey_auth');
    if (savedPass) {
      handleAuth(savedPass);
    }
  }, []);

  const handleAuth = async (passToTry: string) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/enquete/results', {
        headers: { 'Authorization': passToTry }
      });

      if (res.ok) {
        const results = await res.json();
        setData(results);
        setIsAuthenticated(true);
        sessionStorage.setItem('survey_auth', passToTry);
      } else {
        setError('Mot de passe incorrect');
        sessionStorage.removeItem('survey_auth');
      }
    } catch (err) {
      setError('Erreur de connexion au serveur');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="auth-screen">
        <div className="auth-card">
          <div className="icon-wrap">
            <Lock size={40} color="#fcb133" />
          </div>
          <h1>Accès Réservé</h1>
          <p>Veuillez saisir le mot de passe pour consulter les résultats du RETEX.</p>
          
          <form onSubmit={(e) => { e.preventDefault(); handleAuth(password); }}>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe"
              autoFocus
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Vérification...' : 'Accéder aux résultats'}
            </button>
            {error && <p className="error-msg">{error}</p>}
          </form>
        </div>

        <style jsx>{`
          .auth-screen {
            width: 100vw;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #067fcc 0%, #fcb133 100%);
          }
          .auth-card {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
            padding: 3rem;
            border-radius: 20px;
            width: 100%;
            max-width: 450px;
            text-align: center;
            color: white;
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 20px 40px rgba(0,0,0,0.2);
          }
          .icon-wrap { margin-bottom: 1.5rem; }
          h1 { margin: 0 0 10px; font-size: 1.8rem; }
          p { margin: 0 0 2rem; opacity: 0.8; font-size: 0.95rem; }
          
          input {
            width: 100%;
            padding: 12px;
            border-radius: 8px;
            border: 2px solid rgba(255, 255, 255, 0.2);
            background: rgba(255, 255, 255, 0.05);
            color: white;
            font-size: 1rem;
            margin-bottom: 1rem;
            outline: none;
            transition: border-color 0.2s;
          }
          input:focus { border-color: white; }
          
          button {
            width: 100%;
            padding: 12px;
            border-radius: 8px;
            border: none;
            background: white;
            color: #067fcc;
            font-weight: 700;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.2s;
          }
          button:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
          button:disabled { opacity: 0.5; cursor: not-allowed; }
          
          .error-msg { color: #ff4d4d; margin-top: 1rem; font-weight: 600; font-size: 0.9rem; }
        `}</style>
      </div>
    );
  }

  return (
    <div className="results-page">
      <SurveyResults data={data} />
      <style jsx global>{`
        body {
          background-color: #0d1117;
          margin: 0;
          padding: 0;
        }
      `}</style>
    </div>
  );
}
