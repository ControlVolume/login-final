# Login-Register-practice

> 프론트는 리액트, 백서버는 express와 몽고db를 연동하여 구현하였다, 인증은 jwt를 이용  
백앤드는 아예 무지했어서 프론트와 백사이에 통신시 어떤방식으로 get 이나 post를 날려야하는지 조금이나마 감을 잡을수 있었다.

# 초기화면
![](https://images.velog.io/images/boyfromthewell/post/4b426ed6-5b55-4ccc-94fc-7d95dd1b5bd5/image.png)

## 회원 가입

![](https://images.velog.io/images/boyfromthewell/post/685a10f2-77a0-41c4-830a-cc62d56b8bc7/image.png)  
비밀번호가 6자리가 넘지 않을경우 '6자리 이상으로 입력하세요' 라는 문구가 뜬다. 직책에는 학생, 선생님으로 선택가능

![](https://images.velog.io/images/boyfromthewell/post/6d51892b-0d52-44cb-9cca-a6f52408b7fe/image.png)  
잘 입력해서 회원가입 성공하면 alert 띄워주고 로그인창으로 이동하도록 구현하였다.

![](https://images.velog.io/images/boyfromthewell/post/fed51113-c70b-45ad-9485-b4c626d41a17/image.png)  
몽고 db에 해당 회원가입 정보가 잘 들어온다. 비밀번호는 암호화하여 저장

### 로그인

방금 가입한 정보로 로그인을 시도한다.  

![](https://images.velog.io/images/boyfromthewell/post/6e259e3b-6352-4e55-82e8-5e7972c48ce0/image.png)  

![](https://images.velog.io/images/boyfromthewell/post/29c85900-bbd9-40bf-95fb-a0a1ca3b5949/image.png)  
요청된 아이디가 db와 동일한지 확인하고 요청된 아이디가 db에 있으면 비밀번호도 맞는지 확인해준다.  
  
비밀번호까지 맞다면 jwt토큰을 생성해주고 토큰을 쿠키에 저장하였다. 인증까지 완료 되어 로그인이 성공다면 직책에 따른 페이지로 이동한다. 그리고 로그인한 유저의 이름을 띄워주었다  
  
로그아웃 버튼도 구현하였다 클릭시 jwt 토큰을 지워버려, 로그인이 풀리게 만들고 홈화면으로 이동시킴

### 교수자 페이지

![](https://images.velog.io/images/boyfromthewell/post/fa7cacea-5b62-412b-8d4d-d3292c3db04d/image.png)  
db에 직책이 '선생님'인 데이터가 있는데 이 계정으로 로그인을 시도할것이다.

![](https://images.velog.io/images/boyfromthewell/post/323ee93c-4d8b-4032-8b0e-ec998b48a4b5/image.png)  
로그인이 성공했다면 교수자 페이지로 이동되고, 해당 유저의 이름도 띄워준다.  
  
그리고 db에서 모든 유저정보를 불러온뒤 직책이 학생인 유저만 필터링해서 렌더링 해주었다.

> 무심코 썼던 로그인, 회원가입이 정말 개같이 어려운 작업임을 느꼈다...............................


-----------------
[client] 프론트엔드
[server] 백엔드

해당 코드는 
https://velog.io/@boyfromthewell/%EA%B0%84%EB%8B%A8%ED%95%9C-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85-%ED%8E%98%EC%9D%B4%EC%A7%80-%EA%B5%AC%ED%98%84

작성하신 glow_soon (나는야 코린이)님것을 가져와 연습했음을 알려드립니다.
