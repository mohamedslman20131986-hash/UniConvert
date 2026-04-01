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

  if(current==="currency"){
    r = v/currencyRates[from]*currencyRates[to];
  }
  else if(current==="temp"){
    let tempC;
    if(from==="C") tempC = v;
    else if(from==="K") tempC = v - 273.15;
    else if(from==="F") tempC = (v - 32) * 5/9;

    if(to==="C") r = tempC;
    else if(to==="K") r = tempC + 273.15;
    else if(to==="F") r = tempC * 9/5 + 32;
  }
  else if(current==="length"){
    let lengthM;
    if(from==="مم") lengthM = v / 1000;
    else if(from==="سم") lengthM = v / 100;
    else if(from==="م") lengthM = v;
    else if(from==="كم") lengthM = v * 1000;

    if(to==="مم") r = lengthM * 1000;
    else if(to==="سم") r = lengthM * 100;
    else if(to==="م") r = lengthM;
    else if(to==="كم") r = lengthM / 1000;
  }
  else if(current==="weight"){
    let wGr;
    if(from==="غرام") wGr = v;
    else if(from==="كغ") wGr = v * 1000;
    else if(from==="طن") wGr = v * 1000000;

    if(to==="غرام") r = wGr;
    else if(to==="كغ") r = wGr / 1000;
    else if(to==="طن") r = wGr / 1000000;
  }
  else if(current==="time"){
    let tSec;
    if(from==="ثانية") tSec = v;
    else if(from==="دقيقة") tSec = v * 60;
    else if(from==="ساعة") tSec = v * 3600;

    if(to==="ثانية") r = tSec;
    else if(to==="دقيقة") r = tSec / 60;
    else if(to==="ساعة") r = tSec / 3600;
  }
  else if(current==="data"){
    let b;
    if(from==="Bit") b = v;
    else if(from==="Byte") b = v * 8;
    else if(from==="KB") b = v * 8 * 1024;
    else if(from==="MB") b = v * 8 * 1024 * 1024;
    else if(from==="GB") b = v * 8 * 1024 * 1024 * 1024;

    if(to==="Bit") r = b;
    else if(to==="Byte") r = b / 8;
    else if(to==="KB") r = b / (8*1024);
    else if(to==="MB") r = b / (8*1024*1024);
    else if(to==="GB") r = b / (8*1024*1024*1024);
  }
  else if(current==="area"){
    let aM2;
    if(from==="م²") aM2 = v;
    else if(from==="كم²") aM2 = v * 1000000;
    else if(from==="هكتار") aM2 = v * 10000;

    if(to==="م²") r = aM2;
    else if(to==="كم²") r = aM2 / 1000000;
    else if(to==="هكتار") r = aM2 / 10000;
  }

  document.getElementById("result").innerText = r + " " + to;
}

updateUnits();
