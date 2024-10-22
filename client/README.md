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

10.12
- (pages) user 페이지 구현 중
- (widgets) recipe 카드 채팅부분 제거 (채팅은 독립적으로 위젯 생성 예정)

10.13
- (pages) user 페이지 구현 완료
- (pages) user/settings 페이지 구현 중

10.14
- (pages) user/settings 페이지 구현 완료
- 컴포넌트 리팩토링 (재료 테이블)
- (shared) 컴포넌트들 반응형으로 약간의 업데이트

10.15
- (widgets) 재료 생성 박스 수정 및 완료
- (features) 기존 ingredientTableRow, List 등 모호한 의미 교체
    => ingredientTable로 변환 feature폴더의 update와 delete를 edit으로 통합
- user 메뉴바 구현
- Recipe 모델에서 comment속성 제외 결정
- 레시피 카드에서 chat 아이콘을 별점 아이콘으로 변경 후, 레시피 모델 별점 속성 추가

10.16
- (widgets) 레시피 과정 슬라이더 반응형 UI 구현 완료
- (widgets) detail 페이지의 레시피 카드를 따로 detail 카드 위젯 UI 구현 완료

10.17
- 레시피 카드들 이미지 max-width 설정

10.18
- Framer-motion 학습 및 도입

10.19
- Framer-motion을 사용하여 페이지 이동시, Fade효과
- (widgets) footer 제작 및 저작권 표시 Icons8
- 여러 반응형 UI 수정
- recipe 카테고리 추가 필요성 반영
- 음식, 재료 아이콘 Icons8에서 수집

10.20
- scss 도입
- app.scss 전역 css 및 scss mixin 정의
- scss가 필요한 컴포넌트들 scss로 변경
- 페이지 이동시 스크롤 맨 위 이동 구현

10.22
- icons8의 재료, 음식 카테고리 아이콘 이미지 수집
- 카테고리 아이콘 UI 구현
- sass legacy code 제거
- 프론트엔드 UI 껍데기 첫 번쨰 배포
