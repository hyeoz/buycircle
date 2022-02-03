import Post from "../../models/post";
import Joi from "joi";
import mongoose from "mongoose";

/* 몽고디비에서 생성되는 ObjectId 검증용 */
const { ObjectId } = mongoose.Types;

/* 각 포스트가 로그인한 유저가 작성한 포스트인지 확인하는 라우터네 공통으로 넣기 위해 분리 */
export const checkOwnPost = (ctx, next) => {
  const { user, post } = ctx.state;
  if (post.user._id.toString() !== user.id) {
    ctx.status = 403;
    return;
  }
  return next();
};

/* POST /api/posts
{
  title: 제목,
  body: 내용,
  tags: 태그
} */
export const write = async (ctx) => {
  // 생성하는 객체가 다음 필드를 가지고 있는지 검증
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    body: Joi.string().required(),
    tags: Joi.array().items(Joi.string()),
  });
  const validResult = schema.validate(ctx.request.body);
  // 검증 실패인 경우 에러 처리
  if (validResult.error) {
    ctx.status = 400;
    ctx.body = validResult.error;
    return;
  }

  // 검증 통과한 본문 저장하기
  const { title, body, tags } = ctx.request.body;
  const post = new Post({
    title,
    body,
    tags,
  });
  try {
    await post.save();
    ctx.body = post;
    const posts = [];
    posts.push(post);
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* GET /api/posts */
export const list = async (ctx) => {
  // 요청 주소 뒤에 붙는 parameter 와 query 구조분해할당
  const { tag, username } = ctx.query;
  // tag 나 parameter 가 있으면 넣고, 없으면 넣지않음
  const query = {
    ...(username ? { "user.username": username } : {}),
    ...(tag ? { tags: tag } : {}),
  };
  // 페이지네이션을 위한 페이지 생성
  const page = parseInt(ctx.query.page || 1, 10); // 페이지값이 없다면 1로 설정. 문자를 10진수 숫자로 형식 변환하기
  // 1보다 작은 페이지는 잘못된 접근으로 에러 처리
  if (page < 1) {
    ctx.status = 400;
    return;
  }

  try {
    // 쿼리로 바로 포스트 조회
    const posts = await Post.find(query)
      .sort({ _id: -1 }) // id 역순으로 최신 글부터 보이도록
      .limit(10) // 10개 제한으로 페이지네이션
      .skip((page - 1) * 10) // 10개마나 넘어가서 페이지네이션
      .exec(); // exec 붙여줘야 요청넘어감
    // 쿼리로 포스트 조회한 후 갯수 세기
    const postCount = await Post.countDocuments(query).exec();
    // 헤더에 Last-Page 로 마지막 페이지 값 정보 넣기
    ctx.set("Last-Page", Math.ceil(postCount / 10));

    // 리스트에서 포스트 확인할 때 본문 내용 200자까지만 보이도록
    ctx.body = posts
      .map((post) => post.toJSON())
      .map((post) => ({
        ...post,
        body:
          post.body.length < 200
            ? post.body
            : `${post.body.slice(0, 200)}...(더보기)`,
      }));
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* 특정 포스트 조회
GET /api/posts/:id */
/* 각 아이디별 포스트를 가져오는 모든 라우터에 공통으로 넣기 위해 분리 */
export const getPostById = async (ctx, next) => {
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400;
    return;
  }
  try {
    const post = await Post.findById(id);

    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.state.post = post;
    return next();
  } catch (e) {
    ctx.throw(500, e);
  }
};
/* 포스트 읽어오기는 분리된 라우트 활용하여 그대로 넣어주기만 하면 됨 */
export const read = (ctx) => {
  ctx.body = ctx.state.body;
};

/* 포스트 지우기
DELETE /api/posts/:id 
  remove() : 다 지우기
  findByIdAndRemove() : 아이디 찾아서 지우기
  findOneAndRemove() : 특정 조건 만족하는 데이터 하나 찾아서 제거
*/
export const remove = async (ctx) => {
  const { id } = ctx.params;
  try {
    await Post.findByIdAndRemove(id).exec();
    ctx.statue(204); // 데이터 찾아서 삭제했기 때문에 응답은 성공했지만 데이터는 없는 204 넘기기
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* 포스트 수정하기
PATCH /api/posts/:id 
{
  title: 수정,
  body: 수정,
  tags: ['수정', '태그']
}
*/
export const update = async (ctx) => {
  const { id } = ctx.params;
  // 수정이기 때문에 포스트 작성에서 필수로 두었던 조건들을 required 로 두지않아도 됨
  const schema = Joi.object().keys({
    title: Joi.string(),
    body: Joi.string(),
    tags: Joi.array().items(Joi.string()),
  });
  const validResult = schema.validate(ctx.request.body);
  if (validResult.error) {
    ctx.status = 400;
    ctx.body = validResult.error;
    return;
  }

  try {
    const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
      new: true,
    }).exec(); // 찾을 아이디, 업데이트 할 컨텐츠, 옵션
    // 검증
    if (!post) {
      ctx.status = 400;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};
