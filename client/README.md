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

10.26
- 로고 변경
- 로그인 폼 UI 변경

10.27
- google Oauth 회원가입 연동 완료
- (pages) google oauth redirect 페이지 제작
- jwt 토큰 흐름 결정 
    => 로그인 시, refresh token발급, access token은 페이지 새로고침시 1번, 그 외 서버 요청에서 재발급
- react router loader 를 사용한 root 로더 제작 및 다른 로더들 구현 결정
    => Root 페이지에서 유저와 엑세스 토큰을 prefetch
- (pages) 유저 페이지 /:id를 사용해 다른 사용자 검색 가능하도록 설계
- zustand slice를 사용하여 유저 정보 전역으로 관리 구현

10.28 
- 로그인 성공했을 때, 홈으로 리다이렉트 되면서 즉시, 유저 데이터가 반영 안되는 현상 (새로고침 해야 유저 정보를 가져오는 상황)
    => 원인 1. redirect에서 home으로 새로고침 시 헤더에 넣어논 access token이 없어짐 
            => window.href를 Navigate로 변경
            2. redirect페이지에서 home으로 온 뒤, root loader를 발생시킬 때, 헤더에 access token이 undefiend인 상황
            => redirect 로직을 redirect page component 내부에서 실행하는 것 대신, 로직을 로더 함수로 바꾼 후, 라우터에 적용
- 사용자 fetch를 me와 find로 나눔, find는 다른 사용자의 데이터를 가져올 때 사용

10.30
- dashboard 뒤로가기 에러 해결
- type과 api를 shared/api로 통합 

11.05
- (feature) creationIngredientBox 제거 및 ingredientForm(재료 생성) UI 변경
- ingredientForm 개발 중
- 재료 api 및 service 구현

11.08
- ingredient create 연결 완료
- ingredient create UI 변경
- ingredient read 로직 변경
    =>  from: dashboard에서 모든 냉장고를 모두 queries하는 로직
        to: 냉장고를 선택할 때, 해당 냉장고만 query하는 로직

11.09
- ingredient 유통기한 표시 안되는 오류 해결
    =>  원인: 'YYYY-MM-DD'를 몽고디비의 Date Type에 넣으면 형식이 바뀜
        해결: 재료 Model의 expired_at 타입 String으로 변경

- 웬만한 react-router-loader 철회
    원인: 로더를 통한 useFetch 사용 시, fresh한 데이터라고 예측되더라도 다시 fetch하게 됨. 이러면  로더의 역할을 챙기더라도 tanstack query를 사용하는 이유가 없음

- 비 로그인 상태 시, 같은 요청을 5 ~ 6번 보내지는 현상 해결
    원인: 로더로 fetch하던 me()를 useQuery로 변경하여 에러 발생
    해결: isLogin을 확인하기 위한 zutand slice 생성 및 axios.interceptor에 적용 후, 로그인 상태 일때만 fetch하도록 변경, root의 로더는 사용하기로 결정
    
- 로그아웃 구현
- (widget) 헤더 유저 토글바 UI 변경

11.11
- (features) 레시피 생성 react hook form으로 구현

11.12
- (feature) 레시피 생성 form의 preview image 에러 해결
    => ★해결: register onChagne 옵션과, preview image를 보여주는 커스텀 훅을 구현

11.13 ~ 11.14
- form 데이터 전송 시, Blob 파일이 전송이 안되는 현상 해결
    => axios config에 multipart/form-data 형식으로 전송 or react-hook-form의 Form 컴포넌트 사용
- form 데이터 전송 시, cooking_steps[].picture의 데이터 구조의 복잡성으로 인하여, cooking_step_pictures에 Blob파일을 모아서 보내는 방식으로 수정
- recipe 생성 완료 및 recipe detail 페이지 연결 완료

11.15
- Recipe Infinity Scroll 구현

11.17
- 불필요한 인증 요청 최소화
    => tanstack query의 retry 속성 및 enabled

11.18
- (pages) recipe detail page 구현 완료
- 홈의 레시피 카드 검색 옵션 구현 완료

11.19
- (shared) pictures box 구현 완료
- (features) category box UI 수정

FE개발 ToDo List 중간 점검
- ✔ 레시피 카드 자세히 보기 제거 후, 다른 항목에 Link 연결하기
- ✔ 레시피 좋아요 기능
- ✔ 레시피 댓글 읽기 및 생성 기능
- ✔ 레시피 마이 페이지 
- 레시피 댓글 수정 및 제거 기능
- 레시피 추천 기능
- 레시피 업데이트 및 삭제
- 냉장고 UI 수정
- 냉장고 재료 제거 및 수정 기능
- 냉장고 재료 유통기한 임박 기능
- 냉장고 재료 검색 기능
- 냉장고 재료 정렬 기능
- 유저 팔로우 기능
- 유저 프로필 편집 기능
- 유저의 레시피 UI 수정
- 유저 검색 기능
- 유저 프로필 업데이트 및 삭제 기능
- 알림 기능

11.20
- 레시피 카드 자세히 보기 제거 후, 다른 항목에 Link 연결하기
- 레시피 좋아요 기능 구현

11.21
- 레시피 댓글 읽기 및 생성 기능 구현
- 레시피 마이 페이지 구현
- 홈 레시피 목록 슬라이드 scroll-snap-type 적용
