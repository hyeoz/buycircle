import mongoose, { Schema } from 'mongoose';
import Item from './item';

const ItemSchema = Item.schema;

// 스키마 지정
// 이미지 파일 저장 기능 추가해야 함
const PostSchema = new Schema({
  // title: String,
  image: Buffer,
  body: String,
  tags: [String],
  publishedDate: {
    type: Date,
    default: Date.now,
  },
  user: {
    _id: mongoose.Types.ObjectId,
    username: String,
  },
  item: [ItemSchema],
});

// 모델 생성
const Post = mongoose.model('Post', PostSchema);
export default Post;
