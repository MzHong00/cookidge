import { useParams } from "react-router-dom";

import { type Recipe } from "shared/types";
import { FramerFadeLayout } from "shared/ui/framerFadeLayout";
import { ChatBox } from "widgets/chat";
import { DetailCard } from "widgets/recipeCard";
import { RecipeStep } from "widgets/recipeStep";

import styles from "./recipeDetailPage.module.css";

export const RecipeDetailPage = () => {
  const { id } = useParams();

  return (
    <FramerFadeLayout className="flex-column">
      <DetailCard
        {...recipeExample1}
        className={styles.recipeDetailCard}
        onClickStar={() => {}}
      />
      <RecipeStep
        recipeSteps={[
          {
            picture:
              "https://res.cloudinary.com/db0ls9b6a/image/upload/f_auto/q_auto/c_auto,g_center,h_200/shish-kebab-417994_640_db1899?_a=DAJAUVWIZAA0",
            instruction: "이건 1번째",
          },
          {
            picture:
              "https://res.cloudinary.com/db0ls9b6a/image/upload/f_auto/q_auto/c_auto,g_center,h_200/shish-kebab-417994_640_db1899?_a=DAJAUVWIZAA0",
            instruction: "이건 2번째",
          },
          {
            picture:
              "https://res.cloudinary.com/db0ls9b6a/image/upload/f_auto/q_auto/c_auto,g_center,h_200/shish-kebab-417994_640_db1899?_a=DAJAUVWIZAA0",
            instruction: "이건 3번째",
          },
          {
            picture:
              "https://res.cloudinary.com/db0ls9b6a/image/upload/f_auto/q_auto/c_auto,g_center,h_200/shish-kebab-417994_640_db1899?_a=DAJAUVWIZAA0",
            instruction: "이건 4번째",
          },
        ]}
      />
      <ChatBox recipe_id={""} className={styles.chatBox} />
    </FramerFadeLayout>
  );
};

const recipeExample1: Recipe = {
  _id: "1",
  name: "토마토 파스타",
  picture: ["url1.jpg", "url2.jpg"],
  author_id: ["author1"],
  ingredients: [
    { _id: "ingredient1", name: "파스타", category: "곡물", quantity: "200g" },
    {
      _id: "ingredient2",
      name: "토마토 소스",
      category: "소스",
      quantity: "150g",
    },
    { _id: "ingredient3", name: "양파", category: "채소", quantity: "1개" },
  ],
  introduction:
    "이것은 손쉽게 만들 수 있는 토마토 파스타입니다. 간단하게 아이들 먹기에 좋습니다.",
  servings: 2,
  cooking_time: 30,
  cooking_steps: [
    {
      picture: "",
      instruction: "파스타를 밟는다",
    },
  ],
  like_members: ["user1", "user2"],
  ratting: 4.3,
  created_at: new Date("2024-10-01"),
};
