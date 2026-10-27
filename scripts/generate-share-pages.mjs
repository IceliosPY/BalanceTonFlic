import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const siteUrl = new URL('https://iceliospy.github.io/BalanceTonFlic/');
const incidents = JSON.parse(await readFile('public/data/incidents.json', 'utf8'));
const outputRoot = 'public/v';

await rm(outputRoot, { recursive: true, force: true });

for (const incident of incidents) {
  if (!/^[a-z0-9_-]+$/i.test(incident.id)) throw new Error(`Invalid video code: ${incident.id}`);

  const shareUrl = new URL(`v/${encodeURIComponent(incident.id)}/`, siteUrl).href;
  const redirectUrl = new URL(siteUrl);
  redirectUrl.searchParams.set('v', incident.id);

  const title = escapeHtml(incident.title);
  const description = escapeHtml(`${incident.date} · ${incident.city}, ${incident.country}`);
  const imageUrl = new URL(incident.thumbnailUrl, siteUrl).href;
  const videoUrl = new URL(incident.videoUrl, siteUrl).href;
  const destination = join(outputRoot, incident.id);

  await mkdir(destination, { recursive: true });
  await writeFile(join(destination, 'index.html'), `<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title} — Balance ton flic</title>
  <meta name="description" content="${description}">
  <meta name="theme-color" content="#e10600">
  <link rel="canonical" href="${shareUrl}">
  <meta property="og:locale" content="fr_FR">
  <meta property="og:type" content="video.other">
  <meta property="og:site_name" content="Balance ton flic">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${shareUrl}">
  <meta property="og:image" content="${imageUrl}">
  <meta property="og:image:secure_url" content="${imageUrl}">
  <meta property="og:image:type" content="image/jpeg">
  <meta property="og:video" content="${videoUrl}">
  <meta property="og:video:url" content="${videoUrl}">
  <meta property="og:video:secure_url" content="${videoUrl}">
  <meta property="og:video:type" content="video/mp4">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${imageUrl}">
</head>
<body>
  <p><a href="${redirectUrl.href}">Voir la vidéo sur Balance ton flic</a></p>
  <script>window.location.replace(${JSON.stringify(redirectUrl.href)});</script>
</body>
</html>
`, 'utf8');
}

console.log(`${incidents.length} share pages generated.`);

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[character]);
}
