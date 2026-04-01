async function loadNews(){
  try{
    const res = await fetch('https://api.exchangerate.fun/latest?base=USD');
    const data = await res.json();

    const rate = data.rates.IQD;

    document.getElementById("currency-section").innerHTML = `
      <p>💵 1 دولار = ${rate.toFixed(0)} دينار عراقي</p>
    `;

    document.getElementById("news-section").innerHTML = `
      <p>📰 السوق يتغير حسب سعر الدولار العالمي</p>
    `;

    document.getElementById("last-update").innerText =
      "آخر تحديث: " + new Date().toLocaleString('ar-EG');

  }catch(e){
    console.log("خطأ", e);
  }
}

loadNews();
setInterval(loadNews, 60000);
