import { useNavigate } from "react-router-dom";

import { IconButton } from "shared/ui/iconButton";

import styles from "./index.module.scss";

export const NotFound = ({
  msg = "페이지를 찾지 못했어요..!",
}: {
  msg?: string;
}) => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1>404</h1>
      <p>{msg}</p>
      <IconButton
        onClick={() => {
          navigate(-1);
        }}
      >
        돌아가기
      </IconButton>
    </div>
  );
};
