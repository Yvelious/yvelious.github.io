import React, { useRef, useState, useEffect, useMemo } from "react";
import ForceGraph2D from "react-force-graph-2d";
import * as d3 from "d3-force";

const defaultData = {
    nodes: [],
    links: [],
};

export default function Graph({ data = defaultData, onLoaded}) {
    const fgRef = useRef();
    const [hoverNode, setHoverNode] = useState(null);
    const [nodeAlphas, setNodeAlphas] = useState({});
    const [highlightedNodes, setHighlightedNodes] = useState(new Set());
    const [nodeScales, setNodeScales] = useState({});

    useEffect(() => {
        if (onLoaded) onLoaded();
    }, []);
    // find all child when node hover
    const getDescendants = (nodeId) => {
        const set = new Set();
        const traverse = (id) => {
            data.links.forEach((link, index) => {
                console.log(index);
                console.log(link);
                const sourceId = link.source.id ?? link.source;
                const targetId = link.target.id ?? link.target;
                if (sourceId === id && !set.has(targetId)) {
                    set.add(targetId);
                    traverse(targetId);
                }
            });
        };
        traverse(nodeId);
        return set;
    };

    const handleNodeHover = (node) => {
        setHoverNode(node);
        if (node) {
            const descendants = getDescendants(node.id);
            setHighlightedNodes(new Set([node.id, ...descendants]));
            // Центрирование и масштабирование убраны отсюда
        } else {
            setHighlightedNodes(new Set());
        }
    };

    // Новый обработчик клика по узлу
    const handleNodeClick = (node) => {
        if (node && fgRef.current) {
            fgRef.current.centerAt(node.x, node.y, 800);
            fgRef.current.zoom(2.2, 1000);
        }
    };

    // Анимация прозрачности и масштаба
    useEffect(() => {
        if (!data.nodes) return;
        const interval = setInterval(() => {
            setNodeAlphas((prev) => {
                const next = { ...prev };
                let changed = false;
                data.nodes.forEach((node) => {
                    const target = highlightedNodes.has(node.id)
                        ? 1
                        : hoverNode
                            ? 0
                            : 1;
                    const current = prev[node.id] ?? 0.7;
                    const newVal = current + (target - current) * 0.1;
                    if (Math.abs(newVal - current) > 0.01) {
                        next[node.id] = newVal;
                        changed = true;
                    }
                });
                return changed ? next : prev;
            });
            setNodeScales((prev) => {
                const next = { ...prev };
                let changed = false;
                data.nodes.forEach((node) => {
                    const targetScale = highlightedNodes.has(node.id) ? 1.3 : 1;
                    const currentScale = prev[node.id] ?? 1;
                    const newScale = currentScale + (targetScale - currentScale) * 0.15;
                    if (Math.abs(newScale - currentScale) > 0.01) {
                        next[node.id] = newScale;
                        changed = true;
                    }
                });
                return changed ? next : prev;
            });
        }, 30);
        return () => clearInterval(interval);
    }, [hoverNode, highlightedNodes, data.nodes]);

    // Рисуем узлы
    const nodeCanvasObject = (node, ctx, globalScale) => {
        const label = node.label;
        const padding = 6;
        let fontSize, fillColor, textColor;
        const opacity = nodeAlphas[node.id] ?? 1;



        switch (node.group) {
            case "root":
                fontSize = 24 / globalScale;
                fillColor = `rgba(255,255,255,${opacity})`;
                textColor = `rgba(119, 0, 0, 1)`;
                break;
            case "category":
                fontSize = 18 / globalScale;
                fillColor = `rgba(119, 0, 0,${opacity})`;
                textColor = "#fff";
                break;
            case "sub-category":
                fontSize = 16 / globalScale;
                fillColor = `rgba(225, 68, 0,${opacity})`;
                textColor = "#fff";
                break;
            case "element":
                fontSize = 12 / globalScale;
                textColor = "#000";
                break;
            default:
                fontSize = 12 / globalScale;
                fillColor = "grey";
                textColor = "white";
        }

        ctx.font = `${fontSize}px Univers, Arial, sans-serif`;
        const textWidth = ctx.measureText(label).width;
        const textHeight = fontSize * 1.2;

        const x = node.x;
        const y = node.y;

        const isHighlighted = highlightedNodes.has(node.id);
        const scale = nodeScales[node.id] ?? 1;

        const nodeFontSize = fontSize * scale;
        const nodeTextWidth = ctx.measureText(label).width * scale;
        const nodeTextHeight = fontSize * 1.2 * scale;


        if (node.group !== "element") {
            // Рисуем плашку
            const plaqueWidth = nodeTextWidth + padding * 2;
            const plaqueHeight = nodeTextHeight + padding * 2;
            const px = x - plaqueWidth / 2;
            const py = y - plaqueHeight / 2;

            ctx.save();
            ctx.globalAlpha = opacity;
            ctx.fillStyle = fillColor;
            const radius = 4 * scale;
            ctx.beginPath();
            ctx.moveTo(px + radius, py);
            ctx.lineTo(px + plaqueWidth - radius, py);
            ctx.quadraticCurveTo(px + plaqueWidth, py, px + plaqueWidth, py + radius);
            ctx.lineTo(px + plaqueWidth, py + plaqueHeight - radius);
            ctx.quadraticCurveTo(px + plaqueWidth, py + plaqueHeight, px + plaqueWidth - radius, py + plaqueHeight);
            ctx.lineTo(px + radius, py + plaqueHeight);
            ctx.quadraticCurveTo(px, py + plaqueHeight, px, py + plaqueHeight - radius);
            ctx.lineTo(px, py + radius);
            ctx.quadraticCurveTo(px, py, px + radius, py);
            ctx.closePath();
            ctx.fill();
            // Рисуем текст по центру плашки
            ctx.font = `${nodeFontSize}px Univers, Arial, sans-serif`;
            ctx.fillStyle = node.group === "root" ? "#000" : "#fff";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(label, x, y);
            ctx.restore();
        } else {
            // Маленький кружочек для элементов
            ctx.save();
            ctx.globalAlpha = opacity;
            ctx.beginPath();
            ctx.arc(x, y, 8 * scale, 0, 2 * Math.PI, false); // радиус 8
            ctx.fillStyle = `rgba(255,255,255,1)`;
            ctx.fill();
            ctx.lineWidth = 2;
            // Текст вне кружка справа
            ctx.font = `${nodeFontSize}px Verdana, Arial, sans-serif`;
            ctx.fillStyle = textColor;
            ctx.textAlign = "left";
            ctx.textBaseline = "middle";
            ctx.fillText(label, x + 14 * scale, y);
            ctx.restore();
        }
    };

    const nodePointerAreaPaint = (node, color, ctx, globalScale) => {
        const label = node.label;
        const padding = 6;
        let fontSize;
        let fontFamily;
        switch (node.group) {
            case "root":
                fontSize = 24 / globalScale;
                fontFamily = "Univers, Arial, sans-serif";
                break;
            case "category":
                fontSize = 18 / globalScale;
                fontFamily = "Univers, Arial, sans-serif";
                break;
            case "sub-category":
                fontSize = 16 / globalScale;
                fontFamily = "Univers, Arial, sans-serif";
                break;
            case "element":
                fontSize = 12 / globalScale;
                fontFamily = "Verdana, Arial, sans-serif";
                break;
            default:
                fontSize = 12 / globalScale;
                fontFamily = "Univers, Arial, sans-serif";
        }
        ctx.font = `${fontSize}px ${fontFamily}`;
        const textWidth = ctx.measureText(label).width;
        const textHeight = fontSize * 1.2;

        if (node.group !== "element") {
            const plaqueWidth = textWidth + padding * 2;
            const plaqueHeight = textHeight + padding * 2;
            const radius = 4;
            const x = node.x - plaqueWidth / 2;
            const y = node.y - plaqueHeight / 2;

            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.moveTo(x + radius, y);
            ctx.lineTo(x + plaqueWidth - radius, y);
            ctx.quadraticCurveTo(x + plaqueWidth, y, x + plaqueWidth, y + radius);
            ctx.lineTo(x + plaqueWidth, y + plaqueHeight - radius);
            ctx.quadraticCurveTo(
                x + plaqueWidth,
                y + plaqueHeight,
                x + plaqueWidth - radius,
                y + plaqueHeight
            );
            ctx.lineTo(x + radius, y + plaqueHeight);
            ctx.quadraticCurveTo(x, y + plaqueHeight, x, y + plaqueHeight - radius);
            ctx.lineTo(x, y + radius);
            ctx.quadraticCurveTo(x, y, x + radius, y);
            ctx.closePath();
            ctx.fill();
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(
                node.x - textWidth / 2,
                node.y - textHeight / 2,
                textWidth,
                textHeight
            );
        }
    };

    useEffect(() => {
        if (fgRef.current) {
            // Индивидуальная сила отталкивания для root и остальных
            fgRef.current.d3Force('charge').strength(node => node.group === 'root' ? -100 : -300);
            // Проверяем, есть ли с��ла столкновения, если нет — добавляем
            if (!fgRef.current.d3Force('collide')) {
                fgRef.current.d3Force('collide', d3.forceCollide());
            }
            // Минимальное расстояние между центрами узлов
            fgRef.current.d3Force('collide').radius(node => {
                switch (node.group) {
                    case 'root':
                        return 15; // root ближе к потомкам
                    case 'category':
                        return 55; // больше, чтобы не налазили
                    case 'sub-category':
                        return 45; // больше, чтобы не налазили
                    case 'element':
                        return 25;
                    default:
                        return 30;
                }
            }).strength(1);
            // Устанавливаем рассто��ние для связей root → category
            fgRef.current.d3Force('link').distance(link => {
                const sourceId = link.source.id ?? link.source;
                const targetId = link.target.id ?? link.target;
                const sourceNode = data.nodes.find(n => n.id === sourceId);
                if (sourceNode && sourceNode.group === 'root') {
                    return 60; // root → category ближе
                }
                return 120; // остальные связи
            });
        }
    }, [data]);

    return (
        <div style={{ width: "100%", height: "100vh" }}>
            <ForceGraph2D
                ref={fgRef}
                graphData={data}
                nodeLabel={null}
                onNodeHover={handleNodeHover}
                onNodeClick={handleNodeClick}
                nodeCanvasObject={nodeCanvasObject}
                nodePointerAreaPaint={nodePointerAreaPaint}
                linkColor={(link) => {
                    const sourceId = link.source.id ?? link.source;
                    const targetId = link.target.id ?? link.target;
                    return highlightedNodes.has(sourceId) && highlightedNodes.has(targetId)
                        ? `rgba(255,255,255,1)`
                        : `rgba(119,0,0,0.3)`;
                }}
                linkWidth={(link) => {
                    const sourceId = link.source.id ?? link.source;
                    const targetId = link.target.id ?? link.target;
                    return highlightedNodes.has(sourceId) && highlightedNodes.has(targetId)
                        ? 1
                        : 0.5;
                }}
            />
        </div>
    );
}