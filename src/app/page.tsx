"use client";
import { useEffect, useState } from "react";
import RetroHeader from './components/RetroHeader';
import BootScreen from './components/BootScreen';

interface Article {
  title: string;
  link: string;
  pubDate?: string;
  isoDate?: string;
  content?: string;
  contentSnippet?: string;
  blog: string;
  blogUrl: string;
  category: string | null;
}

interface ArticlesByCategory {
  [category: string]: Article[];
}

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    fetch('/api/fetch-articles')
      .then(res => res.json())
      .then(data => {
        setArticles(data.articles || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load articles.');
        setLoading(false);
      });
  }, []);

  // Group articles by category
  const articlesByCategory: ArticlesByCategory = articles.reduce((acc, article) => {
    const cat = article.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(article);
    return acc;
  }, {} as ArticlesByCategory);

  const categories = ['All', ...Object.keys(articlesByCategory)];

  // Filtered articles
  const filteredArticles = selectedCategory === 'All'
    ? articles
    : articlesByCategory[selectedCategory] || [];

  return (
    <BootScreen>
      <main>
        <RetroHeader />
        <div className="window">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
            <h2 className="header-title text-xl m-0">Latest Engineering Articles</h2>
            <div className="flex items-center gap-2">
              <label htmlFor="category" className="font-pressStart text-xs text-[#FFD700]">Category:</label>
              <select
                id="category"
                className="font-pressStart text-xs"
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
          {loading && <p className="text-sm">Loading articles...</p>}
          {error && <p className="text-sm text-red-600">{error}</p>}
          {!loading && !error && (
            <div className="article-grid">
              {filteredArticles.length === 0 && (
                <p className="text-sm font-pressStart col-span-full">No articles found for this category.</p>
              )}
              {filteredArticles.map(article => (
                <div key={article.link} className="article-card">
                  <a href={article.link} target="_blank" rel="noopener noreferrer" className="article-title block mb-2">
                    {article.title}
                  </a>
                  <div className="article-summary">
                    {article.contentSnippet || article.content || <span className="italic text-gray-400">No summary available.</span>}
                  </div>
                  <div className="article-blog mt-2">{article.blog}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {article.pubDate && (
                      <span>Published: {new Date(article.pubDate).toLocaleDateString()}</span>
                    )}
                  </div>
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button font-pressStart text-xs mt-4 inline-block"
                  >
                    Read Full Article
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </BootScreen>
  );
}
