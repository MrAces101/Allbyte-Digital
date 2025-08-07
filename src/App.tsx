import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import TransformBusiness from './components/TransformBusiness';
import Statistics from './components/Statistics';
import BlogPosts from './components/BlogPosts';
import Testimonials from './components/Testimonials';
import ServicePackages from './components/ServicePackages';
import ProblemSolution from './components/ProblemSolution';
import Footer from './components/Footer';
import PortfolioPage from './pages/PortfolioPage';
import ArticlePage from './pages/ArticlePage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import SuccessPage from './pages/SuccessPage';

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

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    setCurrentPage('home');
    setSelectedArticle(null);
    scrollToTop();
  };

  const navigateToAbout = () => {
    setCurrentPage('about');
    setSelectedArticle(null);
    scrollToTop();
  };

  const navigateToPortfolio = () => {
    setCurrentPage('portfolio');
    setSelectedArticle(null);
    scrollToTop();
  };

  const navigateToLogin = () => {
    setCurrentPage('login');
    setSelectedArticle(null);
    scrollToTop();
  };

  const navigateToSuccess = () => {
    setCurrentPage('success');
    setSelectedArticle(null);
    scrollToTop();
  };

  const navigateToArticle = (article: Article) => {
    setSelectedArticle(article);
    setCurrentPage('article');
    scrollToTop();
  };

  // Handle URL-based navigation
  React.useEffect(() => {
    const path = window.location.pathname;
    if (path === '/login') {
      setCurrentPage('login');
    } else if (path === '/success') {
      setCurrentPage('success');
    }
  }, []);

  // Smooth scrolling for navigation links
  React.useEffect(() => {
    const handleSmoothScroll = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.hash) {
        e.preventDefault();
        
        // Check if it's an about link
        if (target.hash === '#about') {
          navigateToAbout();
          return;
        }
        
        // Check if it's a portfolio link
        if (target.hash === '#portfolio') {
          navigateToPortfolio();
          return;
        }
        
        // Handle home navigation
        if (target.hash === '#home') {
          navigateToHome();
          return;
        }
        
        // For other sections, scroll to them if on home page
        if (currentPage === 'home') {
          const element = document.querySelector(target.hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        } else {
          // If not on home page, go to home first then scroll
          navigateToHome();
          setTimeout(() => {
            const element = document.querySelector(target.hash);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 100);
        }
      }
      
      // Handle login link
      if (target.getAttribute('href') === '/login') {
        e.preventDefault();
        navigateToLogin();
      }
    };

    const links = document.querySelectorAll('a[href^="#"], a[href="/login"]');
    links.forEach(link => {
      link.addEventListener('click', handleSmoothScroll);
    });

    return () => {
      links.forEach(link => {
        link.removeEventListener('click', handleSmoothScroll);
      });
    };
  }, [currentPage]);

  // Scroll to top whenever the page changes
  React.useEffect(() => {
    scrollToTop();
  }, [currentPage]);

  // Render login page
  if (currentPage === 'login') {
    return <LoginPage onNavigateHome={navigateToHome} />;
  }

  // Render success page
  if (currentPage === 'success') {
    return <SuccessPage onNavigateHome={navigateToHome} />;
  }

  // Render about page
  if (currentPage === 'about') {
    return <AboutPage onNavigateHome={navigateToHome} />;
  }

  // Render article page
  if (currentPage === 'article' && selectedArticle) {
    return <ArticlePage article={selectedArticle} onNavigateHome={navigateToHome} />;
  }

  // Render portfolio page
  if (currentPage === 'portfolio') {
    return <PortfolioPage onNavigateHome={navigateToHome} />;
  }

  // Render home page
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <TransformBusiness />
      <Statistics />
      <BlogPosts onArticleSelect={navigateToArticle} />
      <Testimonials />
      <ServicePackages />
      <ProblemSolution />
      <Footer />
    </div>
  );
}

export default App;