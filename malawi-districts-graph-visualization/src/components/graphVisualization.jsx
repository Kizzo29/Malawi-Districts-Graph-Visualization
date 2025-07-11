'use client';
import React, { useRef } from 'react';

// Graph visualization component
const GraphVisualization = ({ nodes, edges, positions, width = 800, height = 600 }) => {
  const svgRef = useRef();

  const scale = Math.min(width, height) * 0.8;
  const offsetX = (width - scale) / 2;
  const offsetY = (height - scale) / 2;

  const transformCoord = (coord, dimension) => {
    return dimension === 'x' 
      ? coord * scale + offsetX
      : coord * scale + offsetY;
  };

  return (
    <svg 
      ref={svgRef}
      width={width} 
      height={height} 
      className="border border-gray-300 bg-white rounded-lg shadow-lg"
    >
      {/* Background grid */}
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f0f0f0" strokeWidth="1"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
      
      {/* Edges */}
      {edges.map(([from, to], index) => {
        const fromNode = positions.find(n => n.id === from);
        const toNode = positions.find(n => n.id === to);
        
        if (!fromNode || !toNode) return null;
        
        return (
          <line
            key={`edge-${index}`}
            x1={transformCoord(fromNode.x, 'x')}
            y1={transformCoord(fromNode.y, 'y')}
            x2={transformCoord(toNode.x, 'x')}
            y2={transformCoord(toNode.y, 'y')}
            stroke="#94a3b8"
            strokeWidth="2"
            opacity="0.7"
          />
        );
      })}
      
      {/* Nodes */}
      {positions.map((node, index) => (
        <g key={node.id}>
          <circle
            cx={transformCoord(node.x, 'x')}
            cy={transformCoord(node.y, 'y')}
            r="8"
            fill="#3b82f6"
            stroke="#1e40af"
            strokeWidth="2"
            className="hover:fill-blue-600 cursor-pointer transition-colors"
          />
          <text
            x={transformCoord(node.x, 'x')}
            y={transformCoord(node.y, 'y') - 15}
            textAnchor="middle"
            className="text-xs font-medium fill-gray-700 pointer-events-none"
          >
            {node.id}
          </text>
        </g>
      ))}
    </svg>
  );
};

export default GraphVisualization;