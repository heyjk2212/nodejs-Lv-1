import express from "express";
import ProductSales from "../schemas/products.schema.js";

const router = express.Router();

// 상품 등록 API - Done
router.post("/products", async (req, res) => {
  // 클라이언트에게 전달받은 데이터를 변수에 저장
  const { title, content, author, password } = req.body;

  if (!(title && content && author && password)) {
    return res
      .status(400)
      .json({ errorMessage: "데이터 형식이 올바르지 않습니다." });
  }

  // ProductSales 모델을 이용해서 새로운 제품 등록
  const product = new ProductSales({
    title,
    content,
    author,
    password,
  });

  // 등록하려는 제품정보를 mongoDB에 저장
  await product.save();

  return res.status(201).json({ message: "판매 상품을 등록하였습니다." });
});

// 상품 목록 조회 API  - Done
router.get("/products", async (req, res) => {
  // model에서 데이터 가져오기
  // .select() 메서드를 사용하면 원하는 필드만 선택해서 클라이언트에 리턴한다
  const products = await ProductSales.find()
    .select("_id title author status createdAt")
    .sort({ createdAt: -1 }) // createdAt을 기준으로 내림차순 정렬
    .exec();

  // 찾은 데이터 전달하기
  return res.status(200).json({ products });
});

// 상품 상세 조회 API  - Done
router.get("/product/:_id", async (req, res) => {
  try {
    // 조회할 상품 id를 가져온다
    const { _id } = req.params;

    if (!_id) {
      return res
        .status(400)
        .json({ message: "데이터 형식이 올바르지 않습니다." });
    }

    // 상품명, 작성 내용, 작성자명, 상품 상태, 작성 날짜 조회하기
    // .select() 메서드를 사용하면 원하는 필드만 선택해서 클라이언트에 리턴한다!
    const product = await ProductSales.findById({ _id })
      .select("_id title content author status createdAt")
      .exec();

    if (!product) {
      return res.status(404).json({ message: "상품 조회에 실패하였습니다." });
    }

    return res.status(200).json({ product });
  } catch (error) {
    console.error(error);
  }
});

// 상품 정보 수정 API
router.patch("/product/:_id", async (req, res) => {
  try {
    // 변경할 상품을 id를 통해 가져온다
    const { _id } = req.params;

    if (!_id) {
      return res
        .status(400)
        .json({ message: "데이터 형식이 올바르지 않습니다." });
    }

    // 상품명, 작성 내용, 상품 상태, 비밀번호를 request에서 전달받기
    const { title, content, status, password } = req.body;

    // 변경하려는 제품의 정보 가져오기
    const product = await ProductSales.findById(_id).exec();

    // 선택한 상품이 존재하지 않을 경우, “상품 조회에 실패하였습니다." 메시지 반환하기
    if (!product) {
      res.status(404).json({ errorMessage: "상품 조회에 실패하였습니다." });
    }

    // 수정할 상품과 비밀번호 일치 여부를 확인한 후, 동일할 때만 글이 수정되게 하기
    if (product.password === password) {
      product.title = title;
      product.content = content;
      product.status = status;

      // 변경한 정보들 저장하기
      await product.save();

      return res.status(200).json({ message: "상품 정보를 수정하였습니다." });
    } else {
      return res
        .status(401)
        .json({ message: "상품을 수정할 권한이 존재하지 않습니다." });
    }
  } catch (error) {
    console.error(error);

    return res
      .status(500)
      .json({ errorMessage: "서버 오류가 발생하였습니다." });
  }
});

// 상품 삭제 API  - Done
router.delete("/product/:_id", async (req, res) => {
  try {
    // 삭제할 상품을 id를 통해 가져온다
    const { _id } = req.params;

    if (!_id) {
      return res
        .status(400)
        .json({ message: "데이터 형식이 올바르지 않습니다." });
    }

    // 비밀번호를 request에서 전달받기
    const { password } = req.body;

    const product = await ProductSales.findById({ _id }).exec();

    // 선택한 상품이 존재하지 않을 경우, “상품 조회에 실패하였습니다." 메시지 반환하기
    if (!product) {
      return res
        .status(404)
        .json({ errorMessage: "상품 조회에 실패하였습니다." });
    }

    // 수정할 상품과 비밀번호 일치 여부를 확인한 후, 동일할 때만 글이 삭제되게 하기
    if (product.password === password) {
      await ProductSales.deleteOne({ _id }).exec();
    } else {
      return res
        .status(401)
        .json({ message: "상품을 삭제할 권한이 존재하지 않습니다" });
    }

    // 삭제 성공했다면 삭제된 데이터 id가 나오게 한다
    return res
      .status(200)
      .json({ message: `성공적으로 ${_id}가 삭제되었습니다.` });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ errorMessage: "서버에 문제가 생겼습니다." });
  }
});

export default router;
