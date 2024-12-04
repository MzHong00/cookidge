2024

10.23
- 기본적인 라우팅 세팅
- join을 최소화한 데이터 모델링 완료
- mongoose 연결 완료
- (models, interface) 엔티티 정의 완료
- jwt 개발 진행 중

10.24
- 몽고디비 atlas 연결 후 입출력 성공
- googleOAuth 구현 중

10.26
- 미들웨어 express Req 타입 declare 생성 (express.d.ts) 

10.27
- isAuth 미들웨어 구현
- 서버에서 응답 토큰으로 전달하기 (오류 해결: 프론트엔드에서도 withCredential:true 해줘야 함)
- express 미들웨어 res 공유 해결 (오류 해결: 구글링에 나오는 것 뿐만 아니라, tsconfig의 "types": ["express.d.ts"]까지 해줬음)
- 몽고디비 pre 미들웨어 학습

10.28
- user fetch /me, /find로 구분
- isAuth 로직 오류 수정

10.29
- swagger 학습
- refrigerator api 구현 중

10.30
- api 문서 일부 작성
- 냉장고 데이터 구조 shared members 추가

11.02
- jwt 인증 오류 해결
- fridge api 구현 중

11.05
- 재료 인터페이스 생성
- ingredient Service, ingredient Interface, refrigerator Service 구현

11.06 ~ 11.07
- 모든 엔티티의 model, interface, service, api 작성 완료
    => 테스트 필요
- celebrate, joi 라이브러리 도입 후 validate 미들웨어 작성 완료

11.13 ~ 11.14
- multer 이미지 못 받아오는 현상 수정
    =>  프론트엔드에서 네트워크 탭에 바이너리 파일로 와야함 (기존에는 [Object FileList])
- cloudinary와 백엔드 서버 통신 구현
- cloudinary에 이미지 올릴 경우, transformation 속성으로 최적화 후 DB에 저장하는 방식으로 구현
    =>  기존에는 eager 속성으로 클라우드 공간을 좀 더 효율적으로 사용하기 위하여 transformation으로 변경

11.19
- JWT 토큰 Payload 구조 변경
- 기존의 불필요하게 들어갔던 attachCurrentUser 제거

11.20
- 레시피 좋아요 api 구현

11.21
- ObjectId와 string 간의 타입 모호성 명확하게 수정
- 나의 레시피 api 구현

11.24 ~ 11.25
- 모든 데이터 모델링 참조관계에서 string의 id를 objectId 형식으로 모두 수정
- 댓글 find -> aggregate로 user의 name과 picture을 받기 위해 조인
- categories 다중 선택 가능으로 변경
- 좋아요 순 정렬 오류 해결 => find를 aggregate로 like_members배열을 숫자로 계산후 정렬

11.26
- 몽고디비 모델 pre함수 에러 해결 => 화살표 함수 this 스코프 문제
- 개발자 본인을 제외한 다른 유저 로그인 오류 해결 => google console 설정 변경

11.28 ~ 12.01
- 유저 업데이트 오류 수정
- 레시피 업데이트, 삭제 오류 수정
- 검색 api 구현

12.02
- 레시피 추천 api 구현