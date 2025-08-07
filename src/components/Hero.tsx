import React from 'react';
import { ArrowRight, Play } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="pt-20 pb-16 relative min-h-screen flex items-center overflow-hidden">
      {/* Tech Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Technology background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-gray-900/90 to-slate-800/95"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              We Build
              <span className="text-cyan-400 block">Stunning Websites</span>
              That Convert
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Transform your digital presence with our cutting-edge web development solutions. 
              We create beautiful, high-performing websites that drive results for your business.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button className="bg-cyan-400 hover:bg-cyan-500 text-black font-semibold px-8 py-4 rounded-lg transition-all duration-200 flex items-center justify-center group">
                Start Your Project
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-200" size={20} />
              </button>
              
              <button className="border-2 border-white/20 hover:border-cyan-400 text-white hover:text-cyan-400 font-semibold px-8 py-4 rounded-lg transition-all duration-200 flex items-center justify-center group">
                <Play className="mr-2 group-hover:scale-110 transition-transform duration-200" size={20} />
                Watch Our Work
              </button>
            </div>
          </div>

          {/* Right Content - Professional Avatar */}
          <div className="relative">
            <div className="relative z-10">
              <div className="w-80 h-80 mx-auto bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-cyan-400/30">
                <div className="w-64 h-64 bg-gradient-to-br from-slate-600 to-slate-800 rounded-full flex items-center justify-center text-6xl text-cyan-400 font-bold">
                  AD
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute top-10 right-10 w-16 h-16 bg-cyan-400/20 rounded-lg backdrop-blur-sm border border-cyan-400/30 flex items-center justify-center">
              <span className="text-cyan-400 font-bold">+5</span>
            </div>
            
            <div className="absolute bottom-10 left-10 w-20 h-12 bg-blue-600/30 rounded-lg backdrop-blur-sm border border-blue-400/30 flex items-center justify-center">
              <span className="text-blue-300 text-sm font-semibold">React</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;