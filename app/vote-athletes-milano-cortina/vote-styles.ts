// CSS de la page vote, injecté via <style dangerouslySetInnerHTML>.
// (styled-jsx ne compile pas dans ce repo App Router : pas de StyleRegistry.)
export const voteStyles = `
  .vote-wrap {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;
    background: linear-gradient(135deg, #067fcc 0%, #07a459 100%);
  }
  .vote-card {
    background: #ffffff;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    padding: 40px;
    max-width: 920px;
    width: 100%;
  }
  .vote-card h1 {
    font-size: 1.8rem;
    margin-bottom: 12px;
    color: #333;
  }
  .intro {
    color: #666;
    font-size: 0.95rem;
    margin-bottom: 28px;
    line-height: 1.6;
  }
  fieldset.vote-category {
    border: none;
    padding: 0;
    margin: 0 0 30px;
  }
  .vote-category legend {
    font-weight: 700;
    font-size: 1.1rem;
    color: #067fcc;
    margin-bottom: 12px;
  }
  .athlete-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    gap: 12px;
  }
  .athlete-card {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 10px;
    background: #fff;
    border: 2px solid #e0e0e0;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.15s;
    font-family: inherit;
  }
  .athlete-card:hover {
    border-color: #067fcc;
    transform: translateY(-2px);
  }
  .athlete-card.selected {
    border-color: #07a459;
    box-shadow: 0 0 0 3px rgba(7, 164, 89, 0.18);
  }
  .photo {
    width: 100%;
    aspect-ratio: 1;
    border-radius: 8px;
    overflow: hidden;
    background: linear-gradient(135deg, #067fcc, #07a459);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .photo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .initials {
    color: #fff;
    font-size: 1.8rem;
    font-weight: 700;
  }
  .athlete-name {
    font-size: 0.82rem;
    font-weight: 600;
    color: #333;
    text-align: center;
    line-height: 1.25;
  }
  .badge {
    position: absolute;
    top: 6px;
    right: 6px;
    background: #07a459;
    color: #fff;
    font-size: 0.72rem;
    font-weight: 700;
    padding: 4px 8px;
    border-radius: 20px;
  }
  .email-block {
    margin-bottom: 20px;
  }
  .email-block label {
    display: block;
    font-weight: 700;
    margin-bottom: 8px;
    color: #333;
  }
  .email-block input {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    border: 2px solid #e0e0e0;
    font-size: 1rem;
    font-family: inherit;
  }
  .email-block input:focus {
    outline: none;
    border-color: #067fcc;
  }
  .hint {
    font-size: 0.8rem;
    color: #666;
    margin-top: 6px;
  }
  .error-msg {
    color: #eb2f50;
    font-weight: 600;
    font-size: 0.9rem;
    margin-bottom: 16px;
  }
  .submit-btn {
    width: 100%;
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
  .fiche-link {
    font-size: 0.75rem;
    color: #067fcc;
    text-decoration: underline;
  }
  .fiche-link:hover {
    color: #045a91;
  }
  .credit {
    font-size: 0.75rem;
    color: #999;
    text-align: center;
    margin-top: 18px;
  }
  .success-card {
    border-top: 6px solid #07a459;
    text-align: center;
  }
`;
