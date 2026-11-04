const fs=require('fs'),path=require('path');
const measurementId='G-QM772ND6E4';
const tag='<!-- Google tag (gtag.js) -->\n<script async src="https://www.googletagmanager.com/gtag/js?id='+measurementId+'"></script>\n<script>\n  window.dataLayer = window.dataLayer || [];\n  function gtag(){dataLayer.push(arguments);}\n  gtag(\'js\', new Date());\n  gtag(\'config\', \''+measurementId+'\');\n</script>\n';
function walk(p){return fs.readdirSync(p,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(p,e.name)):[path.join(p,e.name)])}
const pages=walk('dist').filter(f=>f.endsWith('.html'));
for(const file of pages){let h=fs.readFileSync(file,'utf8');
if(h.includes('googletagmanager.com/gtag/js'))throw Error('A Google tag already exists on '+file);
if(!/<head[\s>]/i.test(h)){
h=h.replace(/(<html\b[^>]*>)/i,'$1<head>');
const body=h.search(/<body\b/i);
if(body>=0)h=h.slice(0,body)+'</head>'+h.slice(body);
else h=h.replace(/<header\b/i,'</head><body><header');
}
if(!/<\/body>/i.test(h))h=h.replace(/<\/html>/i,'</body></html>');
h=h.replace(/(<meta charset="utf-8">)/i,'$1\n'+tag);
fs.writeFileSync(file,h);
}
console.log('Installed '+measurementId+' once in the explicit head of '+pages.length+' pages.');
