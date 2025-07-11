'use client';
import React from 'react';
import { Play, Pause, RotateCcw, Download } from 'lucide-react';
import useForceDirectedLayout from '../hooks/layoutAlgorithm';
import GraphVisualization from './graphVisualization';
import GraphStats from './graphStatistics';

const MalawiGraphVisualization = () => {
    // Initial node positions for Malawi districts
  const initialNodes = [
    { "id": "Blantyre", "x": 0.9134213014976535, "y": 0.2540740323898225 },
    { "id": "Chikwawa", "x": 0.14374226893980302, "y": 0.3910154112946962 },
    { "id": "Chiradzulu", "x": 0.9351749046225152, "y": 0.5027042682331085 },
    { "id": "Chitipa", "x": 0.5033532302137712, "y": 0.6371050642113303 },
    { "id": "Dedza", "x": 0.32675593364689126, "y": 0.32741458873737384 },
    { "id": "Dowa", "x": 0.44893854232683894, "y": 0.3534310438093927 },
    { "id": "Karonga", "x": 0.7719114930591756, "y": 0.7164846847486838 },
    { "id": "Kasungu", "x": 0.9486271739760203, "y": 0.03717616769235954 },
    { "id": "Lilongwe", "x": 0.03185092819745572, "y": 0.07907784991666855 },
    { "id": "Machinga", "x": 0.4976553188158377, "y": 0.15957191749775634 },
    { "id": "Mangochi", "x": 0.2417748469656349, "y": 0.22132470346325728 },
    { "id": "Mchinji", "x": 0.8029651384628501, "y": 0.4170419722297135 },
    { "id": "Mulanje", "x": 0.6998851394303303, "y": 0.7300336822154281 },
    { "id": "Mwanza", "x": 0.3093976112949879, "y": 0.9141857772478698 },
    { "id": "Mzimba", "x": 0.16190201617155997, "y": 0.8356366262711726 },
    { "id": "Neno", "x": 0.9869012833729535, "y": 0.3511167097222222 },
    { "id": "Nkhata Bay", "x": 0.0882233026546202, "y": 0.18674223158715342 },
    { "id": "Nkhotakota", "x": 0.17467106409589772, "y": 0.0010883823237957113 },
    { "id": "Nsanje", "x": 0.8093914854184416, "y": 0.5079865816371467 },
    { "id": "Ntcheu", "x": 0.8588177668360885, "y": 0.4167540312634731 },
    { "id": "Ntchisi", "x": 0.3969781197576786, "y": 0.9982702660465445 },
    { "id": "Phalombe", "x": 0.934352810085411, "y": 0.7328019939159007 },
    { "id": "Rumphi", "x": 0.2438492080065875, "y": 0.0387865957339274 },
    { "id": "Salima", "x": 0.837201462046805, "y": 0.9965726289086905 },
    { "id": "Thyolo", "x": 0.6272655175304893, "y": 0.7688215502317457 },
    { "id": "Zomba", "x": 0.7252659639019722, "y": 0.810888016094619 },
    { "id": "Balaka", "x": 0.15932838570160823, "y": 0.5698123530031478 },
    { "id": "Likoma", "x": 0.3488343806746971, "y": 0.6253864059894712 }
  ];

  const edges = [
    ["Blantyre", "Chikwawa"], ["Blantyre", "Chiradzulu"], ["Blantyre", "Thyolo"],
    ["Chikwawa", "Nsanje"], ["Chikwawa", "Mwanza"], ["Chiradzulu", "Zomba"],
    ["Chiradzulu", "Phalombe"], ["Chitipa", "Karonga"], ["Dedza", "Lilongwe"],
    ["Dedza", "Ntcheu"], ["Dowa", "Lilongwe"], ["Dowa", "Ntchisi"],
    ["Karonga", "Rumphi"], ["Kasungu", "Lilongwe"], ["Kasungu", "Mzimba"],
    ["Lilongwe", "Mchinji"], ["Lilongwe", "Salima"], ["Machinga", "Zomba"],
    ["Machinga", "Balaka"], ["Mangochi", "Balaka"], ["Mangochi", "Salima"],
    ["Mulanje", "Phalombe"], ["Mulanje", "Thyolo"], ["Mwanza", "Neno"],
    ["Mzimba", "Nkhata Bay"], ["Mzimba", "Rumphi"], ["Nkhata Bay", "Nkhotakota"],
    ["Nkhotakota", "Salima"], ["Nsanje", "Chikwawa"], ["Ntcheu", "Balaka"],
    ["Ntchisi", "Nkhotakota"], ["Phalombe", "Mulanje"], ["Salima", "Nkhotakota"],
    ["Zomba", "Machinga"]
  ];

  const config = {
    repulsionStrength: 0.02,
    attractionStrength: 0.008,
    damping: 0.85,
    maxIterations: 2000,
    minMovement: 0.0005
  };

  const { positions, isRunning, iteration, start, stop, reset } = 
    useForceDirectedLayout(initialNodes, edges, config);

  const downloadPositions = () => {
    const optimizedData = {
      nodes: positions,
      edges: edges,
      metadata: {
        iterations: iteration,
        algorithm: "Force-Directed Layout",
        timestamp: new Date().toISOString()
      }
    };
    
    const dataStr = JSON.stringify(optimizedData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'malawi_districts_optimized.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">
          Malawi Districts Graph Visualization
        </h1>
        <p className="text-white">
          Force-Directed Layout Algorithm for Optimized District Connections
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-2/3">
          <GraphVisualization 
            nodes={initialNodes}
            edges={edges}
            positions={positions}
            width={800}
            height={600}
          />
        </div>
        
        <div className="lg:w-1/3 space-y-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="font-bold text-lg text-black mb-4">Controls</h3>
            <div className="space-y-2">
              <button
                onClick={isRunning ? stop : start}
                className={`w-full px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 ${
                  isRunning 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                {isRunning ? <Pause size={16} /> : <Play size={16} />}
                {isRunning ? 'Pause' : 'Start'} Optimization
              </button>
              
              <button
                onClick={reset}
                className="w-full px-4 py-2 rounded-lg font-medium bg-gray-500 hover:bg-gray-600 text-white flex items-center justify-center gap-2"
              >
                <RotateCcw size={16} />
                Reset
              </button>
              
              <button
                onClick={downloadPositions}
                className="w-full px-4 py-2 rounded-lg font-medium bg-green-500 hover:bg-green-600 text-white flex items-center justify-center gap-2"
              >
                <Download size={16} />
                Download Positions
              </button>
            </div>
          </div>
          
          <GraphStats 
            nodes={initialNodes}
            edges={edges}
            positions={positions}
            iteration={iteration}
          />
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-bold text-black text-lg mb-2">Algorithm Details</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>Type:</strong> Force-Directed Layout</p>
              <p><strong>Repulsion:</strong> {config.repulsionStrength}</p>
              <p><strong>Attraction:</strong> {config.attractionStrength}</p>
              <p><strong>Damping:</strong> {config.damping}</p>
              <p><strong>Max Iterations:</strong> {config.maxIterations}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="font-bold text-black text-xl mb-4">Optimized Node Positions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          {positions.map((node) => (
            <div key={node.id} className="bg-gray-50 p-3 rounded">
              <div className="font-medium text-gray-600">{node.id}</div>
              <div className="text-gray-600">
                x: {node.x.toFixed(6)}, y: {node.y.toFixed(6)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MalawiGraphVisualization;