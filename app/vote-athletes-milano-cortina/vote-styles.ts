// CSS de la page vote, injecté via <style dangerouslySetInnerHTML>.
// (styled-jsx ne compile pas dans ce repo App Router : pas de StyleRegistry.)
// Mobile-first : base = carrousel horizontal animé, breakpoints 560/900/1200px.
export const voteStyles = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes badgePop {
    0% { transform: scale(0.4); opacity: 0; }
    70% { transform: scale(1.15); }
    100% { transform: scale(1); opacity: 1; }
  }
  .vote-page {
    min-height: 100vh;
    overflow-x: hidden;
    background: linear-gradient(160deg, #067fcc 0%, #07a459 100%);
    padding: 24px 0 110px;
    color: #fff;
  }
  .vote-header {
    margin: 0 auto 28px;
    padding: 0 16px;
    text-align: center;
    animation: fadeUp 0.5s ease both;
  }
  .vote-header h1 {
    font-size: 1.6rem;
    color: #fff;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
    margin-bottom: 10px;
  }
  .intro {
    color: rgba(255, 255, 255, 0.92);
    font-size: 0.92rem;
    line-height: 1.6;
    max-width: 640px;
    margin: 0 auto;
  }
  .vote-form {
    width: 100%;
    margin: 0 auto;
  }
  .vote-category {
    border: none;
    padding: 0;
    margin: 0 0 34px;
    animation: fadeUp 0.5s ease both;
    min-inline-size: 0;
    width: 100%;
    max-width: 100%;
  }
  .vote-category legend {
    width: 100%;
    font-weight: 800;
    font-size: 1.45rem;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    color: #fff;
    margin-bottom: 14px;
    padding: 0 16px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
  }
  .cat-done {
    background: #07a459;
    color: #fff;
    font-size: 0.78rem;
    font-weight: 700;
    padding: 5px 12px;
    border-radius: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    animation: badgePop 0.3s ease both;
  }
  /* Mobile : carrousel horizontal scroll-snap, format "stories" */
  .athlete-grid {
    display: flex;
    gap: 14px;
    overflow-x: auto;
    max-width: 100%;
    scroll-snap-type: x mandatory;
    padding: 6px 16px 14px;
    -webkit-overflow-scrolling: touch;
  }
  .athlete-grid::-webkit-scrollbar { display: none; }
  .athlete-card {
    flex: 0 0 78vw;
    max-width: 340px;
    scroll-snap-align: center;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 0 0 16px;
    background: rgba(255, 255, 255, 0.96);
    border: 3px solid transparent;
    border-radius: 18px;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
    color: #333;
    font-family: inherit;
  }
  .athlete-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 14px 32px rgba(0, 0, 0, 0.28);
  }
  .athlete-card:active {
    transform: scale(0.98);
  }
  .athlete-card:focus-visible {
    outline: 3px solid #fcb133;
    outline-offset: 2px;
  }
  .athlete-card.selected {
    border-color: #07a459;
    box-shadow: 0 0 0 4px rgba(7, 164, 89, 0.35);
  }
  /* Desktop : grille classique, cards XL */
  @media (min-width: 560px) {
    .athlete-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
      overflow-x: visible;
      scroll-snap-type: none;
      padding: 0 16px;
    }
    .athlete-card { flex: none; max-width: none; }
  }
  @media (min-width: 900px) {
    .athlete-grid {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      padding: 0 32px;
    }
    .vote-header h1 { font-size: 2rem; }
    .vote-category legend { font-size: 1.7rem; padding: 0 32px; }
  }
  .photo {
    width: 100%;
    aspect-ratio: 4 / 5;
    overflow: hidden;
    background: #fff;
  }
  .photo img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: contain;
    object-position: top center;
  }
  .photo.no-img {
    aspect-ratio: 4 / 5;
    background: linear-gradient(135deg, #067fcc, #07a459);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .initials {
    color: #fff;
    font-size: 2.4rem;
    font-weight: 700;
  }
  .card-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    width: 100%;
    padding: 0 16px;
  }
  .athlete-name {
    font-size: 1.1rem;
    font-weight: 700;
    color: #222;
    text-align: center;
    line-height: 1.25;
  }
  .discipline {
    font-size: 0.85rem;
    font-weight: 600;
    color: #067fcc;
    text-align: center;
  }
  .meta {
    font-size: 0.78rem;
    color: #666;
    text-align: center;
  }
  .medals {
    font-size: 0.95rem;
    color: #333;
  }
  .card-actions {
    display: flex;
    gap: 10px;
    margin-top: 10px;
    width: 100%;
  }
  .btn-info {
    flex: 1;
    padding: 10px 8px;
    border: 1.5px solid #067fcc;
    border-radius: 24px;
    background: transparent;
    color: #067fcc;
    font-weight: 700;
    font-size: 0.82rem;
    cursor: pointer;
    transition: all 0.15s;
  }
  .btn-info:hover {
    background: rgba(6, 127, 204, 0.08);
  }
  .btn-vote {
    flex: 1;
    padding: 10px 8px;
    border: none;
    border-radius: 24px;
    background: #067fcc;
    color: #fff;
    font-weight: 700;
    font-size: 0.82rem;
    cursor: pointer;
    transition: all 0.15s;
  }
  .btn-vote:hover {
    filter: brightness(1.1);
  }
  .btn-vote.voted {
    background: #07a459;
  }
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.55);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: flex-end;
    justify-content: center;
    z-index: 100;
    animation: fadeUp 0.2s ease both;
  }
  .modal-card {
    background: #fff;
    color: #333;
    width: 100%;
    max-width: 560px;
    max-height: 92vh;
    overflow-y: auto;
    border-radius: 22px 22px 0 0;
    position: relative;
    animation: fadeUp 0.28s ease both;
  }
  @media (min-width: 560px) {
    .modal-overlay { align-items: center; padding: 24px; }
    .modal-card { border-radius: 22px; }
  }
  .modal-close {
    position: absolute;
    top: 12px;
    right: 12px;
    width: 38px;
    height: 38px;
    border: none;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.9);
    color: #333;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    z-index: 2;
  }
  .modal-photo img {
    width: 100%;
    max-height: 48vh;
    display: block;
    object-fit: cover;
    object-position: top center;
  }
  .modal-body {
    padding: 18px 22px 24px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .modal-body h3 {
    font-size: 1.35rem;
    color: #222;
  }
  .modal-body .bio {
    font-size: 0.88rem;
    color: #444;
    line-height: 1.6;
    margin-top: 8px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .bio-brief {
    margin: 0;
    padding-left: 20px;
    list-style: disc;
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-weight: 600;
    color: #333;
  }
  .results-block {
    margin-top: 14px;
  }
  .results-block h4 {
    font-size: 0.95rem;
    color: #067fcc;
    margin-bottom: 8px;
  }
  .results-block ul {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .results-block li {
    display: flex;
    align-items: baseline;
    gap: 8px;
    font-size: 0.85rem;
    color: #444;
  }
  .results-block .pos {
    flex: 0 0 auto;
    background: #067fcc;
    color: #fff;
    font-weight: 700;
    font-size: 0.75rem;
    border-radius: 12px;
    padding: 2px 8px;
  }
  .results-block .event {
    flex: 1;
  }
  .results-block .score {
    color: #888;
    font-size: 0.78rem;
    white-space: nowrap;
  }
  .modal-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 16px;
    align-items: center;
  }
  .modal-actions .btn-vote {
    flex: 1;
    min-width: 180px;
    padding: 13px;
    font-size: 0.95rem;
  }
  .fiche-link {
    margin-top: 6px;
    font-size: 0.74rem;
    font-weight: 700;
    color: #067fcc;
    text-decoration: none;
    border: 1.5px solid #067fcc;
    border-radius: 20px;
    padding: 5px 12px;
    transition: all 0.15s;
  }
  .fiche-link:hover {
    background: #067fcc;
    color: #fff;
  }
  .badge {
    position: absolute;
    top: 10px;
    right: 10px;
    background: #07a459;
    color: #fff;
    font-size: 0.85rem;
    font-weight: 700;
    padding: 6px 12px;
    border-radius: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    animation: badgePop 0.3s ease both;
  }
  .email-block {
    max-width: 480px;
    margin: 0 auto 20px;
    padding: 0 16px;
  }
  .email-block label {
    display: block;
    font-weight: 700;
    margin-bottom: 8px;
    color: #fff;
  }
  .email-block input {
    width: 100%;
    padding: 13px;
    border-radius: 10px;
    border: 2px solid transparent;
    font-size: 1rem;
    font-family: inherit;
  }
  .email-block input:focus {
    outline: none;
    border-color: #fcb133;
  }
  .hint {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.85);
    margin-top: 6px;
  }
  .error-msg {
    max-width: 480px;
    margin: 0 auto 16px;
    background: #fff;
    color: #eb2f50;
    font-weight: 600;
    font-size: 0.9rem;
    padding: 10px 14px;
    border-radius: 10px;
    text-align: center;
  }
  .submit-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.96);
    backdrop-filter: blur(10px);
    box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.18);
    padding: 12px 16px;
    padding-bottom: calc(12px + env(safe-area-inset-bottom));
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 14px;
    z-index: 50;
  }
  .progress {
    color: #333;
    font-weight: 700;
    font-size: 0.9rem;
    white-space: nowrap;
  }
  .submit-btn {
    flex: 1;
    max-width: 420px;
    padding: 14px;
    border: none;
    border-radius: 30px;
    background: #067fcc;
    color: white;
    font-weight: 700;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s;
  }
  .submit-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }
  .submit-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .credit {
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.75);
    text-align: center;
    margin-top: 26px;
    padding: 0 16px;
  }
  .status-wrap {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;
    background: linear-gradient(160deg, #067fcc 0%, #07a459 100%);
  }
  .status-card {
    background: #fff;
    border-radius: 18px;
    border-top: 6px solid #07a459;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    padding: 40px;
    max-width: 480px;
    width: 100%;
    text-align: center;
    color: #333;
    animation: fadeUp 0.4s ease both;
  }
  .status-card h1 {
    font-size: 1.5rem;
    margin-bottom: 12px;
  }
  @media (prefers-reduced-motion: reduce) {
    .vote-header, .vote-category, .badge, .cat-done, .status-card { animation: none; }
    .athlete-card, .submit-btn { transition: none; }
  }
`;
