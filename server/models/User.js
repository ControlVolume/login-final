const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const userSchema = mongoose.Schema({ //프론트와 협의해서 영어표기할 필요 잇음
  이름: {
    type: String,
    maxlength: 50,
  },
  학번: {// 프로젝트 반영x (없애야함)
    type: Number,
    maxlength: 20,
  },
  이메일: {
    type: String,
    trim: true,
    unique: 1,
  },
  아이디: {
    type: String,
    maxlength: 20,
    unique: 1,
  },
  비밀번호: {
    type: String,
    minlength: 6,
  },
  직책: {
    type: String, // 프로젝트 반영x (없애야함)
  },
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

userSchema.pre("save", function (next) {
  let user = this;
  if (user.isModified("비밀번호")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.비밀번호, salt, function (err, hash) {
        if (err) return next(err);

        user.비밀번호 = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
  //plainPassword == 암호화된 비밀번호
  bcrypt.compare(plainPassword, this.비밀번호, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function (cb) {
  var user = this;
  //jwt 이용 토큰 생성
  var token = jwt.sign(user._id.toHexString(), "secretToken");
  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};
userSchema.statics.findByToken = function (token, cb) {
  var user = this;
  ///토큰을 decode한다
  jwt.verify(token, "secretToken", function (err, decoded) {
    // 유저 아이디를 이용해서 유저를 찾은 다음에
    // 클라이언트에서 가져온 토큰과 db에 보관된 토큰이 일치하는지 확인

    user.findOne({ _id: decoded, token: token }, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};
const User = mongoose.model("User", userSchema);

module.exports = { User };
