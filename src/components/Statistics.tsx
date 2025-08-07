import React from 'react';

const Statistics = () => {
  const stats = [
    { number: '500+', label: 'Happy Clients', color: 'text-cyan-400' },
    { number: '1,200+', label: 'Projects Completed', color: 'text-blue-400' },
    { number: '98%', label: 'Client Satisfaction', color: 'text-slate-400' },
    { number: '5+', label: 'Years Experience', color: 'text-indigo-400' },
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-slate-900 via-slate-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl text-gray-300">
            Our track record speaks for itself
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`text-4xl md:text-5xl font-bold ${stat.color} mb-2`}>
                {stat.number}
              </div>
              <div className="text-gray-300 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;