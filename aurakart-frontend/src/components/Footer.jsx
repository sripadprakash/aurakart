import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { FiX, FiShield, FiEye, FiLock, FiSettings, FiFileText, FiMail, FiSend, FiAtSign } from 'react-icons/fi';
import { FaLinkedin, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  const { setIsAuthModalOpen } = useAuth();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [email, setEmail] = useState('');
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight / 2) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert('Thank you for subscribing!');
      setEmail('');
    }
  };

  const privacySections = [
    { icon: <FiEye className="text-blue-400" />, title: "Data Collection", content: "We collect basic info like name and email for the simulation." },
    { icon: <FiShield className="text-indigo-400" />, title: "Usage", content: "Data is used strictly for platform demonstration purposes." },
    { icon: <FiLock className="text-purple-400" />, title: "Security", content: "Industry-standard measures protect this demo environment." },
    { icon: <FiSettings className="text-cyan-400" />, title: "Cookies", content: "Local storage is used to remember your session preferences." }
  ];

  return (
    <>
      <footer className="bg-[#020617]/50 backdrop-blur-lg pt-16 pb-8 mt-0 border-t border-white/10 w-full relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* MODERN NEWSLETTER SECTION */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-[#0f172a] rounded-[3rem] p-8 md:p-16 mb-20 overflow-hidden border border-white/10 group shadow-2xl"
          >
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-blue-600/10 rounded-full blur-[120px] -z-10 group-hover:bg-blue-600/20 transition-colors duration-700"></div>
            <div className="absolute bottom-0 left-0 w-[20rem] h-[20rem] bg-indigo-600/10 rounded-full blur-[100px] -z-10 group-hover:bg-indigo-600/20 transition-colors duration-700"></div>

            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
              <div className="max-w-xl text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.3em] mb-6 uppercase border border-blue-500/20">
                  <FiMail className="text-xs" /> Join the Club
                </div>
                <h3 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight leading-tight">
                  Elevate Your <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Shopping Journey</span>
                </h3>
                <p className="text-gray-400 text-lg font-medium leading-relaxed max-w-md mx-auto lg:mx-0">
                  Be the first to experience our latest drops, exclusive collections, and premium member-only offers.
                </p>
              </div>

              <div className="w-full max-w-md">
                <form onSubmit={handleSubscribe} className="relative group/form">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2rem] blur opacity-25 group-focus-within/form:opacity-100 transition duration-1000 group-hover/form:duration-200"></div>
                  <div className="relative flex flex-col sm:flex-row gap-3 bg-[#020617] p-2 rounded-[2rem] border border-white/10 shadow-inner">
                    <input 
                      type="email" 
                      placeholder="Enter your email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="flex-1 bg-transparent px-6 py-4 text-white placeholder-gray-500 focus:outline-none font-bold"
                    />
                    <button 
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-[1.5rem] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all duration-300 shadow-xl shadow-blue-600/20 hover:scale-105 active:scale-95"
                    >
                      <span>Subscribe</span>
                      <FiSend className="text-lg" />
                    </button>
                  </div>
                </form>
                <div className="mt-4 text-[10px] text-gray-500 font-bold uppercase tracking-widest text-center lg:text-left leading-none flex items-baseline justify-center lg:justify-start gap-1">
                  <span>By subscribing, you agree to our</span>
                  <button 
                    onClick={() => setIsPrivacyModalOpen(true)} 
                    className="text-blue-400 hover:underline transition-all p-0 m-0 border-none bg-transparent leading-none h-auto inline transform translate-y-[-1px]"
                  >
                    Privacy Policy
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-16 items-start">
            <div className="flex flex-col">
              <h4 className="text-white font-black mb-8 text-xs uppercase tracking-[0.3em] leading-none opacity-50">Office Address</h4>
              <div className="space-y-4">
                <span className="font-bold text-gray-200 block text-lg tracking-tight">Aurakart Inc.</span>
                <p className="text-sm text-gray-400 leading-relaxed font-bold">
                  350 Fifth Avenue, Suite 6200<br/>
                  New York, NY 10118<br/>
                  United States
                </p>
              </div>
            </div>

            {[
              { 
                title: 'Company', 
                links: ['About Us', 'Careers', 'Press Releases', 'Sustainability'] 
              },
              { 
                title: 'Social', 
                links: [
                  { name: 'Facebook', url: 'https://www.facebook.com' },
                  { name: 'Twitter', url: 'https://www.twitter.com' },
                  { name: 'Instagram', url: 'https://www.instagram.com' },
                  { name: 'LinkedIn', url: 'https://www.linkedin.com' }
                ] 
              },
              { 
                title: 'Support', 
                links: ['Your Account', 'Returns Centre', 'Help & Support', 'Gift Cards'] 
              }
            ].map((col, idx) => (
              <div key={idx} className="flex flex-col">
                <h4 className="text-white font-black mb-8 text-xs uppercase tracking-[0.3em] leading-none opacity-50">{col.title}</h4>
                <ul className="space-y-4 text-sm font-bold">
                  {col.links.map((link, lIdx) => {
                    const isSocial = typeof link === 'object';
                    const linkName = isSocial ? link.name : link;
                    const linkUrl = isSocial ? link.url : '#';

                    if (linkName === 'Your Account') {
                      return (
                        <li key={lIdx}>
                          <button 
                            onClick={() => setIsAuthModalOpen(true)}
                            className="text-gray-400 hover:text-blue-400 transition-colors duration-300 flex items-center gap-2 group text-left"
                          >
                            <span className="w-0 h-0.5 bg-blue-400 group-hover:w-4 transition-all duration-300"></span>
                            {linkName}
                          </button>
                        </li>
                      );
                    }

                    if (!isSocial && (linkName === 'About Us' || linkName === 'Careers' || linkName === 'Press Releases' || linkName === 'Sustainability' || linkName === 'Returns Centre' || linkName === 'Help & Support' || linkName === 'Gift Cards')) {
                      return (
                        <li key={lIdx}>
                          <Link 
                            to={
                              linkName === 'About Us' ? '/about-us' : 
                              linkName === 'Careers' ? '/careers' : 
                              linkName === 'Press Releases' ? '/press-releases' : 
                              linkName === 'Sustainability' ? '/sustainability' : 
                              linkName === 'Returns Centre' ? '/returns-centre' : 
                              linkName === 'Help & Support' ? '/help-support' : 
                              '/gift-cards'
                            } 
                            className="text-gray-400 hover:text-blue-400 transition-colors duration-300 flex items-center gap-2 group"
                          >
                            <span className="w-0 h-0.5 bg-blue-400 group-hover:w-4 transition-all duration-300"></span>
                            {linkName}
                          </Link>
                        </li>
                      );
                    }

                    return (
                      <li key={lIdx}>
                        <a 
                          href={linkUrl}
                          target={isSocial ? "_blank" : "_self"}
                          rel={isSocial ? "noopener noreferrer" : ""}
                          className="text-gray-400 hover:text-blue-400 transition-colors duration-300 flex items-center gap-2 group"
                        >
                          <span className="w-0 h-0.5 bg-blue-400 group-hover:w-4 transition-all duration-300"></span>
                          {linkName}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-white/5 pt-10 flex flex-col items-center gap-6">
            <div className="flex flex-col items-center gap-6 group">
              <p className="text-[13px] font-black text-gray-300 uppercase tracking-[0.2em] transition-colors group-hover:text-blue-400 text-center max-w-2xl leading-relaxed">
                Website designed and built by Mr. Sripad Prakash <br className="hidden sm:block" />
                Get in touch using the options below
              </p>

              <div className="flex gap-4">
                {[
                  { 
                    name: 'Gmail', 
                    icon: <FiAtSign size={20} />, 
                    link: 'mailto:sripadprakash@gmail.com',
                    color: 'hover:bg-red-500',
                    glow: 'shadow-red-500/20'
                  },
                  { 
                    name: 'LinkedIn', 
                    icon: <FaLinkedin size={20} />, 
                    link: 'https://www.linkedin.com/in/sripadprakash/',
                    color: 'hover:bg-blue-600',
                    glow: 'shadow-blue-600/20'
                  },
                  { 
                    name: 'WhatsApp', 
                    icon: <FaWhatsapp size={20} />, 
                    link: 'https://wa.me/qr/E7776I4S6MGWF1',
                    color: 'hover:bg-green-500',
                    glow: 'shadow-green-500/20'
                  }
                ].map((contact, idx) => (
                  <motion.a
                    key={contact.name}
                    href={contact.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 text-white transition-all duration-300 shadow-xl ${contact.color} ${contact.glow} group/item relative`}
                  >
                    {contact.icon}
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-white text-black text-[9px] font-black uppercase tracking-widest rounded-md opacity-0 group-hover/item:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-gray-200 shadow-sm">
                      {contact.name}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>

            <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">&copy; {new Date().getFullYear()} Aurakart. Crafted for excellence.</p>
          </div>
          </div>
          </footer>


      {showScrollTop && (
        <button 
          className="back-to-top" 
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          <svg className="svgIcon" viewBox="0 0 384 512">
            <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"></path>
          </svg>
        </button>
      )}
      <AnimatePresence>
        {isPrivacyModalOpen && (
          <div className="fixed inset-0 z-[150] flex items-start justify-center p-4 pt-24 pb-10">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPrivacyModalOpen(false)}
              className="absolute inset-0 bg-[#020617]/90 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-[#0f172a] border border-white/10 w-[95%] md:w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col max-h-full"
            >
              <div className="p-5 md:p-8 border-b border-white/5 flex justify-between items-center bg-white/5 flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                    <FiShield size={20} />
                  </div>
                  <h2 className="text-lg md:text-xl font-black text-white uppercase tracking-widest">Privacy Policy</h2>
                </div>
                <button 
                  onClick={() => setIsPrivacyModalOpen(false)} 
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 active:scale-95 transition-all text-white border border-white/5"
                >
                  <FiX size={20} />
                </button>
              </div>

              <div 
                className="p-6 md:p-10 overflow-y-auto custom-scrollbar scroll-smooth"
                data-lenis-prevent
                style={{ WebkitOverflowScrolling: 'touch' }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8 mb-10">
                  {privacySections.map((section, idx) => (
                    <div key={idx} className="bg-white/5 p-5 md:p-8 rounded-2xl border border-white/5 flex flex-col group hover:bg-white/[0.08] transition-colors duration-300">
                      <div className="text-3xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{section.icon}</div>
                      <h3 className="text-sm font-black text-white uppercase tracking-wider mb-2">{section.title}</h3>
                      <p className="text-[11px] md:text-xs text-gray-400 leading-relaxed font-medium">{section.content}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-[#020617] p-6 md:p-8 rounded-2xl border border-white/5 mb-4">
                  <div className="flex items-center gap-3 mb-4">
                    <FiFileText className="text-blue-400" />
                    <h4 className="text-xs font-black text-white uppercase tracking-widest">Project Intent</h4>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    This website is a <strong className="text-white">Project Presentation</strong>. All data entered is used solely to demonstrate features and is not used for real-world commercial purposes. We do not store or process real financial data.
                  </p>
                </div>
              </div>

              <div className="p-6 bg-white/5 border-t border-white/5 text-center">
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">© 2026 Aurakart. Crafted for excellence.</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Footer;
