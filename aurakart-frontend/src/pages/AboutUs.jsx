import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FiUsers, FiTarget, FiAward, FiShield, FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  const stats = [
    { label: "Founded", value: "2020", icon: <FiClock className="text-blue-400" /> },
    { label: "Employees", value: "250+", icon: <FiUsers className="text-purple-400" /> },
    { label: "Countries", value: "15+", icon: <FiGlobe className="text-cyan-400" /> },
    { label: "Orders Served", value: "1M+", icon: <FiShoppingBag className="text-orange-400" /> },
  ];

  const values = [
    {
      title: "Quality First",
      desc: "We meticulously curate every product to ensure it meets our rigorous standards of excellence.",
      icon: <FiAward className="text-orange-400" />
    },
    {
      title: "Customer Centric",
      desc: "Your satisfaction is our primary goal. We're here to support you 24/7.",
      icon: <FiTarget className="text-blue-400" />
    },
    {
      title: "Trust & Security",
      desc: "We use state-of-the-art encryption and security to keep your data safe and private.",
      icon: <FiShield className="text-indigo-400" />
    }
  ];

  return (
    <div className="min-h-screen text-white font-sans flex flex-col relative overflow-hidden bg-[#020617]">
      {/* Background Accents */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-blue-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[45rem] h-[45rem] bg-indigo-600/5 rounded-full blur-[150px]"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          {/* Hero Section */}
          <section className="text-center mb-24">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.3em] mb-8 uppercase border border-blue-500/20"
            >
              Our Story
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-tight mb-8"
            >
              Redefining the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Modern Lifestyle</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 text-xl font-medium max-w-3xl mx-auto leading-relaxed"
            >
              Aurakart was born out of a simple vision: to bring high-performance, premium products to discerning individuals who value both style and substance.
            </motion.p>
          </section>

          {/* Stats Grid */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-32">
            {[
              { label: "Founded", value: "2026", icon: <FiZap className="text-blue-400" /> },
              { label: "Employees", value: "250+", icon: <FiUsers className="text-purple-400" /> },
              { label: "Countries", value: "15+", icon: <FiShield className="text-cyan-400" /> },
              { label: "Customers", value: "1M+", icon: <FiAward className="text-orange-400" /> },
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-[2rem] p-8 flex flex-col items-center gap-4 backdrop-blur-md"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-xl border border-white/10">
                  {stat.icon}
                </div>
                <div className="text-center">
                  <h4 className="text-3xl font-black text-white">{stat.value}</h4>
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mt-1">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </section>

          {/* Our Mission */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-[3rem] overflow-hidden group border border-white/10"
            >
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070" 
                alt="Our Team" 
                className="w-full h-full object-cover aspect-square grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60"></div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col gap-8"
            >
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight">
                Our <span className="text-blue-400">Mission</span> is to Inspire <br />
                Your Better Self.
              </h2>
              <div className="space-y-6">
                <p className="text-gray-400 text-lg leading-relaxed">
                  We believe that the products you use every day should do more than just function—they should inspire you to push your limits, whether that's in your home, your workplace, or your fitness journey.
                </p>
                <div className="space-y-4">
                  {["Premium Quality Products", "Exceptional Customer Service", "Innovative Technology Integration"].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-white font-bold">
                      <FiCheckCircle className="text-blue-400" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </section>

          {/* Core Values */}
          <section className="mb-32">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Core Values</h2>
              <div className="w-24 h-1 bg-blue-500 mx-auto mt-4 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-[#0f172a] border border-white/5 rounded-[2.5rem] p-10 flex flex-col gap-6 hover:border-white/20 transition-all duration-300 group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-3xl border border-white/10 group-hover:scale-110 transition-transform">
                    {value.icon}
                  </div>
                  <h4 className="text-2xl font-black text-white">{value.title}</h4>
                  <p className="text-gray-400 font-medium leading-relaxed">{value.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="relative bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[3rem] p-12 md:p-20 text-center overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
            <div className="relative z-10 flex flex-col items-center">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tighter">Ready to Upgrade Your Lifestyle?</h2>
              <Link to="/collections">
                <button className="bg-white text-blue-600 px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:bg-gray-100 transition-all hover:scale-105 active:scale-95 shadow-xl flex items-center gap-3">
                  Shop Now <FiArrowRight />
                </button>
              </Link>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
};

// Internal icons needed
const FiClock = ({ className }) => <svg className={className} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>;
const FiGlobe = ({ className }) => <svg className={className} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>;
const FiShoppingBag = ({ className }) => <svg className={className} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>;
const FiZap = ({ className }) => <svg className={className} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>;

export default AboutUs;
