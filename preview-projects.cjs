const http=require('http'),fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'dist');
const server=http.createServer((req,res)=>{let name;try{name=decodeURIComponent(new URL(req.url,'http://localhost').pathname)}catch{res.writeHead(400);return res.end()}
let f=path.join(root,name);if(f!==root&&!f.startsWith(root+path.sep)){res.writeHead(403);return res.end()}
if(fs.existsSync(f)&&fs.statSync(f).isDirectory())f=path.join(f,'index.html');else if(!path.extname(f))f+='.html';
fs.readFile(f,(error,data)=>{if(error){res.writeHead(404);return res.end('Not found')};res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.json':'application/json','.jpg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml'})[path.extname(f)]||'application/octet-stream');res.end(data)})});
server.listen(8094,'127.0.0.1',()=>console.log('http://127.0.0.1:8094/projects'));
