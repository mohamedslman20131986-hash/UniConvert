async function loadNews(){
  try {
    const currencyRes = await fetch('/api/currencies');
    const newsRes = await fetch('/api/news');
    const currencies = await currencyRes.json();
    const news = await newsRes.json();

    const curDiv = document.getElementById('currency-section');
    curDiv.innerHTML = '';
    currencies.forEach(c=>{
      curDiv.innerHTML+=`
      <div>
        <img src="${c.img}" width="40">
        <div>
          <p><strong>${c.name}</strong></p>
          <p>1 ${c.short} = ${c.rate} IQD</p>
        </div>
      </div>`;
    });

    const newsDiv = document.getElementById('news-section');
    newsDiv.innerHTML = '<p>📰 آخر أخبار البورصة:</p><ul>'+news.map(n=>`<li><img src="${n.icon}" width="20"> ${n.text}</li>`).join('')+'</ul>';

    document.getElementById('last-update').innerText = 'آخر تحديث: '+new Date().toLocaleDateString('ar-EG');
  } catch(e){
    console.error(e);
  }
}
loadNews();