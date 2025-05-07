export interface PagenationOptions {
  limit?: string | number;
  offset?: string | number;
}

export type GoogleUserInfo = {
  sub: string; // 고유 사용자 ID (Google 계정 ID)
  name: string; // 사용자 이름
  given_name: string; // 이름 (First name)
  family_name: string; // 성 (Last name)
  picture: string; // 프로필 이미지 URL
  email: string; // 이메일 주소
  email_verified: boolean; // 이메일 인증 여부
  locale: string; // 언어 및 지역 정보 (e.g., "en", "ko")
};

export type Cookies = {
  access_token?: string;
  refresh_token?: string;
}