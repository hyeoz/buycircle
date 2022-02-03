import Router from "koa-router";
import { checkLoggedIn } from "../../lib/checkLoggedIn.js";
import * as postCtrl from "./posts.ctrl.js";

const posts = new Router();

posts.get("/", postCtrl.list); // 글 목록 불러오기
posts.post("/", checkLoggedIn, postCtrl.write); // 글 작성하기

const post = new Router();

post.get("/", postCtrl.read); // 글 읽기
/* 수정과 삭제는 로그인 한 경우 + 특정 글이 본인이 작성한 글일때만 가능하도록 */
post.delete("/", checkLoggedIn, postCtrl.checkOwnPost, postCtrl.remove); // 특정 글 삭제하기
post.patch("/", checkLoggedIn, postCtrl.checkOwnPost, postCtrl.update); // 특정 글 수정하기

/* id 필요한 라우트는 묶어서 사용 */
posts.use("/:id", postCtrl.getPostById, post.routes());

export default posts;
