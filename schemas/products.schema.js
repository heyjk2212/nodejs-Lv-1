// Design mongoose schema and model to use mongodb
import mongoose from "mongoose";

const ProductSalesSchema = new mongoose.Schema({
  productName: {
    // 상품명
    type: String,
    required: true,
  },
  description: {
    // 작성 내용
    type: String,
    required: true,
  },
  author: {
    // 작성자명
    type: String,
    required: true,
  },
  password: {
    // 비밀번호
    type: Number,
    required: true,
  },
  productStatus: {
    // 상품 상태
    type: String,
    required: false, // productStatus field is Not required
  },
  createdAt: {
    // 작성 날짜
    type: Date, // The createdAt field has type Date
    required: true,
  },
});

// ProductSalesSchema를 바탕으로 ProductSales 모델을 생성하여 외부로 보낸다
export default mongoose.model("ProductSales", ProductSalesSchema);