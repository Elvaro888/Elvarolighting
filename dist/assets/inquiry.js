(() => {
const endpoint='https://formcarry.com/s/bhQE2jVx_QB';
document.querySelectorAll('form').forEach(form=>{
form.onsubmit=null;
let status=form.querySelector('[role="status"]');
if(!status){status=document.createElement('p');status.setAttribute('role','status');status.style.cssText='font-size:12px;line-height:1.7;margin-top:15px';form.append(status)}
form.addEventListener('submit',async event=>{
event.preventDefault();event.stopImmediatePropagation();
if(form.dataset.sending==='true'||!form.reportValidity())return;
const buttons=[...form.querySelectorAll('button[type="submit"],button:not([type])')],labels=buttons.map(b=>b.textContent);
const fields=new FormData(form);fields.set('page_url',location.href);fields.set('page_title',document.title);fields.set('source','ELVARO Lighting Website');
if(document.querySelector('#catalog-grid')){try{fields.set('selected_products',localStorage.getItem('elvaro-project')||'[]')}catch{}}
form.dataset.sending='true';buttons.forEach(b=>{b.disabled=true;b.textContent='SENDING…'});status.textContent='Sending your inquiry…';status.style.color='#8f713f';
const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),25000);
try{
const response=await fetch(endpoint,{method:'POST',headers:{Accept:'application/json'},body:fields,signal:controller.signal});
const result=await response.json();
if(!response.ok||result.code!==200||result.status!=='success'){let message=response.status===429?'Please wait 15 seconds before submitting again.':result.message||'Unable to send your inquiry.';if(result.errors)message+=' '+Object.values(result.errors).map(e=>e.message||'').join(' ');throw Error(message)}
status.textContent='Thank you! Your inquiry has been received. Our team will contact you using the details you provided.';status.style.color='#497044';form.reset();
}catch(error){status.textContent=(error.name==='AbortError'?'The request timed out. Please check your connection and try again.':error.message)+' If needed, contact contact@elvarolighting.com.';status.style.color='#a34236'}
finally{clearTimeout(timeout);form.dataset.sending='false';buttons.forEach((b,i)=>{b.disabled=false;b.textContent=labels[i]})}
},true);
});
})();
