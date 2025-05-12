import { NextResponse } from 'next/server';
import Parser from 'rss-parser';
import fs from 'fs/promises';
import path from 'path';
import { categorizeArticle } from '@/lib/categorizeArticle';

const BLOGS_PATH = path.join(process.cwd(), 'src/data/blogs.json');
const CACHE_PATH = path.join(process.cwd(), 'src/data/articles.json');

type Blog = {
  name: string;
  url: string;
  rss: string;
};

type Article = {
  title: string;
  link: string;
  pubDate?: string;
  isoDate?: string;
  content?: string;
  contentSnippet?: string;
  blog: string;
  blogUrl: string;
  category: string | null;
};

export async function GET() {
  const parser = new Parser();
  const blogs: Blog[] = JSON.parse(await fs.readFile(BLOGS_PATH, 'utf-8'));
  const articles: Article[] = [];

  await Promise.all(
    blogs.map(async (blog) => {
      try {
        const feed = await parser.parseURL(blog.rss);
        feed.items.forEach(item => {
          articles.push({
            title: item.title || '',
            link: item.link || '',
            pubDate: item.pubDate,
            isoDate: item.isoDate,
            content: item.content,
            contentSnippet: item.contentSnippet,
            blog: blog.name,
            blogUrl: blog.url,
            category: null, // to be filled
          });
        });
      } catch {
        // Ignore failed feeds
      }
    })
  );

  // Categorize articles
  for (const article of articles) {
    article.category = await categorizeArticle();
  }

  // Sort by date
  articles.sort((a, b) => new Date(b.isoDate || b.pubDate || '').getTime() - new Date(a.isoDate || a.pubDate || '').getTime());

  // Cache
  await fs.writeFile(CACHE_PATH, JSON.stringify(articles, null, 2));

  return NextResponse.json({ articles });
} 