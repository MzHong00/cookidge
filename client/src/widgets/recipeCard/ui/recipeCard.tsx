import { useState } from "react";

import { RiTimer2Line } from "@react-icons/all-files/ri/RiTimer2Line";
import { RiGroupLine } from "@react-icons/all-files/ri/RiGroupLine";
import { RiHeart3Line } from "@react-icons/all-files/ri/RiHeart3Line";
import { RiChat3Line } from "@react-icons/all-files/ri/RiChat3Line";
import { RiArrowRightSLine } from "@react-icons/all-files/ri/RiArrowRightSLine";

import { type Recipe } from "shared/types";
import { IconLink } from "shared/ui/iconLink";
import { IconButton } from "shared/ui/iconButton";
import { CloudinaryImg } from "shared/ui/cloudinary";
import { SubjectBox } from "shared/ui/subjectBox";
import { dateGap } from "shared/helper/dateGap";
import { Chat } from "widgets/chat";

import styles from "./recipeCard.module.css";

interface Props extends React.HTMLAttributes<HTMLDivElement>, Recipe {
  onClickLike?: React.MouseEventHandler;
  onClickChat?: React.MouseEventHandler;
}

export const RecipeCard = ({
  _id,
  name,
  picture,
  author_id,
  ingredients,
  introduction,
  servings,
  cooking_time,
  cooking_steps,
  created_at,
  comments,
  like_members,
  onClickLike,
  onClickChat,
  className,
  ...props
}: Props) => {
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  return (
    <article className={`${styles.cardContainer} ${className}`} {...props}>
      <section className={styles.recipeSection}>
        <div className={styles.pictureBox}>
          <CloudinaryImg publicId="food-1651279_1280_arlr1i" />
        </div>
        <div className={styles.infoBox}>
          <div className={styles.recipeInfoBar}>
            <div>
              <h2>{name}</h2>
              <p>{`${dateGap(created_at)}전`}</p>
            </div>
            <div>
              <IconButton
                Icon={RiTimer2Line}
                title={`조리시간 ${cooking_time}`}
              />
              <IconButton Icon={RiGroupLine} title={`${servings}인분`} />
            </div>

            {introduction && <p>{introduction}</p>}
          </div>
          <div className={styles.ingredientBox}>
            <h4>재료</h4>
            {ingredients.map((ingredient) => (
              <span key={ingredient._id}>
                {ingredient.name} {ingredient.quantity},{" "}
              </span>
            ))}
          </div>
          <div className={styles.recipeActionBar}>
            <IconButton Icon={RiHeart3Line} title={`${like_members.length}`} />
            {onClickChat && (
              <IconButton
                Icon={RiChat3Line}
                title={`1.1k`}
                onClick={() => setIsChatOpen((prev) => !prev)}
              />
            )}
          </div>
          {onClickChat && (
            <IconLink
              to={`recipe/${_id}`}
              Icon={RiArrowRightSLine}
              title="자세히 보기"
              className={styles.recipeDetailButton}
            />
          )}
        </div>
      </section>

      {isChatOpen && (
        <SubjectBox title="댓글" className={styles.chatSection}>
          <main style={{ overflowY: "auto" }}>
            <Chat
              user_id=""
              comment="어느 업체인지 밝혀야 저기서 구매한 소비자가 대응을 할거 아니냐"
              created_at={created_at}
            />
          </main>
        </SubjectBox>
      )}
    </article>
  );
};
