const fs=require('fs');
const files=['dist/index.html','dist/about.html',...fs.readdirSync('dist/products').map(x=>'dist/products/'+x)];
const names=['Pendant Light','Chandeliers','Wall Lights','Table Lamps','Outdoor Lights','Track Lights'];
const slugs=['pendant-lights','chandeliers','wall-lights','table-lamps','outdoor-lights','track-lights'];
const menu='<details class="product-menu"><summary>PRODUCTS <span aria-hidden="true">⌄</span></summary><div class="product-options" aria-label="Product categories">'+names.map((n,i)=>'<a href="/products/'+slugs[i]+'.html">'+n+'<span aria-hidden="true">→</span></a>').join('')+'</div></details>';
const css=`
/* Four project cards share the complete available row. */
#cases.grid{grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;width:100%}
#cases .card{display:block;min-width:0}
#cases .card img{display:block;width:100%;height:auto;aspect-ratio:1.8;object-fit:cover}
#cases .card p{margin:0;padding:10px 4px;background:#0c0e0c;text-align:center}
header{position:relative;z-index:20}
.product-menu{position:relative}
.product-menu summary{cursor:pointer;list-style:none;padding:12px 0;white-space:nowrap}
.product-menu summary::-webkit-details-marker{display:none}
.product-menu summary:hover,.product-menu[open] summary{color:#d3ae68}
.product-menu summary span{display:inline-block;margin-left:5px;transition:transform .2s}
.product-menu[open] summary span{transform:rotate(180deg)}
.product-options{position:absolute;left:-20px;top:100%;min-width:230px;padding:10px 0;background:#191a17;border-top:2px solid #cda65f;box-shadow:0 12px 28px #0005;z-index:30}
.product-options a{display:flex;justify-content:space-between;gap:25px;padding:14px 20px;font-size:12px;color:#fff}
.product-options a span{color:#cda65f}
.product-options a:hover,.product-options a:focus-visible{background:#ffffff0c;color:#d3ae68}
summary:focus-visible{outline:2px solid #cda65f;outline-offset:5px}
@media(max-width:800px){#cases.grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.product-menu{width:100%}.product-options{position:static;box-shadow:none;min-width:0;width:100%;margin-top:6px}.product-options a{padding:14px 16px}}
@media(max-width:380px){#cases .card p{font-size:9px}}
`;
const script=`
document.addEventListener('click',event=>{document.querySelectorAll('.product-menu[open]').forEach(menu=>{if(!menu.contains(event.target))menu.open=false})});
document.addEventListener('keydown',event=>{if(event.key==='Escape')document.querySelectorAll('.product-menu[open]').forEach(menu=>{menu.open=false;menu.querySelector('summary').focus()})});
`;
for(const f of files){let h=fs.readFileSync(f,'utf8');h=h.replace(/<a href="(?:\/)?#products">PRODUCTS ⌄<\/a>/,menu);h=h.replace('</style>',css+'</style>');h=h.replace('</html>','<script>'+script+'</script></html>');fs.writeFileSync(f,h);}
console.log('Updated four-column project grid and six-option product menus on 8 pages.');
