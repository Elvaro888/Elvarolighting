const fs=require('fs');
const files=['dist/index.html','dist/about.html',...fs.readdirSync('dist/products').map(x=>'dist/products/'+x)];
const add=['Pinterest','LinkedIn'].map((n,i)=>'<button disabled aria-label="'+n+' — account link pending" title="'+n+' — account link pending"><span role="img" aria-label="'+n+'" style="display:block;width:36px;height:36px;background-image:url(/assets/social-row.png);background-repeat:no-repeat;background-size:526% 177%;background-position:'+(i?99.2:74.8)+'% 50%"></span></button>').join('');
for(const f of files){let h=fs.readFileSync(f,'utf8');h=h.replace(/(<div class="socials"[^>]*>[\s\S]*?)(<\/div>)/,'$1'+add+'$2');fs.writeFileSync(f,h)}
console.log('Updated social icons on 8 pages');
