"use client";

import Questionnaire from '@/components/Questionnaire';

export default function RetexPage() {
    return (
        <main className="retex-landing">
            <Questionnaire />

            <style jsx global>{`
                body {
                    margin: 0;
                    padding: 0;
                    overflow: hidden;
                    background-color: #067fcc;
                }
                
                /* Override any global site background if necessary */
                #root, __next {
                    height: 100vh;
                }
            `}</style>

            <style jsx>{`
                .retex-landing {
                    width: 100vw;
                    height: 100vh;
                    background: linear-gradient(135deg, #067fcc 0%, #fcb133 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    overflow: hidden;
                }

                .retex-landing::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="rgba(255,255,255,0.1)" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>') no-repeat bottom;
                    background-size: cover;
                    opacity: 0.3;
                    pointer-events: none;
                }
            `}</style>
        </main>
    );
}
