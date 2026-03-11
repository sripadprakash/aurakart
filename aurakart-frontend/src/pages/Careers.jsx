import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FiBriefcase, FiMapPin, FiClock, FiArrowRight, FiSmile, FiZap, FiGlobe, FiCpu } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Careers = () => {
  const { user, triggerLoginForCheckout } = useAuth();

  const handleApply = (position) => {
    if (!user) {
      toast.error('Please sign in');
      triggerLoginForCheckout();
      return;
    }
    toast.success(`Applied successfully for ${position} and sent to your email.`);
  };

  const handleGeneralApplication = () => {
    if (!user) {
      toast.error('Please sign in');
      triggerLoginForCheckout();
      return;
    }
    toast('Coming Soon!', { icon: '🚀' });
  };

  const positions = [
    {
      title: "Senior Frontend Engineer",
      department: "Engineering",
      location: "New York / Remote",
      type: "Full-time",
      icon: <FiCpu className="text-blue-400" />
    },
    {
      title: "Product Designer",
      department: "Design",
      location: "London / Remote",
      type: "Full-time",
      icon: <FiSmile className="text-pink-400" />
    },
    {
      title: "Marketing Manager",
      department: "Growth",
      location: "San Francisco",
      type: "Full-time",
      icon: <FiZap className="text-orange-400" />
    },
    {
      title: "Operations Specialist",
      department: "Logistics",
      location: "Berlin",
      type: "Full-time",
      icon: <FiGlobe className="text-cyan-400" />
    }
  ];

  const benefits = [
    { title: "Remote-First", desc: "Work from anywhere in the world with a flexible schedule." },
    { title: "Health & Wellness", desc: "Premium health insurance and monthly wellness stipend." },
    { title: "Learning Budget", desc: "$2,000 yearly budget for courses and conferences." },
    { title: "Equity Options", desc: "Own a part of the future we are building together." }
  ];

  return (
    <div className="min-h-screen text-white font-sans flex flex-col relative overflow-hidden bg-[#020617]">
      {/* Background Accents */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40rem] h-[40rem] bg-purple-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[45rem] h-[45rem] bg-blue-600/5 rounded-full blur-[150px]"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          
          {/* Hero Section */}
          <section className="text-center mb-24">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-purple-500/10 text-purple-400 px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.3em] mb-8 uppercase border border-purple-500/20"
            >
              Join Our Team
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-tight mb-8"
            >
              Shape the Future of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">Premium E-Commerce</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 text-xl font-medium max-w-3xl mx-auto leading-relaxed"
            >
              We are looking for visionary thinkers and relentless executors to help us redefine how the world shops for high-performance gear.
            </motion.p>
          </section>

          {/* Benefits Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
            {benefits.map((benefit, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-[2rem] p-8 backdrop-blur-md hover:bg-white/10 transition-colors"
              >
                <h4 className="text-lg font-black text-white mb-3">{benefit.title}</h4>
                <p className="text-sm text-gray-400 font-medium leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </section>

          {/* Open Positions */}
          <section className="mb-32">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div className="text-left">
                <h2 className="text-4xl font-black text-white tracking-tighter uppercase">Open Positions</h2>
                <div className="w-24 h-1 bg-purple-500 mt-4 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
              </div>
              <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">{positions.length} Current Openings</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {positions.map((job, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group bg-[#0f172a] border border-white/5 rounded-3xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 hover:border-purple-500/30 transition-all duration-500"
                >
                  <div className="flex items-center gap-8 w-full md:w-auto">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-3xl border border-white/10 group-hover:scale-110 transition-transform">
                      {job.icon}
                    </div>
                    <div>
                      <h4 className="text-xl md:text-2xl font-black text-white group-hover:text-purple-400 transition-colors">{job.title}</h4>
                      <div className="flex flex-wrap gap-4 mt-2">
                        <span className="flex items-center gap-1.5 text-gray-500 text-xs font-bold uppercase tracking-widest">
                          <FiBriefcase className="text-purple-500" /> {job.department}
                        </span>
                        <span className="flex items-center gap-1.5 text-gray-500 text-xs font-bold uppercase tracking-widest">
                          <FiMapPin className="text-blue-500" /> {job.location}
                        </span>
                        <span className="flex items-center gap-1.5 text-gray-500 text-xs font-bold uppercase tracking-widest">
                          <FiClock className="text-green-500" /> {job.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => handleApply(job.title)}
                    className="w-full md:w-auto bg-white/5 hover:bg-white text-white hover:text-black px-8 py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all flex items-center justify-center gap-3 group/btn"
                  >
                    Apply Now <FiArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Culture CTA */}
          <section className="relative bg-gradient-to-br from-purple-600 to-blue-700 rounded-[3rem] p-12 md:p-20 text-center overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
            <div className="relative z-10 flex flex-col items-center">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tighter">Don't See a Perfect Fit?</h2>
              <p className="text-white/80 text-lg font-medium max-w-2xl mb-10">
                We are always looking for exceptional talent. If you believe you can bring value to Aurakart, send us your resume and a brief intro.
              </p>
              <button 
                onClick={handleGeneralApplication}
                className="bg-white text-purple-600 px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:bg-gray-100 transition-all hover:scale-105 active:scale-95 shadow-xl flex items-center gap-3"
              >
                General Application <FiArrowRight />
              </button>
            </div>
          </section>

        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Careers;
