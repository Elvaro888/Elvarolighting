(() => {
const {apps,drawings}=window.ELVARO_PROJECT_CONTENT;
const $=s=>document.querySelector(s);
document.querySelector('.menu')?.addEventListener('click',()=>document.querySelector('header nav').classList.toggle('open'));
if($('#year'))$('#year').textContent=new Date().getFullYear();
document.addEventListener('click',e=>document.querySelectorAll('.product-menu[open]').forEach(m=>{if(!m.contains(e.target))m.open=false}));
document.addEventListener('keydown',e=>{if(e.key==='Escape')document.querySelectorAll('.product-menu[open]').forEach(m=>{m.open=false;m.querySelector('summary').focus()})});
function tabs(selector,activate,vertical=false){
 const buttons=[...document.querySelectorAll(selector)];
 const select=(button,focus=false)=>{buttons.forEach(b=>{b.setAttribute('aria-selected',String(b===button));b.tabIndex=b===button?0:-1});activate(button);if(focus)button.focus()};
 buttons.forEach((b,i)=>{b.addEventListener('click',()=>select(b));b.addEventListener('keydown',e=>{const isVertical=vertical&&b.parentElement.getAttribute('aria-orientation')==='vertical';let next;if(e.key===(isVertical?'ArrowDown':'ArrowRight'))next=(i+1)%buttons.length;else if(e.key===(isVertical?'ArrowUp':'ArrowLeft'))next=(i+buttons.length-1)%buttons.length;else if(e.key==='Home')next=0;else if(e.key==='End')next=buttons.length-1;if(next!==undefined){e.preventDefault();select(buttons[next],true)}})});
 return select;
}
tabs('[data-app]',button=>{
 const i=Number(button.dataset.app),a=apps[i];
 $('#app-category').textContent=a[0];$('#app-title').textContent=a[2];$('#app-description').textContent=a[3];$('#app-tags').textContent=a[4];
 $('#app-image').src=i===1?'/assets/project-solutions-villa.jpg':`/assets/project-${a[1]}.jpg`;
 $('#app-image').alt=i===1?'Concept visualization of villa lighting and a smart control panel':`${a[0]} lighting project`;
 $('#app-image-note').textContent=i===1?'LIGHTING & SMART HOME CONCEPT VISUALIZATION':'ELVARO PROJECT PHOTOGRAPHY';
 $('#app-panel').setAttribute('aria-labelledby',button.id);
});
const scenes={welcome:['Welcome home','A welcoming lighting level, softly illuminated stairs and an arrival scene coordinated with selected devices.','Welcoming ambient light','Arrival scene'],relax:['Time to unwind','A softer lighting atmosphere for quiet evenings, with accent lighting and curtain control included where specified.','Soft ambient & accent light','Relaxation scene'],night:['A quiet good night','Reduce the general lighting and plan low-level orientation light for night-time movement. Device actions are agreed in the scene schedule.','Low-level orientation light','Night scene']};
document.querySelectorAll('button[data-scene]').forEach(b=>b.addEventListener('click',()=>{
 const s=scenes[b.dataset.scene];document.querySelectorAll('button[data-scene]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));
 $('.ps-scene-photo').dataset.scene=b.dataset.scene;$('#scene-name').textContent=s[0];$('#scene-description').textContent=s[1];$('#scene-light').textContent=s[2];$('#scene-control').textContent=s[3];
}));
const base=`<g stroke="#8e8175" stroke-width="3" fill="none"><path d="M70 65H690V345H70Z M70 235H325 M325 65V345 M325 205H690 M510 205V345"/><path d="M160 345h60M470 65h60" stroke="#fffcf8" stroke-width="5"/><path d="M160 345v-60a60 60 0 0 1 60 60M470 65v60a60 60 0 0 0 60-60" stroke-width="1"/></g><g fill="#9b8b7e" font-size="13" font-family="Arial"><text x="170" y="120">LIVING</text><text x="155" y="290">ENTRANCE</text><text x="470" y="135">BEDROOM</text><text x="375" y="280">DINING</text><text x="555" y="280">KITCHEN</text></g>`;
function light(x,y){return `<circle cx="${x}" cy="${y}" r="7" stroke="#b07336" fill="#eed4a5" stroke-width="1.5"/><path d="M${x-4} ${y}h8M${x} ${y-4}v8" stroke="#a66328"/>`}
const points=[[110,95],[280,95],[110,200],[280,200],[365,95],[650,95],[365,170],[650,170],[365,235],[470,235],[550,235],[650,235],[110,315],[280,315]];
const furniture=`<g stroke="#b8aaa0" fill="#f4ede6" stroke-width="1.5"><rect x="125" y="153" width="115" height="40" rx="5"/><rect x="144" y="193" width="77" height="19" rx="3"/><rect x="466" y="86" width="100" height="95"/><path d="M466 110h100M516 86v24"/><rect x="370" y="300" width="90" height="25" rx="8"/><path d="M560 300h105v30H560Z"/></g>`;
function drawing(i){
 let content='',legend='';
 if(i===0){content=`<g stroke="#8e8175" fill="none" stroke-width="2"><path d="M95 340V145L380 65 665 145V340Z M95 145H665 M95 245H665"/><path d="M155 185h100v40H155Z M330 185h100v40H330Z M505 185h100v40H505Z M155 275h100v65H155Z M330 275h100v65H330Z M505 275h100v65H505Z"/></g><g fill="#e4b87855" stroke="#b07336" stroke-width="1"><path d="m125 340-20-95h40zM300 340l-20-95h40zM475 340l-20-95h40zM640 340l-20-95h40z"/></g><g stroke="#b07336" stroke-width="4"><path d="M150 235h110M325 235h110M500 235h110"/></g><text x="285" y="385" fill="#8e8175" font-size="13">FAÇADE LIGHTING / ELEVATION STUDY</text>`;legend='Accent positions · Linear light · Mounting coordination'}
 else if(i===1){content=base+furniture+`<g stroke="#b4a596" fill="none" stroke-width="1"><path d="M70 35H690M70 28v14M690 28v14M35 65V345M28 65h14M28 345h14"/></g><g fill="#8e8175" font-size="12"><text x="295" y="29">SPACE & CIRCULATION REVIEW</text><text x="260" y="385">FURNITURE · ROOM FUNCTIONS · ACCESS</text></g>`;legend='Furniture layout · Room functions · Circulation'}
 else if(i===2){content=base+`<g stroke="#a66328" fill="none" stroke-width="2" stroke-dasharray="6 5"><path d="M125 280V145H560V280M400 145v160M560 145V95"/></g><g fill="#fffaf5" stroke="#a66328" stroke-width="2"><rect x="110" y="265" width="30" height="30"/><rect x="385" y="290" width="30" height="30"/><rect x="545" y="265" width="30" height="30"/><circle cx="560" cy="95" r="13"/></g><g fill="#a66328" font-size="11"><text x="112" y="285">HUB</text><text x="384" y="325">PANEL</text><text x="540" y="325">DEVICE</text></g>`;legend='Control hub · Panel · Device connection paths'}
 else if(i===3){content=`<g fill="#f2e6d9" stroke="#a66328" stroke-width="1.5"><rect x="75" y="160" width="120" height="80"/><rect x="310" y="70" width="130" height="55"/><rect x="310" y="175" width="130" height="55"/><rect x="310" y="280" width="130" height="55"/><rect x="555" y="70" width="130" height="55"/><rect x="555" y="175" width="130" height="55"/><rect x="555" y="280" width="130" height="55"/></g><g fill="none" stroke="#8e8175" stroke-width="1.5"><path d="M195 200h65V97h50M260 200h50M260 200v107h50M440 97h115M440 202h115M440 307h115"/></g><g font-size="14" fill="#74675d" text-anchor="middle"><text x="135" y="193">DISTRIBUTION</text><text x="135" y="214">BOARD</text><text x="375" y="104">CIRCUIT A</text><text x="375" y="209">CIRCUIT B</text><text x="375" y="314">CIRCUIT C</text><text x="620" y="104">AMBIENT</text><text x="620" y="209">ACCENT</text><text x="620" y="314">LINEAR / DRIVER</text></g>`;legend='Concept circuit grouping · Driver coordination · Load review'}
 else if(i===4){content=base+points.map(([x,y])=>light(x,y)).join('')+`<g stroke="#b07336" stroke-width="4" fill="none"><path d="M90 80v140h215M345 80h325M345 325h145"/></g>`;legend='○ Downlight / spotlight · ━ Linear lighting · Positions for review'}
 else {content=base+`<g fill="#a66328"><rect x="146" y="320" width="14" height="14"/><rect x="330" y="90" width="14" height="14"/><rect x="475" y="210" width="14" height="14"/><rect x="575" y="210" width="14" height="14"/></g><g fill="none" stroke="#a66328" stroke-width="1.5" stroke-dasharray="5 5"><path d="M153 320V185H200M337 97H490M482 217v70M582 217v70"/></g><g fill="#a6632820" stroke="#a66328" stroke-width="1.5"><circle cx="200" cy="185" r="40"/><circle cx="490" cy="150" r="30"/></g>`;legend='■ Switch / panel · Dotted control zone · Sensor coverage study'}
 return `<svg viewBox="0 0 760 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustrative ${drawings[i][0].toLowerCase()}"><title>${drawings[i][0]} concept diagram</title><defs><pattern id="plan-grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="#e8dfd5" stroke-width=".5"/></pattern></defs><rect width="760" height="420" fill="url(#plan-grid)"/>${content}<text x="380" y="410" text-anchor="middle" font-size="12" fill="#927459" font-family="Arial">${legend}</text></svg>`;
}
function showDrawing(button){const i=Number(button.dataset.drawing);$('#drawing-name').textContent=drawings[i][0];$('#drawing-description').textContent=drawings[i][1];$('#drawing-canvas').innerHTML=drawing(i);$('#drawing-panel').setAttribute('aria-labelledby',button.id)}
tabs('[data-drawing]',showDrawing,true);showDrawing($('#drawing-tab-1'));
// Match keyboard direction to the tab strip at narrow widths.
const media=matchMedia('(max-width:800px)');
function drawingOrientation(){const list=$('.ps-drawing-tabs');list.setAttribute('aria-orientation',media.matches?'horizontal':'vertical')}
drawingOrientation();media.addEventListener('change',drawingOrientation);
})();
