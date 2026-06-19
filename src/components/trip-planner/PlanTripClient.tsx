"use client";

import { useState, useEffect } from "react";
import { TripState, initialTripState, ApiTripResult, DestinationData } from "./types";
import { StepDestination } from "./StepDestination";
import { StepBudget } from "./StepBudget";
import { StepPreferences } from "./StepPreferences";
import { LiveSummary } from "./LiveSummary";
import { SmartInsights } from "./SmartInsights";
import { SuccessScreen } from "./SuccessScreen";
import { motion, AnimatePresence } from "framer-motion";
import { Plane } from "lucide-react";
import { LoadingScreen } from "./LoadingScreen";

export function PlanTripClient({ initialDestination = "" }: { initialDestination?: string }) {
  const [step, setStep] = useState(1);
  const [state, setState] = useState<TripState>({ ...initialTripState, destination: initialDestination });
  const [isCalculating, setIsCalculating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [apiResult, setApiResult] = useState<ApiTripResult | null>(null);
  const [destinations, setDestinations] = useState<DestinationData[]>([]);

  useEffect(() => {
    fetch('/api/destinations')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.destinations) {
          setDestinations(data.destinations);
        }
      })
      .catch(err => console.error("Failed to fetch destinations", err));
  }, []);

  const updateState = (updates: Partial<TripState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const handleNext = () => setStep((s) => Math.min(s + 1, 3));
  const handlePrev = () => setStep((s) => Math.max(s - 1, 1));

  const handleCalculate = async () => {
    setIsCalculating(true);
    
    try {
      const response = await fetch("/api/planner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slug: state.destination,
          budget: state.budget,
          days: state.duration,
          travelers: state.travelers.adults + state.travelers.children,
        }),
      });

      const data = await response.json();
      if (data.success && data.data) {
        setApiResult(data.data);
      }
    } catch (error) {
      console.error("Failed to calculate trip:", error);
    } finally {
      setIsCalculating(false);
      setShowSuccess(true);
    }
  };

  const handleReset = () => {
    setState(initialTripState);
    setStep(1);
    setShowSuccess(false);
    setApiResult(null);
  };

  if (showSuccess && apiResult) {
    return <SuccessScreen state={state} apiResult={apiResult} onReset={handleReset} />;
  } else if (showSuccess && !apiResult) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center text-white">
        <h2 className="text-2xl font-bold mb-4">Calculation Failed</h2>
        <p className="mb-6">Please ensure you selected a destination.</p>
        <button onClick={handleReset} className="glass-button">Go Back</button>
      </div>
    );
  }

  if (isCalculating) {
    return <LoadingScreen />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Section */}
      <div className="mb-12 text-center relative">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center justify-center p-3 bg-indigo-500/10 text-indigo-400 rounded-full mb-4"
        >
          <Plane className="w-6 h-6" />
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-4 tracking-tight"
        >
          Plan Your Perfect Trip
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-white/60 text-lg max-w-2xl mx-auto"
        >
          Tell us about your trip and we'll estimate the total cost instantly.
        </motion.p>
        
        <div className="mt-8 flex justify-center items-center gap-4">
          <div className="text-sm font-medium text-white/50">Step {step} of 3</div>
          <div className="w-48 h-2 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-indigo-500 rounded-full"
              initial={{ width: `${((step - 1) / 3) * 100}%` }}
              animate={{ width: `${(step / 3) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative items-start">
        
        {/* Left Side: Form Steps */}
        <div className="w-full lg:w-3/5 flex-shrink-0">
          <div className="glass-card p-6 md:p-8 relative overflow-hidden">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <StepDestination state={state} updateState={updateState} destinations={destinations} />
                </motion.div>
              )}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <StepBudget state={state} updateState={updateState} />
                </motion.div>
              )}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <StepPreferences state={state} updateState={updateState} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center">
              <button
                onClick={handlePrev}
                disabled={step === 1}
                className="glass-button-secondary opacity-100 disabled:opacity-0 disabled:pointer-events-none transition-opacity"
              >
                Back
              </button>

              {step < 3 ? (
                <button 
                  onClick={handleNext} 
                  disabled={step === 1 && !state.destination} 
                  className="glass-button flex items-center gap-2"
                >
                  Continue
                </button>
              ) : (
                <button onClick={handleCalculate} className="glass-button flex items-center gap-2 bg-teal-500 hover:bg-teal-400 shadow-teal-500/25">
                  Calculate Trip Budget
                </button>
              )}
            </div>
          </div>
          
          <div className="mt-8">
            <SmartInsights state={state} />
          </div>
        </div>

        {/* Right Side: Sticky Summary */}
        <div className="w-full lg:w-2/5 lg:sticky lg:top-8">
          <LiveSummary state={state} destinations={destinations} />
        </div>
      </div>
    </div>
  );
}
