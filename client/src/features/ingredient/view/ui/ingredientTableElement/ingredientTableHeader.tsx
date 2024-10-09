import { INGREDIENT_TABLE_FIELD } from "../.."

export const IngredientTableHeader = () => {

    return (
        <thead>
          <tr style={{ textAlign: "left", whiteSpace: "nowrap" }}>
            {INGREDIENT_TABLE_FIELD.map((filed) => (
              <td key={filed}>{filed}</td>
            ))}
          </tr>
        </thead>
    )
}