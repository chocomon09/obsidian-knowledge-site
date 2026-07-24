'use client';

import { useEffect, useRef } from 'react';
import { Network } from 'vis-network';

export default function KnowledgeGraph() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;
    
    const nodes = [
      { id: 1, label: 'KNOWLEDGE LAB', color: '#00eaff' },
      { id: 2, label: 'Outputs', color: '#0e8b9c' },
      { id: 3, label: 'Compound', color: '#0e8b9c' },
      { id: 4, label: 'Analysis', color: '#7df3ff' },
      { id: 5, label: 'Philosophy', color: '#7df3ff' }
    ];
    
    const edges = [
      { from: 1, to: 2 },
      { from: 1, to: 3 },
      { from: 2, to: 4 },
      { from: 3, to: 5 },
      { from: 4, to: 5 }
    ];
    
    const options = {
      nodes: {
        shape: 'dot',
        size: 16,
        font: {
          color: '#e6f2f5',
          face: '"IBM Plex Mono", monospace'
        },
        borderWidth: 2,
        shadow: true
      },
      edges: {
        width: 2,
        color: 'rgba(158, 199, 212, 0.34)'
      },
      physics: {
        barnesHut: {
          gravitationalConstant: -2000,
          centralGravity: 0.3,
          springLength: 95,
          springConstant: 0.04,
          damping: 0.09
        }
      }
    };
    
    const network = new Network(container.current, { nodes, edges }, options);
    
    return () => {
      network.destroy();
    };
  }, []);

  return (
    <div className="bevel-card w-full h-[300px] bg-bg-raised">
      <div ref={container} className="w-full h-full" />
    </div>
  );
}
