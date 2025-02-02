![](https://velog.velcdn.com/images/mzhong/post/200e8bc6-c1c1-4970-a998-61b119554da6/image.png)

**Cookidge**는 Cook + Firdge의 합성어로, 냉장고를 관리하고 공유할 수 있는 냉장고 서비스와 요리 레시피 SNS를 결합한 음식 관련 통합 서비스이다.

배포: https://cookidge.vercel.app/
회고: https://velog.io/@mzhong/Side-Project-Cookidge-%ED%9A%8C%EA%B3%A0

### 기능
01. 사용자
CRUD, Google OAuth, 팔로우, 검색, 랭킹 기능

02. 레시피
CRUD, 필터, 정렬, 좋아요, 검색, 추천, 랭킹 기능

03. 냉장고
CRUD, 정렬, 검색, 공유 기능

### 아키텍처
![](https://velog.velcdn.com/images/mzhong/post/1cad1603-37bb-4182-b54b-2196feaeebb4/image.png)

### UI
![](https://velog.velcdn.com/images/mzhong/post/c0ca2c1f-fc88-4f93-a224-3126b8cf2d55/image.png)

### FrontEnd

#### 기술 스택
- TypeScript
- SCSS
- React
- Tankstack-Query
- Zustand
- react-hook-form

#### 초기 UI 설계
처음에 설계한 UI와 완성된 UI가 많이 다르다. 개발을 하면서 좀 더 깔끔하고 이해하기 쉬운 UI를 제공하기 위해 많은 수정과 개선을 거쳐갔다.
![](https://velog.velcdn.com/images/mzhong/post/803a03cd-b39f-4814-a622-a73723460ad8/image.png)

#### 🏃‍ 성능과 사용자 경험 개선을 위한 기술
- CRA의 단점인 **초기 로딩 속도 개선**을 위해 `React.lazy` API를 통한 코드 스플리팅을 수행하여 `time 4.07%` 빠르게 개선
- **불필요한 API 요청을 줄이기** 위해 `Abort Signal` 을 도입하여 API 요청 횟수를 10% 감소 및 `Debounce` 를 적용해 검색 기능의 평균 API 요청 횟수를 80% 감소
- **이미지 최적화**를 통한 성능 향상을 위해 최신 이미지 포맷 `Webp`를 사용하고, 해당 서비스에 적합한 이미지 크기 `1000px`로 변환하여 `size 16.67%` 줄이고, `time 7.22%` 빠르게 개선
- `InfiniteQuery`와 `IntersectionObserver`를 활용해 무한 스크롤을 구현하여 **적절한 데이터 단위로 렌더링**하여 성능 개선
- 좋아요, 팔로우 기능의 **낙관적 업데이트**를 위해 `tanstack-query`의 `onMutate`, `onError`를 사용하여 사용자의 이벤트에 즉각적으로 반응하고 에러가 발생하면 원래 상태로 복원되도록 구현
- `setSearchParams`를 통한 검색 기능에서 검색한 것들이 `history`에 남는 문제를 해결하기 위해 `replace: true` 속성을 적용하여 **올바른 뒤로가기 흐름** 구현

#### 🤤 개발자 경험을 위한 개발
- **FSD 디자인 패턴**을 도입하여 원하는 컴포넌트의 위치를 쉽게 파악하고, `query`와 `mutation`을 분리하여 검색과 수정을 하는 컴포넌트들을 따로 관리할 수 있어서 코드관리가 용이
- 다양한 컴포넌트에서 `Dialog/Alert`를 사용하기 위해 `zustand`, `portal`과 `queue`개념을 사용하여 단일 함수로 **재사용성이 높은 코드** 구현 [[관련 글](https://velog.io/@mzhong/Confirm-Dialog-%EC%98%81%EB%A6%AC%ED%95%98%EA%B2%8C-%EA%B4%80%EB%A6%AC%ED%95%98%EA%B8%B0)]
- 모든 네트워크 응답에서 토큰 만료 시 발생하는 토큰 재발급 로직을 처리하기 위해, `axios-interceptor`를 도입하여 한 곳에서 모든 응답의 **토큰 재발급 로직 관리**
- `Suspense` 와 `ErrorBoundary` 를 통해 **로딩 상태와 에러 처리를 분리**하여 컴포넌트의 로직에 집중하고 코드의 가독성을 개선

#### 💢 트러블 슈팅
> 검색 결과 URL이 History에 남는 문제

**원인:** 검색창은 쿼리 스트링을 갖고 `GET`요청을 한다. 뒤로가기를 눌렀을 때, 이전 검색으로 이동하여 많은 뒤로가기를 해야 검색창을 빠져나가지는 안좋은 UX를 제공했다.

**해결:** `useNavigate`, `setSearchParams` 등에는 History를 남기지 않은 속성이 존재했다. `replace` 속성을 사용하여 History에 이전 검색 기록을 남기지 않고 바로 빠져나올 수 있게 했다.

> IOS, 사파리 등에서 로그인이 안되는 오류

**원인:** Cookidge의 FE와 BE의 도메인이 다르기 때문에 **서드파티 쿠키를 제한**하는 브라우저에서는 `token`이 쿠키에 등록되지 않음

**해결 방안**: 도메인을 구입하여 백엔드 API를 하위 도메인으로 통합 후 퍼스트 파티 쿠키로 발급하여 해결하는 방안이 있지만 비용이 들기 때문에 보류.

**해결:** 프론트엔드에서 프록시를 사용하여 마치 퍼스트 파티 쿠키처럼 동작하도록 구현했다. [[관련 글](https://velog.io/@mzhong/IOS-%ED%99%98%EA%B2%BD%EC%97%90%EC%84%9C-%EC%BF%A0%ED%82%A4%EA%B0%80-%EC%A0%80%EC%9E%A5%EC%9D%B4-%EC%95%88%EB%90%98%EB%8A%94-%ED%98%84%EC%83%81)]


> 모바일 크롬 환경에서 레시피 폼 요리과정 항목을 추가할 때, 미리보기 이미지가 없어지는 오류

**원인:** 이미지 미리보기를 구현할 때, `useWatch` 를 통해 모든 요리 과정 이미지들의 `createObjectURL`, `revokeObjectURL`을 한 번에 처리한다. 요리과정 항목을 추가하거나 삭제할 때, 모바일 크롬 환경에서 한 번에 많은 `createObjectURL`을 처리하면서 에러가 발생하는 것으로 보임

**해결:** `PreviewImage` 컴포넌트를 생성하고 `React.memo`를 적용하여 요리과정 항목이 추가/제거 될 때, 다른 컴포넌트가 리렌더링 되지 않게했다.


> 배포 환경 고화질 이미지 전송시 `413 Error` 발생

**원인:** `Vercel` 서버리스 요청 본문 크기 4.5MB 제한


**해결:** 이미지 `base64`대신 `blob`으로 전송하고, `image-compression` 라이브러리를 사용하여 이미지 압축

그러나 추가 에러가 발생하였다.

> 모바일 크롬 환경에서 이미지 압축이 안되는 현상

**원인 추정:** 폼을 제출할 때, 모든 이미지를 압축하는 로직이다. 그러나 압축할 때 `File`이 비어져있다. 
- ❌ 비동기 실행에 예기치 못한 에러를 방지하기 위해 이미지를 하나의 배열에 모아 `Promise.all`을 통해 한 번에 이미지를 압축하는 방법
- ❌ `map`함수에서 `await`가 보장되지 않는다는 이론으로 `for`문을 사용하는 방법
- 🔶 폼에 아무런 리렌더링도 일어나지 않은 경우에 압축에 성공했다. 그러나 `useFieldArray`의 항목을 추가/제거 했을 때, 해당 필드만 리렌더링이 발생하지만 이 경우에도 `File`이 비어지는 현상이 발생했다.

### BackEnd

#### 기술 스택
- Typescript
- Express
- Zoi/Celebrate
- MongoDB
- Cloudinary

#### 개체 도식화
![](https://velog.velcdn.com/images/mzhong/post/f8805967-fece-4c5c-9768-7470c0fbf55b/image.png)

#### 🤔 개발에 대한 의사결정
- 서버 비용 0원을 위해 `Vercel` 무료 서버리스 아키텍처로 배포, 이에 따라 무상태성에 적합한 `JWT` 토큰으로 사용자 인증 구현
- 쿠키의 `httpOnly`, `secure`, `same-site` 등의 속성을 사용하고 Access Token 을 브라우저 메모리에 저장하는 방식으로 토큰 인증 방식의 보안 강화 [[관련 글](https://velog.io/@mzhong/JWT-%ED%86%A0%ED%81%B0-%EA%B4%80%EB%A6%AC%EC%9D%98-%EA%B3%A0%EC%B0%B0.-Refresh-Token%EC%9D%80-%EC%99%9C-%EC%82%AC%EC%9A%A9%ED%95%A0%EA%B9%8C)]
- 읽기 성능을 중요하게 생각하고, `MongoDB Atlas`의 무료 저장소를 사용하기 위해 `MongoDB`를 사용, `$lookup` 조인을 피하기 위해 상황에 맞게 임베딩, 참조 모델링을 혼합하여 데이터 모델링 수행 (ex. 좋아요는 임베딩, 참조 모델링 모두 사용) [[관련 글](https://velog.io/@mzhong/%EB%AA%BD%EA%B3%A0%EB%94%94%EB%B9%84%EB%8A%94-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EA%B5%AC%EC%A1%B0%EB%A5%BC-%EC%96%B4%EB%96%A4-%EC%8B%9D%EC%9C%BC%EB%A1%9C-%EB%AA%A8%EB%8D%B8%EB%A7%81-%ED%95%B4%EC%95%BC%ED%95%A0%EA%B9%8C)]
- CDN 서비스와 다양한 이미지 최적화를 제공하는 `Cloudinary`사용
- `celebrate/joi`를 사용해서 네트워크 요청에 대한 값들을 검증

#### 💢 트러블 슈팅
> 사용자 회원가입할 때, 이름이 중복되는 현상

**원인:** `Google OAuth`의 이름을 기반으로 Cookidge의 `name`이 생성되는데 이름이 같으면 중복 에러가 발생

**해결:** `mongoose`의 `pre` API를 사용하여 사용자의 정보가 `User` 스키마에 저장될 때, 사용자@1234 처럼 `name` + `@code`의 형태로 첫 사용자의 이름을 결정하는 로직으로 해결

> 브라우저에 쿠키가 저장이 안되는 현상

**원인:** 클라이언트와 서버가 `CORS` 환경에서 쿠키를 올바르게 주고 받기 위해서는 `credential`이라는 속성도 지정해줘야 한다.

**해결:** `express`의 `cors`옵션으로 `credential: true` 설정. 그러나 지금은 프록시를 통해 동일 출처 통신을 하는 것 처럼 보이게 하여 의미가 없음


### Other
#### 기술 스택
- Git
- Vercel

#### 구현
- `Git Flow` 방식의 형상 관리
- `Vercel`을 통해 배포 자동화 구축
