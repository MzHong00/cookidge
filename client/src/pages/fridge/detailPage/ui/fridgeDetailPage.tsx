import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { BsGear } from "@react-icons/all-files/bs/BsGear";

import { IconLink } from "shared/ui/iconLink";
import { useModal } from "shared/hooks/useModal";
import { IconButton } from "shared/ui/iconButton";
import { SubjectBox } from "shared/ui/subjectBox";
import { FramerFadeLayout } from "shared/ui/framerFadeLayout";
import {
  FridgeQueries,
  IngredientNearExpiry,
  IngredientTotalCount,
  SharedMemberList,
} from "entities/fridge";
import { DeleteFridgeButton } from "features/fridge/delete";
import { MyIngredientWidget } from "widgets/myIngredient";
import { RecipeRecommendWidget } from "widgets/recipeRecommend";

import { FridgeDetailPageSkeleton } from "./fridgeDetailPageSkeleton";

import styles from "./fridgeDetailPage.module.scss";

const THRESHOLD = 5;

export const FridgeDetailPage = () => {
  const { id } = useParams();

  const { data: fridgeDetail, isFetching } = useQuery(
    FridgeQueries.detailQuery(id)
  );
  const { modalRef, isOpen, toggleModal } = useModal();

  if (isFetching) return <FridgeDetailPageSkeleton threshHold={THRESHOLD} />;

  if (!id || !fridgeDetail) return null;

  return (
    <FramerFadeLayout className="flex-column">
      <div className={styles.fridgeConfigContainer}>
        <IconButton
          ref={modalRef}
          Icon={BsGear}
          onClick={toggleModal}
          className={styles.fridgeConfigButton}
        />
        {isOpen && (
          <div className={styles.fridgeActionBar}>
            <IconLink to={`/dashboard/fridge/setting/${fridgeDetail._id}`}>
              수정
            </IconLink>
            <DeleteFridgeButton id={fridgeDetail._id} />
          </div>
        )}
      </div>

      <SubjectBox title="공유자">
        <SharedMemberList allowed_users={fridgeDetail.allowed_users} />
      </SubjectBox>

      <div className="flex-row">
        <IngredientTotalCount count={fridgeDetail.stored_ingredients?.length} />
        <IngredientNearExpiry
          threshHold={THRESHOLD}
          ingredients={fridgeDetail.stored_ingredients}
        />
      </div>

      <RecipeRecommendWidget
        fridge_id={fridgeDetail._id}
        my_ingredients={fridgeDetail.stored_ingredients}
      />

      <p className={styles.lastestUpdate}>
        최근 수정: {new Date(fridgeDetail.last_updated).toLocaleString()}
      </p>

      <MyIngredientWidget fridge={fridgeDetail} />
    </FramerFadeLayout>
  );
};
