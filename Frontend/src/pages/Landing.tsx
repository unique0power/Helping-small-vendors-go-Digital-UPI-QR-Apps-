import { Link } from 'react-router-dom';
import { Store, QrCode, Smartphone, BarChart3, Receipt, Users, ArrowRight, Wallet, CheckCircle2 } from 'lucide-react';

export default function Landing() {
  return (
    <div className="bg-slate-50 dark:bg-slate-800 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-24 lg:pt-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="max-w-2xl">
              <p className="text-amber-600 font-semibold tracking-wider text-sm uppercase mb-4">
                Digital Support For Small Businesses
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-slate-100 leading-tight mb-6">
                Bring Your Local Business Into the <span className="text-amber-600">Digital World.</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                Simple digital tools to help local vendors accept digital payments, manage their business, reach customers and grow online.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register" className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-lg hover:shadow-amber-600/30 flex items-center justify-center gap-2 group">
                  Get Started <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/learn" className="bg-white dark:bg-slate-900 hover:bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-sm flex items-center justify-center">
                  Learn How
                </Link>
              </div>
            </div>

            {/* Right Content - Dashboard Preview */}
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              <div className="relative rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-2xl p-6 lg:p-8 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center justify-between mb-8 border-b border-slate-100 dark:border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-amber-100 p-2 rounded-lg text-amber-600">
                      <Store size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-slate-100">Sharma General Store</h3>
                      <p className="text-xs text-slate-500">Dashboard Preview</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500 mb-1">Digital Score</p>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="w-[70%] h-full bg-amber-600 rounded-full"></div>
                      </div>
                      <span className="text-sm font-bold text-amber-600">70%</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                    <p className="text-xs text-slate-500 mb-1">Today's Sales</p>
                    <p className="text-xl font-bold text-slate-900 dark:text-slate-100">₹2,500</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                    <p className="text-xs text-slate-500 mb-1">Estimated Profit</p>
                    <p className="text-xl font-bold text-emerald-600">₹1,500</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-amber-50/50 rounded-lg border border-amber-100">
                    <div className="flex items-center gap-3">
                      <Wallet size={18} className="text-amber-600" />
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">UPI Payments</span>
                    </div>
                    <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-md">
                      <CheckCircle2 size={12} /> Active
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-amber-50/50 rounded-lg border border-amber-100">
                    <div className="flex items-center gap-3">
                      <QrCode size={18} className="text-amber-600" />
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">QR Code</span>
                    </div>
                    <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-md">
                      <CheckCircle2 size={12} /> Ready
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-amber-100 rounded-full blur-2xl opacity-60 -z-10"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-amber-100 rounded-full blur-2xl opacity-60 -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-8">Built for India's local businesses</p>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {['Grocery Stores', 'Tea Shops', 'Bakeries', 'Fruit Vendors', 'Clothing Stores', 'Food Vendors', 'Beauty Businesses', 'Home Businesses'].map((type) => (
              <span key={type} className="px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-sm font-medium hover:border-amber-300 hover:bg-amber-50 transition-colors cursor-default">
                {type}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">Everything you need to take your shop digital.</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">Managing a shop is hard. We make the digital part easy so you can focus on your customers.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<Wallet className="text-amber-600" size={32} />}
              title="Get Paid Digitally"
              desc="Learn about UPI and accept digital payments directly to your bank account."
            />
            <FeatureCard 
              icon={<Smartphone className="text-amber-600" size={32} />}
              title="Get Found Online"
              desc="Create a beautiful digital presence and catalog for your business in minutes."
            />
            <FeatureCard 
              icon={<BarChart3 className="text-amber-600" size={32} />}
              title="Manage Your Business"
              desc="Track your daily sales, monitor expenses, and instantly see your profits."
            />
            <FeatureCard 
              icon={<Users className="text-amber-600" size={32} />}
              title="Grow Your Customers"
              desc="Use simple digital tools and marketing techniques to reach more people locally."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
      <div className="bg-amber-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">{title}</h3>
      <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">{desc}</p>
      <Link to="/learn" className="text-amber-600 font-medium inline-flex items-center gap-1 hover:gap-2 transition-all">
        Learn More <ArrowRight size={16} />
      </Link>
    </div>
  );
}