const fs=require('node:fs'),p=require('node:path');
const root=p.join(__dirname,'dist');
const walk=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(p.join(d,e.name)):[p.join(d,e.name)]);
const asset=p.join(root,'assets/landscape-lighting.svg');
fs.writeFileSync(asset,'<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600"><defs><linearGradient id="bg" x2="1" y2="1"><stop stop-color="#f3e8da"/><stop offset="1" stop-color="#d9c4ad"/></linearGradient><linearGradient id="metal" x2="1"><stop stop-color="#62594c"/><stop offset="1" stop-color="#2c2a24"/></linearGradient></defs><rect width="600" height="600" fill="url(#bg)"/><ellipse cx="300" cy="477" rx="210" ry="20" fill="#66513d" opacity=".12"/><path d="M95 460 Q220 418 370 457 T540 465" fill="none" stroke="#a79a7d" stroke-width="4"/><path d="M145 205 H225 L254 435 H116Z M365 280 H425 L447 452 H343Z" fill="#ffe3a6" opacity=".32"/><path d="M155 210 H215 V445 H155Z M375 285 H415 V455 H375Z" fill="url(#metal)"/><path d="M130 180 H240 V218 H130Z M355 262 H435 V291 H355Z" fill="url(#metal)"/><path d="M140 214 H230 M362 287 H428" stroke="#ffe1a0" stroke-width="9"/><path d="M180 447 H120 L147 425 H223 L250 447Z M361 457 H427" fill="#4c463c"/><path d="M280 445 L299 396 L333 420 L313 468Z" fill="url(#metal)"/><ellipse cx="316" cy="407" rx="20" ry="10" transform="rotate(33 316 407)" fill="#ffe2a0"/></svg>');
// Preserve each illustration's proportions inside a true 600 by 600 canvas.
for(const f of fs.readdirSync(p.join(root,'assets')).filter(n=>n.endsWith('.svg')&&n!=='landscape-lighting.svg')){
 const file=p.join(root,'assets',f);let s=fs.readFileSync(file,'utf8');
 if(!s.includes('viewBox="0 0 600 360"'))continue;
 s=s.replace('viewBox="0 0 600 360"','width="600" height="600" viewBox="0 0 600 600"').replace('<rect width="600" height="360" fill="url(#bg)"/>','<rect width="600" height="600" fill="url(#bg)"/><g transform="translate(0 120)">').replace('</svg>','</g></svg>');fs.writeFileSync(file,s);
}
const link='<a href="/products/landscape-lighting.html">Landscape Lighting<span aria-hidden="true">→</span></a>';
const tab='<a href="/products/landscape-lighting.html">Landscape Lighting</a>';
const card='<a class="card" href="/products/landscape-lighting.html"><img class="series-image" src="/assets/landscape-lighting.svg" alt="Landscape Lighting product illustration" width="600" height="600" loading="lazy"><p>Landscape Lighting <span aria-hidden="true">→</span></p></a>';
for(const file of walk(root).filter(f=>f.endsWith('.html'))){let h=fs.readFileSync(file,'utf8');
 h=h.replace(/(<div class="product-options" aria-label="Product categories">)([\s\S]*?)(<\/div>)/g,(m,a,b,c)=>a+b+(b.includes('landscape-lighting.html')?'':link)+c);
 h=h.replace(/(<div class="catalog-tabs">)([\s\S]*?)(<\/div>)/g,(m,a,b,c)=>a+b+(b.includes('landscape-lighting.html')?'':tab)+c);
 h=h.replace(/(<div class="grid series-grid"[^>]*>)([\s\S]*?)(<\/div>)/g,(m,a,b,c)=>a+b+(b.includes('landscape-lighting.svg')?'':card)+c);
 h=h.replace(/(<img[^>]*class="series-image"[^>]*height=")360"/g,'$1600"').replace(/(<img[^>]*class="series-overview"[^>]*height=")360"/g,'$1600"').replace('our seven lighting and power supply series','our eight lighting and power supply series');
 fs.writeFileSync(file,h);
}
let landscape=fs.readFileSync(p.join(root,'products/led-strip-lights.html'),'utf8');
landscape=landscape.replace(/LED Strip Lights/g,'Landscape Lighting').replace(/led-strip-lights\.svg/g,'landscape-lighting.svg').replace('Flexible linear light for coves, profiles and architectural details.','Outdoor lighting for pathways, gardens and landscape features.').replace('Tell us your required length, installation location and lighting effect.','Share your landscape layout, outdoor conditions and desired lighting effect.');
// Keep the shared navigation and related-series cards intact.
const original=fs.readFileSync(p.join(root,'products/led-strip-lights.html'),'utf8');
landscape=landscape.replace(/<header>[\s\S]*?<\/header>/,original.match(/<header>[\s\S]*?<\/header>/)[0]);
landscape=landscape.replace(/<div class="catalog-tabs">[\s\S]*?<\/div>/,original.match(/<div class="catalog-tabs">[\s\S]*?<\/div>/)[0]);
landscape=landscape.replace(/<div class="grid series-grid">[\s\S]*?<\/div>/,original.match(/<div class="grid series-grid">[\s\S]*?<\/div>/)[0]);
fs.writeFileSync(p.join(root,'products/landscape-lighting.html'),landscape);
fs.appendFileSync(p.join(root,'assets/warm-theme.css'),'\n/* Eight square product-series cards */\n.series-grid{grid-template-columns:repeat(4,minmax(0,1fr));gap:26px 16px}.series-grid .series-image{width:100%;height:auto;aspect-ratio:1;object-fit:contain}.series-overview{aspect-ratio:1;object-fit:contain}.series-grid .card:last-child{grid-column:auto;max-width:none;width:auto;justify-self:stretch}@media(max-width:600px){.series-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:22px 12px}.series-grid .card:last-child{grid-column:auto;max-width:none;width:auto;justify-self:stretch}}\n');
console.log('Eight series added throughout; illustrations and image attributes are 600 × 600.');
