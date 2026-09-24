import { useState } from 'react';
import { BookOpen, Video, PlayCircle } from 'lucide-react';

export default function Learn() {
  const [lang, setLang] = useState<'EN' | 'HI'>('EN');

  const content = {
    EN: {
      title: "Learn Digital — Step by Step",
      subtitle: "Simple guides to help you master digital tools.",
      categories: ["Payments", "Online Presence", "Marketing", "Business Management"],
      tutorials: [
        { title: "How to Accept UPI Payments", category: "Payments", duration: "3 mins", desc: "Customer will scan QR -> Enter amount -> Pay -> You verify receipt." },
        { title: "How to Create a QR Code", category: "Payments", duration: "2 mins", desc: "Enter your UPI ID -> Click generate -> Download or print your QR." },
        { title: "How to Create a Digital Profile", category: "Online Presence", duration: "5 mins", desc: "Go to shop settings -> Add business name, category, and location -> Save." },
        { title: "How to Track Daily Sales", category: "Business Management", duration: "4 mins", desc: "Open Sales Tracker -> Select Product -> Enter Quantity -> Save Record." }
      ]
    },
    HI: {
      title: "डिजिटल सीखें — आसान स्टेप्स में",
      subtitle: "डिजिटल टूल्स का इस्तेमाल कैसे करें, आसानी से सीखें।",
      categories: ["पेमेंट्स", "ऑनलाइन दुकान", "मार्केटिंग", "बिज़नेस मैनेजमेंट"],
      tutorials: [
        { title: "UPI पेमेंट्स कैसे एक्सेप्ट करें", category: "पेमेंट्स", duration: "3 mins", desc: "Customer QR scan करेगा → amount enter करेगा → payment करेगा → payment verify करें।" },
        { title: "QR कोड कैसे बनाएं", category: "पेमेंट्स", duration: "2 mins", desc: "अपना UPI ID डालें -> Generate पर क्लिक करें -> QR डाउनलोड या प्रिंट करें।" },
        { title: "डिजिटल दुकान कैसे बनाएं", category: "ऑनलाइन दुकान", duration: "5 mins", desc: "सेटिंग्स में जाएं -> दुकान का नाम, केटेगरी और लोकेशन डालें -> सेव करें।" },
        { title: "रोज की सेल कैसे ट्रैक करें", category: "बिज़नेस मैनेजमेंट", duration: "4 mins", desc: "Sales Tracker खोलें -> प्रोडक्ट चुनें -> Quantity डालें -> सेव करें।" }
      ]
    }
  };

  const t = content[lang];

  return (
    <div className="bg-slate-50 dark:bg-slate-800 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-3">
              <BookOpen className="text-amber-600" /> {t.title}
            </h1>
            <p className="text-slate-600 dark:text-slate-400">{t.subtitle}</p>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-1 flex">
            <button onClick={() => setLang('EN')} className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${lang === 'EN' ? 'bg-amber-600 text-white' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:bg-slate-800'}`}>
              English
            </button>
            <button onClick={() => setLang('HI')} className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${lang === 'HI' ? 'bg-amber-600 text-white' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:bg-slate-800'}`}>
              हिंदी
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {t.categories.map((c, i) => (
            <span key={i} className="px-4 py-2 bg-amber-50 text-amber-700 rounded-full text-sm font-medium border border-amber-100 cursor-pointer hover:bg-amber-100 transition-colors">
              {c}
            </span>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.tutorials.map((tut, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
              <div className="h-40 bg-slate-800 relative flex items-center justify-center">
                <Video className="text-slate-600 dark:text-slate-400 absolute w-full h-full opacity-10 object-cover" />
                <PlayCircle size={48} className="text-white opacity-80 group-hover:scale-110 transition-transform group-hover:opacity-100 z-10" />
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {tut.duration}
                </div>
              </div>
              <div className="p-6">
                <span className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-2 block">{tut.category}</span>
                <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-2">{tut.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{tut.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
