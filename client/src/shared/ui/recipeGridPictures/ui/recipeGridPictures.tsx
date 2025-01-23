import { Link } from "react-router-dom";

import { IRecipePictures } from "shared/api/recipe";
import { PicturesBox, PicturesBoxSkeleton } from "shared/ui/picturesBox";

import styles from './recipeGridPictures.module.scss'

const RANDOM_MAX = 9;

interface Props {
  isFetching?: boolean;
  recipes: IRecipePictures[];
}

export const RecipeGridPictures = ({ isFetching, recipes }: Props) => {
  return (
    <div className={styles.gridList}>
      {recipes.map((recipe) => (
        <Link to={`/recipe/${recipe._id}`} key={recipe._id}>
          <PicturesBox pictures={[recipe.pictures[0]]} />
        </Link>
      ))}
      {isFetching &&
        Array.from({ length: Math.floor(Math.random() * RANDOM_MAX) }).map((_, i) => (
          <PicturesBoxSkeleton key={i} />
        ))}
    </div>
  );
};
