import Router from "koa-router";
import * as authCtrl from "./auth.ctrl";

const auth = new Router();

auth.post("/register", authCtrl.register); // 회원가입 페이지
auth.post("/login", authCtrl.login); // 로그인 페이지
auth.get("/check", authCtrl.check); //
auth.post("/logout", authCtrl.logout); // 로그아웃 처리

export default auth;
