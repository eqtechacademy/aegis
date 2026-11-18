import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  CheckCircle2, 
  Sparkles, 
  CreditCard, 
  ShieldCheck, 
  HelpCircle, 
  ArrowRight, 
  X,
  QrCode
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const SubscriptionPricing: React.FC = () => {
  const { setView, speakText } = useApp();
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);

  const handleStartTrial = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
    speakText("Welcome to your 14-Day Free Trial of AGIES. Full voice and PC automation unlocked with zero credit card required.");
    setTimeout(() => {
      setView('dashboard');
    }, 1500);
  };

  const handlePayNow = () => {
    setPaymentDone(true);
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 },
    });
    speakText("Payment mandate for ₹699 plus GST confirmed via Razorpay UPI Autopay.");
    setTimeout(() => {
      setShowCheckoutModal(false);
      setPaymentDone(false);
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto w-full p-6 sm:p-12 space-y-10 relative z-10 flex-1">

      {/* HEADER TITLE & REAL-TIME TRANSCRIPT */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="px-3.5 py-1 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-300 font-mono text-xs font-semibold inline-block">
          14-DAY TRIAL ACTIVE • ZERO CARD REQUIRED
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
          Simple, Transparent AI Assistant Pricing
        </h2>
        <p className="text-xs sm:text-sm text-slate-300">
          Start with 14 full days completely free without entering card details. Continue after 14 days at our transparent minimum plan.
        </p>

        {/* LIVE VOICE TRANSCRIPT HUD (Exact Stitch Match) */}
        <div className="glass-panel rounded-2xl p-4 text-left font-mono text-xs max-w-xl mx-auto mt-4">
          <div className="flex items-center justify-between border-b border-cyan-500/20 pb-1.5 mb-2">
            <span className="text-cyan-400 font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Voice Agent Subscription Command
            </span>
            <span className="text-purple-300 text-[10px]">Real-Time Feed</span>
          </div>
          <div className="text-slate-300">
            <strong className="text-purple-400">Unnikrishnan (Voice):</strong> "Hey AGIES, what is the exact monthly charge when the 14 days expire?"
          </div>
          <div className="text-cyan-200 mt-1">
            <strong className="text-cyan-400">AGIES (Synthetic Agent):</strong> "The base plan is ₹699 + 18% GST (₹125.82), totaling ₹824.82/month. Card details are only requested after day 14."
          </div>
        </div>
      </div>

      {/* PRICING TIERS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">

        {/* PLAN 1: 14-DAY FREE TRIAL (Active Initial State) */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-cyan-500/40 relative">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono font-bold text-cyan-400 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30">
                STEP 1: GET STARTED
              </span>
              <span className="text-xs text-emerald-400 font-semibold">100% Free</span>
            </div>

            <div>
              <h3 className="text-2xl font-bold font-display text-white">14-Day Full Free Trial</h3>
              <p className="text-xs text-slate-300 mt-1">
                Full access to voice agent, projects, transcripts, and robot motions.
              </p>
            </div>

            <div className="py-4 border-y border-slate-800">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold font-display text-white">₹0</span>
                <span className="text-xs text-slate-400 font-mono">for first 14 days</span>
              </div>
              <p className="text-[11px] text-cyan-300 mt-1 font-mono">
                ✓ Zero credit/debit card required upfront
              </p>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-300 font-sans">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Full Voice Agent continuous control ("Hey AGIES")</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Live streaming speech transcripts & auto-intent matching</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Real-time project sprint tracking & AI suggestions</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>3D robot motion states & workstation HUD</span>
              </li>
            </ul>
          </div>

          <div className="mt-8">
            <button
              onClick={handleStartTrial}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-600 to-purple-600 text-white font-bold text-xs shadow-glow-pill hover:opacity-95 transition-opacity flex items-center justify-center gap-2"
            >
              <span>Start 14-Day Free Trial (No Card)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* PLAN 2: ESSENTIAL PRO (₹699 + GST after 14 days) */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 flex flex-col justify-between border-2 border-purple-500/60 shadow-glow-purple relative bg-gradient-to-b from-[#131b40]/80 to-[#0b1229]/90">
          <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 text-white font-mono text-[10px] font-bold shadow-lg">
            POST-TRIAL MINIMUM
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono font-bold text-purple-300 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30">
                STEP 2: RENEWAL PLAN
              </span>
            </div>

            <div>
              <h3 className="text-2xl font-bold font-display text-white">AGIES Pro Workspace</h3>
              <p className="text-xs text-slate-300 mt-1">
                Billed only after day 14 when you add payment details.
              </p>
            </div>

            <div className="py-4 border-y border-purple-500/30">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold font-display text-white">₹699</span>
                <span className="text-xs text-purple-300 font-mono">+ 18% GST / month</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 font-mono">
                Total: ₹824.82 inclusive of all taxes
              </p>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-200">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Everything in 14-Day Free Trial</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Unlimited autonomous web browsing actions & scrapers</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Persistent neural memory across PC and mobile devices</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Priority direct support from EQMax Tech engineering</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 space-y-2">
            <button
              onClick={() => setShowCheckoutModal(true)}
              className="w-full py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-purple-500/40 text-purple-200 font-bold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <CreditCard className="w-4 h-4" />
              <span>Pay with UPI / Card (After 14 Days)</span>
            </button>
            <p className="text-[10px] text-center text-slate-400 font-mono">
              Cancel anytime before day 14 with 1-click
            </p>
          </div>
        </div>

      </div>

      {/* RAZORPAY CHECKOUT MODAL SIMULATION */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="glass-panel rounded-2xl p-6 max-w-md w-full border border-purple-400/40 space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-purple-400" />
                <h3 className="font-display font-bold text-white text-base">Razorpay UPI Autopay Checkout</h3>
              </div>
              <button onClick={() => setShowCheckoutModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {paymentDone ? (
              <div className="text-center py-6 space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-display font-bold text-lg text-white">Payment Mandate Active!</h4>
                <p className="text-xs text-slate-300 font-mono">
                  ₹824.82/month mandate configured. First debit will occur after day 14.
                </p>
              </div>
            ) : (
              <div className="space-y-4 text-xs font-mono">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-purple-500/30 space-y-1">
                  <div className="flex justify-between text-slate-300">
                    <span>AGIES Pro Workspace Subscription:</span>
                    <span className="font-bold text-white">₹699.00</span>
                  </div>
                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>18% CGST + SGST:</span>
                    <span>₹125.82</span>
                  </div>
                  <div className="pt-2 border-t border-slate-800 flex justify-between text-sm font-bold text-cyan-300">
                    <span>Total Monthly Renewal:</span>
                    <span>₹824.82 / mo</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-slate-300 font-semibold">Select Payment Method</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="p-2.5 rounded-xl bg-purple-950/60 border border-purple-400 text-purple-300 text-left font-bold flex items-center gap-2">
                      <QrCode className="w-4 h-4" />
                      <span>UPI Autopay</span>
                    </button>
                    <button className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 text-left hover:border-slate-600 flex items-center gap-2">
                      <CreditCard className="w-4 h-4" />
                      <span>Credit/Debit Card</span>
                    </button>
                  </div>
                </div>

                <div className="text-[10px] text-slate-400">
                  Secured by 256-bit AES encryption. Verified Merchant: EQMax Tech Solutions.
                </div>

                <button
                  onClick={handlePayNow}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold font-headline text-xs shadow-glow-cyan hover:opacity-95"
                >
                  Confirm Mandate (₹824.82 / Month)
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
