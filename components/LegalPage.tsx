import React, { useEffect } from 'react';

interface LegalPageProps {
  title: string;
  content: string;
}

const LegalPage: React.FC<LegalPageProps> = ({ title, content }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const renderMarkdownContent = (markdown: string) => {
    const lines = markdown.split('\n');
    const elements: React.ReactNode[] = [];
    let key = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.startsWith('## ')) {
        elements.push(<h2 key={key++} className="text-3xl lg:text-4xl font-bold text-koda-black mt-16 mb-6 leading-tight">{line.substring(3)}</h2>);
      } else if (line.startsWith('### ')) {
        elements.push(<h3 key={key++} className="text-2xl lg:text-3xl font-bold text-koda-black mt-12 mb-4">{line.substring(4)}</h3>);
      } else if (line.startsWith('**') && line.endsWith('**')) {
        elements.push(<p key={key++} className="text-xl font-bold text-koda-black mt-6 mb-3">{line.replace(/\*\*/g, '')}</p>);
      } else if (line.startsWith('- ')) {
        const parts = line.substring(2).split(/(\*\*[^*]+\*\*)/);
        const processedParts = parts.map((part, idx) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={idx}>{part.replace(/\*\*/g, '')}</strong>;
          }
          return <span key={idx}>{part}</span>;
        });
        elements.push(<li key={key++} className="text-lg lg:text-xl text-gray-700 leading-relaxed mb-3 ml-6">{processedParts}</li>);
      } else if (line.trim() === '') {
        elements.push(<div key={key++} className="h-4"></div>);
      } else if (line.length > 0) {
        const parts = line.split(/(\*\*[^*]+\*\*)/);
        const processedParts = parts.map((part, idx) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={idx}>{part.replace(/\*\*/g, '')}</strong>;
          }
          return <span key={idx}>{part}</span>;
        });
        elements.push(<p key={key++} className="text-lg lg:text-xl text-gray-700 leading-relaxed mb-6 font-medium">{processedParts}</p>);
      }
    }

    return elements;
  };

  return (
    <div className="pt-16 min-h-screen bg-white font-sans">
      {/* Breadcrumb */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
            <a href="#" className="hover:text-koda-blue transition-colors">Home</a>
            <span>/</span>
            <span className="text-koda-black">{title}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 lg:px-8 py-12 lg:py-20">
        <h1 className="text-4xl lg:text-6xl font-normal text-koda-black mb-12 leading-[1.1] tracking-tight">
          {title}
        </h1>

        <div className="prose prose-lg max-w-none">
          {renderMarkdownContent(content)}
        </div>
      </article>
    </div>
  );
};

export default LegalPage;
