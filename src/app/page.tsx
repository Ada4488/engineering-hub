import { useEffect, useState } from "react";
import RetroHeader from './components/RetroHeader';

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
    const cat = article.category || 'Uncategorized';
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
    <main className="max-w-4xl mx-auto p-4">
      <RetroHeader />
      <div className="window mt-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
          <h2 className="font-pressStart text-lg">Latest Engineering Articles</h2>
          <div className="flex items-center gap-2">
            <label htmlFor="category" className="font-pressStart text-xs">Category:</label>
            <select
              id="category"
              className="font-pressStart text-xs border-2 border-black bg-[#e0e0e0] px-2 py-1 rounded shadow-inner outline-none focus:ring-2 focus:ring-blue-400"
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
          <div>
            {filteredArticles.length === 0 && (
              <p className="text-sm font-pressStart">No articles found for this category.</p>
            )}
            <ul className="space-y-6">
              {filteredArticles.map(article => (
                <li key={article.link} className="window p-4 bg-[#f8f8f8] border-2 border-black shadow-md">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <a href={article.link} target="_blank" rel="noopener noreferrer" className="font-pressStart text-blue-700 hover:text-blue-900 underline text-base">
                      {article.title}
                    </a>
                    <span className="ml-0 sm:ml-2 text-xs text-gray-500 font-pressStart">{article.blog}</span>
                  </div>
                  <div className="text-xs text-gray-700 mb-2 font-mono">
                    {article.pubDate && (
                      <span>Published: {new Date(article.pubDate).toLocaleDateString()}</span>
                    )}
                  </div>
                  <div className="text-sm mt-1 mb-2 font-mono">
                    {article.contentSnippet || article.content || <span className="italic text-gray-400">No summary available.</span>}
                  </div>
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button font-pressStart text-xs mt-2 inline-block"
                  >
                    Read Full Article
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}
