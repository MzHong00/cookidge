2024

09.29
- 프로젝트 초기화
- (api) axios 인터셉터, jwt 인증 요청 개발

09.30
- UI 설계를 기반으로 각각의 폴더에 알맞은 컴포넌트 폴더 배치
- (shared) 재사용 컴포넌트 (iconButton, subjectBox, clodinary) 개발

10.01
- (widgets) 헤더, 사이드바 UI 구현
- (widgets) 레시피 카드, 댓글 창 UI 구현 중

10.02
- (pages) 대시보드 UI 구현 중
- (widgets) ingredient, 구현 중
- 데이터 모델링 댓글 컬렉션 참조 방식으로 결정
    => comment.author_id 와 user를 $lookup을 사용하는 방법이 최선

10.04
- (features) ingredientBox를 table태그를 사용해서 구성

10.06
- (features) ingredient의 create, view UI 구현
- (shared) useDialog, useModal 가져오기

10.07
- (pages) 대시보드 레시피 탭 UI 구현
- (widgets) 레시피 카드 UI 구현 중

10.08
- 대시보드 라우팅 구현

10.09
- (pages) 레시피 detail 페이지
- (widgets) 반응형 레시피 재료 태그 추가 및 카드 UI 구현 완료
- (shared) recipe 타입 레시피 제조 과정인 step 속성 추가
- (features) 레시피 생성 폼 구현 중