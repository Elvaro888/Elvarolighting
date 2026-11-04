const fs=require('node:fs'),path=require('node:path');
const root=path.join(__dirname,'dist');
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);}
const origin='https://elvaro-lighting.selectgnat.chatgpt.site';
for(const file of walk(root).filter(f=>f.endsWith('.html'))){
 let html=fs.readFileSync(file,'utf8');
 html=html.replace(/(<a class="logo"[^>]*>)[\s\S]*?(<\/a>)/g,'$1<img class="brand-image" src="/assets/elvaro-logo.png" alt="ELVARO Lighting" width="165" height="51">$2');
 html=html.replace(/(<div class="logo">)<b>EL<\/b>VARO<small[^>]*>LIGHTING<\/small>/g,'$1<img class="brand-image" src="/assets/elvaro-logo.png" alt="ELVARO Lighting" width="195" height="61">');
 html=html.replace('aria-label="Architectural design reference"','aria-label="ELVARO lighting showroom with architectural downlights and track lights"');
 if(!html.includes('/assets/warm-theme.css'))html=html.replace('</head>','<link rel="stylesheet" href="/assets/warm-theme.css"><link rel="icon" type="image/png" sizes="96x96" href="/favicon-96.png"><link rel="apple-touch-icon" href="/apple-touch-icon.png"></head>');
 if(file===path.join(root,'index.html')&&!html.includes('"@type":"Organization"'))html=html.replace('</head>','<script type="application/ld+json">'+JSON.stringify({'@context':'https://schema.org','@type':'Organization',name:'ELVARO Lighting',legalName:'Zhejiang Jindalai Lighting Technology Co., Ltd.',url:origin,logo:origin+'/assets/elvaro-logo.png'})+'</script></head>');
 fs.writeFileSync(file,html);
}
console.log('Warm theme and branding applied to all HTML pages.');
