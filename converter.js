let current = "currency";
const units = {
  currency:["دولار أمريكي","دينار عراقي","يورو","ريال سعودي","جنيه مصري","درهم إماراتي","ريال قطري","دينار كويتي","دينار بحريني"],
  temp:["C","F","K"],
  length:["مم","سم","م","كم","إنش","قدم","ياردة","ميل"],
  weight:["غرام","كغ","طن","أونصة","رطل"],
  time:["ثانية","دقيقة","ساعة","يوم","أسبوع","شهر","سنة"],
  data:["Bit","Byte","KB","MB","GB","TB"],
  area:["م²","كم²","هكتار","أكر","إنش²","قدم²","ياردة²","ميل²"]
};

const currencyRates = {
  "دولار أمريكي":1,
  "دينار عراقي":1300,
  "يورو":0.93,
  "ريال سعودي":3.75,
  "جنيه مصري":30,
  "درهم إماراتي":3.67,
  "ريال قطري":3.64,
  "دينار كويتي":0.31,
  "دينار بحريني":0.38
};

function setCategory(cat, btn){
  current = cat;
  document.querySelectorAll(".category button").forEach(b=>b.classList.remove("active"));
  btn.classList.add("active");
  updateUnits();
}

function updateUnits(filtered=null){
  let from=document.getElementById("from");
  let to=document.getElementById("to");
  from.innerHTML=""; to.innerHTML="";
  let list = filtered || units[current];
  list.forEach(u=>{
    from.innerHTML+=`<option>${u}</option>`;
    to.innerHTML+=`<option>${u}</option>`;
  });
}

function searchUnits(){
  let query=document.getElementById("searchUnit").value.toLowerCase();
  let filtered=units[current].filter(u=>u.toLowerCase().includes(query));
  updateUnits(filtered);
}

function convert(){
  let v=parseFloat(document.getElementById("value").value);
  if(isNaN(v)){document.getElementById("result").innerText="الرجاء كتابة رقم صحيح"; return;}
  let from=document.getElementById("from").value;
  let to=document.getElementById("to").value;
  let r=v;
  if(current==="currency") r=v/currencyRates[from]*currencyRates[to];
  if(current==="temp"){if(from==="C"&&to==="F")r=(v*9/5)+32;else if(from==="F"&&to==="C")r=(v-32)*5/9;else if(from==="C"&&to==="K")r=v+273.15;else if(from==="K"&&to==="C")r=v-273.15;else if(from==="F"&&to==="K")r=(v-32)*5/9+273.15;else if(from==="K"&&to==="F")r=(v-273.15)*9/5+32;}
  if(current==="length"){let map={"مم":0.001,"سم":0.01,"م":1,"كم":1000,"إنش":0.0254,"قدم":0.3048,"ياردة":0.9144,"ميل":1609.34}; r=v*map[from]/map[to];}
  if(current==="weight"){let map={"غرام":0.001,"كغ":1,"طن":1000,"أونصة":0.0283495,"رطل":0.453592}; r=v*map[from]/map[to];}
  if(current==="time"){let map={"ثانية":1,"دقيقة":60,"ساعة":3600,"يوم":86400,"أسبوع":604800,"شهر":2629800,"سنة":31557600}; r=v*map[from]/map[to];}
  if(current==="data"){let map={"Bit":1,"Byte":8,"KB":8*1024,"MB":8*1024*1024,"GB":8*1024*1024*1024,"TB":8*1024*1024*1024*1024}; r=v*map[from]/map[to];}
  if(current==="area"){let map={"م²":1,"كم²":1e6,"هكتار":10000,"أكر":4046.86,"إنش²":0.00064516,"قدم²":0.092903,"ياردة²":0.836127,"ميل²":2.59e6}; r=v*map[from]/map[to];}
  document.getElementById("result").innerText=r + " " + to;
}

updateUnits();