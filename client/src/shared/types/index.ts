import { ICookingStep } from "shared/api/recipe";

export interface IconCategoriesByClodinary {
  iconId: string;
  text: string;
}

export interface EmojiCatgories {
  emoji: string;
  text: string;
}

export interface PreviewStep extends Omit<ICookingStep, "picture"> {
  picture: string | FileList;
}

export interface PagenationParams {
  limit: number;
  offset: number;
}
