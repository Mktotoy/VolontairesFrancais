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
                    overflow: hidden;
                }
            `}</style>
        </main>
    );
}
