import { Link } from "react-router-dom";

import { IRecipePictures } from "shared/api/recipe";
import { PicturesBox, PicturesBoxSkeleton } from "shared/ui/picturesBox";

import styles from './recipeGridPictures.module.scss'

interface Props {
  isLoading: boolean;
  recipes: IRecipePictures[];
}

export const RecipeGridPictures = ({ isLoading, recipes }: Props) => {
  return (
    <div className={styles.gridList}>
      {isLoading &&
        Array.from({ length: Math.floor(Math.random() * 9) }).map((_, i) => (
          <PicturesBoxSkeleton key={i} />
        ))}

      {recipes.map((recipe) => (
        <Link to={`/recipe/${recipe._id}`} key={recipe._id}>
          <PicturesBox pictures={[recipe.pictures[0]]} />
        </Link>
      ))}
    </div>
  );
};
