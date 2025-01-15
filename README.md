![](https://velog.velcdn.com/images/mzhong/post/200e8bc6-c1c1-4970-a998-61b119554da6/image.png)

**Cookidge**는 Cook + Firdge의 합성어로, 냉장고를 관리하고 공유할 수 있는 냉장고 서비스와 요리 레시피 SNS를 결합한 음식 관련 통합 서비스이다.

배포: https://cookidge.vercel.app/

회고: [Cookidge 회고](https://velog.io/@mzhong/Side-Project-Cookidge-%EC%A0%95%EB%A6%AC)

### 기능
간략하고 읽기 쉽게 나타내자면 다음과 같다.
- 사용자 => CRUD, 구글 로그인, 팔로우, 검색, 랭킹
- 레시피 => CRUD, 필터, 정렬, 좋아요, 검색, 추천, 랭킹
- 냉장고 => CRUD, 정렬, 검색, 공유

### 아키텍처
![](https://velog.velcdn.com/images/mzhong/post/1cad1603-37bb-4182-b54b-2196feaeebb4/image.png)

### UI
![](https://velog.velcdn.com/images/mzhong/post/c0ca2c1f-fc88-4f93-a224-3126b8cf2d55/image.png)

### 기술 스택
- TypeScript
- SCSS
- React
- Tankstack-Query
- Zustand
- Express
- MongoDB
- Cloudinary


## FrontEnd

### 기술 스택
- TypeScript
- SCSS
- React
- Tankstack-Query
- Zustand

### 초기 UI 설계
처음에 설계한 UI와 완성된 UI가 많이 다르다. 개발을 하면서 좀 더 깔끔하고 이해하기 쉬운 UI를 제공하기 위해 많은 수정과 개선을 거쳐갔다.
![](https://velog.velcdn.com/images/mzhong/post/803a03cd-b39f-4814-a622-a73723460ad8/image.png)


### 구현

#### 성능
- CRA의 단점인 초기 로딩 속도 개선을 위해 `lazy` API를 통한 코드 스플리팅을 수행하여 `time 4.07%` 빠르게 개선
- 불필요한 네트워크 요청을 줄이기 위해 `Abort Signal`, `Debounce` 개념을 도입하여 네트워크 요청 횟수를 줄임
- 이미지 최적화를 통한 성능 향상을 위해 최신 이미지 포맷 `Webp`를 사용하고, 해당 서비스에 적합한 이미지 크기 `1000px`로 변환하여 `size 16.67%` 줄이고, `time 7.22%` 빠르게 개선
- `InfiniteQuery`와 `IntersectionObserver`를 활용해 무한 스크롤을 구현하여 적절한 데이터 단위로 렌더링하여 성능 개선

#### UX
- 좋아요, 팔로우 기능의 낙관적 업데이트를 위해 `tanstack-query`의 `onMutate`, `onError`를 사용하여 사용자의 이벤트에 즉각적으로 반응하고 에러가 발생하면 원래 상태로 복원되도록 구현
- `setSearchParams`를 통한 검색 기능에서 검색한 것들이 `history`에 남는 문제를 해결하기 위해 `replace: true` 속성을 적용하여 올바른 뒤로가기 흐름 구현

#### DX
- 다양한 컴포넌트에서 `Dialog/Alert`를 사용하기 위해 `zustand`, `portal`과 `queue`개념을 사용하여 단일 함수로 재사용성이 높은 코드 구현
- 모든 네트워크 응답에서 토큰 만료 시 발생하는 토큰 재발급 로직을 처리하기 위해, `axios-interceptor`를 도입하여 한 곳에서 모든 응답의 토큰 재발급 로직 관리

## BackEnd

### 기술 스택
- Express
- MongoDB
- Cloudinary

### 개체 도식화
![](https://velog.velcdn.com/images/mzhong/post/f8805967-fece-4c5c-9768-7470c0fbf55b/image.png)

### 구현
- `Rest API` 제공 서버
- 서버 비용 0원을 위해 `Vercel` 무료 서버리스 아키텍처로 배포, 이에 따라 무상태성에 적합한 `JWT` 토큰으로 사용자 인증 구현
- `CSRF` 보안 문제를 위해 `Refresh Token`을 함께 사용하고, `Access Token`을 쿠키가 아닌 브라우저 메모리에 저장하는 방식으로 해결
- 읽기 성능을 중요하게 생각하고, `MongoDB Atlas`의 무료 저장소를 사용하기 위해 `MongoDB`를 사용, `$lookup` 조인을 피하기 위해 상황에 맞게 임베딩, 참조 모델링을 혼합하여 데이터 모델링 수행 (ex. 좋아요는 임베딩, 참조 모델링 모두 사용)
- `MongoDB Atlas`의 저장소를 절약하기 위해 이미지를 `Cloudinary`에 저장하고, `URL`은`DB`에 저장하여 `DB`의 부담을 분산

## Other
### 기술 스택
- Git
- Vercel

### 구현
- `Git Flow` 방식의 형상 관리
- `Vercel`을 통해 배포 자동화 구축
