import React from 'react';
import { ArrowLeft, Target, Eye, Heart, Users, Award, Globe, Zap } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface AboutPageProps {
  onNavigateHome: () => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onNavigateHome }) => {
  const teamMembers = [
    {
      name: "Alex Thompson",
      position: "CEO & Founder",
      bio: "Visionary leader with 12+ years in tech. Former Google engineer passionate about transforming businesses through innovative web solutions.",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
      expertise: ["Strategic Planning", "Product Vision", "Team Leadership"]
    },
    {
      name: "Sarah Chen",
      position: "Lead Designer",
      bio: "Award-winning UX/UI designer with expertise in creating beautiful, user-centered experiences that drive engagement and conversions.",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
      expertise: ["UI/UX Design", "Design Systems", "User Research"]
    },
    {
      name: "Michael Rodriguez",
      position: "Senior Developer",
      bio: "Full-stack developer and React specialist. Open-source contributor with a passion for clean code and scalable architectures.",
      image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=400",
      expertise: ["React/Node.js", "System Architecture", "Performance Optimization"]
    },
    {
      name: "Emily Johnson",
      position: "Digital Strategist",
      bio: "SEO expert and digital marketing strategist helping businesses achieve maximum online visibility and growth through data-driven strategies.",
      image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400",
      expertise: ["SEO Strategy", "Digital Marketing", "Analytics"]
    }
  ];

  const services = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Web Development",
      description: "Custom websites and web applications built with modern technologies for optimal performance and user experience."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "UI/UX Design",
      description: "User-centered design solutions that create intuitive, engaging experiences that convert visitors into customers."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "E-commerce Solutions",
      description: "Complete online store development with secure payment processing, inventory management, and analytics."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "SEO & Digital Marketing",
      description: "Comprehensive digital marketing strategies to improve your online visibility and drive qualified traffic."
    }
  ];

  const values = [
    {
      icon: <Heart className="w-12 h-12 text-cyan-400" />,
      title: "Client-Centric Approach",
      description: "We put our clients at the center of everything we do, ensuring their success is our primary focus."
    },
    {
      icon: <Award className="w-12 h-12 text-cyan-400" />,
      title: "Excellence in Execution",
      description: "We maintain the highest standards in every project, delivering solutions that exceed expectations."
    },
    {
      icon: <Users className="w-12 h-12 text-cyan-400" />,
      title: "Collaborative Partnership",
      description: "We work as an extension of your team, fostering open communication and shared success."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-gray-900 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={onNavigateHome}
            className="flex items-center text-cyan-400 hover:text-cyan-300 mb-8 transition-colors duration-200"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </button>
          
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About
              <span className="text-cyan-400 block">Allbyte Digital</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We're a passionate team of designers, developers, and strategists dedicated to transforming businesses through innovative digital solutions.
            </p>
          </div>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Mission */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-6">
                <div className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center mr-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                To empower businesses of all sizes with cutting-edge digital solutions that drive growth, 
                enhance user experiences, and create lasting competitive advantages in the digital marketplace. 
                We believe every business deserves a powerful online presence that truly represents their brand and values.
              </p>
            </div>

            {/* Vision */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-6">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                To be the leading digital agency that bridges the gap between innovative technology and business success. 
                We envision a future where every business, regardless of size, has access to world-class digital solutions 
                that help them thrive in an increasingly connected world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex justify-center mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What We Offer</h2>
            <p className="text-xl text-gray-600">Comprehensive digital solutions tailored to your business needs</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="text-cyan-500 mb-6 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">The talented individuals behind our success</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-cyan-600 font-semibold mb-3">{member.position}</p>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{member.bio}</p>
                  
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Expertise</p>
                    <div className="flex flex-wrap gap-1">
                      {member.expertise.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-slate-900 via-slate-800 to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Work With Us?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Let's discuss how we can help transform your business with innovative digital solutions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-200">
              Start Your Project
            </button>
            <button 
              onClick={onNavigateHome}
              className="border-2 border-white/20 hover:border-cyan-400 text-white hover:text-cyan-400 font-semibold px-8 py-4 rounded-lg transition-all duration-200"
            >
              Back to Home
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;