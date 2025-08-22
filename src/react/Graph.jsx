import React from "react";
import ForceGraph2D from "react-force-graph-2d";

export default function Graph() {
    const data = {
        nodes: [
            { id: "HTML" },
            { id: "CSS" },
            { id: "JavaScript" },
            { id: "React" }
        ],
        links: [
            { source: "HTML", target: "CSS" },
            { source: "CSS", target: "JavaScript" },
            { source: "JavaScript", target: "React" }
        ]
    };

    return <ForceGraph2D graphData={data} />;
}
