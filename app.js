'use strict';
const categories = [
  {id:'cold',short:'前菜',title:'雅致前菜',lead:'先上凉菜，边聊边吃',count:4,icon:'✦'},
  {id:'soup',short:'热汤',title:'匠心炖汤',lead:'先喝口热汤，暖胃开场',count:1,icon:'◉'},
  {id:'hot',short:'热菜',title:'川粤融合 · 精品热菜',lead:'硬菜来了，今晚主场',count:7,icon:'✳'},
  {id:'greens',short:'时蔬',title:'时令鲜蔬',lead:'最后来点清口的',count:1,icon:'❧'},
  {id:'sweet',short:'小吃',title:'雅致小吃',lead:'甜口收尾，刚刚好',count:1,icon:'✿'}
];
const dishes = [
  {name:'锦绣三文鱼刺身拼盘',category:'cold',tags:['鲜甜','清爽'],desc:'鲜甜清爽，第一口就很有开席的感觉。先吃这个，咱们慢慢聊。'},
  {name:'老成都红油拌土鸡',category:'cold',tags:['麻香','开胃'],desc:'红油香气先到位，鸡肉鲜嫩。熟悉的成都味道，越聊越下筷。'},
  {name:'香菜拌牛肉',category:'cold',tags:['鲜香','爽口'],desc:'牛肉有嚼劲，香菜清新又提味。喜欢这口的，肯定停不下来。'},
  {name:'烧椒溏心皮蛋',category:'cold',tags:['椒香','绵润'],desc:'烧椒香气配上细腻皮蛋，清爽中带一点辛香，开胃刚刚好。'},
  {name:'瑶柱淮山莲子炖乌鸡',category:'soup',tags:['清鲜','温润'],desc:'一盅慢炖的鲜汤，瑶柱提鲜、淮山绵润。热菜上桌之前，先暖暖胃。'},
  {name:'葱油古法清蒸海石斑',category:'hot',tags:['清鲜','招牌'],desc:'清蒸最见食材本味，葱油一激，鱼肉的鲜甜就出来了。'},
  {name:'玻璃脆皮乳鸽',category:'hot',tags:['皮脆','鲜嫩'],desc:'皮要脆，肉还得嫩。出锅趁热吃，这道真得抓紧。'},
  {name:'蒜蓉粉丝焗波士顿龙虾',category:'hot',tags:['蒜香','海鲜'],desc:'蒜香和龙虾的鲜味搭在一起，粉丝吸饱汤汁，谁都别客气。'},
  {name:'樟树港辣椒炒鲜鲍鱼',category:'hot',tags:['鲜嫩','椒香'],desc:'鲜鲍鱼弹嫩，樟树港辣椒清香微辣，鲜味和锅气一起到位。'},
  {name:'青柠酥皮红烧肉',category:'hot',tags:['酥香','解腻'],desc:'外酥里软，红烧肉的香浓里透出一点青柠清新，层次很妙。'},
  {name:'自贡火爆双脆',category:'hot',tags:['锅气','爽脆'],desc:'大火快炒，脆嫩爽口。今晚的川菜灵魂，得有这股锅气。'},
  {name:'避风塘罗氏虾',category:'hot',tags:['蒜酥','鲜香'],desc:'金黄蒜酥包着鲜香虾肉，越嚼越香，经典的下酒硬菜。'},
  {name:'清炒豌豆尖',category:'greens',tags:['鲜嫩','清口'],desc:'一盘时令嫩绿，清清爽爽，给这桌丰盛的菜收收口。'},
  {name:'桂花椰香马蹄糕',category:'sweet',tags:['清甜','软弹'],desc:'淡淡桂花香，椰香清润、马蹄糕软弹。甜口收个尾，正合适。'}
].map((d,i)=>({...d,num:i+1,image:`assets/food/${String(i+1).padStart(2,'0')}.webp`}));
const app=document.getElementById('app');
let page='cover',current=0,sheetOpen=false,transitioning=false;
const catFor=id=>categories.find(cat=>cat.id===id);
const icon={chevronL:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m14 5-7 7 7 7"/></svg>',chevronR:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m10 5 7 7-7 7"/></svg>',menu:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',left:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m15 18-6-6 6-6"/></svg>',reload:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 2.6-6.4"/><path d="M3 4v5h5"/></svg>'};
function cover(){return `<main class="shell cover" id="view" aria-label="好友私宴电子请帖">
  <div class="cover-bg"></div><div class="cover-top"><span class="pin">PRIVATE DINING</span><span>FRIENDS ONLY</span></div>
  <div class="cover-center"><div class="decor-kicker">一 桌 好 菜 · 一 群 好 友</div><h1 class="cover-title"><span>今晚，</span><span>来家里吃饭</span></h1><div class="cover-underline" aria-hidden="true"></div><p class="cover-desc">兄弟们，菜单先给你们过个眼。<br>人到齐，咱就开吃。</p><div class="cover-info"><strong>川粤融合 · 好友私宴</strong><small>8大1小　·　14道菜</small></div><span class="spark one" aria-hidden="true">✳</span><span class="spark two" aria-hidden="true">✦</span></div>
  <div class="cover-bottom"><button class="open-btn" id="open-feast" type="button">点一下，开席 <span aria-hidden="true">→</span></button><div class="cover-footnote">好菜配好朋友 · 见面再开吃</div></div>
</main>`;}
function menu(){const d=dishes[current],cat=catFor(d.category);return `<main class="shell menu-shell" id="view" aria-label="川粤融合好友私宴菜单">
 <header class="menu-header"><button class="icon-btn" id="back-home" aria-label="返回请帖封面">${icon.chevronL}</button><div class="brand"><strong>川粤融合 · 好友私宴</strong><span>按上菜顺序 · 14道菜</span></div><button class="icon-btn" id="open-index" aria-label="打开菜单目录">${icon.menu}</button></header>
 <nav class="stage-bar" aria-label="菜单分类">${categories.map(c=>`<button type="button" class="stage-tab${cat.id===c.id?' active':''}" data-stage="${c.id}" aria-current="${cat.id===c.id?'step':'false'}">${c.short}</button>`).join('')}</nav>
 <div class="details-wrap" id="gesture-region" aria-live="polite">
  <div class="section-banner"><div><div class="category">${cat.title} · ${cat.count} 道</div><h2>${cat.lead}</h2></div><span class="section-count">第 ${String(current+1).padStart(2,'0')} 道</span></div>
  <div class="photo-frame" id="dish-photo"><img src="${d.image}" alt="${d.name}的风格示意图片" fetchpriority="high" decoding="async" draggable="false"/><div class="photo-bar"><span class="star-label">今 日 上 桌</span><span class="photo-count">${String(current+1).padStart(2,'0')} / 14</span></div></div>
  <article class="info-panel"><div class="dish-kicker">DISH ${String(current+1).padStart(2,'0')} · ${cat.title}</div><h1 class="dish-title">${d.name}</h1><div class="badges">${d.tags.map(t=>`<span class="flavor">${t}</span>`).join('')}</div><p class="dish-desc">${d.desc}</p><div class="progress-meta"><span>今晚的上菜进度</span><strong>${current+1} / ${dishes.length}</strong></div><div class="progress-track" aria-label="第${current+1}道，共14道"><div class="progress-fill" style="width:${(current+1)/dishes.length*100}%"></div></div>
   <div class="action-bar"><button type="button" class="prev-btn" id="prev-dish" ${current===0?'disabled':''}>${icon.chevronL} 上一道</button><button type="button" class="next-btn" id="next-dish">${current===13?'看完了，收尾':'下一道'} ${icon.chevronR}</button></div><p class="info-note">左右轻滑可以切换 · 图片为风格示意，实际以主厨出品为准</p></article>
 </div>
 ${sheetOpen?sheet():''}
 </main>`;}
function sheet(){return `<div class="sheet-overlay" id="sheet-overlay"><section class="sheet" role="dialog" aria-modal="true" aria-label="菜单目录"><div class="sheet-handle"></div><div class="sheet-heading"><div><h2>菜单目录</h2><p>今晚这桌，14道菜都在这儿</p></div><button type="button" class="sheet-close" id="close-index" aria-label="关闭目录">×</button></div><div class="sheet-content">${categories.map(c=>`<div class="group-head">${c.title} · ${c.count} 道</div>${dishes.map((d,i)=>d.category===c.id?`<button type="button" data-dish="${i}" class="menu-item ${i===current?'current':''}"><img src="${d.image}" loading="lazy" alt=""/><div class="item-text"><strong>${d.name}</strong><span>${d.tags.join(' · ')}</span></div><span class="go">›</span></button>`:'').join('')}`).join('')}</div></section></div>`}
function finish(){return `<main class="shell end" id="view" aria-label="家宴菜单结束"><div class="end-bg"></div><div class="end-mark" aria-hidden="true">✦</div><div class="decor-kicker">THE END · 开 席 愉 快</div><h1>菜单看完了，<br>饭点也快到了！</h1><div class="end-line"></div><p>今晚这桌，就等你们来。<br>好菜配好朋友，见面再开吃！</p><button type="button" class="red-btn" id="again">${icon.reload} 再看一遍</button><button type="button" class="ghost-btn" id="finish-home">回到封面</button><div class="end-small">川粤融合 · 好友私宴</div></main>`;}
function render(){app.innerHTML=page==='cover'?cover():page==='menu'?menu():finish();bind();}
function setPage(next){page=next;sheetOpen=false;window.scrollTo(0,0);render();}
function navigateTo(n){if(n<0||n>13)return;current=n;sheetOpen=false;render();const region=document.getElementById('gesture-region');if(region)region.scrollTop=0;}
function nextDish(){if(current===13){setPage('finish');return;}navigateTo(current+1)}
function prevDish(){navigateTo(Math.max(current-1,0))}
function startFeast(){if(transitioning)return;transitioning=true;const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const el=document.createElement('div');el.className='opening';el.setAttribute('aria-live','polite');el.innerHTML='<div class="opening-in"><div class="opening-icon">♨</div><h2>开席咯！</h2><div class="bar"></div><p>先上凉菜，边聊边吃</p></div>';
  document.body.appendChild(el);const delay=reduce?150:920;setTimeout(()=>{el.remove();transitioning=false;current=0;setPage('menu');},delay);
}
function showIndex(){sheetOpen=true;render();document.getElementById('close-index')?.focus()}
function hideIndex(){sheetOpen=false;render();document.getElementById('open-index')?.focus()}
function bind(){document.getElementById('open-feast')?.addEventListener('click',startFeast);
  document.getElementById('back-home')?.addEventListener('click',()=>setPage('cover'));
  document.getElementById('open-index')?.addEventListener('click',showIndex);
  document.getElementById('close-index')?.addEventListener('click',hideIndex);
  document.getElementById('sheet-overlay')?.addEventListener('click',e=>{if(e.target.id==='sheet-overlay')hideIndex()});
  document.getElementById('prev-dish')?.addEventListener('click',prevDish);
  document.getElementById('next-dish')?.addEventListener('click',nextDish);
  document.getElementById('again')?.addEventListener('click',()=>{current=0;setPage('menu')});
  document.getElementById('finish-home')?.addEventListener('click',()=>setPage('cover'));
  document.querySelectorAll('[data-stage]').forEach(el=>el.addEventListener('click',()=>navigateTo(dishes.findIndex(d=>d.category===el.dataset.stage))));
  document.querySelectorAll('[data-dish]').forEach(el=>el.addEventListener('click',()=>navigateTo(Number(el.dataset.dish))));
  const zone=document.getElementById('gesture-region');if(zone){let x=0,y=0,started=false;
   zone.addEventListener('touchstart',e=>{if(e.touches.length!==1)return;x=e.touches[0].clientX;y=e.touches[0].clientY;started=true},{passive:true});
   zone.addEventListener('touchend',e=>{if(!started||!e.changedTouches.length)return;started=false;const dx=e.changedTouches[0].clientX-x,dy=e.changedTouches[0].clientY-y;if(Math.abs(dx)>60&&Math.abs(dx)>Math.abs(dy)*1.35){if(dx<0)nextDish();else prevDish();}},{passive:true});
  }
}
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&sheetOpen){e.preventDefault();hideIndex();return}if(page!=='menu'||sheetOpen)return;if(e.key==='ArrowRight'){e.preventDefault();nextDish()}if(e.key==='ArrowLeft'){e.preventDefault();prevDish()}});
// Image preload next card for pleasant mobile navigation
const loaded=new Set();function prefetch(n){if(n<0||n>=dishes.length||loaded.has(n))return;const img=new Image();img.src=dishes[n].image;loaded.add(n)}
const origNavigate=navigateTo;navigateTo=function(n){origNavigate(n);prefetch(n+1)};
render();prefetch(0);prefetch(1);
