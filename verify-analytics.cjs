const fs=require('fs'),path=require('path'),vm=require('vm');
function walk(p){return fs.readdirSync(p,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(p,e.name)):[path.join(p,e.name)])}
let count=0;for(const file of walk('dist').filter(f=>f.endsWith('.html'))){
const h=fs.readFileSync(file,'utf8'),head=h.match(/<head>([\s\S]*?)<\/head>/i)?.[1];if(!head)throw Error('Missing head '+file);
if((h.match(/googletagmanager\.com\/gtag\/js/g)||[]).length!==1)throw Error('Duplicate or missing Google tag '+file);
if(!head.includes('src="https://www.googletagmanager.com/gtag/js?id=G-QM772ND6E4"'))throw Error('Wrong measurement id '+file);
const script=head.match(/<script>([\s\S]*?gtag\('config', 'G-QM772ND6E4'\);[\s\S]*?)<\/script>/)?.[1];if(!script)throw Error('Missing init '+file);
const ctx={};ctx.window=ctx;vm.runInNewContext(script,ctx);const config=ctx.dataLayer.filter(x=>x[0]==='config');if(config.length!==1||config[0][1]!=='G-QM772ND6E4')throw Error('Invalid queue '+file);
if(h.indexOf('</head>')>h.indexOf('<body'))throw Error('Invalid head placement '+file);count++;
}
console.log(count+' pages verified: single async Google tag in head; initialization queues the correct measurement ID once.');
