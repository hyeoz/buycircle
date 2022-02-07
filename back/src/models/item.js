import mongoose, { Schema } from 'mongoose';

const ItemSchema = new Schema({
  name: String,
  price: Number,
  method: ['현금', '카드', '온라인페이'],
  total: Number,
});

const Item = mongoose.model('Item', ItemSchema);
export default Item;
