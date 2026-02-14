import { Sparkles, Heart, Zap, Clock, Star, Laptop, Coffee, User, MessageCircle } from 'lucide-react';
import { useState } from 'react';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State for form fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [expectations, setExpectations] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleRegisterClick = () => {
    setShowForm(true);
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!fullName) newErrors.name = 'Name is required.';
    if (!email) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid.';
    }
    if (!contactNumber) {
      newErrors.contact = 'Contact number is required.';
    } else if (!/^\d{10}$/.test(contactNumber)) {
      newErrors.contact = 'Contact number must be 10 digits.';
    }
    return newErrors;
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    // ⚠️ IMPORTANT: MAKE SURE THIS IS YOUR LATEST WEB APP URL
    // If you redeployed the script, you must paste the NEW URL here.
    const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbydH8pDWb-OJm3F3ZFdZ0kJxR0-gPSfNJKq_Aq83zeA0JSFRyJ1bpqRWTnbTRJYVNrF/exec';
    const registrationId = `REG-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    const payload = {
      fullName,
      email,
      contactNumber,
      registrationId,
      expectations,
      notes,
      paymentStatus: 'Free / Invite Only',
    };

    try {
      // Using 'no-cors' mode to bypass browser security checks for the demo
      await fetch(googleScriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload),
      });

      // Because of 'no-cors', we assume success if the fetch doesn't crash
      setShowForm(false);
      setShowSuccess(true);

      // Clear form fields
      setFullName('');
      setEmail('');
      setContactNumber('');
      setExpectations('');
      setNotes('');

    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5F5] via-[#FFF9F0] to-[#F0F7FF] relative overflow-hidden font-sans">
      {/* Doodle Emojis */}
      <div className="absolute top-20 left-10 text-5xl transform -rotate-12 animate-float">🍵</div>
      <div className="absolute top-20 right-10 text-5xl transform rotate-12 animate-float-delayed">✨</div>
      <div className="absolute bottom-20 left-10 text-5xl transform rotate-12 animate-bounce-slow">🚀</div>
      <div className="absolute bottom-20 right-10 text-5xl transform -rotate-12 animate-bounce-slow-delayed">💡</div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-pink-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-orange-100/20 rounded-full blur-3xl"></div>
      </div>

      <div className="absolute top-10 left-10 animate-float">
        <Sparkles className="text-pink-300" size={24} />
      </div>
      <div className="absolute top-40 right-20 animate-float-delayed">
        <Star className="text-blue-300" size={20} />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white/80 backdrop-blur-sm rounded-[3rem] shadow-2xl shadow-pink-200/50 p-8 md:p-12 border-4 border-pink-100/50">
          
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="bg-pink-100 text-pink-600 px-4 py-1 rounded-full text-sm font-bold tracking-wide uppercase">
              Hosted by Simran & Pranjali
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-center mb-4 text-gray-800 leading-tight tracking-tight" style={{ fontFamily: '"Comic Sans MS", cursive' }}>
            Stop Scrolling.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-500">Start Building.</span>
          </h1>

          <p className="text-xl md:text-2xl text-center text-gray-600 mb-8 font-medium italic">
            "Chill, Connect, and Dream Beyond Limits"
          </p>

          <div className="text-center my-8">
            <p className="text-2xl font-bold text-gray-700">
              🗓️ This Saturday, 4:00 PM
            </p>
          </div>

          <div className="bg-gradient-to-br from-pink-50 to-blue-50 rounded-3xl p-6 md:p-8 mb-8 border-2 border-pink-200/50 relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <Zap className="text-yellow-400" size={24} fill="currentColor" />
            </div>
            <p className="text-gray-700 text-lg leading-relaxed mb-6 font-medium text-center">
              A 0% <span className="text-pink-600 font-bold">boring lecture</span>, 100% <span className="text-blue-600 font-bold">vibes</span> hangout. <br/>
              We'll talk AI, content, and building your 1% circle.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-start gap-3 bg-white/70 rounded-2xl p-4">
                <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <User className="text-pink-500" size={20} />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 mb-1">For Who?</p>
                  <p className="text-gray-600">Students & Dreamers</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white/70 rounded-2xl p-4">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="text-blue-500" size={20} />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 mb-1">The Vibe</p>
                  <p className="text-gray-600">Casual Chat + AI Secrets</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white/70 rounded-2xl p-4">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Coffee className="text-purple-500" size={20} />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 mb-1">Spots</p>
                  <p className="text-gray-600">Limited to 30 (Cozy vibe)</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white/70 rounded-2xl p-4">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="text-orange-500" size={20} />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 mb-1">Duration</p>
                  <p className="text-gray-600">45 mins (Short & Sweet)</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 border-2 border-dashed border-green-300 text-center transform rotate-1 hover:rotate-0 transition-transform">
              <p className="text-3xl font-black text-green-500 mb-1">₹0</p>
              <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">No Money. Just Good Vibes.</p>
            </div>
          </div>

          <button
            onClick={handleRegisterClick}
            className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white font-bold text-xl py-5 rounded-full hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 border-4 border-gray-200 relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              JOIN THE SQUAD
              <Laptop className="group-hover:rotate-12 transition-transform" size={20} />
            </span>
          </button>

          {showForm && (
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl animate-in fade-in zoom-in duration-300" style={{ fontFamily: '"Comic Sans MS", cursive' }}>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Let's get you in! ✨</h2>
                  <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">✕</button>
                </div>
                
                <form onSubmit={handleFormSubmit}>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2 font-bold">Name</label>
                    <input type="text" className="w-full p-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-pink-300 focus:outline-none transition-colors" placeholder="What should we call you?" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2 font-bold">WhatsApp Number</label>
                    <input type="text" className="w-full p-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-pink-300 focus:outline-none transition-colors" placeholder="So we can send the link!" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} required />
                    {errors.contact && <p className="mt-1 text-sm text-red-500">{errors.contact}</p>}
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2 font-bold">Email</label>
                    <input type="email" className="w-full p-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-pink-300 focus:outline-none transition-colors" placeholder="For the invite" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 mb-2 font-bold">Vibe Check (Optional)</label>
                    <textarea className="w-full p-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-pink-300 focus:outline-none transition-colors" placeholder="What are you excited to build?" value={expectations} onChange={(e) => setExpectations(e.target.value)}></textarea>
                  </div>
                  
                  <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-200" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving your spot...' : 'Secure My Seat 🎟️'}
                  </button>
                </form>
              </div>
            </div>
          )}

          {showSuccess && (
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl animate-in fade-in zoom-in duration-300" style={{ fontFamily: '"Comic Sans MS", cursive' }}>
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="text-green-500" size={40} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">You're in! 🥳</h3>
                <p className="text-gray-600 mb-6">Check your email right now! We just sent you the confirmation.<br/>Can't wait to see you there!</p>
                <button onClick={() => setShowSuccess(false)} className="w-full bg-gray-900 text-white font-bold py-3 px-4 rounded-xl">Let's Gooo!</button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default App;