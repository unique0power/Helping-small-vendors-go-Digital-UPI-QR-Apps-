import { Store, Heart, Lightbulb, Users } from 'lucide-react';

export default function About() {
  return (
    <div className="bg-slate-50 dark:bg-slate-800 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-4">About DigitalDukaan</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Empowering every local vendor in India with the digital tools they need to grow.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 dark:border-slate-700 mb-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-3">
                <Lightbulb className="text-amber-500" /> The Problem
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                Many small businesses have amazing products and loyal customers, but they struggle to adapt to the digital world. Expensive software, complex setups, and technical jargon keep local vendors—grocery stores, tea stalls, bakeries, and home businesses—from reaching their full potential.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-center">
              <Store size={120} className="text-slate-300" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 bg-amber-50 p-6 rounded-2xl border border-amber-100 flex items-center justify-center">
              <div className="relative">
                <Users size={120} className="text-amber-200" />
                <Heart size={40} className="text-rose-500 absolute -bottom-2 -right-2 animate-bounce" />
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-3">
                <Heart className="text-rose-500" /> Our Solution
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                DigitalDukaan brings useful, easy-to-understand digital business tools into one simple platform. We designed this specifically for people with little or no technical knowledge. From generating a QR code to tracking daily sales and generating professional bills, we make digitalization as simple as running your shop.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6">Built for India. Built for You.</h3>
          <p className="text-slate-500">Made with ❤️ for the small businesses that keep our economy running.</p>
        </div>
      </div>
    </div>
  );
}
