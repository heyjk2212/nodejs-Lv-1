import express from "express";
import connect from "./schemas/index.js";
import productsRouter from "./routes/products.router.js";

const app = express();
const PORT = 3000;

// mongodb연결
connect();

// body-parser의 역할 => req.body의 데이터를 사용할 수 있도록 함
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 1. 라우터 생성
// const router = express.Router();

// 2. 라우터에 API 구현
// router.get("/", (req, res) => {
//   return res.json({ message: "Hello" });
// });

// 3. 라우터를 전역 middleware로 등록
// 앞에 /api가 붙은 경로로 접근하는 경우에만 라우터로 연결된다
// app.use("/api", [router, productsRouter]);
// express에 router를 연결
app.use("/api", [productsRouter]);

// 포트 3000번으로 서버를 시작
app.listen(PORT, () => {
  console.log(PORT, "port 3000번이 열렸어요!");
});
