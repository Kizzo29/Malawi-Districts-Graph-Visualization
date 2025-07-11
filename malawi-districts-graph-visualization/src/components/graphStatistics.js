'use client';
import React from 'react';

// Statistics component
const GraphStats = ({ nodes, edges, positions, iteration }) => {
  const edgeCrossings = React.useMemo(() => {
    let crossings = 0;
    for (let i = 0; i < edges.length; i++) {
      for (let j = i + 1; j < edges.length; j++) {
        const [a1, a2] = edges[i];
        const [b1, b2] = edges[j];
        
        const node_a1 = positions.find(n => n.id === a1);
        const node_a2 = positions.find(n => n.id === a2);
        const node_b1 = positions.find(n => n.id === b1);
        const node_b2 = positions.find(n => n.id === b2);
        
        if (node_a1 && node_a2 && node_b1 && node_b2) {
          // Check if lines intersect
          const det = (node_a2.x - node_a1.x) * (node_b2.y - node_b1.y) - 
                     (node_a2.y - node_a1.y) * (node_b2.x - node_b1.x);
          
          if (Math.abs(det) > 1e-10) {
            const t = ((node_b1.x - node_a1.x) * (node_b2.y - node_b1.y) - 
                      (node_b1.y - node_a1.y) * (node_b2.x - node_b1.x)) / det;
            const s = ((node_b1.x - node_a1.x) * (node_a2.y - node_a1.y) - 
                      (node_b1.y - node_a1.y) * (node_a2.x - node_a1.x)) / det;
            
            if (t >= 0 && t <= 1 && s >= 0 && s <= 1) {
              crossings++;
            }
          }
        }
      }
    }
    return crossings;
  }, [edges, positions]);

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="font-bold text-lg text-black mb-2">Graph Statistics</h3>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className='text-gray-600'>
          <span className="font-medium">Nodes:</span> {nodes.length}
        </div>
        <div className='text-gray-600'>
          <span className="font-medium">Edges:</span> {edges.length}
        </div>
        <div className='text-gray-600'>
          <span className="font-medium">Iterations:</span> {iteration}
        </div>
        <div className='text-gray-600'>
          <span className="font-medium">Edge Crossings:</span> {edgeCrossings}
        </div>
      </div>
    </div>
  );
};
export default GraphStats;