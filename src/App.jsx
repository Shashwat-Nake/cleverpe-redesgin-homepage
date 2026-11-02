import React, { useState, useMemo } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Smartphone,
  ChevronDown,
  Building2,
  Stethoscope,
  Bike,
  CreditCard,
  Percent,
  Sliders,
  ExternalLink,
  Menu,
  X,
  FileCheck2,
  Clock,
  Sparkles,
  Award,
  Lock,
  ChevronRight,
  TrendingUp,
  Receipt,
  Check,
  HelpCircle,
  PhoneCall,
  Mail,
  MapPin,
  ArrowUpRight
} from 'lucide-react';

// Brand Logo Component
export const CleverPeLogo = ({ className = "" }) => (
  <div className={`flex items-center gap-2.5 font-bold tracking-tight select-none ${className}`}>
    <div className="relative w-9 h-9 rounded-xl bg-teal-brand flex items-center justify-center shadow-sm">
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 8h-5a4 4 0 0 0 0 8h5" />
        <circle cx="10" cy="12" r="1.75" fill="#A8C8B5" stroke="none" />
        <path d="M14 12h4" />
      </svg>
      <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-sage-brand ring-2 ring-white"></span>
    </div>
    <div className="flex items-baseline font-sans">
      <span className="text-[22px] font-extrabold tracking-tight text-slate-deep">Clever</span>
      <span className="text-[22px] font-extrabold tracking-tight text-teal-brand">Pe</span>
    </div>
  </div>
);

export default function App() {
  // Mobile navigation state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Modal states for interactive CTAs
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [merchantModalOpen, setMerchantModalOpen] = useState(false);
  const [selectedSolutionModal, setSelectedSolutionModal] = useState(null);

  // EMI Calculator state
  const [amount, setAmount] = useState(60000);
  const [tenure, setTenure] = useState(6);
  const [isNoCost, setIsNoCost] = useState(true);
  const [downPayment, setDownPayment] = useState(0);

  // FAQ accordion state
  const [activeFaq, setActiveFaq] = useState(0);

  // Solution tabs / active category
  const [activeTab, setActiveTab] = useState('all');

  // Interactive application form state in modal
  const [appPhone, setAppPhone] = useState('');
  const [appCategory, setAppCategory] = useState('Consumer Electronics & BNPL');
  const [appSubmitted, setAppSubmitted] = useState(false);

  // Merchant inquiry state in modal
  const [merchantName, setMerchantName] = useState('');
  const [merchantBusiness, setMerchantBusiness] = useState('');
  const [merchantSubmitted, setMerchantSubmitted] = useState(false);

  // Calculated EMI details
  const calculation = useMemo(() => {
    const principal = Math.max(0, amount - downPayment);
    if (principal <= 0) {
      return { monthlyEmi: 0, totalInterest: 0, totalPayable: downPayment, interestRate: 0 };
    }

    if (isNoCost) {
      const emi = Math.round(principal / tenure);
      const standardCardInterest = Math.round(principal * 0.16 * (tenure / 12));
      return {
        monthlyEmi: emi,
        totalInterest: 0,
        totalPayable: principal,
        savings: standardCardInterest,
        interestRate: 0
      };
    } else {
      // Annualized 14.5% standard credit line rate
      const annualRate = 0.145;
      const monthlyRate = annualRate / 12;
      const factor = Math.pow(1 + monthlyRate, tenure);
      const emi = Math.round((principal * monthlyRate * factor) / (factor - 1));
      const totalPayable = emi * tenure;
      const totalInterest = totalPayable - principal;
      return {
        monthlyEmi: emi,
        totalInterest,
        totalPayable,
        savings: 0,
        interestRate: 14.5
      };
    }
  }, [amount, tenure, isNoCost, downPayment]);

  // Solutions Data
  const solutions = [
    {
      id: 'bnpl',
      title: 'Buy Now Pay Later',
      tagline: 'Instant micro-credit for everyday essentials',
      category: 'consumer',
      description: 'Split everyday shopping, online checkouts, and tech accessories into easy bi-weekly or monthly payments with seamless 1-click approvals.',
      badge: 'Zero Card Required',
      features: ['Instant limit up to ₹50,000', 'One-tap UPI & QR checkout', '30-day grace period option'],
      icon: Smartphone,
      accentBg: 'bg-teal-light text-teal-brand',
      borderColor: 'hover:border-teal-brand/40'
    },
    {
      id: 'nocost',
      title: 'No Cost EMI',
      tagline: 'Zero interest on premium lifestyle upgrades',
      category: 'consumer',
      description: 'Upgrade your laptops, smartphones, home appliances, and furniture without paying a single rupee extra in interest or upfront charges.',
      badge: '0% Interest Guaranteed',
      features: ['3, 6, 9 & 12 months tenures', 'No hidden processing fees', 'Available across top retail chains'],
      icon: Percent,
      accentBg: 'bg-sage-light text-slate-deep',
      borderColor: 'hover:border-sage-dark/40'
    },
    {
      id: 'ev',
      title: 'Electric Vehicle Financing',
      tagline: 'Drive green with tailored mobility loans',
      category: 'mobility',
      description: 'Accelerate your transition to clean energy with customized, paperless loans for electric two-wheelers up to ₹2,00,000 at partner showrooms.',
      badge: 'Up to ₹2,00,000',
      features: ['Low down payment options', '15-minute showroom approval', 'Flexible 12 to 24 month tenures'],
      icon: Bike,
      accentBg: 'bg-sky-light text-teal-brand',
      borderColor: 'hover:border-sky-dark/40'
    },
    {
      id: 'healthcare',
      title: 'Healthcare Financing',
      tagline: 'Compassionate medical credit when it matters most',
      category: 'health',
      description: 'Ensure medical procedures, elective surgeries, IVF, ophthalmology, and dental care proceed immediately without financial roadblocks.',
      badge: 'Instant Hospital Clearance',
      features: ['Direct hospital desk clearance', 'Zero delays during admission', 'Subsidized EMI plans up to 18 mos'],
      icon: Stethoscope,
      accentBg: 'bg-sage-light text-teal-brand',
      borderColor: 'hover:border-teal-brand/40'
    },
    {
      id: 'insurance',
      title: 'Insurance Premium Financing',
      tagline: 'Protect your future without draining today’s savings',
      category: 'protection',
      description: 'Convert annual lump-sum health, motor, and life insurance premiums into manageable monthly instalments with automated digital debits.',
      badge: 'Keep Coverage Active',
      features: ['Split large annual premiums', 'Automated NACH / e-Mandate', 'Zero lapse in policy protection'],
      icon: ShieldCheck,
      accentBg: 'bg-teal-light text-slate-deep',
      borderColor: 'hover:border-sage-brand/40'
    }
  ];

  const filteredSolutions = activeTab === 'all' 
    ? solutions 
    : solutions.filter(s => s.category === activeTab);

  // FAQ Items
  const faqs = [
    {
      q: "What is CleverPe?",
      a: "CleverPe is an Indian digital affordability and fintech platform operated by CleverPe Technologies Private Limited. We bridge consumers and businesses with flexible credit solutions including Buy Now Pay Later (BNPL), No Cost EMI, EV mobility loans, healthcare financing, and merchant checkout integrations. In strict adherence to RBI guidelines, all credit lines and loan facilities are facilitated through our RBI-registered NBFC lending partners."
    },
    {
      q: "What financing options are available?",
      a: "CleverPe provides five primary financing pillars: (1) Buy Now Pay Later for daily retail & gadgets, (2) No Cost EMI for electronics and appliances, (3) Electric Vehicle (EV) two-wheeler loans up to ₹2,00,000, (4) Healthcare and medical procedure financing at partner clinics, and (5) Insurance premium split-financing to convert annual lump sums into comfortable monthly instalments."
    },
    {
      q: "How does No Cost EMI work?",
      a: "With No Cost EMI, you only repay the exact cash price of the product or service divided equally over your chosen tenure (e.g., 3, 6, 9, or 12 months). Any applicable interest or merchant discount is subsidized between our partner merchant and CleverPe, meaning you pay ₹0 additional interest, zero processing charges, and zero hidden penalties when paid on time."
    },
    {
      q: "Who can apply for CleverPe financing?",
      a: "Any Indian citizen aged 21 years or older with a valid Aadhaar, PAN card, active bank account, and regular source of income (salaried or self-employed) is eligible to apply. Our digital KYC check takes less than two minutes using your mobile number, providing an instant approval decision without requiring physical paperwork."
    },
    {
      q: "How can merchants partner with CleverPe?",
      a: "Merchants can integrate CleverPe via plug-and-play QR codes for physical retail stores, soundboxes, or our lightweight REST APIs & SDKs for e-commerce checkouts. Once partnered, merchants receive next-day upfront settlements directly into their bank accounts while CleverPe assumes all credit risk and instalment collection responsibilities."
    }
  ];

  return (
    <div className="min-h-screen bg-bg-primary text-slate-deep font-sans selection:bg-teal-brand/15 selection:text-teal-dark relative overflow-x-hidden">
      
      {/* =========================================================================
          SECTION 01: NAVIGATION
         ========================================================================= */}
      <header className="sticky top-0 z-40 bg-bg-primary/90 backdrop-blur-md border-b border-border-subtle transition-all duration-200">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Left: Brand Logo */}
          <a href="#" className="flex items-center gap-1 group">
            <CleverPeLogo />
          </a>

          {/* Middle: Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium text-slate-muted">
            <a href="#" className="text-teal-brand font-semibold transition-colors">Home</a>
            <a href="#solutions" className="hover:text-slate-deep transition-colors">Solutions</a>
            <a href="#how-it-works" className="hover:text-slate-deep transition-colors">About Us</a>
            <a href="#merchants" className="hover:text-slate-deep transition-colors">For Merchants</a>
            <a href="#calculator" className="hover:text-slate-deep transition-colors">EMI Calculator</a>
            <a href="#faq" className="hover:text-slate-deep transition-colors">Contact</a>
          </nav>

          {/* Right: Auth & CTAs */}
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={() => setMerchantModalOpen(true)}
              className="text-[14px] font-semibold text-slate-muted hover:text-slate-deep px-3 py-2 transition-colors"
            >
              Partner Login
            </button>
            <button 
              onClick={() => setApplyModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 bg-teal-brand hover:bg-teal-dark text-white text-[14px] font-semibold px-5 py-2.5 rounded-full shadow-sm hover:shadow transition-all duration-200 group"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-deep hover:bg-bg-secondary transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-border-subtle bg-bg-primary px-6 py-5 shadow-card animate-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col gap-4 text-base font-medium text-slate-muted">
              <a 
                href="#" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-teal-brand font-semibold py-1"
              >
                Home
              </a>
              <a 
                href="#solutions" 
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-slate-deep py-1"
              >
                Financing Solutions
              </a>
              <a 
                href="#how-it-works" 
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-slate-deep py-1"
              >
                How It Works
              </a>
              <a 
                href="#healthcare" 
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-slate-deep py-1"
              >
                Healthcare Financing
              </a>
              <a 
                href="#ev" 
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-slate-deep py-1"
              >
                Electric Mobility
              </a>
              <a 
                href="#merchants" 
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-slate-deep py-1"
              >
                For Merchants
              </a>
              <a 
                href="#calculator" 
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-slate-deep py-1"
              >
                EMI Calculator
              </a>
              <a 
                href="#faq" 
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-slate-deep py-1"
              >
                FAQs
              </a>
            </nav>
            <div className="mt-6 pt-5 border-t border-border-subtle flex flex-col gap-3">
              <button 
                onClick={() => { setMobileMenuOpen(false); setMerchantModalOpen(true); }}
                className="w-full text-center py-2.5 font-semibold text-slate-deep text-sm rounded-xl border border-border-subtle"
              >
                Partner Login
              </button>
              <button 
                onClick={() => { setMobileMenuOpen(false); setApplyModalOpen(true); }}
                className="w-full py-3 bg-teal-brand text-white font-semibold text-sm rounded-full shadow-sm text-center"
              >
                Get Started with CleverPe
              </button>
            </div>
          </div>
        )}
      </header>

      {/* =========================================================================
          SECTION 02: HERO SECTION (MOST IMPORTANT)
          Editorial layout inspired by Vella Bank with layered floating UI cards
         ========================================================================= */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden bg-bg-primary">
        
        {/* Subtle architectural background ambiance */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-sky-brand/30 via-sage-soft/20 to-transparent rounded-full blur-3xl -z-10 pointer-events-none transform translate-x-1/3 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-10 w-[450px] h-[450px] bg-gradient-to-tr from-teal-light via-sage-light/40 to-transparent rounded-full blur-3xl -z-10 pointer-events-none"></div>

        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Refined Editorial Pitch */}
            <div className="lg:col-span-7 flex flex-col items-start pr-0 lg:pr-4">
              
              {/* Refined Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-bg-secondary border border-border-subtle text-xs font-semibold text-slate-deep mb-6">
                <span className="w-2 h-2 rounded-full bg-teal-brand animate-pulse"></span>
                <span>Next-Generation Affordability • RBI Partnered NBFCs</span>
              </div>

              {/* Oversized Editorial Headline */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[66px] leading-[1.08] font-extrabold tracking-[-0.035em] text-slate-deep mb-6">
                Make life affordable. <br />
                <span className="text-teal-brand font-extrabold">Pay the clever way.</span>
              </h1>

              {/* Supporting Copy */}
              <p className="text-lg sm:text-xl text-slate-muted leading-relaxed font-normal max-w-xl mb-9">
                Discover smarter financing solutions for everyday purchases, healthcare, electric mobility and more. Flexible payment options designed around your needs.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
                <a 
                  href="#solutions"
                  className="inline-flex items-center justify-center gap-2.5 bg-teal-brand hover:bg-teal-dark text-white text-[15px] font-semibold px-7 py-4 rounded-full shadow-subtle hover:shadow-card transition-all duration-200 text-center"
                >
                  <span>Explore Solutions</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <button 
                  onClick={() => setMerchantModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-bg-secondary text-slate-deep text-[15px] font-semibold px-7 py-4 rounded-full border border-border-subtle hover:border-border-hover transition-all duration-200 text-center"
                >
                  <Building2 className="w-4 h-4 text-teal-brand" />
                  <span>Partner With Us</span>
                </button>
              </div>

              {/* Trust Indicators / Badges */}
              <div className="pt-6 border-t border-border-subtle/80 grid grid-cols-3 gap-4 sm:gap-8 w-full max-w-lg">
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-slate-light uppercase tracking-wider">Credit Access</span>
                  <span className="text-sm sm:text-base font-bold text-slate-deep flex items-center gap-1 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-brand inline" /> 100% Digital
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-slate-light uppercase tracking-wider">Interest Rate</span>
                  <span className="text-sm sm:text-base font-bold text-slate-deep flex items-center gap-1 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-brand inline" /> 0% No Cost EMI
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-slate-light uppercase tracking-wider">Lending Partners</span>
                  <span className="text-sm sm:text-base font-bold text-slate-deep flex items-center gap-1 mt-0.5">
                    <ShieldCheck className="w-4 h-4 text-teal-brand inline" /> RBI-Registered
                  </span>
                </div>
              </div>

            </div>

            {/* Right Column: Layered Editorial Hero Composition */}
            <div className="lg:col-span-5 relative flex justify-center items-center">
              
              {/* Outer Decorative Glow & Shapes */}
              <div className="relative w-full max-w-[440px] sm:max-w-[480px]">
                
                {/* Asymmetric Geometric Backdrop */}
                <div className="absolute -inset-3 bg-gradient-to-tr from-sage-brand/20 via-sky-brand/40 to-teal-light rounded-[36px] -rotate-2 transform scale-100 filter blur-sm"></div>
                
                {/* Main Hero Visual Card Container */}
                <div className="relative rounded-[28px] overflow-hidden bg-white border border-border-subtle shadow-card">
                  
                  {/* Lifestyle Photograph of Confident Indian Professional using Smartphone */}
                  <div className="relative h-[480px] sm:h-[520px] w-full overflow-hidden bg-bg-secondary">
                    <img 
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=85" 
                      alt="Modern Indian professional using CleverPe smartphone payment financing"
                      className="w-full h-full object-cover object-top filter contrast-[1.03] transition-transform duration-700 hover:scale-105"
                      loading="eager"
                    />
                    {/* Subtle internal gradient overlay for contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-deep/50 via-slate-deep/10 to-transparent"></div>
                  </div>

                  {/* Visual Caption Pill at bottom of image */}
                  <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-white text-xs bg-slate-deep/70 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></div>
                      <span className="font-medium tracking-wide">Instant Checkout Active</span>
                    </div>
                    <span className="font-semibold text-white/90">Scan • Approve • Split</span>
                  </div>

                </div>

                {/* ==========================================
                    FLOATING UI ELEMENT 1: Live EMI Preview Card
                   ========================================== */}
                <div className="absolute -top-6 -left-6 sm:-left-10 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-float border border-border-subtle max-w-[240px] sm:max-w-[270px] animate-float-slow z-20">
                  <div className="flex items-center justify-between gap-3 mb-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-teal-light flex items-center justify-center text-teal-brand">
                        <Receipt className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-slate-deep">Monthly EMI</span>
                    </div>
                    <span className="text-[10px] font-semibold text-teal-dark bg-teal-light px-2 py-0.5 rounded-full border border-teal-brand/20">
                      No Cost
                    </span>
                  </div>

                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-2xl font-extrabold text-slate-deep tracking-tight">₹3,499</span>
                    <span className="text-xs text-slate-muted">/ month</span>
                  </div>

                  {/* Progress visualization */}
                  <div className="w-full bg-bg-secondary h-1.5 rounded-full overflow-hidden mb-2">
                    <div className="bg-teal-brand h-full rounded-full w-2/3"></div>
                  </div>
                  
                  <div className="flex items-center justify-between text-[11px] text-slate-muted">
                    <span>Instalment 4 of 6</span>
                    <span className="font-semibold text-emerald-600">On Time</span>
                  </div>
                </div>

                {/* ==========================================
                    FLOATING UI ELEMENT 2: Approved Credit Limit Pill
                   ========================================== */}
                <div className="absolute top-1/2 -right-5 sm:-right-8 transform -translate-y-1/2 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-float border border-border-subtle max-w-[230px] animate-float-reverse z-20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-sage-light flex items-center justify-center text-slate-deep">
                      <ShieldCheck className="w-5 h-5 text-teal-brand" />
                    </div>
                    <div>
                      <div className="text-[11px] font-medium text-slate-muted">Approved Credit Limit</div>
                      <div className="text-base font-extrabold text-slate-deep">₹1,50,000</div>
                      <div className="text-[10px] font-semibold text-teal-brand flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Ready to Use
                      </div>
                    </div>
                  </div>
                </div>

                {/* ==========================================
                    FLOATING UI ELEMENT 3: Quick Category Badge
                   ========================================== */}
                <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md rounded-2xl py-2.5 px-4 shadow-float border border-border-subtle flex items-center gap-3 z-20">
                  <div className="w-8 h-8 rounded-lg bg-sky-brand flex items-center justify-center text-slate-deep">
                    <Bike className="w-4 h-4 text-teal-brand" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-deep">EV Two-Wheeler EMI</div>
                    <div className="text-[11px] text-slate-muted">Approved in 15 mins</div>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 03: TRUST AND BENEFITS
          "Finance that fits your life" - 4 concise benefits with outline icons
         ========================================================================= */}
      <section className="py-20 bg-bg-secondary border-y border-border-subtle">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-teal-brand">Designed For Clarity</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-deep tracking-tight mt-2 mb-4">
              Finance that fits your life.
            </h2>
            <p className="text-slate-muted text-base sm:text-lg">
              Transparent, modern affordability engineered without hidden fees or cumbersome paperwork.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Benefit 1 */}
            <div className="bg-white rounded-2xl p-7 border border-border-subtle shadow-subtle hover:shadow-card hover:-translate-y-1 transition-all duration-200">
              <div className="w-12 h-12 rounded-xl bg-teal-light text-teal-brand flex items-center justify-center mb-6">
                <Smartphone className="w-6 h-6 stroke-[1.75]" />
              </div>
              <h3 className="text-lg font-bold text-slate-deep mb-2">Simple digital experience</h3>
              <p className="text-sm text-slate-muted leading-relaxed">
                Seamless 100% paperless onboarding with quick identity verification right from your mobile device.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-white rounded-2xl p-7 border border-border-subtle shadow-subtle hover:shadow-card hover:-translate-y-1 transition-all duration-200">
              <div className="w-12 h-12 rounded-xl bg-sage-light text-teal-brand flex items-center justify-center mb-6">
                <Sliders className="w-6 h-6 stroke-[1.75]" />
              </div>
              <h3 className="text-lg font-bold text-slate-deep mb-2">Flexible payment options</h3>
              <p className="text-sm text-slate-muted leading-relaxed">
                Choose repayment tenures from 3 to 24 months structured comfortably around your personal cash flow.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-white rounded-2xl p-7 border border-border-subtle shadow-subtle hover:shadow-card hover:-translate-y-1 transition-all duration-200">
              <div className="w-12 h-12 rounded-xl bg-sky-light text-teal-brand flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 stroke-[1.75]" />
              </div>
              <h3 className="text-lg font-bold text-slate-deep mb-2">Convenient financing journeys</h3>
              <p className="text-sm text-slate-muted leading-relaxed">
                Direct integration at partner hospital desks, EV dealerships, and leading retail checkouts.
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="bg-white rounded-2xl p-7 border border-border-subtle shadow-subtle hover:shadow-card hover:-translate-y-1 transition-all duration-200">
              <div className="w-12 h-12 rounded-xl bg-bg-secondary text-teal-brand flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6 stroke-[1.75]" />
              </div>
              <h3 className="text-lg font-bold text-slate-deep mb-2">Transparent information</h3>
              <p className="text-sm text-slate-muted leading-relaxed">
                Upfront breakdown of all terms, zero hidden penalties, and clear repayment schedules at every milestone.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 04: FINANCING SOLUTIONS
          "One platform. Multiple possibilities." - 5 service cards
         ========================================================================= */}
      <section id="solutions" className="py-24 bg-bg-primary">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-teal-brand">Our Offerings</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-deep tracking-tight mt-2">
                One platform. Multiple possibilities.
              </h2>
            </div>
            <p className="text-slate-muted max-w-md text-base">
              Tailored financing designed to empower your major life milestones and everyday convenience with ease.
            </p>
          </div>

          {/* Solution Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 mb-10 pb-2 border-b border-border-subtle">
            {[
              { id: 'all', label: 'All Financing Options' },
              { id: 'consumer', label: 'Retail & BNPL' },
              { id: 'mobility', label: 'Electric Mobility' },
              { id: 'health', label: 'Healthcare' },
              { id: 'protection', label: 'Insurance' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-150 ${
                  activeTab === tab.id
                    ? 'bg-slate-deep text-white shadow-sm'
                    : 'text-slate-muted hover:text-slate-deep bg-white border border-border-subtle'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Solutions Grid: 5 Elegant Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSolutions.map((sol) => {
              const IconComponent = sol.icon;
              return (
                <div 
                  key={sol.id}
                  className={`bg-white rounded-2xl p-8 border border-border-subtle shadow-subtle hover:shadow-card hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group ${sol.borderColor}`}
                >
                  <div>
                    {/* Top Row: Icon and Badge */}
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${sol.accentBg}`}>
                        <IconComponent className="w-6 h-6 stroke-[1.8]" />
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-bg-secondary text-slate-deep border border-border-subtle">
                        {sol.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-deep mb-2 group-hover:text-teal-brand transition-colors">
                      {sol.title}
                    </h3>
                    
                    <p className="text-sm font-medium text-teal-dark mb-3">
                      {sol.tagline}
                    </p>

                    <p className="text-sm text-slate-muted leading-relaxed mb-6">
                      {sol.description}
                    </p>

                    {/* Features checklist */}
                    <div className="space-y-2 pt-4 border-t border-border-subtle mb-6">
                      {sol.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-deep">
                          <Check className="w-3.5 h-3.5 text-teal-brand shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Action */}
                  <button 
                    onClick={() => {
                      setSelectedSolutionModal(sol);
                      setApplyModalOpen(true);
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 bg-bg-secondary hover:bg-teal-brand hover:text-white text-slate-deep font-semibold text-sm py-3 rounded-xl transition-all duration-200 group/btn"
                  >
                    <span>Learn More & Apply</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 05: HOW CLEVERPE WORKS
          "A simpler way to move forward" - 3 steps with connecting lines
         ========================================================================= */}
      <section id="how-it-works" className="py-24 bg-bg-secondary border-y border-border-subtle relative overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-xs font-semibold uppercase tracking-widest text-teal-brand">Step-by-Step Clarity</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-deep tracking-tight mt-2 mb-4">
              A simpler way to move forward.
            </h2>
            <p className="text-slate-muted text-base sm:text-lg">
              Experience completely frictionless digital financing in three seamless steps.
            </p>
          </div>

          <div className="relative">
            
            {/* Connecting horizontal line for desktop */}
            <div className="hidden lg:block absolute top-1/2 left-24 right-24 h-[2px] bg-gradient-to-r from-teal-brand/20 via-teal-brand/40 to-teal-brand/20 -translate-y-8 z-0"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              
              {/* Step 01 */}
              <div className="bg-white rounded-2xl p-8 border border-border-subtle shadow-subtle relative flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-4xl font-extrabold text-teal-brand font-serif">01</span>
                    <div className="w-10 h-10 rounded-full bg-teal-light flex items-center justify-center text-teal-brand font-bold text-sm">
                      <Sliders className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-deep mb-3">Choose a financing solution</h3>
                  <p className="text-sm text-slate-muted leading-relaxed">
                    Select the purchase category, desired tenure, and repayment rhythm that best aligns with your financial budget.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-border-subtle text-xs font-semibold text-teal-brand">
                  Instant Tenure Selection
                </div>
              </div>

              {/* Step 02 */}
              <div className="bg-white rounded-2xl p-8 border border-border-subtle shadow-subtle relative flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-4xl font-extrabold text-teal-brand font-serif">02</span>
                    <div className="w-10 h-10 rounded-full bg-sage-light flex items-center justify-center text-slate-deep font-bold text-sm">
                      <FileCheck2 className="w-5 h-5 text-teal-brand" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-deep mb-3">Complete the application process</h3>
                  <p className="text-sm text-slate-muted leading-relaxed">
                    Enter your mobile number, verify your KYC digitally in seconds, and review the transparent loan conditions without paperwork.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-border-subtle text-xs font-semibold text-teal-brand">
                  2-Minute Digital KYC
                </div>
              </div>

              {/* Step 03 */}
              <div className="bg-white rounded-2xl p-8 border border-border-subtle shadow-subtle relative flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-4xl font-extrabold text-teal-brand font-serif">03</span>
                    <div className="w-10 h-10 rounded-full bg-sky-light flex items-center justify-center text-teal-brand font-bold text-sm">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-deep mb-3">Proceed based on eligibility & approval</h3>
                  <p className="text-sm text-slate-muted leading-relaxed">
                    Upon approval by our RBI-registered NBFC partner, complete checkout immediately online or at partner retail desks.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-border-subtle text-xs font-semibold text-teal-brand">
                  Immediate Disbursement
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 06: FEATURED HEALTHCARE FINANCING
          Editorial split section: "Your health comes first."
         ========================================================================= */}
      <section id="healthcare" className="py-24 bg-bg-primary overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-sage-light/60 rounded-[32px] border border-sage-soft p-8 sm:p-12 lg:p-16 relative overflow-hidden">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Editorial Copy */}
              <div className="lg:col-span-7 flex flex-col items-start">
                
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-border-subtle text-xs font-semibold text-teal-dark mb-6">
                  <Stethoscope className="w-4 h-4 text-teal-brand" />
                  <span>Compassionate Medical Affordability</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-deep tracking-tight mb-6">
                  Your health comes first.
                </h2>

                <p className="text-slate-muted text-base sm:text-lg leading-relaxed mb-8">
                  Important medical procedures and elective healthcare treatments shouldn't be delayed by immediate financial constraints. CleverPe makes eligible healthcare expenses easier to manage through flexible financing options directly at hospital and clinic billing desks.
                </p>

                {/* Healthcare perks */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-8">
                  <div className="flex items-start gap-3 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-border-subtle">
                    <CheckCircle2 className="w-5 h-5 text-teal-brand shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-bold text-slate-deep">Desk-Side Approvals</div>
                      <div className="text-xs text-slate-muted mt-0.5">Quick settlement during admission or discharge.</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-border-subtle">
                    <CheckCircle2 className="w-5 h-5 text-teal-brand shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-bold text-slate-deep">Wide Medical Scope</div>
                      <div className="text-xs text-slate-muted mt-0.5">Dental, fertility, eye surgery & elective care.</div>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    setAppCategory('Healthcare & Medical Financing');
                    setApplyModalOpen(true);
                  }}
                  className="inline-flex items-center gap-2 bg-teal-brand hover:bg-teal-dark text-white text-[15px] font-semibold px-7 py-3.5 rounded-full shadow-subtle hover:shadow transition-all duration-200"
                >
                  <span>Explore Healthcare Financing</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

              </div>

              {/* Right Visual Image */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-2xl overflow-hidden shadow-card border border-white">
                  <img 
                    src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=900&q=85" 
                    alt="Authentic healthcare consultation in modern medical facility"
                    className="w-full h-[400px] object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-deep/50 via-transparent to-transparent"></div>
                  
                  {/* Floating badge */}
                  <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-border-subtle flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-slate-muted">Average Approval Time</div>
                      <div className="text-base font-extrabold text-teal-brand">Under 15 Minutes</div>
                    </div>
                    <span className="text-[11px] font-semibold px-2 py-1 rounded bg-teal-light text-teal-dark">
                      Zero Stress
                    </span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 07: ELECTRIC VEHICLE FINANCING
          "Move towards a smarter tomorrow." - EV feature section
         ========================================================================= */}
      <section id="ev" className="py-24 bg-bg-secondary border-t border-border-subtle overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Visual: Aspirational EV Lifestyle */}
            <div className="lg:col-span-5 order-2 lg:order-1 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-card border border-white">
                <img 
                  src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=900&q=85" 
                  alt="Modern electric two-wheeler aspirational mobility"
                  className="w-full h-[420px] object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-deep/60 via-transparent to-transparent"></div>

                {/* Floating EV Specs Card */}
                <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-border-subtle">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-deep">EV Two-Wheeler Sanction</span>
                    <span className="text-xs font-bold text-teal-brand">Instant POS Voucher</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-slate-deep">₹2,00,000</span>
                    <span className="text-xs text-slate-muted">Max Limit</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[11px] text-slate-muted">
                    <span>Down payment from ₹2,999</span>
                    <span className="text-teal-dark font-medium">100% Paperless</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Editorial Content */}
            <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col items-start">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-border-subtle text-xs font-semibold text-teal-brand mb-6">
                <Bike className="w-4 h-4" />
                <span>Green Mobility Revolution</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-deep tracking-tight mb-6">
                Move towards a smarter tomorrow.
              </h2>

              <p className="text-slate-muted text-base sm:text-lg leading-relaxed mb-8">
                Switching to eco-friendly electric transportation should be seamless. CleverPe partners with leading electric two-wheeler manufacturers and authorized dealerships across India to provide quick, low down-payment financing options right at the showroom floor.
              </p>

              <div className="space-y-3.5 w-full mb-9">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-teal-light text-teal-brand flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm font-medium text-slate-deep">Financing tailored for electric scooters and smart commuter bikes</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-teal-light text-teal-brand flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm font-medium text-slate-deep">Custom tenures from 12 to 24 months to keep monthly EMIs comfortable</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-teal-light text-teal-brand flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm font-medium text-slate-deep">On-the-spot digital loan sanctions in under 15 minutes</span>
                </div>
              </div>

              <button 
                onClick={() => {
                  setAppCategory('Electric Vehicle Financing');
                  setApplyModalOpen(true);
                }}
                className="inline-flex items-center gap-2 bg-teal-brand hover:bg-teal-dark text-white text-[15px] font-semibold px-7 py-3.5 rounded-full shadow-subtle hover:shadow transition-all duration-200"
              >
                <span>Explore EV Financing</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 08: MERCHANT PARTNERSHIP
          "Better payment experiences. Stronger businesses."
         ========================================================================= */}
      <section id="merchants" className="py-24 bg-bg-primary border-t border-border-subtle">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col items-start">
              
              <span className="text-xs font-semibold uppercase tracking-widest text-teal-brand">Enterprise & Retail Solutions</span>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-deep tracking-tight mt-2 mb-6">
                Better payment experiences. <br />
                <span className="text-teal-brand">Stronger businesses.</span>
              </h2>

              <p className="text-slate-muted text-base sm:text-lg leading-relaxed mb-8">
                CleverPe equips merchants, retail chains, and digital brands with customer financing solutions that drive higher order values and significantly reduce checkout drop-offs.
              </p>

              {/* 3 Merchant Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full mb-10">
                <div className="bg-bg-secondary p-5 rounded-2xl border border-border-subtle">
                  <div className="text-2xl font-extrabold text-teal-brand mb-1">Up to +35%</div>
                  <div className="text-xs font-bold text-slate-deep mb-1">Higher Cart Conversion</div>
                  <div className="text-xs text-slate-muted">Customers buy more when payments are split into EMIs.</div>
                </div>
                <div className="bg-bg-secondary p-5 rounded-2xl border border-border-subtle">
                  <div className="text-2xl font-extrabold text-teal-brand mb-1">T+1</div>
                  <div className="text-xs font-bold text-slate-deep mb-1">Upfront Settlement</div>
                  <div className="text-xs text-slate-muted">Next-business-day payout directly to your bank account.</div>
                </div>
                <div className="bg-bg-secondary p-5 rounded-2xl border border-border-subtle">
                  <div className="text-2xl font-extrabold text-teal-brand mb-1">0%</div>
                  <div className="text-xs font-bold text-slate-deep mb-1">Default Credit Risk</div>
                  <div className="text-xs text-slate-muted">CleverPe & NBFC partners shoulder all recovery risk.</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <button 
                  onClick={() => setMerchantModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 bg-teal-brand hover:bg-teal-dark text-white text-[15px] font-semibold px-7 py-3.5 rounded-full shadow-subtle hover:shadow transition-all duration-200"
                >
                  <span>Become a Partner</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a 
                  href="#faq"
                  className="inline-flex items-center justify-center gap-2 bg-white text-slate-deep text-[15px] font-semibold px-7 py-3.5 rounded-full border border-border-subtle hover:bg-bg-secondary transition-all duration-200"
                >
                  <span>View Merchant FAQs</span>
                </a>
              </div>

            </div>

            {/* Right Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-card border border-border-subtle bg-white">
                <img 
                  src="https://images.unsplash.com/photo-1556742049-0a67e5572240?auto=format&fit=crop&w=900&q=85" 
                  alt="Modern retail store merchant checkout terminal"
                  className="w-full h-[400px] object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-deep/70 via-slate-deep/20 to-transparent"></div>

                {/* Floating QR Card Simulation */}
                <div className="absolute bottom-5 left-5 right-5 bg-white p-4 rounded-xl shadow-float border border-border-subtle flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-teal-light flex items-center justify-center text-teal-brand">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-deep">CleverPe Smart POS & QR</div>
                      <div className="text-[11px] text-slate-muted">Instant customer EMI scan</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-teal-brand bg-teal-light px-2.5 py-1 rounded-full">
                    Plug & Play
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 09: EMI CALCULATOR PREVIEW
          Clean, visually attractive interactive EMI calculator concept
         ========================================================================= */}
      <section id="calculator" className="py-24 bg-bg-secondary border-t border-border-subtle">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-teal-brand">Interactive Preview</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-deep tracking-tight mt-2 mb-4">
              Calculate your estimated monthly instalment.
            </h2>
            <p className="text-slate-muted text-base sm:text-lg">
              Explore how manageable everyday purchases and major expenses become with CleverPe.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-border-subtle shadow-card">
            
            {/* Mode Selector Toggle: No Cost vs Standard */}
            <div className="flex items-center justify-center mb-10">
              <div className="bg-bg-secondary p-1 rounded-full border border-border-subtle flex items-center">
                <button
                  onClick={() => setIsNoCost(true)}
                  className={`px-5 py-2 text-xs sm:text-sm font-bold rounded-full transition-all duration-200 ${
                    isNoCost 
                      ? 'bg-teal-brand text-white shadow-sm' 
                      : 'text-slate-muted hover:text-slate-deep'
                  }`}
                >
                  0% No Cost EMI Plan
                </button>
                <button
                  onClick={() => setIsNoCost(false)}
                  className={`px-5 py-2 text-xs sm:text-sm font-bold rounded-full transition-all duration-200 ${
                    !isNoCost 
                      ? 'bg-slate-deep text-white shadow-sm' 
                      : 'text-slate-muted hover:text-slate-deep'
                  }`}
                >
                  Standard Flexible Credit
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Controls */}
              <div className="lg:col-span-7 space-y-8">
                
                {/* Purchase Amount Slider */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-bold text-slate-deep">Purchase Amount</label>
                    <span className="text-xl font-extrabold text-teal-brand">₹{amount.toLocaleString('en-IN')}</span>
                  </div>
                  <input 
                    type="range" 
                    min="5000" 
                    max="200000" 
                    step="2500" 
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-slate-muted mt-2">
                    <span>₹5,000</span>
                    <span>₹1,00,000</span>
                    <span>₹2,00,000</span>
                  </div>
                </div>

                {/* Tenure Selection Pills */}
                <div>
                  <label className="block text-sm font-bold text-slate-deep mb-3">
                    Select Repayment Tenure
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {[3, 6, 9, 12, 18, 24].map((m) => (
                      <button
                        key={m}
                        onClick={() => setTenure(m)}
                        className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-150 border ${
                          tenure === m
                            ? 'bg-teal-brand text-white border-teal-brand shadow-sm'
                            : 'bg-bg-primary text-slate-deep border-border-subtle hover:border-border-hover'
                        }`}
                      >
                        {m} Mo
                      </button>
                    ))}
                  </div>
                </div>

                {/* Down Payment Slider (Optional) */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-bold text-slate-deep">Optional Down Payment</label>
                    <span className="text-base font-bold text-slate-deep">₹{downPayment.toLocaleString('en-IN')}</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max={Math.floor(amount * 0.4)} 
                    step="1000" 
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-slate-muted mt-2">
                    <span>₹0 (Zero Down Payment)</span>
                    <span>₹{Math.floor(amount * 0.4).toLocaleString('en-IN')} (Max 40%)</span>
                  </div>
                </div>

              </div>

              {/* Right Summary Result Card */}
              <div className="lg:col-span-5 bg-bg-secondary rounded-2xl p-6 sm:p-7 border border-border-subtle flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-muted">Estimated Instalment</span>
                  
                  <div className="mt-2 mb-4 flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-extrabold text-slate-deep tracking-tight">
                      ₹{calculation.monthlyEmi.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs sm:text-sm text-slate-muted font-medium">/ month</span>
                  </div>

                  {isNoCost && (
                    <div className="inline-flex items-center gap-1.5 bg-teal-light text-teal-dark px-2.5 py-1 rounded-full text-xs font-semibold mb-6">
                      <Sparkles className="w-3.5 h-3.5 text-teal-brand" />
                      <span>Zero Additional Interest</span>
                    </div>
                  )}

                  {/* Summary Breakdown List */}
                  <div className="space-y-3 pt-4 border-t border-border-subtle text-xs sm:text-sm">
                    <div className="flex justify-between text-slate-muted">
                      <span>Principal Amount</span>
                      <span className="font-semibold text-slate-deep">₹{(amount - downPayment).toLocaleString('en-IN')}</span>
                    </div>

                    <div className="flex justify-between text-slate-muted">
                      <span>Interest Rate</span>
                      <span className="font-semibold text-teal-brand">
                        {isNoCost ? '0% (No Cost)' : `${calculation.interestRate}% p.a.`}
                      </span>
                    </div>

                    <div className="flex justify-between text-slate-muted">
                      <span>Down Payment</span>
                      <span className="font-semibold text-slate-deep">₹{downPayment.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="flex justify-between pt-3 border-t border-border-subtle text-sm font-bold text-slate-deep">
                      <span>Total Amount Payable</span>
                      <span>₹{(calculation.totalPayable + downPayment).toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <button 
                    onClick={() => setApplyModalOpen(true)}
                    className="w-full bg-teal-brand hover:bg-teal-dark text-white font-semibold py-3.5 rounded-xl shadow-sm text-sm transition-all duration-200"
                  >
                    Apply for ₹{amount.toLocaleString('en-IN')} Credit Limit
                  </button>
                </div>
              </div>

            </div>

            {/* Regulatory Disclaimer */}
            <div className="mt-8 pt-6 border-t border-border-subtle flex items-start gap-2.5 text-[11px] text-slate-muted leading-relaxed">
              <HelpCircle className="w-4 h-4 text-slate-light shrink-0 mt-0.5" />
              <span>
                <strong>Representative illustration only:</strong> Actual monthly instalments, processing fees, credit limits, and applicable interest rates depend on the applicant’s underwriting assessment, credit score, partner merchant promotions, and loan terms approved by RBI-registered NBFC lending partners.
              </span>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 10: FAQS
          Expandable FAQ accordion covering all required queries
         ========================================================================= */}
      <section id="faq" className="py-24 bg-bg-primary">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-teal-brand">Transparent Answers</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-deep tracking-tight mt-2 mb-4">
              Frequently asked questions.
            </h2>
            <p className="text-slate-muted text-base sm:text-lg">
              Everything you need to know about CleverPe, our financing solutions, and partnerships.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div 
                  key={index}
                  className="bg-white rounded-2xl border border-border-subtle overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? -1 : index)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-bold text-slate-deep hover:text-teal-brand transition-colors"
                  >
                    <span className="text-base sm:text-lg">{faq.q}</span>
                    <div className={`w-8 h-8 rounded-full bg-bg-secondary flex items-center justify-center shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-teal-light text-teal-brand' : 'text-slate-muted'}`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-sm sm:text-[15px] text-slate-muted leading-relaxed border-t border-border-subtle/50 animate-in fade-in duration-200">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Additional Help Callout */}
          <div className="mt-12 text-center text-sm text-slate-muted">
            Have a specific financing inquiry? Reach our Bangalore support desk at{' '}
            <a href="mailto:support@cleverpe.com" className="font-semibold text-teal-brand hover:underline">
              support@cleverpe.com
            </a>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 11: FOOTER
          CleverPe branding, regulatory info, links, privacy, terms, socials
         ========================================================================= */}
      <footer className="bg-white border-t border-border-subtle pt-16 pb-12 text-slate-muted">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-border-subtle">
            
            {/* Column 1: Brand & Regulatory Intro (4 cols) */}
            <div className="lg:col-span-4 flex flex-col items-start pr-0 lg:pr-6">
              <a href="#" className="mb-5 inline-block">
                <CleverPeLogo />
              </a>
              <p className="text-sm leading-relaxed text-slate-muted mb-6">
                CleverPe is an Indian fintech platform dedicated to making life affordable through smart, digital-first financing for healthcare, electric mobility, insurance, and retail purchases.
              </p>
              
              {/* RBI Partner NBFC Declaration Badge */}
              <div className="bg-bg-secondary rounded-xl p-3.5 border border-border-subtle text-xs leading-relaxed text-slate-deep w-full">
                <div className="font-bold flex items-center gap-1.5 text-teal-brand mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>RBI Compliance Transparency</span>
                </div>
                <span>
                  CleverPe acts as a digital lending tech interface. Credit facilities and loans are underwritten and sanctioned by RBI-registered NBFC partners: <em>Bhanix Finance & Investment Ltd.</em> and <em>Respo Financial Capital Pvt. Ltd.</em>
                </span>
              </div>
            </div>

            {/* Column 2: Financing Solutions (3 cols) */}
            <div className="lg:col-span-3">
              <h4 className="text-sm font-bold text-slate-deep uppercase tracking-wider mb-4">Financing Solutions</h4>
              <ul className="space-y-2.5 text-sm">
                <li><a href="#solutions" className="hover:text-teal-brand transition-colors">Buy Now Pay Later (BNPL)</a></li>
                <li><a href="#solutions" className="hover:text-teal-brand transition-colors">No Cost EMI Plans</a></li>
                <li><a href="#ev" className="hover:text-teal-brand transition-colors">Electric Vehicle Financing</a></li>
                <li><a href="#healthcare" className="hover:text-teal-brand transition-colors">Healthcare & Medical Credit</a></li>
                <li><a href="#solutions" className="hover:text-teal-brand transition-colors">Insurance Premium Financing</a></li>
                <li><a href="#calculator" className="hover:text-teal-brand transition-colors">Interactive EMI Calculator</a></li>
              </ul>
            </div>

            {/* Column 3: Merchants & Business (2 cols) */}
            <div className="lg:col-span-2">
              <h4 className="text-sm font-bold text-slate-deep uppercase tracking-wider mb-4">For Business</h4>
              <ul className="space-y-2.5 text-sm">
                <li><button onClick={() => setMerchantModalOpen(true)} className="hover:text-teal-brand transition-colors text-left">Partner With Us</button></li>
                <li><button onClick={() => setMerchantModalOpen(true)} className="hover:text-teal-brand transition-colors text-left">Merchant POS Solutions</button></li>
                <li><a href="#merchants" className="hover:text-teal-brand transition-colors">E-Commerce Checkout API</a></li>
                <li><a href="#merchants" className="hover:text-teal-brand transition-colors">Settlement Dashboard</a></li>
                <li><a href="#faq" className="hover:text-teal-brand transition-colors">Merchant Help Desk</a></li>
              </ul>
            </div>

            {/* Column 4: Company & Contact (3 cols) */}
            <div className="lg:col-span-3">
              <h4 className="text-sm font-bold text-slate-deep uppercase tracking-wider mb-4">CleverPe Technologies</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-teal-brand shrink-0 mt-0.5" />
                  <span>Bengaluru, Karnataka, India</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-teal-brand shrink-0" />
                  <a href="mailto:contact@cleverpe.com" className="hover:text-teal-brand">contact@cleverpe.com</a>
                </li>
                <li className="flex items-center gap-2.5">
                  <PhoneCall className="w-4 h-4 text-teal-brand shrink-0" />
                  <span>Support: Mon - Sat (9 AM - 7 PM)</span>
                </li>
              </ul>

              {/* Social icons */}
              <div className="flex items-center gap-3 mt-6">
                <a href="#" className="w-8 h-8 rounded-full bg-bg-secondary flex items-center justify-center text-slate-deep hover:bg-teal-brand hover:text-white transition-colors" aria-label="LinkedIn">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-bg-secondary flex items-center justify-center text-slate-deep hover:bg-teal-brand hover:text-white transition-colors" aria-label="Twitter">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-bg-secondary flex items-center justify-center text-slate-deep hover:bg-teal-brand hover:text-white transition-colors" aria-label="Instagram">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
              </div>
            </div>

          </div>

          {/* Bottom Copyright & Legal links */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-muted gap-4">
            <div>
              © 2026 CleverPe Technologies Private Limited. All rights reserved.
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <a href="#" className="hover:text-teal-brand transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-teal-brand transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-teal-brand transition-colors">Responsible Lending Policy</a>
              <a href="#" className="hover:text-teal-brand transition-colors">Grievance Redressal</a>
              <a href="#" className="hover:text-teal-brand transition-colors">RBI Fair Practices Code</a>
            </div>
          </div>

        </div>
      </footer>

      {/* =========================================================================
          INTERACTIVE MODAL: GET STARTED / APPLY NOW
         ========================================================================= */}
      {applyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-deep/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-modal border border-border-subtle relative">
            <button 
              onClick={() => { setApplyModalOpen(false); setAppSubmitted(false); }}
              className="absolute top-5 right-5 text-slate-muted hover:text-slate-deep p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            {!appSubmitted ? (
              <div>
                <div className="w-10 h-10 rounded-xl bg-teal-light text-teal-brand flex items-center justify-center mb-4">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-bold text-slate-deep mb-1">Get Started with CleverPe</h3>
                <p className="text-xs text-slate-muted mb-6">
                  Check your digital financing eligibility in 60 seconds without affecting your credit score.
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-deep uppercase mb-1.5">Mobile Number</label>
                    <div className="flex rounded-xl border border-border-subtle overflow-hidden focus-within:border-teal-brand">
                      <span className="bg-bg-secondary px-3.5 py-2.5 text-sm font-semibold text-slate-deep border-r border-border-subtle">
                        +91
                      </span>
                      <input 
                        type="tel"
                        maxLength="10"
                        placeholder="98765 43210"
                        value={appPhone}
                        onChange={(e) => setAppPhone(e.target.value.replace(/\D/g, ''))}
                        className="w-full px-3.5 py-2.5 text-sm outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-deep uppercase mb-1.5">Interested Solution</label>
                    <select 
                      value={appCategory}
                      onChange={(e) => setAppCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border-subtle text-sm text-slate-deep outline-none focus:border-teal-brand bg-white"
                    >
                      <option>Consumer Electronics & BNPL</option>
                      <option>No Cost EMI (Appliances & Laptops)</option>
                      <option>Electric Vehicle Financing</option>
                      <option>Healthcare & Medical Financing</option>
                      <option>Insurance Premium Financing</option>
                    </select>
                  </div>

                  <div className="flex items-start gap-2 pt-2 text-[11px] text-slate-muted">
                    <Lock className="w-3.5 h-3.5 text-teal-brand shrink-0 mt-0.5" />
                    <span>Your data is protected under 256-bit encryption and shared solely with RBI-registered NBFC lenders.</span>
                  </div>

                  <button 
                    disabled={appPhone.length < 10}
                    onClick={() => setAppSubmitted(true)}
                    className="w-full mt-4 bg-teal-brand hover:bg-teal-dark disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl shadow-sm text-sm transition-all"
                  >
                    Check Digital Eligibility
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="w-14 h-14 rounded-full bg-teal-light text-teal-brand flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-deep mb-2">Eligibility Request Received</h3>
                <p className="text-sm text-slate-muted leading-relaxed mb-6">
                  We sent a secure verification code to <strong>+91 {appPhone}</strong>. You qualify for pre-approved credit up to <strong>₹1,50,000</strong>.
                </p>
                <button 
                  onClick={() => { setApplyModalOpen(false); setAppSubmitted(false); }}
                  className="bg-slate-deep text-white font-semibold px-6 py-2.5 rounded-full text-sm"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          INTERACTIVE MODAL: MERCHANT PARTNERSHIP
         ========================================================================= */}
      {merchantModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-deep/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-modal border border-border-subtle relative">
            <button 
              onClick={() => { setMerchantModalOpen(false); setMerchantSubmitted(false); }}
              className="absolute top-5 right-5 text-slate-muted hover:text-slate-deep p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            {!merchantSubmitted ? (
              <div>
                <div className="w-10 h-10 rounded-xl bg-teal-light text-teal-brand flex items-center justify-center mb-4">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-bold text-slate-deep mb-1">Partner With CleverPe</h3>
                <p className="text-xs text-slate-muted mb-6">
                  Enable instant customer EMIs at your retail stores or e-commerce checkout.
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-deep uppercase mb-1.5">Business / Store Name</label>
                    <input 
                      type="text"
                      placeholder="e.g. Urban Electronics, Apollo Dental"
                      value={merchantBusiness}
                      onChange={(e) => setMerchantBusiness(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border-subtle text-sm outline-none focus:border-teal-brand"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-deep uppercase mb-1.5">Contact Person Name</label>
                    <input 
                      type="text"
                      placeholder="Your full name"
                      value={merchantName}
                      onChange={(e) => setMerchantName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border-subtle text-sm outline-none focus:border-teal-brand"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-deep uppercase mb-1.5">Store Type</label>
                    <select className="w-full px-3.5 py-2.5 rounded-xl border border-border-subtle text-sm text-slate-deep outline-none focus:border-teal-brand bg-white">
                      <option>Physical Retail Store / Multi-Outlet Chain</option>
                      <option>Hospital, Clinic, or Diagnostic Center</option>
                      <option>Electric Vehicle (EV) Dealership</option>
                      <option>Online E-Commerce Website / App</option>
                    </select>
                  </div>

                  <button 
                    disabled={!merchantBusiness || !merchantName}
                    onClick={() => setMerchantSubmitted(true)}
                    className="w-full mt-4 bg-teal-brand hover:bg-teal-dark disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl shadow-sm text-sm transition-all"
                  >
                    Request Merchant Integration Kit
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="w-14 h-14 rounded-full bg-teal-light text-teal-brand flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-deep mb-2">Merchant Request Logged</h3>
                <p className="text-sm text-slate-muted leading-relaxed mb-6">
                  Thank you, <strong>{merchantName}</strong>! Our merchant relationship manager will contact <strong>{merchantBusiness}</strong> within 1 business day with your QR kit and API documentation.
                </p>
                <button 
                  onClick={() => { setMerchantModalOpen(false); setMerchantSubmitted(false); }}
                  className="bg-slate-deep text-white font-semibold px-6 py-2.5 rounded-full text-sm"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
