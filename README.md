냉장고를 관리하고 공유할 수 있는 냉장고 서비스와 요리 레시피 SNS를 결합한 음식 관련 통합 서비스입니다.

( 홈페이지, 깃허브 )

FrontEnd

TypeScript, SCSS, React, Tankstack-Query, Zustand, Cloudinary

성능

CRA의 단점인 초기 로딩 속도 개선을 위해 lazy api를 통해 코드 스플리팅을 수행하여 time 4.07% 빠르게 개선했습니다.

불필요한 네트워크 요청을 줄이기 위해 Abort Signal, Debounce  개념을 도입하여 네트워크 요청 횟수를 개선했습니다.

최신 이미지 포맷 Webp를 사용하고, 서비스에 적합한 이미지 크기 500px로 변환하는 이미지 최적화를 통해 size 16.67%줄이고, time 7.22%빠르게 개선했습니다.

무한 스크롤을 통해 적절한 양의 데이터 단위로 렌더링 하여 성능을 개선했습니다.

UX

좋아요, 팔로우 기능에서, 낙관적 업데이트를 사용하여 사용자의 이벤트에 즉각적으로 반응하는 것처럼 느끼게 했습니다. 만약 에러가 발생하면 원래 상태로 복원되도록 처리했습니다. 

Skeleton UI, Loading Spinner를 통해 ...

모바일 환경을 위해 width: 767px 기준 반응형 UI로 제작했습니다.

DX

여러 곳에서 하나의 함수로 Dialog/Alert을 사용하기 위해 zustand와 portal을 사용하여

BackEnd

Express, MongoDB, Cloudinary

MVC 패턴으로 구성되어 있으며, Rest API를 제공하는 서버입니다.

서버 비용 0원을 위해 Vercel 무료 서버리스 아키텍처로 배포하였고, 이에 따라 무상태성에 적합한 JWT 토큰으로 사용자 인증을 구현했습니다.

CSRF 보안 문제를 위해 Refresh Token을 함께 사용하고, Access Token을 쿠키가 아닌 브라우저 메모리에 저장하는 방식으로 해결했습니다.

읽기 성능을 중요하게 생각하고, MongoDB Atlas의 무료 저장소를 사용하기 위해 MongoDB를 사용하였고, $lookup 조인을 피하기 위해 상황에 맞게 임베딩, 참조 모델링을 혼합하여 데이터 모델링을 수행했습니다. (ex. 좋아요는 임베딩, 참조 모델링 모두 사용)

MongoDB Atlas의 저장소를 절약하기 위해 이미지를 Cloudinary에 저장하고 URL은 DB에 저장하여 DB의 부담을 분산시켰습니다.

Other

Git, Vercel

개인 프로젝트지만 미래의 협업에 빠르게 적응하기 위해 Git Flow 방식을 적용하여 형상 관리를 하고 있습니다.

Vercel을 통해 배포 자동화를 구축하였습니다.