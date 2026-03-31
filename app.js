const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.static(__dirname));

// API أسعار العملات
app.get('/api/currencies', (req,res)=>{
  const data = fs.readFileSync('./data/currencies.json');
  res.json(JSON.parse(data));
});

// API أخبار البورصة
app.get('/api/news', (req,res)=>{
  const data = fs.readFileSync('./data/news.json');
  res.json(JSON.parse(data));
});

app.listen(PORT, ()=>console.log(`Server running at http://localhost:${PORT}`));