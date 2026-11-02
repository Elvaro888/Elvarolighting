const fs=require('node:fs'),p=require('node:path');
const root=p.join(__dirname,'dist');
for(const n of ['ground-lights','ground-lights-scenery'])fs.copyFileSync('C:/Users/Administrator/Desktop/'+n+'.png',p.join(root,'assets',n+'.png'));
const generator=p.join(__dirname,'build-product-directory.cjs');
let g=fs.readFileSync(generator,'utf8');
if(!g.includes("id:'adjustable-garden-light'"))g=g.replace('const data=[',`const data=[
 {id:'adjustable-garden-light',name:'Adjustable Garden Light',cat:'landscape-lighting',image:'ground-lights.png',scene:'ground-lights-scenery.png',application:['Outdoor','Residential','Hospitality'],installation:'Ground mounted',power:'0–5W',beam:null,ip:'IP65',meta:'5W · IP65 · 12/24V AC · Adjustable head',specs:[['Power','5W'],['IP rating','IP65'],['Input voltage','12/24V AC'],['Light head','Adjustable'],['Application','Gardens, pathways and planting beds']]},`);
fs.writeFileSync(generator,g);
require(generator);
function pair(){return `<article class="flip-card" data-product-label="Landscape Lighting"><a class="card flip-link" href="/products/landscape-lighting.html" aria-label="Landscape Lighting product and application"><span class="flip-scene"><span class="flip-inner"><span class="flip-face flip-front"><img src="/assets/ground-lights.png" alt="Adjustable garden light on white background" width="1254" height="1254" loading="lazy"></span><span class="flip-face flip-back"><img src="/assets/ground-lights-scenery.png" alt="Adjustable garden lights illuminating a garden path" width="1254" height="1254" loading="lazy"></span></span></span><p>Landscape Lighting <span aria-hidden="true">→</span></p></a><button class="flip-toggle" type="button" aria-pressed="false" aria-label="Show Landscape Lighting scene photo">VIEW IN A SPACE <span aria-hidden="true">↻</span></button></article>`}
const walk=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(p.join(d,e.name)):[p.join(d,e.name)]);
for(const f of walk(root).filter(f=>f.endsWith('.html'))){let h=fs.readFileSync(f,'utf8');h=h.replace(/<a class="card" href="\/products\/landscape-lighting.html"><img class="series-image"[^>]*><p>[\s\S]*?<\/p><\/a>/g,pair());if(h.includes('data-product-label="Landscape Lighting"')){if(!h.includes('/assets/oem-flip.css'))h=h.replace('</head>','<link rel="stylesheet" href="/assets/oem-flip.css"></head>');if(!h.includes('/assets/product-flip.js'))h=h.replace('</body>','<script src="/assets/product-flip.js"></script></body>');}fs.writeFileSync(f,h)}
console.log('Garden-light catalogue, detail page and category photography complete.');
