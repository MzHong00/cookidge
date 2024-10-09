import { RiEditBoxLine } from "@react-icons/all-files/ri/RiEditBoxLine";
import { CgRemoveR } from "@react-icons/all-files/cg/CgRemoveR";

import { Ingredient } from "shared/types";
import { IconButton } from "shared/ui/iconButton";

import styles from "./ingredientTableRow.module.css";

interface Props extends React.HTMLAttributes<HTMLTableRowElement>, Ingredient {
  onClickEdit?: () => void;
  onClickRemove?: () => void;
  disabled?: boolean;
}

export const IngredientTableRow = ({
  name,
  category,
  quantity,
  expired_at,
  onClickEdit,
  onClickRemove,
  className,
  disabled = false,
  ...props
}: Props) => {
  return (
    <tr
      className={`${styles.container} ${styles.disabledContainer} ${className}`}
      {...props}
    >
      <td>
        <select disabled={disabled}>
          {["고기", "채소"].map((item) => (
            <option key={item} defaultValue={category}>
              {item}
            </option>
          ))}
        </select>
      </td>
      <td>
        <input
          defaultValue={name}
          placeholder="재료 이름"
          disabled={disabled}
          title={name}
        />
      </td>
      <td>
        <input type="date" disabled={disabled} />
      </td>
      <td>
        <input defaultValue={quantity} placeholder="수량" disabled={disabled} />
      </td>
      {(onClickEdit || onClickRemove) && (
        <td className={styles.ingredientActionBar}>
          {onClickEdit && (
            <IconButton Icon={RiEditBoxLine} onClick={onClickEdit} />
          )}
          {onClickRemove && (
            <IconButton Icon={CgRemoveR} onClick={onClickRemove} />
          )}
        </td>
      )}
    </tr>
  );
};
