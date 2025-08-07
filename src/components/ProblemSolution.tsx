import React from 'react';
import { ArrowRight } from 'lucide-react';

const ProblemSolution = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Tech Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Digital transformation background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-gray-900/90 to-slate-800/95"></div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 z-10">
        <div className="absolute top-10 left-10 w-32 h-32 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-cyan-400/30 rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-blue-400/20 rounded-full"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Stop Losing Customers to
          <span className="text-cyan-400 block">Outdated Websites</span>
        </h2>
        
        <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
          Every day you wait is another day your competitors are getting ahead. 
          Your website should be your best salesperson, working 24/7 to grow your business.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button className="bg-cyan-400 hover:bg-cyan-500 text-black font-semibold px-8 py-4 rounded-lg transition-all duration-200 flex items-center justify-center group">
            Get Your Free Consultation
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-200" size={20} />
          </button>
          
          <button className="border-2 border-white/20 hover:border-cyan-400 text-white hover:text-cyan-400 font-semibold px-8 py-4 rounded-lg transition-all duration-200">
            View Our Portfolio
          </button>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-400">
          <span>✓ No upfront payment required</span>
          <span>✓ 30-day money-back guarantee</span>
          <span>✓ Free ongoing support</span>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;