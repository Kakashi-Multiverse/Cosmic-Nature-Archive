import React, { useState, useEffect } from 'react';
import { 
  Atom, 
  Leaf, 
  Globe, 
  HeartPulse, 
  Sparkles, 
  RotateCw, 
  Zap, 
  Cpu, 
  Layers, 
  Activity,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export default function App() {
  // System State
  const [version, setVersion] = useState("v3.2.0-React-Core");
  const [isUpdating, setIsUpdating] = useState(false);
  const [quantumFreq, setQuantumFreq] = useState(942.18);
  
  // Ecological Entities State
  const [entities, setEntities] = useState([
    { id: 1, name: "Nebula Panther", type: "Fauna", origin: "Dimension-C137", health: 62.5, status: "Under Restoration" },
    { id: 2, name: "Starlight Flora", type: "Flora", origin: "Dimension-Alpha", health: 94.0, status: "Thriving" },
    { id: 3, name: "Chrono Crystal", type: "Elemental", origin: "Dimension-T9", health: 41.2, status: "Critically Threatened" },
    { id: 4, name: "Quantum Coral", type: "Flora", origin: "Dimension-X88", health: 78.0, status: "Stable" }
  ]);

  // AI Diagnostic State
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [aiOutput, setAiOutput] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Auto-Update Handler
  const handleAutoUpdate = () => {
    setIsUpdating(true);
    setTimeout(() => {
      setVersion("v3.2.5-Multiverse-Live");
      setQuantumFreq((prev) => +(prev + Math.random() * 20).toFixed(2));
      setIsUpdating(false);
    }, 1200);
  };

  // Quantum Pulse Restoration
  const handleRestorationPulse = () => {
    setEntities(prev => prev.map(item => ({
      ...item,
      health: Math.min(100, +(item.health + 14.5).toFixed(1)),
      status: item.health + 14.5 >= 80 ? "Thriving" : "Under Restoration"
    })));
  };

  // AI Diagnostic Logic using Gemini API
  const runAiDiagnostics = async (entity) => {
    setSelectedEntity(entity);
    setIsAiLoading(true);
    setAiOutput("");

    const apiKey = ""; // Runtime automatically injected
    const prompt = `Analyze the ecological entity '${entity.name}' located in '${entity.origin}' with a health index of ${entity.health}%. Provide a brief diagnostic summary and 2 restoration actions in English.`;
    const systemPrompt = "You are a Cosmic Nature Archive AI monitoring system. Provide concise, professional, sci-fi-themed responses in English.";

    let delay = 1000;
    let success = false;

    for (let attempt = 0; attempt < 5; attempt++) {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            systemInstruction: { parts: [{ text: systemPrompt }] }
          })
        });

        if (!response.ok) throw new Error("Connection failed");

        const data = await response.json();
        const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response received from AI.";
        
        setAiOutput(resultText);
        success = true;
        break;
      } catch (err) {
        await new Promise(res => setTimeout(res, delay));
        delay *= 2;
      }
    }

    if (!success) {
      setAiOutput("Error: Unable to connect to Cosmic AI Engine after multiple retries.");
    }
    setIsAiLoading(false);
  };

  // Calculate Average Health
  const avgHealth = (entities.reduce((acc, curr) => acc + curr.health, 0) / entities.length).toFixed(1);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800/80 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-500/20">
              <Atom className="w-6 h-6 text-white animate-spin-slow" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
                Cosmic Nature Archive
              </h1>
              <p className="text-xs text-slate-400">React Multiverse Operations Platform</p>
            </div>
          </div>

          {/* System Version & Auto-Update Badge */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-900 px-3.5 py-1.5 rounded-full border border-indigo-500/30 text-xs font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-indigo-300">{version}</span>
            </div>

            <button 
              onClick={handleAutoUpdate} 
              disabled={isUpdating}
              className="text-xs bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white px-3.5 py-1.5 rounded-lg transition duration-200 flex items-center gap-2 font-medium shadow-md shadow-indigo-600/20 disabled:opacity-50"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isUpdating ? 'animate-spin' : ''}`} />
              {isUpdating ? "Syncing..." : "Auto Update"}
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
      <main className="max-w-7xl mx-auto p-6 w-full space-y-6 my-auto">
        
        {/* KPI Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900/60 backdrop-blur-md p-4 rounded-xl border border-slate-800/80 flex items-center gap-4">
            <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-lg">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium">Tracked Sectors</div>
              <div className="text-lg font-bold text-slate-100">16 Dimensions</div>
            </div>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-md p-4 rounded-xl border border-slate-800/80 flex items-center gap-4">
            <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-lg">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium">Active Species</div>
              <div className="text-lg font-bold text-slate-100">{entities.length} Entities</div>
            </div>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-md p-4 rounded-xl border border-slate-800/80 flex items-center gap-4">
            <div className="p-3 bg-purple-500/20 text-purple-400 rounded-lg">
              <HeartPulse className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium">Avg Restoration Index</div>
              <div className="text-lg font-bold text-emerald-400">{avgHealth}%</div>
            </div>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-md p-4 rounded-xl border border-slate-800/80 flex items-center gap-4">
            <div className="p-3 bg-pink-500/20 text-pink-400 rounded-lg">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium">Quantum Frequency</div>
              <div className="text-lg font-bold text-pink-400 font-mono">{quantumFreq} GHz</div>
            </div>
          </div>
        </div>

        {/* Content Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Entity Data Table */}
          <div className="lg:col-span-2 bg-slate-900/60 backdrop-blur-md p-6 rounded-2xl border border-slate-800/80 space-y-4 shadow-xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <h2 className="text-base font-bold flex items-center gap-2 text-indigo-400">
                <Layers className="w-5 h-5" /> Multiverse Ecological Registry
              </h2>
              <button 
                onClick={handleRestorationPulse} 
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 active:scale-95 text-white text-xs px-4 py-2 rounded-lg font-medium shadow-md shadow-emerald-600/20 transition flex items-center gap-1.5"
              >
                <Zap className="w-3.5 h-3.5" /> Trigger Quantum Pulse
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead class="bg-slate-950/60 text-slate-400 uppercase text-xs">
                  <tr>
                    <th class="p-3">Species Name</th>
                    <th class="p-3">Type</th>
                    <th class="p-3">Origin Dimension</th>
                    <th class="p-3">Health Index</th>
                    <th class="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {entities.map((item) => {
                    let healthColor = "bg-emerald-500";
                    if (item.health < 50) healthColor = "bg-rose-500";
                    else if (item.health < 80) healthColor = "bg-amber-500";

                    return (
                      <tr key={item.id} className="hover:bg-slate-800/40 transition">
                        <td className="p-3 font-semibold text-slate-100">{item.name}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 bg-slate-800 rounded text-xs font-mono text-slate-300">
                            {item.type}
                          </span>
                        </td>
                        <td className="p-3 font-mono text-xs text-indigo-400">{item.origin}</td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                              <div className={`${healthColor} h-full transition-all duration-500`} style={{ width: `${item.health}%` }}></div>
                            </div>
                            <span className="text-xs font-mono">{item.health}%</span>
                          </div>
                        </td>
                        <td className="p-3 text-right">
                          <button 
                            onClick={() => runAiDiagnostics(item)} 
                            className="bg-purple-600/80 hover:bg-purple-600 active:scale-95 text-white text-xs px-2.5 py-1 rounded-md transition inline-flex items-center gap-1.5"
                          >
                            <Sparkles className="w-3 h-3" /> Analyze AI
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* AI Diagnostic Terminal */}
          <div className="bg-slate-900/60 backdrop-blur-md p-6 rounded-2xl border border-slate-800/80 flex flex-col justify-between shadow-xl">
            <div>
              <h2 className="text-base font-bold flex items-center gap-2 text-pink-400 border-b border-slate-800 pb-4">
                <Cpu className="w-5 h-5" /> AI Diagnostic Terminal
              </h2>
              
              <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                Select an ecological entity to trigger Gemini AI automated health assessment and environmental restoration action plan.
              </p>

              <div className="mt-4 p-4 bg-slate-950 rounded-xl border border-slate-800/80 text-xs leading-relaxed text-slate-300 h-56 overflow-y-auto font-mono">
                {isAiLoading ? (
                  <div className="flex flex-col items-center justify-center h-full text-pink-400 gap-2">
                    <Sparkles className="w-5 h-5 animate-spin" />
                    <span>Querying Cosmic Intelligence...</span>
                  </div>
                ) : aiOutput ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-pink-400 font-bold border-b border-slate-800 pb-1">
                      <CheckCircle2 className="w-4 h-4" /> Diagnosis: {selectedEntity?.name}
                    </div>
                    <p className="text-slate-300 whitespace-pre-line leading-relaxed">{aiOutput}</p>
                  </div>
                ) : (
                  <p className="text-slate-500 italic text-center mt-20">Awaiting target entity selection...</p>
                )}
              </div>
            </div>

            <div className="mt-4 text-xs text-slate-500 text-center">
              Powered by Gemini 2.5 Flash Engine
            </div>
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="bg-slate-900/60 backdrop-blur-md border-t border-slate-800/80 py-3 text-center text-xs text-slate-500">
        <p>© 2026 Cosmic Nature Archive. React & Gemini AI Integration.</p>
      </footer>

    </div>
  );
}

