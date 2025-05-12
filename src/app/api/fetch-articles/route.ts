import { NextResponse } from 'next/server';
import Parser from 'rss-parser';
import fs from 'fs/promises';
import path from 'path';
import { categorizeArticle } from '@/lib/categorizeArticle';

const BLOGS_PATH = path.join(process.cwd(), 'src/data/blogs.json');
const CACHE_PATH = path.join(process.cwd(), 'src/data/articles.json');

export async function GET() {
  const parser = new Parser();
  const blogs = JSON.parse(await fs.readFile(BLOGS_PATH, 'utf-8'));
  let articles: any[] = [];

  await Promise.all(
    blogs.map(async (blog: any) => {
      try {
        const feed = await parser.parseURL(blog.rss);
        feed.items.forEach(item => {
          articles.push({
            ...item,
            blog: blog.name,
            blogUrl: blog.url,
            category: null, // to be filled
          });
        });
      } catch (e) {
        // Ignore failed feeds
      }
    })
  );

  // Categorize articles
  for (const article of articles) {
    article.category = await categorizeArticle(article.title, article.contentSnippet || article.content || '');
  }

  // Sort by date
  articles.sort((a, b) => new Date(b.isoDate || b.pubDate).getTime() - new Date(a.isoDate || a.pubDate).getTime());

  // Cache
  await fs.writeFile(CACHE_PATH, JSON.stringify(articles, null, 2));

  return NextResponse.json({ articles });
} 