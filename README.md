1. POST /products
 -> createdAt은 schema에서 default date을 입력하면 자동으로 넣어줄수가 있습니다. 
 -> status는 schema에서 enum 값으로 validation을 할 수 있습니다.
 -> 혹시모를 서버의 에러를 대비하여 try catch문으로 감싸줍니다.
 -> 

2. GET /products 
 -> 혹시모를 서버의 에러를 대비하여 try catch문으로 감싸줍니다.
 -> 리스트를 불러올때 404 not found를 response로 보내줘야할까요?
    설계에 따라서 200으로 나오고 빈배열로 나오게 할 수도 있습니다.
    조회를 해서 아무것도 없을때 -> 조회는 성공이지만 데이터가 없을때
    조회를 실패 했을때 -> 서버가 문제가 있을떄
    

3. GET /products/:_id
 ->이이디를 잘못 넣을시에 서버가 죽습니다. 예외처리를 해주세요 try catch

4. PATCH /products/:_id
 -> schema에서 enum을 활용해서 status를 validation을 해주세요.
    FOR_SALE, SOLD_OUT 같은 
 -> 영어의 의미상으로 products 복수보다는 product 단수형이 의미가 더 맞을거 같습니다. -> 하나만 수정한다.

5. DELETE /products/:_id
 -> 영어의 의미상으로 products 복수보다는 product 단수형이 의미가 더 맞을거 같습니다. -> 하나만 삭제한다. 
 -> 삭제 성공했다면 삭제된 데이터 id가 나오게 하는것도 좋은 방법일 듯 합니다. (성공한 데이터의 id를 보여준다.)
 -> soft delete와 hard delete에 대한 내용을 공부해보세요 실제 프로젝트에서는 어떤 식으로 delete를 구현할지 고민해보세요.






