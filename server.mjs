import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';

const root=resolve('dist');
// Prices remain in the existing durable studio database. Never forward visitor
// cookies or identity headers to the studio; this endpoint is read-only.
const studio='https://clayz-kiln.fpour22940.chatgpt.site';
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml','.ico':'image/x-icon'};
export const server=createServer(async(req,res)=>{
 try{
  const url=new URL(req.url,'http://localhost');
  res.setHeader('X-Content-Type-Options','nosniff');
  res.setHeader('Referrer-Policy','strict-origin-when-cross-origin');
  if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,{'Allow':'GET, HEAD'});res.end();return;}
  if(url.pathname==='/health'){res.writeHead(200,{'Content-Type':'text/plain'});res.end('OK');return;}
  if(url.pathname==='/studio'){
   res.writeHead(302,{'Location':studio+'/signin-with-chatgpt?return_to=%2F','Cache-Control':'no-store'});res.end();return;
  }
  if(url.pathname==='/api/catalog'){
   try{
    const upstream=await fetch(studio+'/api/catalog',{headers:{Accept:'application/json'},signal:AbortSignal.timeout(10000)});
    if(!upstream.ok)throw Error('Studio unavailable');
    const data=await upstream.json();
    if(!data.prices||typeof data.prices!=='object'||Array.isArray(data.prices))throw Error('Invalid catalog');
    const prices=Object.fromEntries(Object.entries(data.prices).filter(([id,n])=>/^[a-z0-9-]+$/.test(id)&&(n===null||(Number.isSafeInteger(n)&&n>=0&&n<=100000000))));
    res.writeHead(200,{'Content-Type':'application/json','Cache-Control':'no-store'});res.end(JSON.stringify({prices,canEdit:false}));
   }catch{res.writeHead(503,{'Content-Type':'application/json','Cache-Control':'no-store'});res.end(JSON.stringify({error:'Prices temporarily unavailable.'}));}
   return;
  }
  let file=resolve(root,'.'+decodeURIComponent(url.pathname));
  if(file!==root&&!file.startsWith(root+sep)){res.writeHead(403);res.end();return;}
  if(url.pathname==='/')file=resolve(root,'index.html');
  let info;try{info=await stat(file);}catch{res.writeHead(404);res.end('Not found');return;}
  if(!info.isFile()){res.writeHead(404);res.end('Not found');return;}
  const body=await readFile(file);
  res.writeHead(200,{'Content-Type':mime[extname(file)]||'application/octet-stream','Content-Length':body.length,'Cache-Control':extname(file)==='.html'?'no-cache':'public, max-age=86400'});
  res.end(req.method==='HEAD'?undefined:body);
 }catch{res.writeHead(500);res.end('Unable to load page');}
});
if(process.env.NODE_ENV!=='test'){
 server.listen(Number(process.env.PORT)||10000,'0.0.0.0',()=>console.log('Clayz Kiln is ready'));
 process.on('SIGTERM',()=>server.close(()=>process.exit(0)));
}
