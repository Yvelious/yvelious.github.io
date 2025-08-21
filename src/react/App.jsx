import React, { useState, Suspense } from "react";


export default function App() {
    const [showGraph, setShowGraph] = useState(false);

    return (
        <div>
            <h2>Это React внутри сайта 🚀</h2>
            <button onClick={() => setShowGraph(true)}>Показать граф</button>
            {showGraph && (
                <Suspense fallback={<div>Загрузка графа...</div>}>
                </Suspense>
            )}
        </div>
    );
}
