// Re-run after adding pages. Only public HTML belongs in dist.
const fs=require('fs'),path=require('path'),assert=require('assert');
const root=path.join(__dirname,'dist'),origin='https://www.elvarolighting.com';
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)])}
const files=walk(root).filter(f=>f.endsWith('.html'));
function route(f){let s='/'+path.relative(root,f).replaceAll('\\','/');s=s.replace(/\/index\.html$/,'/').replace(/\.html$/,'');return s==='/'?s:s.replace(/\/$/,'')}
const routes=new Set(files.map(route));
for(const file of files){let html=fs.readFileSync(file,'utf8'),url=origin+route(file);
 html=html.replaceAll('https://elvaro-lighting.selectgnat.chatgpt.site',origin);
 html=html.replace(/<link\b(?=[^>]*\brel=["']canonical["'])[^>]*>\s*/gi,'');
 html=html.replace('</head>',`<link rel="canonical" href="${url}">\n</head>`);
 // Normalize only links that resolve to known HTML pages; preserve inquiry queries/fragments.
 html=html.replace(/(<a\b[^>]*\bhref=)(["'])(.*?)\2/gi,(all,prefix,quote,href)=>{
  if(!href||/^(?:mailto:|tel:|javascript:|#)/i.test(href))return all;
  let u;try{u=new URL(href,url)}catch{return all}if(u.origin!==origin)return all;
  if(u.searchParams.get('page')==='news')return prefix+quote+'/blog'+quote;
  let p=u.pathname.replace(/\/index\.html$/,'/').replace(/\.html$/,'');if(p!=='/')p=p.replace(/\/$/,'');
  return routes.has(p)?prefix+quote+p+u.search+u.hash+quote:all;
 });
 assert.equal((html.match(/rel="canonical"/g)||[]).length,1,file);
 assert(!/selectgnat\.chatgpt\.site/.test(html),file);
 assert(!/<meta[^>]+(?:name=["'](?:robots|googlebot)["'])[^>]+noindex/i.test(html),file);
 fs.writeFileSync(file,html);
}
fs.writeFileSync(path.join(root,'sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+[...routes].sort().map(r=>`  <url><loc>${origin+r}</loc></url>`).join('\n')+'\n</urlset>\n');
fs.writeFileSync(path.join(root,'robots.txt'),`User-agent: *\nAllow: /\n\nUser-agent: OAI-SearchBot\nAllow: /\n\nUser-agent: ChatGPT-User\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`);
console.log(`Verified ${files.length} public HTML pages: unique canonical, no legacy preview domain, complete sitemap.`);
