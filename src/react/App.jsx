import React, { useState, useEffect, Suspense } from "react";
import { preloaderReactLoaded } from "../js/_preloader";
import graphData from "./graphData";

const LazyGraph = React.lazy(() => import("./Graph"));

export default function App() {
    const [showGraph, setShowGraph] = useState(false);

    useEffect(() => {

        if (showGraph) {
           preloaderReactLoaded(1);
        } else {
            preloaderReactLoaded(1.5); // 67%
        }
    }, [showGraph]);

    return (
        <>
            <Suspense fallback={<div>Loading Graph...</div>}>
                <div style={{ width: "100%", height: "100vh" }}> <LazyGraph data={graphData} onLoaded={() => setShowGraph(true)} /></div>
            </Suspense>
        </>
    );
}
