'use client';
import { useEffect, useRef } from 'react';
export function CarouselVase({paused}:{paused:boolean}) {
 const ref=useRef<HTMLCanvasElement>(null);
 const clock=useRef(0);
 useEffect(()=>{
  const canvas=ref.current;if(!canvas)return;
  const ctx=canvas.getContext('2d');if(!ctx)return;
  let frame=0,disposed=false,previous=0,visible=true;
  const vase=new Image();const horse=new Image();
  const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting});observer.observe(canvas);
  const load=(image:HTMLImageElement,src:string)=>new Promise<void>((resolve,reject)=>{image.onload=()=>resolve();image.onerror=()=>reject(new Error('Animation image unavailable'));image.src=src});
  let crop={x:0,y:0,w:1,h:1};
  function render(now:number){
   if(disposed||!ctx||!canvas)return;
   if(previous&&!paused&&!motion.matches&&visible&&!document.hidden)clock.current+=Math.min(now-previous,50)/1000;
   previous=now;
   ctx.clearRect(0,0,1145,1374);ctx.drawImage(vase,0,0,1145,1374);
   ctx.save();
   // Clip to the unglazed band, following its irregular top and bottom edges.
   ctx.beginPath();ctx.moveTo(190,706);ctx.bezierCurveTo(194,660,204,620,217,599);ctx.bezierCurveTo(299,640,417,651,593,616);ctx.bezierCurveTo(700,634,832,638,889,590);ctx.bezierCurveTo(949,606,974,669,963,759);ctx.bezierCurveTo(958,809,941,844,889,872);ctx.bezierCurveTo(801,903,740,950,595,938);ctx.bezierCurveTo(485,967,382,942,260,895);ctx.bezierCurveTo(210,854,190,803,190,706);ctx.closePath();ctx.clip();
   const radius=382,center=573,angle=clock.current*0.26;
   // Map each slice to a cylinder so horses narrow and disappear at the sides.
   for(let h=0;h<6;h++){
    const phase=angle+h*Math.PI/3;
    for(let slice=0;slice<80;slice++){
     const a1=phase+(slice/80-.5)*.64,a2=phase+((slice+1)/80-.5)*.64;
     if(Math.cos((a1+a2)/2)<=0)continue;
     const x1=center+Math.sin(a1)*radius,x2=center+Math.sin(a2)*radius;
     if(x2<=x1)continue;
     const depth=Math.cos((a1+a2)/2),y=666+(1-depth)*-10;
     ctx.drawImage(horse,crop.x+slice*crop.w/80,crop.y,crop.w/80+.5,crop.h,x1,y,x2-x1+.65,232);
    }
   }
   ctx.restore();
   frame=requestAnimationFrame(render);
  }
  Promise.all([load(vase,'/animation/carousel-base.webp'),load(horse,'/animation/carousel-horse.webp')]).then(()=>{
   if(disposed)return;
   const scratch=document.createElement('canvas');scratch.width=horse.width;scratch.height=horse.height;
   const c=scratch.getContext('2d');if(c){c.drawImage(horse,0,0);const pixels=c.getImageData(0,0,horse.width,horse.height).data;let left=horse.width,top=horse.height,right=0,bottom=0;for(let y=0;y<horse.height;y++)for(let x=0;x<horse.width;x++){if(pixels[(y*horse.width+x)*4+3]>100){left=Math.min(left,x);right=Math.max(right,x);top=Math.min(top,y);bottom=Math.max(bottom,y)}}if(right>left)crop={x:left,y:top,w:right-left+1,h:bottom-top+1};}
   frame=requestAnimationFrame(render);
  }).catch(()=>{if(!disposed&&ctx){const fallback=new Image();fallback.onload=()=>{if(!disposed)ctx.drawImage(fallback,0,0,1145,1374)};fallback.src='/pottery-cutouts/IMG_2610.webp'}});
  return()=>{disposed=true;cancelAnimationFrame(frame);observer.disconnect()};
 },[paused]);
 return <canvas ref={ref} width={1145} height={1374} role="img" aria-label="Carousel vase with black horses moving around its middle band">Carousel vase with animated horses.</canvas>
}
