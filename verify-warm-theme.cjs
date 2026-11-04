const fs=require('node:fs'),p=require('node:path');
const walk=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(p.join(d,e.name)):[p.join(d,e.name)]);
const pages=walk('dist').filter(f=>f.endsWith('.html'));
for(const f of pages){const h=fs.readFileSync(f,'utf8');for(const s of ['/assets/warm-theme.css','/assets/elvaro-logo.png','/favicon-96.png'])if(!h.includes(s)||!fs.existsSync('dist'+s))throw Error(f+': '+s);for(const m of h.matchAll(/(?:src|href)="(\/[^"?#]+)(?:[?#][^"]*)?"/g))if(!fs.existsSync('dist'+m[1]))throw Error('Missing '+m[1]);}
const h=fs.readFileSync('dist/index.html','utf8');if(!h.includes('ELVARO lighting showroom')||!h.includes('application/ld+json'))throw Error('Missing homepage changes');
console.log(pages.length+' pages: branding, warm theme, favicon and local resources verified.');
