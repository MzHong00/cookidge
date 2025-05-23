import { BsGear } from "@react-icons/all-files/bs/BsGear";
import { IoReload } from "@react-icons/all-files/io5/IoReload";
import { RiTimer2Line } from "@react-icons/all-files/ri/RiTimer2Line";
import { RiSeedlingLine } from "@react-icons/all-files/ri/RiSeedlingLine";

import { IconButton } from "shared/ui/iconButton";
import { SubjectBox } from "shared/ui/subjectBox";
import { ProfileImageSkeleton } from "shared/ui/profileImage";

import styles from "./fridgeDetailPageSkeleton.module.scss";

const RANDOM_COUNT_LIMIT = 10;

export const FridgeDetailPageSkeleton = ({
  threshold = 5,
}: {
  threshold?: number;
}) => {
  return (
    <div className="flex-column">
      <IconButton Icon={BsGear} className={styles.config} />

      <SubjectBox title="공유자">
        <div className="flex-row">
          {Array.from({
            length: Math.floor(Math.random() * RANDOM_COUNT_LIMIT),
          }).map((_, i) => (
            <ProfileImageSkeleton key={i} style={{ width: "20px" }} />
          ))}
        </div>
      </SubjectBox>

      <div className="flex-row">
        <SubjectBox
          title="재료"
          Icon={RiSeedlingLine}
          headerClassName={styles.header}
        >
          <div className={styles.count} />
          <p>총 재료 수</p>
        </SubjectBox>

        <SubjectBox
          title="유통기한 임박"
          Icon={RiTimer2Line}
          headerClassName={styles.header}
        >
          <div className={styles.count} />
          <p>{threshold}일 이내 유통기한 만료 재료 수</p>
        </SubjectBox>
      </div>

      <SubjectBox
        title="레시피 추천"
        subtitle="현재 냉장고 재료를 기반으로 한 추천 레시피"
      >
        <IconButton
          Icon={IoReload}
          style={{ width: "fit-content", border: "1px solid whitesmoke" }}
          disabled
        >
          레시피 추천
        </IconButton>
      </SubjectBox>

      <div className={styles.expiredAt} />

      <SubjectBox className={styles.ingredient}>
        <div />
        <h2>재료 목록</h2>
        <div />
      </SubjectBox>
    </div>
  );
};
