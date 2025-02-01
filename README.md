![](https://velog.velcdn.com/images/mzhong/post/200e8bc6-c1c1-4970-a998-61b119554da6/image.png)

**Cookidge**는 Cook + Firdge의 합성어로, 냉장고를 관리하고 공유할 수 있는 냉장고 서비스와 요리 레시피 SNS를 결합한 음식 관련 통합 서비스이다.

배포: https://cookidge.vercel.app/

※ 테스트 계정 code: 5789

회고: [Cookidge 회고](https://velog.io/@mzhong/Side-Project-Cookidge-%ED%9A%8C%EA%B3%A0)

### 기능
간략하고 읽기 쉽게 나타내자면 다음과 같다.
- 사용자 => CRUD, 구글 로그인, 팔로우, 검색, 랭킹
- 레시피 => CRUD, 필터, 정렬, 좋아요, 검색, 추천, 랭킹
- 냉장고 => CRUD, 정렬, 검색, 공유

### 아키텍처
![](https://velog.velcdn.com/images/mzhong/post/1cad1603-37bb-4182-b54b-2196feaeebb4/image.png)

### UI
![](https://velog.velcdn.com/images/mzhong/post/c0ca2c1f-fc88-4f93-a224-3126b8cf2d55/image.png)

## FrontEnd

### 기술 스택
- TypeScript
- SCSS
- React
- Tankstack-Query
- Zustand
- react-hook-form

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
- Typescript
- Express
- Zoi/Celebrate
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

### 트러블 슈팅
> #### 검색 결과 URL이 History에 남는 문제

**원인:** 검색창은 쿼리 스트링을 갖고 `GET`요청을 한다. 뒤로가기를 눌렀을 때, 이전 검색으로 이동하여 많은 뒤로가기를 해야 검색창을 빠져나가지는 안좋은 UX를 제공했다.

**원인:** 검색창은 쿼리 스트링을 갖고 `GET`요청을 한다. 뒤로가기를 눌렀을 때, 이전 검색으로 이동하여 많은 뒤로가기를 해야 검색창을 빠져나가지는 안좋은 UX를 제공했다.

**해결:** `useNavigate`, `setSearchParams` 등에는 History를 남기지 않은 속성이 존재했다. `replace` 속성을 사용하여 History에 이전 검색 기록을 남기지 않고 바로 빠져나올 수 있게 했다.

> #### IOS, 사파리 등에서 로그인이 안되는 오류

**원인:** Cookidge의 FE와 BE의 도메인이 다르기 때문에 **서드파티 쿠키를 제한**하는 브라우저에서는 `token`이 쿠키에 등록되지 않음


**해결 방안**: 도메인을 구입하여 백엔드 `api`를 하위 도메인으로 통합 후 퍼스트 파티 쿠키로 발급하여 해결하는 방안이 있지만 비용이 들기 때문에 보류.

**해결:** 프론트엔드에서 **프록시를 사용**하여 마치 퍼스트 파티 쿠키처럼 동작하도록 구현했다.

**해결:** 프론트엔드에서 **프록시를 사용**하여 마치 퍼스트 파티 쿠키처럼 동작하도록 구현했다.


> #### 모바일 크롬 환경에서 레시피 폼 요리과정 항목을 추가할 때, 미리보기 이미지가 없어지는 오류

**원인:** 이미지 미리보기를 구현할 때, `useWatch` 를 통해 모든 요리 과정 이미지들의 `createObjectURL`, `revokeObjectURL`을 한 번에 처리한다. 요리과정 항목을 추가하거나 삭제할 때, 모바일 크롬 환경에서 **한 번에 많은 `createObjectURL`을 처리하면서 에러가 발생하는 것**으로 보임


**해결:** `PreviewImage` 컴포넌트를 생성하고 `React.memo`를 적용하여 요리과정 항목이 추가/제거 될 때, **다른 컴포넌트가 리렌더링 되지 않게**했다.


> #### 배포 환경 고화질 이미지 전송시 `413 Error` 발생

**원인:** `Vercel` 서버리스 요청 본문 크기 4.5MB 제한


**해결:** 이미지 `base64`대신 `blob`으로 전송하고, `image-compression` 라이브러리를 사용하여 이미지 압축

그러나 추가 에러가 발생하였다.

> #### 모바일 크롬 환경에서 이미지 압축이 안되는 현상

**원인 추정:** 폼을 제출할 때, 모든 이미지를 압축하는 로직이다. 그러나 압축할 때 `File`이 비어져있다. 
- ❌ 비동기 실행에 예기치 못한 에러를 방지하기 위해 이미지를 하나의 배열에 모아 `Promise.all`을 통해 한 번에 이미지를 압축하는 방법
- ❌ `map`함수에서 `await`가 보장되지 않는다는 이론으로 `for`문을 사용하는 방법
- 🔶 폼에 아무런 리렌더링도 일어나지 않은 경우에 압축에 성공했다. 그러나 `useFieldArray`의 항목을 추가/제거 했을 때, 해당 필드만 리렌더링이 발생하지만 이 경우에도 `File`이 비어지는 현상이 발생했다.