import { useState } from "react";
import { RECIPE_INPUT_SECTION } from "../../../../entities/recipe/consts/consts";

type SectionType = (typeof RECIPE_INPUT_SECTION)[number];

export const useSelectInput = () => {
  const [activeSection, setActiveSection] = useState<SectionType>(RECIPE_INPUT_SECTION[0]);

  const changeSectionHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const section = e.currentTarget.innerText as SectionType;
    setActiveSection(section);
  };

  return { activeSection, changeSectionHandler };
};
