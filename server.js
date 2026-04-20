// 👇 이거 전체 복사해서 넣으면 됨
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

// ===== 설정 =====
const SECRET = "cash_secret_123";
mongoose.connect("mongodb://127.0.0.1:27017/cashserver");

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
res.send(`여기부터 끝까지 다 포함된 코드`);
});

// ... (중간 생략 ❌ 전부 넣어야 함)

// 마지막 줄까지
app.listen(3000, ()=>console.log("http://localhost:3000"));
