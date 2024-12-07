import mongoose from 'mongoose';

import config from '../config';

const uri = `mongodb+srv://admin:${config.mongodbPassword}@sideproject.ahqpgye.mongodb.net/?retryWrites=true&w=majority&appName=SideProject`;

const connect = async () => {
    try {
      // 만일 배포용이 아니라면, 디버깅 on
      if (process.env.NODE_ENV !== 'production') {
        mongoose.set('debug', true); // 몽고 쿼리가 콘솔에서 뜨게 한다.
      }
  
      await mongoose.connect(uri, {
        dbName: config.mongodbName, // 실제로 데이터 저장할 db명
      });
      console.log('몽고디비 연결 성공');
    } catch (error) {
      console.log('몽고디비 연결 에러', error);
    }
  };
  

// 몽구스 커넥션에 이벤트 리스너를 달게 해준다. 에러 발생 시 에러 내용을 기록하고, 연결 종료 시 재연결을 시도한다.
mongoose.connection.on('error', (error) => {
  console.error('몽고디비 연결 에러', error);
});

mongoose.connection.on('disconnected', () => {
  console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
  // connect(); // 연결 재시도
});

export default connect;
