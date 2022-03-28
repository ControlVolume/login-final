import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { auth } from "../_action/user_action";
export default function (SpecificComponent, option, adminRoute = null) {
  //null = 아무나 출입가능 페이지
  //ture = 로그인 유저만 출입가능
  //false = 로그인한 유저 출입 불가
  function AuthCheck(props) {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(auth()).then((res) => {
        console.log(res);
        //로그인 하지 않은 상태
        if (!res.payload.isAuth) {
          if (option) {
            props.history.push("/login");
          }
        } else {
          // 로그인 한 상태
          if (adminRoute && !res.payload.isTeacher) {
            props.history.push("/");
          } else {
            if (option === false) {
              props.history.push("/");
            }
          }
        }
      });
    }, []);
    return <SpecificComponent />;
  }
  return AuthCheck;
}
