import { TripState, ApiTripResult } from "./types";
import { CheckCircle, MapPin, Calendar, Users, DollarSign, FileText, ArrowLeft, Download, AlertTriangle, X, Plane, Hotel, Utensils, Train, Ticket } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Props {
  state: TripState;
  apiResult: ApiTripResult;
  onReset: () => void;
}

export function SuccessScreen({ state, apiResult, onReset }: Props) {
  const [showReport, setShowReport] = useState(false);
  const { totalCost, remainingBudget, destination, isBudgetEnough, breakdown } = apiResult;

  const handleDownloadPdf = () => {
    window.print();
  };

  const breakdownItems = [
    { name: "Flights", cost: breakdown.flightCost, icon: Plane, color: "text-blue-400 bg-blue-400/10" },
    { name: "Hotels", cost: breakdown.hotelCost, icon: Hotel, color: "text-indigo-400 bg-indigo-400/10" },
    { name: "Food", cost: breakdown.foodCost, icon: Utensils, color: "text-teal-400 bg-teal-400/10" },
    { name: "Transport", cost: breakdown.transportCost, icon: Train, color: "text-orange-400 bg-orange-400/10" },
    { name: "Activities", cost: breakdown.activitiesCost, icon: Ticket, color: "text-pink-400 bg-pink-400/10" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Main Success Screen - Hidden during printing */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-card p-8 md:p-12 text-center relative overflow-hidden print:hidden"
      >
        <div className="absolute inset-0 pointer-events-none opacity-30">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-3 h-3 rounded-full ${i % 2 === 0 ? 'bg-indigo-500' : 'bg-teal-400'}`}
              initial={{ top: "50%", left: "50%", opacity: 1 }}
              animate={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, opacity: 0, scale: 2 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          ))}
        </div>

        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${isBudgetEnough ? 'bg-teal-500/20 text-teal-400' : 'bg-orange-500/20 text-orange-400'}`}
        >
          {isBudgetEnough ? <CheckCircle className="w-10 h-10" /> : <AlertTriangle className="w-10 h-10" />}
        </motion.div>

        <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Your Trip Plan Is Ready!</h1>
        <p className="text-lg text-white/60 max-w-xl mx-auto mb-10">
          We've analyzed your preferences and estimated your travel costs.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col items-center">
            <MapPin className="w-5 h-5 text-white/40 mb-2" />
            <div className="text-sm text-white/60 mb-1">Destination</div>
            <div className="font-medium capitalize text-center">{destination?.city || state.destination || "Anywhere"}</div>
          </div>
          <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col items-center">
            <Calendar className="w-5 h-5 text-white/40 mb-2" />
            <div className="text-sm text-white/60 mb-1">Duration</div>
            <div className="font-medium">{state.duration} Days</div>
          </div>
          <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col items-center">
            <Users className="w-5 h-5 text-white/40 mb-2" />
            <div className="text-sm text-white/60 mb-1">Travelers</div>
            <div className="font-medium">{state.travelers.adults + state.travelers.children}</div>
          </div>
          <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col items-center">
            <DollarSign className="w-5 h-5 text-white/40 mb-2" />
            <div className="text-sm text-white/60 mb-1">Total Cost</div>
            <div className="font-medium text-teal-400">${Math.round(totalCost).toLocaleString()}</div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-teal-500/10 border border-white/10 mb-10 inline-block text-left mx-auto max-w-md w-full">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white/80">Your Budget:</span>
            <span className="font-bold">${state.budget.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white/80">{isBudgetEnough ? "Remaining:" : "Over Budget:"}</span>
            <span className={`font-bold ${isBudgetEnough ? 'text-teal-400' : 'text-orange-400'}`}>
              {isBudgetEnough ? "+" : "-"} ${Math.abs(Math.round(remainingBudget)).toLocaleString()}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button onClick={() => setShowReport(true)} className="glass-button w-full sm:w-auto flex items-center justify-center gap-2">
            <FileText className="w-4 h-4" />
            View Full Report
          </button>
          <button onClick={handleDownloadPdf} className="glass-button-secondary w-full sm:w-auto flex items-center justify-center gap-2">
            <Download className="w-4 h-4" />
            Download PDF
          </button>
          <button onClick={onReset} className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 text-white/60 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Plan Another Trip
          </button>
        </div>
      </motion.div>

      {/* Printable Report Modal */}
      <div className={cn(
        "print:block print:absolute print:inset-0 print:p-8 print:bg-white print:text-black",
        showReport ? "fixed inset-0 z-50 bg-navy-950/90 backdrop-blur-sm p-4 md:p-8 overflow-y-auto flex items-start justify-center" : "hidden"
      )}>
        <div className="w-full max-w-3xl bg-navy-900 border border-white/10 rounded-2xl p-6 md:p-10 relative print:bg-white print:border-none print:shadow-none print:p-0">
          
          <button onClick={() => setShowReport(false)} className="absolute top-6 right-6 text-white/50 hover:text-white print:hidden">
            <X className="w-6 h-6" />
          </button>

          <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10 print:border-black/10">
            <div>
              <h2 className="text-3xl font-bold text-white print:text-black">Voyago Trip Report</h2>
              <p className="text-white/60 print:text-gray-500 mt-1">Detailed cost breakdown and itinerary summary</p>
            </div>
            <Plane className="w-10 h-10 text-indigo-500 print:text-black" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            <div>
              <div className="text-sm text-white/50 print:text-gray-500 mb-1">Destination</div>
              <div className="font-semibold text-lg">{destination?.city}, {destination?.country}</div>
            </div>
            <div>
              <div className="text-sm text-white/50 print:text-gray-500 mb-1">Duration</div>
              <div className="font-semibold text-lg">{state.duration} Days</div>
            </div>
            <div>
              <div className="text-sm text-white/50 print:text-gray-500 mb-1">Travelers</div>
              <div className="font-semibold text-lg">{state.travelers.adults + state.travelers.children} People</div>
            </div>
            <div>
              <div className="text-sm text-white/50 print:text-gray-500 mb-1">Cost Tier</div>
              <div className="font-semibold text-lg">{destination?.costTier}</div>
            </div>
          </div>

          <h3 className="text-xl font-bold mb-6 text-white print:text-black">Cost Breakdown</h3>
          
          <div className="space-y-4 mb-10">
            {breakdownItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 print:bg-gray-50 print:border-gray-200">
                  <div className="flex items-center gap-4">
                    <div className={cn("p-2 rounded-lg print:text-black print:bg-gray-200", item.color)}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-medium text-white print:text-black">{item.name}</span>
                  </div>
                  <span className="font-mono font-bold text-lg text-white print:text-black">${item.cost.toLocaleString()}</span>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center p-6 rounded-xl bg-indigo-500/10 border border-indigo-500/20 print:bg-gray-100 print:border-gray-300">
            <div className="mb-4 md:mb-0">
              <div className="text-sm text-white/60 print:text-gray-600">Total Estimated Cost</div>
              <div className="text-4xl font-bold text-white print:text-black">${Math.round(totalCost).toLocaleString()}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-white/60 print:text-gray-600">Your Budget: ${state.budget.toLocaleString()}</div>
              <div className={`font-medium ${isBudgetEnough ? 'text-teal-400 print:text-green-600' : 'text-orange-400 print:text-red-600'}`}>
                {isBudgetEnough ? 'Under Budget by ' : 'Over Budget by '} 
                ${Math.abs(Math.round(remainingBudget)).toLocaleString()}
              </div>
            </div>
          </div>

          <div className="mt-10 flex justify-center print:hidden">
            <button onClick={handleDownloadPdf} className="glass-button flex items-center gap-2">
              <Download className="w-4 h-4" /> Print / Save as PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
