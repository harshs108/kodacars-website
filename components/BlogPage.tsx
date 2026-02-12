import React, { useState, useMemo } from 'react';
import { Search, Calendar, Clock, ArrowRight, Tag, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { blogPosts, getAllCategories, getAllTags } from '../data/blogData';

const BlogPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  // Newsletter form state
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const categories = ['All', ...getAllCategories()];
  const allTags = getAllTags();

  const filteredBlogs = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch = 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const matchesTag = !selectedTag || post.tags.includes(selectedTag);

      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [searchQuery, selectedCategory, selectedTag]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const handleBlogClick = (slug: string) => {
    console.log('Navigating to blog post with slug:', slug);
    console.log('Setting hash to:', `#blog/${slug}`);
    window.location.hash = `#blog/${slug}`;
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setSubmitStatus('error');
      setErrorMessage('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Create form data
      const formData = new FormData();
      formData.append('access_key', '5d728ed2-e7fa-4fa4-99f4-ee9aa09bdb5a'); // Your Web3Forms key
      formData.append('subject', 'New Newsletter Subscription - KodaCars Blog');
      formData.append('from_name', 'KodaCars Blog Newsletter');
      formData.append('email', email);
      formData.append('to_email', 'sales@kodacars.com');
      formData.append('message', `New newsletter subscription from: ${email}\n\nSource: Blog Page\nTimestamp: ${new Date().toLocaleString()}`);

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        setEmail('');
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 5000);
      } else {
        setSubmitStatus('error');
        setErrorMessage('Subscription failed. Please try again.');
      }
    } catch (error) {
      console.error('Newsletter submission error:', error);
      setSubmitStatus('error');
      setErrorMessage('Network error. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-white font-sans">
      {/* Hero Section */}
      <div className="bg-koda-purple text-white py-4 lg:py-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 lg:px-16 relative z-10">
          <div className="w-12 h-1.5 bg-koda-green mb-8"></div>
          <h1 className="text-5xl lg:text-7xl font-normal mb-6 leading-tight tracking-tight">
            Industry <span className="font-bold">Insights</span>
          </h1>
          <p className="text-xl lg:text-2xl text-white/90 max-w-3xl font-medium leading-relaxed">
            Expert insights, data-driven strategies, and best practices for maximizing your airport parking revenue.
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="border-b border-gray-200 bg-white sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 lg:px-16 py-4">
          <div className="mb-3">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-2.5 border-2 border-gray-200 focus:border-koda-blue outline-none text-base font-medium"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setSelectedTag(null);
                }}
                className={`px-6 py-3 font-bold text-sm uppercase tracking-widest transition-all ${
                  selectedCategory === category ? 'bg-koda-blue text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">
            {filteredBlogs.length} {filteredBlogs.length === 1 ? 'Article' : 'Articles'}
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-4 lg:px-16 py-16">
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-600 text-lg">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((post) => (
              <article
                key={post.id}
                onClick={() => handleBlogClick(post.slug)}
                className="group cursor-pointer bg-white border border-gray-200 hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative overflow-hidden h-64">
                  <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-koda-blue text-white px-4 py-2 text-xs font-bold uppercase tracking-widest">
                      {post.category}
                    </span>
                  </div>
                  {post.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-koda-green text-white px-3 py-1 text-xs font-bold uppercase">Featured</span>
                    </div>
                  )}
                </div>

                <div className="p-8">
                  <div className="flex items-center gap-4 mb-4 text-xs font-bold uppercase tracking-widest text-gray-500">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      {formatDate(post.publishDate)}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={14} />
                      {post.readingTime} min
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-koda-black mb-4 leading-tight group-hover:text-koda-blue transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-gray-600 text-base leading-relaxed mb-6 font-medium">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
                    <img src={post.author.avatar} alt={post.author.name} className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <div className="font-bold text-sm text-koda-black">{post.author.name}</div>
                      <div className="text-xs text-gray-500 font-medium">{post.author.role}</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {post.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-xs font-bold uppercase tracking-widest text-koda-purple bg-purple-50 px-3 py-1">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-koda-blue font-bold text-sm uppercase tracking-widest group-hover:gap-4 transition-all">
                    Read Full Article <ArrowRight size={16} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Newsletter CTA */}
      <div className="bg-gray-50 border-t border-gray-200 py-20">
        <div className="max-w-4xl mx-auto px-4 lg:px-16 text-center">
          <div className="w-12 h-1.5 bg-koda-green mb-8 mx-auto"></div>
          <h2 className="text-4xl lg:text-5xl font-normal mb-6 text-koda-black">
            Never Miss an <span className="font-bold">Insight</span>
          </h2>
          <p className="text-xl text-gray-700 mb-10 font-medium leading-relaxed">
            Get the latest industry insights and revenue optimization strategies delivered to your inbox.
          </p>

          {submitStatus === 'success' ? (
            /* Success State */
            <div className="max-w-2xl mx-auto bg-green-50 border-2 border-green-500 p-8 rounded">
              <div className="flex items-center justify-center gap-3 mb-4">
                <CheckCircle size={32} className="text-green-600" />
                <h3 className="text-2xl font-bold text-green-900">Subscribed Successfully!</h3>
              </div>
              <p className="text-green-800 text-lg font-medium mb-4">
                Thank you for subscribing to our newsletter. You'll receive the latest parking industry insights directly to your inbox.
              </p>
              <button
                onClick={() => {
                  setSubmitStatus('idle');
                  setEmail('');
                }}
                className="text-green-700 font-bold hover:text-green-900 transition-colors"
              >
                Subscribe another email →
              </button>
            </div>
          ) : (
            /* Form State */
            <form onSubmit={handleNewsletterSubmit} className="max-w-2xl mx-auto">
              {submitStatus === 'error' && (
                <div className="mb-6 bg-red-50 border-2 border-red-500 p-4 rounded flex items-center gap-3">
                  <AlertCircle size={24} className="text-red-600 flex-shrink-0" />
                  <p className="text-red-800 font-medium text-left">
                    {errorMessage || 'Something went wrong. Please try again.'}
                  </p>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  required
                  className="flex-1 px-6 py-4 border-2 border-gray-200 focus:border-koda-blue outline-none text-lg font-medium disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-koda-blue text-white px-8 py-4 font-bold text-lg hover:bg-koda-darkblue transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Subscribing...
                    </>
                  ) : (
                    'Subscribe'
                  )}
                </button>
              </div>
              
              <p className="text-sm text-gray-500 mt-4 font-medium">
                Join 2,500+ parking operators receiving monthly insights. Unsubscribe anytime.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;