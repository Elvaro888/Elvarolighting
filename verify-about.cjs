const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const {execFileSync} = require('node:child_process');
const root=__dirname;
const html=fs.readFileSync(path.join(root,'dist/about.html'),'utf8');
const previous=execFileSync('git',['-c','safe.directory='+root.replaceAll('\\','/'),'show','HEAD:dist/about.html'],{cwd:root,encoding:'utf8'});
for(const tag of ['header','footer']){
  const expression=new RegExp('<'+tag+'[\\s\\S]*?</'+tag+'>');
  assert.equal(html.match(expression)[0],previous.match(expression)[0],tag+' must remain unchanged');
}
assert.equal((html.match(/<section /g)||[]).length,8);
assert.equal((html.match(/data-about-image=/g)||[]).length,16);
assert.equal((html.match(/<h1\b/g)||[]).length,1);
assert.equal((html.match(/id="au-lightbox"/g)||[]).length,1);
assert(!html.includes('<video'));
assert(!html.includes('au-patent-grid'));
const certSection=html.match(/<section[^>]*id="au-certifications"[\s\S]*?<\/section>/)[0];assert.equal((certSection.match(/<article /g)||[]).length,3);assert(!certSection.includes('<button')&&!certSection.includes('au-enlarge'));
assert(!html.includes('entaled.com'));
assert(!html.includes('Qingdao')&&!html.includes('G20')&&!html.includes('Wuhan'));
const c=JSON.parse(fs.readFileSync(path.join(root,'dist/assets/about/about-config.json'),'utf8'));
assert.equal(c.manufacturing.length,6);assert.equal(c.patents.length,0);assert.equal(c.certificates.length,3);assert.equal(c.projects.length,4);assert.equal(c.documentedProjects.length,3);
const registry=JSON.parse(fs.readFileSync(path.join(root,'dist/assets/about/about-images.json'),'utf8'));
assert.equal(Object.keys(registry.images).length,16);
let populated=0,missing=0;
for(const item of Object.values(registry.images)){
  assert(item.file&&item.label&&item.alt&&item.ratio);
  fs.existsSync(path.join(root,'dist',registry.assetBase,item.file))?populated++:missing++;
}
assert.equal(populated,16);assert.equal(missing,0);
for(const m of html.matchAll(/(?:href|src)="(\/[^"?#]+)(?:[?#][^"]*)?"/g))assert(fs.existsSync(path.join(root,'dist',m[1])),m[1]);
assert(html.includes('/contact.html#quote')&&html.includes('/products/index.html'));
assert(html.includes('About Us | Architectural &amp; Smart Lighting Solutions'));
const changed=execFileSync('git',['-c','safe.directory='+root.replaceAll('\\','/'),'diff','--name-only'],{cwd:root,encoding:'utf8'}).trim().split(/\r?\n/).filter(Boolean);
assert(changed.every(f=>f==='dist/about.html'||f.startsWith('dist/assets/about/')||['build-about.cjs','verify-about.cjs','ABOUT-MAINTENANCE.md'].includes(f)),'Unrelated tracked file modified: '+changed.join(', '));
console.log('About verified: 8 sections; 16 supplied image positions, no empty slots; preserved header/footer; 3 documented cases; valid CTA routes; no unrelated tracked changes.');
