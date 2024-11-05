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

11.06
(예정) 냉장고, 재료 서비스 테스트 및 프론트와 연결