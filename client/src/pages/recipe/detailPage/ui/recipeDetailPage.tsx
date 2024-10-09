import { useParams } from "react-router-dom";

import { Recipe } from "shared/types";
import { SubjectBox } from "shared/ui/subjectBox";
import { CloudinaryImg } from "shared/ui/cloudinary";
import { RecipeCard } from "widgets/recipeCard";

import styles from "./recipeDetailPage.module.css";

export const RecipeDetailPage = () => {
  const { id } = useParams();

  return (
    <div className={styles.detailPage}>
      <RecipeCard {...recipeExample1} className={styles.recipeDetailCard} />
      <SubjectBox title="레시피">
        <div className={styles.recipeStepContainer}>
          {recipeExample1.cooking_steps.map((step) => (
            <div key={step.picture} className={styles.recipeStepBox}>
              <CloudinaryImg publicId={step?.picture} />
              <div>{step.instruction}</div>
            </div>
          ))}
        </div>
      </SubjectBox>
      <SubjectBox title="추천 요리" />
      <SubjectBox title="댓글" />
    </div>
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
    "파스타를 끓이고, 소스를 만들어 섞는다.ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ",
  servings: 2,
  cooking_time: 30,
  cooking_steps: [
    {
      picture: "",
      instruction: "파스타를 밟는다",
    },
  ],
  like_members: ["user1", "user2"],
  comments: [],
  created_at: new Date("2024-10-01"),
};
