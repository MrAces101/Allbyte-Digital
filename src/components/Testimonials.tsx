import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "TechStart Inc.",
      position: "CEO & Founder",
      content: "Allbyte Digital transformed our online presence completely. The website they built not only looks amazing but also increased our conversion rates by 300%.",
      rating: 5,
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100"
    },
    {
      name: "Michael Chen",
      company: "Growth Marketing Co.",
      position: "Marketing Director",
      content: "Professional, responsive, and incredibly talented. They delivered our project on time and exceeded all expectations. I wouldn't hesitate to work with them again.",
      rating: 5,
      avatar: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=100"
    },
    {
      name: "Emily Rodriguez",
      company: "Boutique Fashion",
      position: "Store Owner",
      content: "The e-commerce platform they built for us is fantastic. Sales have increased by 250% since launch, and our customers love the user experience. Highly recommended!",
      rating: 5,
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-slate-900 via-slate-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-300">
            Don't just take our word for it - hear from our satisfied clients
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8 relative hover:shadow-xl hover:bg-slate-800/70 transition-all duration-300">
              <Quote className="text-cyan-400 mb-4" size={40} />
              
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-current" size={20} />
                ))}
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-white">{testimonial.name}</h4>
                  <p className="text-gray-400 text-sm">{testimonial.position}</p>
                  <p className="text-cyan-400 text-sm font-medium">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;