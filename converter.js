let current = "currency";

const units = {
  currency:["دولار أمريكي","دينار عراقي","يورو","ريال سعودي"],
  temp:["C","F","K"],
  length:["مم","سم","م","كم"],
  weight:["غرام","كغ","طن"],
  time:["ثانية","دقيقة","ساعة"],
  data:["Bit","Byte","KB","MB","GB"],
  area:["م²","كم²","هكتار"]
};

const currencyRates = {
  "دولار أمريكي":1,
  "دينار عراقي":1300,
  "يورو":0.93,
  "ريال سعودي":3.75
};

function setCategory(cat, btn){
  current = cat;
  document.querySelectorAll(".category button").forEach(b=>b.classList.remove("active"));
  btn.classList.add("active");
  updateUnits();
}

function updateUnits(){
  let from=document.getElementById("from");
  let to=document.getElementById("to");
  from.innerHTML=""; to.innerHTML="";
  units[current].forEach(u=>{
    from.innerHTML+=`<option>${u}</option>`;
    to.innerHTML+=`<option>${u}</option>`;
  });
}

function convert(){
  let v=parseFloat(document.getElementById("value").value);
  let from=document.getElementById("from").value;
  let to=document.getElementById("to").value;
  let r=v;

  if(current==="currency") r=v/currencyRates[from]*currencyRates[to];

  document.getElementById("result").innerText=r + " " + to;
}

updateUnits();
