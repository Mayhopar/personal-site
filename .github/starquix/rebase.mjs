// Starquix → GitHub Pages: after `astro build`, points root URLs ("/about") at the Pages base path
// ("/repo/about") — a project site lives under /<repo>/ and Starquix sites write root URLs.
// Copied verbatim into the published repo as .github/starquix/rebase.mjs, so: Node built-ins only.
// Rewrites href/src/action/poster/srcset attributes and url() in .css files, <style> blocks and
// style="" attributes — never class="": a Tailwind arbitrary value like bg-[url(/x)] is a selector.
// Usage: node rebase.mjs <dir> <base>   (an empty base — user site or custom domain — is a no-op)
// `built(url)` tells a route that merely shares the repo's name (/blog/post in a repo called "blog") from a URL
// Astro already based (/blog/_astro/x.css): only the former exists as-is in the build output.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

export function rebaseUrl(u, base, built = () => false) {
  if (!base || !u.startsWith('/') || u.startsWith('//')) return u;
  if (u === base || u.startsWith(`${base}/`)) return built(u) ? base + u : u;
  return base + u;
}

export const rebaseCss = (css, base, built) =>
  css.replace(/url\(\s*(['"]?)(\/[^'")\s]*)\1\s*\)/g, (_, q, u) => `url(${q}${rebaseUrl(u, base, built)}${q})`);

// name="value" or name='value' — the value runs to ITS quote (style="url('/x')" holds the other one).
const attr = names => new RegExp(`(\\s(?:${names})=)(["'])((?:(?!\\2)[\\s\\S])*)\\2`, 'gi');

export function rebaseHtml(html, base, built) {
  if (!base) return html;
  return html
    .replace(/(<style\b[^>]*>)([\s\S]*?)(<\/style>)/gi, (_, open, css, close) => open + rebaseCss(css, base, built) + close)
    .replace(attr('href|src|action|poster'), (_, a, q, u) => a + q + rebaseUrl(u, base, built) + q)
    .replace(attr('srcset'), (_, a, q, set) =>
      a + q + set.replace(/(^|,)(\s*)(\/[^\s,]+)/g, (__, c, s, u) => c + s + rebaseUrl(u, base, built)) + q)
    .replace(attr('style'), (_, a, q, css) => a + q + rebaseCss(css, base, built) + q);
}

/** Rewrites every .html/.css under `dir` in place; returns how many files changed. */
export function rebaseDir(dir, base) {
  if (!base) return 0;
  const built = u => { try { return fs.existsSync(path.join(dir, decodeURI(u.split(/[?#]/)[0]))); } catch { return false; } };
  let changed = 0;
  for (const e of fs.readdirSync(dir, { withFileTypes: true, recursive: true })) {
    if (!e.isFile() || !/\.(html|css)$/.test(e.name)) continue;
    const file = path.join(e.parentPath ?? e.path, e.name);
    const text = fs.readFileSync(file, 'utf8');
    const next = e.name.endsWith('.css') ? rebaseCss(text, base, built) : rebaseHtml(text, base, built);
    if (next !== text) { fs.writeFileSync(file, next); changed++; }
  }
  return changed;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const [dir = 'dist', raw = ''] = process.argv.slice(2);
  const base = raw.replace(/\/+$/, '');
  console.log(`Starquix: rebased ${rebaseDir(dir, base)} file(s) under ${base || '/'}`);
}
