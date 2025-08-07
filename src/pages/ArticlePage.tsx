import React from 'react';
import { Calendar, ArrowLeft, Share2, BookOpen, Clock } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface Article {
  title: string;
  excerpt: string;
  date: string;
  image: string;
  category: string;
  content: string;
  readTime: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
}

interface ArticlePageProps {
  article: Article;
  onNavigateHome: () => void;
}

const ArticlePage: React.FC<ArticlePageProps> = ({ article, onNavigateHome }) => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-gray-900 pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={onNavigateHome}
            className="flex items-center text-cyan-400 hover:text-cyan-300 mb-8 transition-colors duration-200"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Blog
          </button>
          
          <div className="flex items-center space-x-4 mb-6">
            <span className="bg-cyan-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              {article.category}
            </span>
            <div className="flex items-center text-gray-300 text-sm">
              <Calendar size={16} className="mr-2" />
              {article.date}
            </div>
            <div className="flex items-center text-gray-300 text-sm">
              <Clock size={16} className="mr-2" />
              {article.readTime}
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {article.title}
          </h1>
          
          <p className="text-xl text-gray-300 leading-relaxed">
            {article.excerpt}
          </p>
        </div>
      </div>

      {/* Article Content */}
      <article className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Image */}
          <div className="mb-12">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-96 object-cover rounded-2xl shadow-lg"
            />
          </div>

          {/* Article Body */}
          <div className="prose prose-lg max-w-none">
            <div className="text-gray-700 leading-relaxed space-y-6">
              {article.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-lg leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Author Section */}
          <div className="mt-16 p-8 bg-gray-50 rounded-2xl">
            <div className="flex items-start space-x-4">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  About {article.author.name}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {article.author.bio}
                </p>
              </div>
            </div>
          </div>

          {/* Share Section */}
          <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-8">
            <div className="flex items-center space-x-4">
              <Share2 size={20} className="text-gray-500" />
              <span className="text-gray-600 font-medium">Share this article</span>
            </div>
            <div className="flex space-x-4">
              <button className="text-gray-500 hover:text-cyan-600 transition-colors duration-200">
                Twitter
              </button>
              <button className="text-gray-500 hover:text-cyan-600 transition-colors duration-200">
                LinkedIn
              </button>
              <button className="text-gray-500 hover:text-cyan-600 transition-colors duration-200">
                Facebook
              </button>
            </div>
          </div>

          {/* Back to Blog CTA */}
          <div className="mt-16 text-center bg-gradient-to-r from-slate-900 via-slate-800 to-gray-900 rounded-2xl p-12">
            <BookOpen size={48} className="text-cyan-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-4">
              Explore More Insights
            </h2>
            <p className="text-gray-300 mb-8 text-lg">
              Discover more articles about web development, design, and digital strategy
            </p>
            <button 
              onClick={onNavigateHome}
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-200 inline-flex items-center"
            >
              <ArrowLeft className="mr-2" size={20} />
              Back to All Articles
            </button>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default ArticlePage;