import React from 'react';
import { ExternalLink, Github, ArrowRight, ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface PortfolioPageProps {
  onNavigateHome: () => void;
}

const PortfolioPage: React.FC<PortfolioPageProps> = ({ onNavigateHome }) => {
  const projects = [
    {
      title: "OmnE-Services DTS",
      description: "A modern, responsive website offering comprehensive services such as visa applications, flight bookings, tax returns, website development, and more. The platform is built using a full-stack JavaScript architecture with React frontend and Express backend, focusing on a clean and professional design.",
      image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600",
      technologies: ["React", "Node.js", "PostgreSQL", "Express.js"],
      category: "Digital Services",
      liveUrl: "#",
      githubUrl: "#",
      results: "Comprehensive service platform"
    },
    {
      title: "HealthCare Management System",
      description: "Comprehensive healthcare management platform with patient records, appointment scheduling, and telemedicine capabilities. Built for scalability and HIPAA compliance.",
      image: "https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=600",
      technologies: ["Next.js", "TypeScript", "MongoDB", "WebRTC"],
      category: "Healthcare",
      liveUrl: "#",
      githubUrl: "#",
      results: "50% reduction in admin workload"
    },
    {
      title: "FinanceTracker Pro",
      description: "Advanced personal finance tracking application with AI-powered insights, budget planning, and investment portfolio management. Features real-time market data integration.",
      image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=600",
      technologies: ["React", "Python", "FastAPI", "Chart.js"],
      category: "Finance",
      liveUrl: "#",
      githubUrl: "#",
      results: "95% user retention rate"
    },
    {
      title: "EduLearn Online Platform",
      description: "Interactive online learning platform with video streaming, progress tracking, and collaborative tools. Supports multiple content formats and assessment types.",
      image: "https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=600",
      technologies: ["Vue.js", "Laravel", "MySQL", "AWS"],
      category: "Education",
      liveUrl: "#",
      githubUrl: "#",
      results: "10,000+ active learners"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header Navigation */}
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
              Our Featured
              <span className="text-cyan-400 block">Projects</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover how we've helped businesses transform their digital presence with cutting-edge solutions that deliver real results
            </p>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {projects.map((project, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group border border-gray-100">
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-cyan-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {project.category}
                  </div>
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {project.results}
                  </div>
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-cyan-600 transition-colors duration-200">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-4">
                      <a
                        href={project.liveUrl}
                        className="flex items-center text-cyan-600 hover:text-cyan-700 font-semibold transition-colors duration-200"
                      >
                        <ExternalLink size={16} className="mr-2" />
                        Live Demo
                      </a>
                      <a
                        href={project.githubUrl}
                        className="flex items-center text-gray-600 hover:text-gray-700 font-semibold transition-colors duration-200"
                      >
                        <Github size={16} className="mr-2" />
                        Code
                      </a>
                    </div>
                    
                    <button className="text-cyan-600 font-semibold flex items-center group-hover:text-cyan-700 transition-colors duration-200">
                      View Details
                      <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-20 bg-gradient-to-r from-slate-900 via-slate-800 to-gray-900 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Start Your Own Success Story?
            </h2>
            <p className="text-gray-300 mb-8 text-lg">
              Let's discuss how we can help transform your business with a custom solution
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-200 flex items-center justify-center">
                Start Your Project
                <ArrowRight className="ml-2" size={20} />
              </button>
              <button 
                onClick={onNavigateHome}
                className="border-2 border-white/20 hover:border-cyan-400 text-white hover:text-cyan-400 font-semibold px-8 py-4 rounded-lg transition-all duration-200"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PortfolioPage;