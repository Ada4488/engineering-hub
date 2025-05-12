export async function categorizeArticle(title?: string, content?: string): Promise<string> {
  const text = `${title || ''} ${content || ''}`.toLowerCase();
  if (/ai|machine learning|artificial intelligence|deep learning|llm|gpt|transformer/.test(text)) {
    return 'AI';
  }
  if (/security|vulnerability|xss|csrf|encryption|auth|jwt|sso|saml|oauth|attack|breach|exploit/.test(text)) {
    return 'Security';
  }
  if (/devops|ci\/cd|infrastructure|kubernetes|docker|terraform|ansible|deployment|monitoring|sre|site reliability/.test(text)) {
    return 'DevOps';
  }
  if (/frontend|backend|api|typescript|javascript|react|vue|angular|node|python|java|go|ruby|php|development|dev|fullstack|web|mobile/.test(text)) {
    return 'Dev';
  }
  return 'Other';
} 