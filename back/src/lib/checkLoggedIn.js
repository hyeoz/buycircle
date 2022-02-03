/* 로그인 되어있는지 확인하는 미들웨어 */
export const checkLoggedIn = (ctx, next) => {
  // 유저 정보가 없으면 로그인되어있지 않음
  if (!ctx.state.user) {
    ctx.status = 401;
    return;
  }
  // 유저 정보가 있으먄 다음으로 넘겨줌
  return next();
};
