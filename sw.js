/* 貓的工作室：讓網頁可以加到主畫面。永遠先拿網路上的新版本，離線時才用上次存的。 */
const CACHE='cat-studio-v1';
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
  e.respondWith(fetch(r).then(res=>{if(res.ok){const c=res.clone();caches.open(CACHE).then(k=>k.put(r,c))}return res}).catch(()=>caches.match(r)));
});
