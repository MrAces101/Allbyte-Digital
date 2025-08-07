import React from 'react';
import { Rocket, Lightbulb, Target } from 'lucide-react';

const TransformBusiness = () => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Transform Your Business for the
              <span className="text-cyan-500"> Digital Future</span>
            </h2>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              The next 60 days could be the turning point for your business. 
              Don't let outdated technology hold you back from reaching your full potential.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <p className="text-gray-700">Modern, responsive designs that work on all devices</p>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <p className="text-gray-700">Lightning-fast performance with optimized code</p>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <p className="text-gray-700">SEO-optimized for maximum online visibility</p>
              </div>
            </div>

            <button className="bg-slate-700 hover:bg-slate-800 text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-200">
              Learn More
            </button>
          </div>

          {/* Right Content */}
          <div className="relative">
            <div className="bg-gradient-to-br from-slate-700 to-slate-900 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">What can you expect from here?</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-cyan-400 rounded-full flex items-center justify-center">
                    <Target size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">You can launch back to your profitable business</h4>
                    <p className="text-gray-200 text-sm">Get back to focusing on what matters most - growing your business</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-cyan-400 rounded-full flex items-center justify-center">
                    <Lightbulb size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">You can enjoy high-quality services within your budget</h4>
                    <p className="text-gray-200 text-sm">Premium solutions tailored to fit your specific needs and budget</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-cyan-400 rounded-full flex items-center justify-center">
                    <Rocket size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">You'll get any custom features for your website</h4>
                    <p className="text-gray-200 text-sm">Unique functionality designed specifically for your business goals</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransformBusiness;