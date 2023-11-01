# Node.js Lv.1

<br>

## 과제 요구 사항: Express.js를 기반으로 CRUD(Create, Read, Update, Delete) 기능이 포함된 REST API 만들기

[http://tonadus.shop:3000/api/products](http://tonadus.shop:3000/api/products)

### 1. 상품 등록 API
    - 상품명, 작성 내용, 작성자명, 비밀번호를 **request**에서 전달받기
    - 상품은 두 가지 상태, **판매 중(`FOR_SALE`)및 판매 완료(`SOLD_OUT`)** 를 가질 수 있습니다.
    - 상품 등록 시 기본 상태는 **판매 중(`FOR_SALE`)** 입니다.
`POST  /api/products` 
    
### 2. 상품 목록 조회 API
    - 상품명, 작성자명, 상품 상태, 작성 날짜 조회하기
    - 상품 목록은 작성 날짜를 기준으로 **내림차순(최신순)** 정렬하기
`GET  /api/products`
    
### 3. 상품 상세 조회 API
    - 상품명, 작성 내용, 작성자명, 상품 상태, 작성 날짜 조회하기
`GET  /api/products/:_id`
    
### 4. 상품 정보 수정 API
    - 상품명, 작성 내용, 상품 상태, 비밀번호를 **request**에서 전달받기
    - 수정할 상품과 비밀번호 일치 여부를 확인한 후, 동일할 때만 글이 **수정**되게 하기
    - 선택한 상품이 존재하지 않을 경우, “상품 조회에 실패하였습니다." 메시지 반환하기
`PATCH  /api/products/:_id`
    
### 5. 상품 삭제 API
    - 비밀번호를 **request**에서 전달받기
    - 수정할 상품과 비밀번호 일치 여부를 확인한 후, 동일할 때만 글이 **삭제**되게 하기
    - 선택한 상품이 존재하지 않을 경우, “상품 조회에 실패하였습니다." 메시지 반환하기
`DELETE  /api/products/:_id`


## Directory Structure

```
├── app.js
├── routes
│   └── products.router.js
├── schemas
│   ├── index.js
│   └── products.schema.js
├── package.json
└── yarn.lock
```
