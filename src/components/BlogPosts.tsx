import React from 'react';
import { Calendar, ArrowRight, Clock } from 'lucide-react';

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

interface BlogPostsProps {
  onArticleSelect: (article: Article) => void;
}

const BlogPosts: React.FC<BlogPostsProps> = ({ onArticleSelect }) => {
  const posts: Article[] = [
    {
      title: "10 Essential Web Design Trends for 2024",
      excerpt: "Discover the latest design trends that will shape the web in 2024 and beyond.",
      date: "March 15, 2024",
      image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Design",
      readTime: "8 min read",
      content: `The web design landscape is constantly evolving, and 2024 brings exciting new trends that will reshape how we create digital experiences. From AI-powered design tools to immersive 3D elements, this year promises to be transformative for web designers and developers alike.

One of the most significant trends we're seeing is the rise of AI-assisted design workflows. Tools like Figma's AI plugins and Adobe's Sensei are enabling designers to work faster and more efficiently than ever before. These tools can generate color palettes, suggest layouts, and even create entire design systems based on simple prompts.

Another major trend is the integration of 3D elements and immersive experiences. With WebGL and Three.js becoming more accessible, we're seeing websites that blur the line between web pages and interactive applications. These experiences create memorable interactions that keep users engaged and coming back for more.

Sustainability in web design is also gaining traction. Designers are increasingly conscious of their environmental impact, optimizing for performance and reducing energy consumption. This includes using efficient code, optimizing images, and choosing green hosting providers.

The future of web design is bright, with new technologies and approaches emerging constantly. By staying informed about these trends and experimenting with new tools and techniques, designers can create experiences that are not only beautiful but also functional, accessible, and sustainable.`,
      author: {
        name: "Sarah Chen",
        avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100",
        bio: "Sarah is a senior UX/UI designer with over 8 years of experience creating digital experiences for Fortune 500 companies. She specializes in design systems and user research."
      }
    },
    {
      title: "The Complete Guide to React Performance",
      excerpt: "Learn how to optimize your React applications for maximum performance and user experience.",
      date: "March 12, 2024",
      image: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Development",
      readTime: "12 min read",
      content: `React performance optimization is crucial for creating fast, responsive applications that provide excellent user experiences. In this comprehensive guide, we'll explore the most effective techniques for optimizing React applications, from basic principles to advanced strategies.

The foundation of React performance lies in understanding how React works under the hood. React uses a virtual DOM to efficiently update the real DOM, but even this process can be optimized. One of the most important concepts to understand is React's reconciliation algorithm and how it determines what needs to be updated.

Memoization is one of the most powerful tools in your React performance toolkit. React.memo, useMemo, and useCallback can prevent unnecessary re-renders and expensive calculations. However, it's important to use these tools judiciously – overusing memoization can actually hurt performance in some cases.

Code splitting is another essential technique for improving React performance. By splitting your application into smaller chunks and loading them on demand, you can significantly reduce initial bundle sizes and improve loading times. React's lazy loading and Suspense make this easier than ever.

State management also plays a crucial role in React performance. Keeping state as local as possible, avoiding unnecessary state updates, and using efficient state management libraries can all contribute to better performance. Consider using tools like Zustand or Jotai for simpler state management needs.

Finally, don't forget about the basics: optimize your images, minimize bundle sizes, use a CDN, and implement proper caching strategies. These fundamental optimizations often provide the biggest performance gains with the least effort.`,
      author: {
        name: "Michael Rodriguez",
        avatar: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=100",
        bio: "Michael is a full-stack developer and React specialist with 10+ years of experience. He's contributed to several open-source React projects and regularly speaks at tech conferences."
      }
    },
    {
      title: "SEO Best Practices for Modern Websites",
      excerpt: "Master the art of search engine optimization with these proven strategies and techniques.",
      date: "March 10, 2024",
      image: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "SEO",
      readTime: "10 min read",
      content: `Search Engine Optimization (SEO) has evolved significantly over the years, and modern SEO requires a holistic approach that goes beyond just keywords and meta tags. Today's SEO is about creating valuable, user-focused content while ensuring technical excellence.

The foundation of modern SEO starts with understanding user intent. Google's algorithms have become increasingly sophisticated at understanding what users are actually looking for when they search. This means your content needs to genuinely answer user questions and provide value, not just target specific keywords.

Technical SEO is more important than ever. Core Web Vitals, mobile-first indexing, and page speed are all crucial ranking factors. Your website needs to load quickly, be mobile-friendly, and provide a smooth user experience. Tools like Google PageSpeed Insights and Lighthouse can help you identify and fix technical issues.

Content quality and relevance remain paramount. Google's E-A-T (Expertise, Authoritativeness, Trustworthiness) guidelines emphasize the importance of creating content that demonstrates expertise and builds trust with users. This means citing credible sources, having clear author information, and maintaining high editorial standards.

Local SEO has become increasingly important, especially for businesses with physical locations. Optimizing your Google My Business profile, gathering positive reviews, and ensuring consistent NAP (Name, Address, Phone) information across the web can significantly improve local search visibility.

Link building strategies have also evolved. Quality over quantity is the rule – a few high-quality, relevant backlinks are worth more than dozens of low-quality links. Focus on creating content that naturally attracts links and building relationships within your industry.`,
      author: {
        name: "Emily Johnson",
        avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100",
        bio: "Emily is an SEO strategist and digital marketing consultant with 7 years of experience helping businesses improve their online visibility. She specializes in technical SEO and content strategy."
      }
    }
  ];

  return (
    <section id="resources" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Latest Insights
          </h2>
          <p className="text-xl text-gray-600">
            Stay updated with the latest trends and best practices
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <article key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group cursor-pointer">
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 bg-cyan-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {post.category}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between text-gray-500 text-sm mb-3">
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-2" />
                    {post.date}
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className="mr-2" />
                    {post.readTime}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-cyan-600 transition-colors duration-200">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 mb-4">
                  {post.excerpt}
                </p>
                
                <button 
                  onClick={() => onArticleSelect(post)}
                  className="text-cyan-600 font-semibold flex items-center group-hover:text-cyan-700 transition-colors duration-200"
                >
                  Read More
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-slate-700 hover:bg-slate-800 text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-200">
            View All Articles
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogPosts;