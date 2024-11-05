/**
 * 주어진 일(day) 차이를 현재 날짜에 더하여 YYYY-MM-DD 형식의 문자열로 반환하는 함수
 * @param {number} daysDifference - 현재와의 일(day) 차이 (기본값: 0)
 * @returns {string} YYYY-MM-DD 형태의 날짜 문자열
 */
export function getDateToISO(afterDay = 0) {
    const date = new Date();
    date.setDate(date.getDate() + afterDay);
  
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }