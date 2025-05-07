import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { BsGear } from "@react-icons/all-files/bs/BsGear";

import { IconLink } from "shared/ui/iconLink";
import { useModal } from "shared/hooks/useModal";
import { IconButton } from "shared/ui/iconButton";
import { SubjectBox } from "shared/ui/subjectBox";
import { FadeLayout } from "shared/ui/fadeLayout";
import {
  FridgeQueries,
  IngredientNearExpiry,
  IngredientTotalCount,
  SharedMemberList,
} from "entities/fridge";
import { DeleteFridgeButton } from "features/fridge/delete";
import { MyIngredientWidget } from "widgets/myIngredients";
import { RecipeRecommendWidget } from "widgets/recipe/recipeRecommend";

import styles from "./fridgeDetailPage.module.scss";

const THRESHOLD = 5;

export const FridgeDetailPage = () => {
  const { id } = useParams();
  const { modalRef, isOpen, toggleModal } = useModal();

  const { data: fridge } = useSuspenseQuery(FridgeQueries.detailQuery(id));

  return (
    <FadeLayout className="flex-column">
      <div className={styles.config}>
        <IconButton ref={modalRef} Icon={BsGear} onClick={toggleModal} />
        {isOpen && (
          <FadeLayout className={styles.configDropdown}>
            <IconLink to={`/dashboard/fridge/setting/${fridge._id}`}>
              설정
            </IconLink>
            <DeleteFridgeButton id={fridge._id} />
          </FadeLayout>
        )}
      </div>

      <SubjectBox title="공유자">
        <SharedMemberList
          owner_id={fridge.owner_id}
          allowed_users={fridge.allowed_users}
        />
      </SubjectBox>

      <div className="flex-row">
        <IngredientTotalCount count={fridge.stored_ingredients?.length} />
        <IngredientNearExpiry
          threshHold={THRESHOLD}
          ingredients={fridge.stored_ingredients}
        />
      </div>

      <RecipeRecommendWidget
        fridge_id={fridge._id}
        my_ingredients={fridge.stored_ingredients}
      />

      <p className={styles.lastestUpdate}>
        최근 수정: {new Date(fridge.last_updated).toLocaleString()}
      </p>

      <MyIngredientWidget fridge={fridge} />
    </FadeLayout>
  );
};
