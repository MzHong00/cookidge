import { RiTimer2Line } from "@react-icons/all-files/ri/RiTimer2Line";
import { RiGroupLine } from "@react-icons/all-files/ri/RiGroupLine";
import { RiHeart3Line } from "@react-icons/all-files/ri/RiHeart3Line";
import { RiChat3Line  } from "@react-icons/all-files/ri/RiChat3Line";
import { RiArrowRightSLine  } from "@react-icons/all-files/ri/RiArrowRightSLine";
 
import { type Recipe } from "shared/types";

import styles from "./recipeCard.module.css";
import { CloudinaryImg } from "shared/ui/cloudinary";
import { IconButton } from "shared/ui/iconButton";
import { Chat } from "widgets/chat";

interface Props extends React.HTMLAttributes<HTMLDivElement>, Recipe {}

export const RecipeCard = ({
  _id,
  name,
  picture,
  servings,
  author_tag_name,
  ingredients,
  instructions,
  cooking_time,
  like_members,
  created_at,
  className,
  ...props
}: Props) => {
  return (
    <article className={`${styles.cardContainer} ${className}`} {...props}>
      <section>
        <CloudinaryImg />
      </section>
      <section>
        <div>
          <div>
            <h2>{name}</h2>
            <p>{created_at.toString()}</p>
          </div>
          <div>
            <IconButton
              Icon={RiTimer2Line}
              title={`조리시간 ${cooking_time}`}
            />
            <IconButton Icon={RiGroupLine} title={`${servings}인분`} />
          </div>
          <p>{instructions}</p>
        </div>
        <div>
            <IconButton Icon={RiHeart3Line} title={`${like_members.length}`}/>
            <IconButton Icon={RiChat3Line} title={`1.1k`}/>
        </div>
        <div>
            <Chat />
        </div>
        <IconButton Icon={RiArrowRightSLine} title="자세히 보기"/>
      </section>
    </article>
  );
};
