'use client';
import React, { useState, useEffect, useRef } from 'react';

// layout algorithm
const useForceDirectedLayout = (nodes, edges, config) => {
  const [positions, setPositions] = useState(nodes);
  const [isRunning, setIsRunning] = useState(false);
  const [iteration, setIteration] = useState(0);
  const animationRef = useRef();

  const {
    repulsionStrength = 0.01,
    attractionStrength = 0.005,
    damping = 0.9,
    maxIterations = 1000,
    minMovement = 0.001
  } = config;

  // Adjacency map for efficient edge lookups
  const adjacencyMap = React.useMemo(() => {
    const map = new Map();
    edges.forEach(([from, to]) => {
      if (!map.has(from)) map.set(from, new Set());
      if (!map.has(to)) map.set(to, new Set());
      map.get(from).add(to);
      map.get(to).add(from);
    });
    return map;
  }, [edges]);

  const applyForces = (currentPositions) => {
    const newPositions = [...currentPositions];
    const forces = currentPositions.map(() => ({ fx: 0, fy: 0 }));

    // Apply repulsion forces between all nodes
    for (let i = 0; i < currentPositions.length; i++) {
      for (let j = i + 1; j < currentPositions.length; j++) {
        const nodeA = currentPositions[i];
        const nodeB = currentPositions[j];
        
        const dx = nodeA.x - nodeB.x;
        const dy = nodeA.y - nodeB.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 0) {
          const force = repulsionStrength / (distance * distance);
          const fx = (dx / distance) * force;
          const fy = (dy / distance) * force;
          
          forces[i].fx += fx;
          forces[i].fy += fy;
          forces[j].fx -= fx;
          forces[j].fy -= fy;
        }
      }
    }

    // Apply attraction forces for connected nodes
    edges.forEach(([fromId, toId]) => {
      const fromIndex = currentPositions.findIndex(n => n.id === fromId);
      const toIndex = currentPositions.findIndex(n => n.id === toId);
      
      if (fromIndex !== -1 && toIndex !== -1) {
        const fromNode = currentPositions[fromIndex];
        const toNode = currentPositions[toIndex];
        
        const dx = toNode.x - fromNode.x;
        const dy = toNode.y - fromNode.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 0) {
          const force = attractionStrength * distance;
          const fx = (dx / distance) * force;
          const fy = (dy / distance) * force;
          
          forces[fromIndex].fx += fx;
          forces[fromIndex].fy += fy;
          forces[toIndex].fx -= fx;
          forces[toIndex].fy -= fy;
        }
      }
    });

    // Update positions and apply constraints
    let totalMovement = 0;
    for (let i = 0; i < newPositions.length; i++) {
      const node = newPositions[i];
      const force = forces[i];
      
      // Apply damping
      const dx = force.fx * damping;
      const dy = force.fy * damping;
      
      // Update position
      node.x += dx;
      node.y += dy;
      
      // Keep within bounds [0, 1]
      node.x = Math.max(0.05, Math.min(0.95, node.x));
      node.y = Math.max(0.05, Math.min(0.95, node.y));
      
      totalMovement += Math.abs(dx) + Math.abs(dy);
    }

    return { newPositions, totalMovement };
  };

  const runSimulation = () => {
    if (!isRunning) return;

    const { newPositions, totalMovement } = applyForces(positions);
    
    setPositions(newPositions);
    setIteration(prev => prev + 1);

    // Stop if converged or max iterations reached
    if (totalMovement < minMovement || iteration >= maxIterations) {
      setIsRunning(false);
      return;
    }

    animationRef.current = requestAnimationFrame(runSimulation);
  };

  useEffect(() => {
    if (isRunning) {
      animationRef.current = requestAnimationFrame(runSimulation);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRunning, positions, iteration]);

  const start = () => setIsRunning(true);
  const stop = () => setIsRunning(false);
  const reset = () => {
    setIsRunning(false);
    setIteration(0);
    setPositions(nodes);
  };

  return { positions, isRunning, iteration, start, stop, reset };
};

export default useForceDirectedLayout;