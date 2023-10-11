//서버 중심파일(FU)
const express = require("express");
const dotenv = require("dotenv");  //몽고디비 아이디,비번 보안(FU) .gitignore
dotenv.config();
const app = express();
const port = 3010; //기존5000번 포트 -> 3010로 수정(FU) / backend port
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const { User } = require("./models/User");
const { auth } = require("./middleware/auth");

// URL을 통해 전달되는 데이터에 한글, 공백 등과 같은 문자가 포함될 경우 제대로 인식되지 않는 문제 해결
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(cookieParser());

mongoose
.connect(`mongodb+srv://${process.env.dbusername}:${process.env.dbpassword}@fu.jfjaess.mongodb.net/Fu`, {
  useNewUrlParser: true,
})
  .then(() => console.log('Connected to MongoDB')) //문구 수정(FU)
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("여기는 루트입니다.")); //문구 수정(FU)

app.get("/api/hello", (req, res) => {
  res.send("hello");
});
app.post("/api/users/register", (req, res) => {
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

app.post("/api/users/login", (req, res) => {
  // 요청된 아이디 db와 동일한지 확인
  User.findOne({ 아이디: req.body.아이디 }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "해당 아이디에 해당하는 유저가 없음",
      });
    }
    // 요청된 아이디가 db에 있으면 비밀번호 맞는지 확인
    user.comparePassword(req.body.비밀번호, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSuccess: false, message: "비밀번호 틀림" });
      // 비밀번호 까지 맞다면 토큰 생성
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        // 토큰을 저장한다 어디에? 쿠키, 로컬 스토리지 둘다 가능
        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id, 직책: user.직책 });
      });
    });
  });

  app.get("/api/users/auth", auth, (req, res) => {
    // 여기까지 미들웨어를 통과해 왔다는 얘기는 auth이 true 라는 말
    res.status(200).json({
      _id: req.user._id,
      isTeacher: req.user.직책 === "학생" ? false : true, //직책기능 구현x 수정 필요(fu)
      isAuth: true,
      이름: req.user.이름,
      학번: req.user.학번,  //버려야함(fu)
      이메일: req.user.이메일,
      직책: req.user.직책, //버려야함(fu)
    });
  });
});
app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true,
    });
  });
});
app.get("/api/infos", function (req, res) {
  User.find({}).exec(function (err, users) {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
});

app.listen(port, () => console.log(`example port ${port}`));
