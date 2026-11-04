const fs = require('node:fs');
const path = require('node:path');

const links = {
  Facebook: 'https://www.facebook.com/profile.php?id=61596047974931',
  Instagram: 'https://www.instagram.com/elvarolighting/',
  YouTube: 'https://www.youtube.com/@elvarolighting',
  Pinterest: 'https://www.pinterest.com/sualice462/'
};
const root = path.join(__dirname, 'dist');
const walk = dir => fs.readdirSync(dir, {withFileTypes:true}).flatMap(entry =>
  entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)]);
let changed = 0;
for (const file of walk(root).filter(file => file.endsWith('.html'))) {
  const original = fs.readFileSync(file, 'utf8');
  const updated = original.replace(/<div class="socials"[\s\S]*?(?=<\/footer>)/g, footer => {
    for (const [name, url] of Object.entries(links)) {
      const placeholder = new RegExp('<button disabled aria-label="'+name+' — account link pending"[^>]*>([\\s\\S]*?)</button>', 'g');
      footer = footer.replace(placeholder, (_, icon) =>
        '<a href="'+url+'" target="_blank" rel="noopener noreferrer" aria-label="ELVARO Lighting on '+name+' (opens in a new tab)" title="'+name+'">'+icon+'</a>');
    }
    return footer;
  });
  if (original !== updated) { fs.writeFileSync(file, updated); changed++; }
  const social = updated.match(/<div class="socials"[\s\S]*?(?=<\/footer>)/)?.[0];
  if (!social) throw Error('Social footer missing: '+file);
  for (const [name, url] of Object.entries(links)) {
    if (!social.includes('href="'+url+'"') || social.includes(name+' — account link pending')) {
      throw Error(name+' link missing on '+file);
    }
  }
}
console.log(changed+' pages updated; all four supplied social profile links verified in every footer.');
