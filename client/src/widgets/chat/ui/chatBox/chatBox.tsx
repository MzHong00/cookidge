import { ChatItem } from "../chatItem/chatItem";
import { CreateChat } from "features/chat";
import { SubjectBox } from "shared/ui/subjectBox";
import { type Recipe } from "shared/types";

import styles from "./chatBox.module.css";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  recipe_id: Recipe['_id'];
}

export const ChatBox = ({ recipe_id, className, ...props }: Props) => {

  return (
    <SubjectBox
      title="댓글"
      className={`${styles.container} ${className}`}
      {...props}
    >
      <CreateChat />
      <div className={styles.chatList}>
        <ChatItem
          user_id={""}
          comment={
            "안녕하세요안녕하세요.안녕하세요안녕하세요안녕하세요안녕하세요."
          }
          created_at={new Date()}
        />
        <ChatItem
          user_id={""}
          comment={
            "안녕하세요안녕하세요.안녕하세요안녕하세요안녕하세요안녕하세요."
          }
          created_at={new Date()}
        />
        <ChatItem
          user_id={""}
          comment={
            "안녕하세요안녕하세요.안녕하세요안녕하세요안녕하세요안녕하세요."
          }
          created_at={new Date()}
        />
        <ChatItem
          user_id={""}
          comment={
            "안녕하세요안녕하세요.안녕하세요안녕하세요안녕하세요안녕하세요."
          }
          created_at={new Date()}
        />
        <ChatItem
          user_id={""}
          comment={
            "안녕하세요안녕하세요.안녕하세요안녕하세요안녕하세요안녕하세요."
          }
          created_at={new Date()}
        />
        <ChatItem
          user_id={""}
          comment={
            "안녕하세요안녕하세요.안녕하세요안녕하세요안녕하세요안녕하세요."
          }
          created_at={new Date()}
        />
        <ChatItem
          user_id={""}
          comment={
            "안녕하세요안녕하세요.안녕하세요안녕하세요안녕하세요안녕하세요."
          }
          created_at={new Date()}
        />
      </div>
    </SubjectBox>
  );
};
