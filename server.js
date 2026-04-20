// 👇 이거 전체 복사해서 넣으면 됨
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

// ===== 설정 =====
const SECRET = "cash_secret_123";
mongoose.connect(process.env.MONGO_URI);

// ===== DB =====
const User = mongoose.model("User", {
  name:String,
  coins:Number,
  score:Number,
  isAdmin:Boolean,
  freePlay:Boolean,
  lastClaim:Date,
  friends:[String]
});

// ===== HTML =====
app.get("/", (req,res)=>{
res.send(`app.get("/", (req,res)=>{
res.send(`
<h1>cash서버</h1>
<p style="font-size:12px;color:gray;">베이드캐시타일러가 만들었다</p>

<input id="name" placeholder="닉네임">
<button onclick="login()">로그인</button>

<h3>코인: <span id="coins">0</span></h3>

<button onclick="play()">게임하기 (-1코인)</button>

<h3>친구 추가</h3>
<input id="friend"><button onclick="addFriend()">추가</button>

<h3>랭킹</h3>
<div id="rank"></div>

<script>
let token="";

async function login(){
 let name = document.getElementById("name").value;

 let res = await fetch("/login",{
  method:"POST",
  headers:{"Content-Type":"application/json"},
  body:JSON.stringify({name})
 });

 let data = await res.json();
 token=data.token;
 document.getElementById("coins").innerText=data.user.coins;
 loadRank();
}

async function play(){
 let res = await fetch("/play",{
  method:"POST",
  headers:{
    "Authorization":token
  }
 });

 let data = await res.json();

 if(!data.ok){
  alert("코인 없음!");
 }else{
  document.getElementById("coins").innerText=data.coins;
 }
}

async function addFriend(){
 let target=document.getElementById("friend").value;

 await fetch("/friend",{
  method:"POST",
  headers:{
    "Content-Type":"application/json",
    "Authorization":token
  },
  body:JSON.stringify({target})
 });
}

async function loadRank(){
 let res=await fetch("/rank");
 let data=await res.json();

 let html="";
 data.forEach((u,i)=>{
  html += (i+1)+". "+u.name+" ("+u.score+")<br>";
 });

 document.getElementById("rank").innerHTML=html;
}
</script>
`);
});`);
});

// ... (중간 생략 ❌ 전부 넣어야 함)

// 마지막 줄까지
app.listen(3000, ()=>console.log("http://localhost:3000"));
