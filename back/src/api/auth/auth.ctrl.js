import User from "../../models/user";
import Joi from "joi";

/* 회원가입
POST /api/auth/register 
  {
    username: 'hyeoz',
    password: '0203'
  }
*/
export const register = async (ctx) => {
  // 검증
  const schema = Joi.object().keys({
    username: Joi.string().alphanum().min(5).max(20).required(), // 아이디는 알파벳, 숫자, 5~20 글자 사이
    password: Joi.string().required(),
  });
  const validResult = schema.validate(ctx.requset.body);
  if (validResult.error) {
    ctx.status = 400;
    ctx.body = validResult.error;
    return;
  }
  // 검증 후 회원가입 과정 진행
  const { username, password } = ctx.requset.body;
  // 아이디 중복 확인
  try {
    const exist = await User.findByUsername(username); // 스태틱 메서드로 models/user 에서 정의함
    if (exist) {
      ctx.status = 409;
      return;
    }
    const user = new User({
      username,
    });
    await user.setPassword(password); // 인스턴스 메서드로 models/user 에서 정의함
    await user.save();

    ctx.body = user.serialize(); // 인스턴스 메서드로 models/user 에서 정의함

    const token = user.generateToken(); // 인스턴스 메서드로 models/user 에서 정의함
    ctx.cookies.set("access-token", token, {
      maxAge: 1000 * 60 * 60 * 24, // 하루 유지
      httpOnly: true,
    });
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* POST /api/auth/login 
  {
    username: 'hyeoz',
    password: '0203'
  }
*/
export const login = async (ctx) => {
  const { username, password } = ctx.request.body;
  // 에러처리
  if (!username || !password) {
    ctx.status = 401;
    return;
  }
  // 로그인 처리
  try {
    const user = await User.findByUsername(username); // 스태틱 메서드로 models/user 에서 정의함
    // 로그인 중 에러처리
    // 계정이 존재하지 않을 때
    if (!user) {
      ctx.status = 401;
      return;
    }
    const validPassword = await User.checkPassword(password); // 인스턴스 메서드로 models/user 에서 정의함
    // 잘못된 비밀번호를 입력했을 때
    if (!validPassword) {
      ctx.status = 401;
      return;
    }
    // 에러 없으면 로그인처리
    ctx.body = user.serialize();
    // 토큰 처리
    const token = user.generateToken();
    // 쿠키에 담아서 사용
    ctx.cookies.set("access_token", token, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* GET /api/auth/check */
export const check = async (ctx) => {
  // 로그인 상태 확인
  const { user } = ctx.state;
  // 로그인중이 아니면 에러처리
  if (!user) {
    ctx.status = 401;
    return;
  }
  ctx.body = user;
};

/* POST /api/auth/logout */
export const logout = async (ctx) => {
  // 로그아웃
  // 토큰 삭제처리
  ctx.cookies.set("access_token");
  ctx.status = 204;
};
