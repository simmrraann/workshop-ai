import { Sparkles, BookOpen, Heart, Zap, Clock, CheckSquare, StickyNote, Star } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5F5] via-[#FFF9F0] to-[#F0F7FF] relative overflow-hidden">
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
      <div className="absolute bottom-40 left-20 animate-float">
        <Heart className="text-pink-300" size={18} />
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

          <h1 className="text-5xl md:text-7xl font-bold text-center mb-4 text-gray-800 leading-tight" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
            🎀 Leverage AI for<br />
            <span className="text-pink-500">Smarter Study</span>
          </h1>

          <p className="text-xl md:text-2xl text-center text-gray-600 mb-8 font-medium" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
            A fun + practical mini-workshop for students
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
                  <p className="text-gray-600">Practical workflows + live demos</p>
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

          <button className="w-full bg-gradient-to-r from-blue-400 to-blue-500 text-white font-bold text-xl py-5 rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300 border-4 border-blue-200 hover:border-blue-300 relative overflow-hidden group">
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
    </div>
  );
}

export default App;
