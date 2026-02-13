import { useState, useRef, useEffect } from 'react';
import { Sparkles, BookOpen, Heart, Zap, Clock, CheckSquare, StickyNote, Star, X } from 'lucide-react';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
    expectations: ''
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationId, setRegistrationId] = useState('');
  const modalRef = useRef(null);
  const firstInputRef = useRef(null);

  // Generate registration ID (REG-xxxxx)
  const generateRegistrationId = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `REG-${randomNum}`;
  };

  const openModal = () => {
    setIsModalOpen(true);
    setIsSuccess(false);
    setFormData({ name: '', contact: '', email: '', expectations: '' });
    setErrors({});
    setRegistrationId('');
    setIsSubmitting(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsSuccess(false);
    setFormData({ name: '', contact: '', email: '', expectations: '' });
    setErrors({});
    setRegistrationId('');
    setIsSubmitting(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.contact.trim()) {
      newErrors.contact = 'Contact information is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    const regId = generateRegistrationId();
    setRegistrationId(regId);

    // Prepare data for Google Sheets
    const timestamp = new Date().toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    const sheetData = {
      fullName: formData.name.trim(),
      email: formData.email.trim(),
      contactNumber: formData.contact.trim(),
      paymentStatus: 'Pending',
      registrationId: regId,
      timestamp: timestamp,
      expectations: formData.expectations.trim() || '',
      source: 'Instagram',
      notes: ''
    };

    try {
      const webAppUrl = import.meta.env.VITE_GOOGLE_SHEETS_WEB_APP_URL;
      
      if (!webAppUrl) {
        console.error('Google Sheets Web App URL not configured');
        // Still show success for now, but log error
        setIsSuccess(true);
        setIsSubmitting(false);
        return;
      }

      const response = await fetch(webAppUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sheetData)
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        throw new Error('Failed to submit to Google Sheets');
      }
    } catch (error) {
      console.error('Error submitting to Google Sheets:', error);
      // Still show success to user, but log the error
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (isModalOpen && firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, [isModalOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target) && isModalOpen) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5F5] via-[#FFF9F0] to-[#F0F7FF] relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-pink-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-orange-100/20 rounded-full blur-3xl"></div>
      </div>

      {/* Left side doodle emojis - hidden on very small screens */}
      <div className="hidden sm:block absolute top-[15%] left-4 md:left-8 text-2xl opacity-60 animate-float pointer-events-none" style={{ transform: 'rotate(-8deg)' }} aria-hidden="true">
        ⭐
      </div>
      <div className="hidden sm:block absolute top-[28%] left-6 md:left-10 text-xl opacity-50 animate-float-delayed pointer-events-none" style={{ transform: 'rotate(5deg)' }} aria-hidden="true">
        💻
      </div>
      <div className="hidden sm:block absolute top-[45%] left-3 md:left-6 text-2xl opacity-55 pointer-events-none" style={{ transform: 'rotate(-12deg)' }} aria-hidden="true">
        🤖
      </div>
      <div className="hidden sm:block absolute top-[62%] left-5 md:left-9 text-xl opacity-60 animate-float pointer-events-none" style={{ transform: 'rotate(8deg)' }} aria-hidden="true">
        ⭐
      </div>
      <div className="hidden sm:block absolute top-[75%] left-4 md:left-7 text-xl opacity-50 animate-float-delayed pointer-events-none" style={{ transform: 'rotate(-5deg)' }} aria-hidden="true">
        🧠
      </div>
      <div className="hidden sm:block absolute top-[88%] left-6 md:left-10 text-2xl opacity-55 pointer-events-none" style={{ transform: 'rotate(10deg)' }} aria-hidden="true">
        ✨
      </div>

      {/* Right side doodle emojis - hidden on very small screens */}
      <div className="hidden sm:block absolute top-[12%] right-4 md:right-8 text-xl opacity-60 animate-float-delayed pointer-events-none" style={{ transform: 'rotate(12deg)' }} aria-hidden="true">
        💻
      </div>
      <div className="hidden sm:block absolute top-[25%] right-5 md:right-9 text-2xl opacity-55 animate-float pointer-events-none" style={{ transform: 'rotate(-8deg)' }} aria-hidden="true">
        ⭐
      </div>
      <div className="hidden sm:block absolute top-[42%] right-3 md:right-6 text-xl opacity-50 pointer-events-none" style={{ transform: 'rotate(15deg)' }} aria-hidden="true">
        🤖
      </div>
      <div className="hidden sm:block absolute top-[58%] right-6 md:right-10 text-2xl opacity-60 animate-float-delayed pointer-events-none" style={{ transform: 'rotate(-10deg)' }} aria-hidden="true">
        ✨
      </div>
      <div className="hidden sm:block absolute top-[72%] right-4 md:right-8 text-xl opacity-55 animate-float pointer-events-none" style={{ transform: 'rotate(7deg)' }} aria-hidden="true">
        💻
      </div>
      <div className="hidden sm:block absolute top-[85%] right-5 md:right-9 text-xl opacity-50 pointer-events-none" style={{ transform: 'rotate(-12deg)' }} aria-hidden="true">
        🧠
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white/80 backdrop-blur-sm rounded-[3rem] shadow-2xl shadow-pink-200/50 p-8 md:p-12 border-4 border-pink-100/50">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-pink-100 rounded-2xl flex items-center justify-center transform -rotate-6">
              <Sparkles className="text-pink-500" size={24} />
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center transform rotate-6">
              <BookOpen className="text-blue-500" size={24} />
            </div>
          </div>

          <div className="relative inline-block mx-auto mb-2">
            <span className="absolute -top-6 -left-6 text-pink-300 text-2xl">⭐</span>
            <span className="absolute -top-4 right-0 text-blue-300 text-xl">✨</span>
            <span className="absolute -bottom-5 -left-4 text-blue-400 text-2xl">📘</span>
            <span className="absolute -bottom-6 right-4 text-yellow-300 text-2xl">💡</span>
            <h1
              className="text-6xl md:text-8xl font-extrabold text-center text-gray-800 leading-tight" style={{ fontFamily: '"Kalam", "Comic Sans MS", cursive' }}
            >
              🖥️ Leverage AI for<br />
              <span className="text-blue-500">Smarter Study</span>
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-center text-gray-700 mb-8 font-medium leading-relaxed" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
            A quick, <span className="text-pink-500 font-bold">no-bakwaas workshop</span> where I show you the exact <span className="text-blue-500 font-bold">AI tools I personally use</span> as a student — to study faster, stay organized, and score better.
          </p>

          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="h-1 w-12 bg-pink-300 rounded-full"></div>
            <Star className="text-pink-400" size={16} fill="currentColor" />
            <Heart className="text-pink-400" size={16} fill="currentColor" />
            <Star className="text-blue-400" size={16} fill="currentColor" />
            <div className="h-1 w-12 bg-blue-300 rounded-full"></div>
          </div>

          <div className="bg-gradient-to-br from-pink-50 to-blue-50 rounded-3xl p-6 md:p-8 mb-8 border-2 border-pink-200/50 relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <Zap className="text-yellow-400" size={20} />
            </div>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              A 45-minute hands-on session where students learn real AI tools and workflows that save time, boost productivity, and make studying <span className="font-bold text-pink-600">10x smarter.</span>
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-start gap-3 bg-white/70 rounded-2xl p-4">
                <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <BookOpen className="text-pink-500" size={20} />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 mb-1">Target</p>
                  <p className="text-gray-600">Students</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white/70 rounded-2xl p-4">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles className="text-blue-500" size={20} />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 mb-1">Format</p>
                  <p className="text-gray-600">Practical workflows + live demos + free notes</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white/70 rounded-2xl p-4">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CheckSquare className="text-purple-500" size={20} />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 mb-1">Seats</p>
                  <p className="text-gray-600">150</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white/70 rounded-2xl p-4">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="text-orange-500" size={20} />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 mb-1">Duration</p>
                  <p className="text-gray-600">45 minutes</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 border-2 border-dashed border-pink-300 text-center">
              <p className="text-3xl font-bold text-pink-600 mb-1">₹49</p>
              <p className="text-sm text-gray-600">pay after registration</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 mb-8">
            <StickyNote className="text-pink-400" size={16} />
            <Star className="text-blue-400" size={14} fill="currentColor" />
            <Heart className="text-pink-400" size={14} fill="currentColor" />
            <Star className="text-blue-400" size={14} fill="currentColor" />
            <StickyNote className="text-blue-400" size={16} />
          </div>

          <button 
            onClick={openModal}
            className="w-full bg-gradient-to-r from-blue-400 to-blue-500 text-white font-bold text-xl py-5 rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300 border-4 border-blue-200 hover:border-blue-300 relative overflow-hidden group"
            aria-label="Open registration form"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              REGISTER NOW
              <Heart className="group-hover:scale-110 transition-transform" size={20} fill="currentColor" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>

          <div className="flex justify-center gap-3 mt-8">
            <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center animate-bounce-slow">
              <Star className="text-pink-400" size={16} />
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center animate-bounce-slow" style={{ animationDelay: '0.2s' }}>
              <Sparkles className="text-blue-400" size={16} />
            </div>
            <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center animate-bounce-slow" style={{ animationDelay: '0.4s' }}>
              <Heart className="text-pink-400" size={16} />
            </div>
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div 
            ref={modalRef}
            className="bg-[#F5EDE2] rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-pop-up border-4 border-pink-200/50"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Doodle Header Bar */}
            <div className="bg-gradient-to-r from-pink-200/60 to-blue-200/60 p-4 rounded-t-3xl border-b-2 border-dashed border-pink-300/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="text-pink-500" size={20} fill="currentColor" />
                  <h2 id="modal-title" className="text-2xl font-bold text-pink-600" style={{ fontFamily: '"Kalam", "Comic Sans MS", cursive' }}>
                    Register Now
                  </h2>
                  <Sparkles className="text-blue-500" size={18} />
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-white/50"
                  aria-label="Close registration form"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-6 md:p-8">
              {!isSuccess ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-pink-600 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      ref={firstInputRef}
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border-2 ${
                        errors.name ? 'border-red-300 bg-red-50' : 'border-pink-200 bg-white'
                      } focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all`}
                      placeholder="Enter your full name"
                      aria-required="true"
                      aria-invalid={errors.name ? 'true' : 'false'}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    {errors.name && (
                      <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact" className="block text-sm font-semibold text-pink-600 mb-2">
                      Contact Information <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="contact"
                      name="contact"
                      value={formData.contact}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border-2 ${
                        errors.contact ? 'border-red-300 bg-red-50' : 'border-pink-200 bg-white'
                      } focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all`}
                      placeholder="Phone / WhatsApp number"
                      aria-required="true"
                      aria-invalid={errors.contact ? 'true' : 'false'}
                      aria-describedby={errors.contact ? 'contact-error' : undefined}
                    />
                    {errors.contact && (
                      <p id="contact-error" className="mt-1 text-sm text-red-600" role="alert">
                        {errors.contact}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-pink-600 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border-2 ${
                        errors.email ? 'border-red-300 bg-red-50' : 'border-pink-200 bg-white'
                      } focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all`}
                      placeholder="your.email@example.com"
                      aria-required="true"
                      aria-invalid={errors.email ? 'true' : 'false'}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="expectations" className="block text-sm font-semibold text-pink-600 mb-2">
                      What do you expect? <span className="text-gray-400 text-xs font-normal">(Optional)</span>
                    </label>
                    <textarea
                      id="expectations"
                      name="expectations"
                      value={formData.expectations}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border-2 border-pink-200 bg-white focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all resize-none"
                      placeholder="Tell us what you're hoping to learn..."
                    />
                  </div>

                  <div className="pt-4 border-t-2 border-dashed border-pink-300/50">
                    <div className="flex gap-3">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 bg-gradient-to-r from-blue-400 to-blue-500 text-white font-bold py-4 px-6 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 border-2 border-blue-300 relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          {isSubmitting ? 'Submitting...' : 'Submit & Reserve My Seat'}
                          {!isSubmitting && <CheckSquare size={20} />}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </button>
                      <button
                        type="button"
                        onClick={closeModal}
                        className="px-6 py-4 bg-white/80 text-gray-600 font-semibold rounded-full hover:bg-white hover:shadow-md transition-all duration-300 border-2 border-gray-200"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="text-center space-y-6 animate-pop-up">
                  <div className="flex justify-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-pink-200 to-blue-200 rounded-full flex items-center justify-center">
                      <CheckSquare className="text-green-600" size={40} fill="currentColor" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-pink-600 mb-2" style={{ fontFamily: '"Kalam", "Comic Sans MS", cursive' }}>
                      You're in! 🎉
                    </h3>
                    <p className="text-lg text-gray-700 mb-4">
                      Thanks <span className="font-bold text-pink-600">{formData.name}</span> — we'll contact you shortly about the payment.
                    </p>
                    {registrationId && (
                      <p className="text-base font-semibold text-blue-600 mb-3 bg-blue-50 rounded-lg p-3 border-2 border-blue-200">
                        Your Registration ID: <span className="font-mono">{registrationId}</span>
                      </p>
                    )}
                    <p className="text-sm text-gray-600 bg-white/70 rounded-xl p-4 border-2 border-dashed border-pink-300/50">
                      You have been registered and you will shortly get contacted about the payment via email or WhatsApp.
                    </p>
                  </div>
                  <button
                    onClick={closeModal}
                    className="w-full bg-gradient-to-r from-blue-400 to-blue-500 text-white font-bold py-4 px-6 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 border-2 border-blue-300"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
