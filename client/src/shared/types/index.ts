export interface User {
  _id: string;
  name: string;
  email: string;
  picture: string;
  created_at: Date;
  like_recipes: Recipe["_id"][];
  follower: User["_id"][];
  following: User["_id"][];
  plan: "normal" | "premium";
}

export interface Recipe {
  _id: string;
  name: string;
  picture: string[];
  author_id: User['_id'][];
  ingredients: Ingredient[];
  introduction: string;
  servings: number;
  cooking_time: number;
  cooking_steps: CookingStep[];
  like_members: User["_id"][];
  ratting: number;
  created_at: Date;
}

export interface Comment {
  recipe_id: Recipe['_id'];
  user_id: User['_id'];
  comment: string;
  created_at: Date;
}

export interface Ingredient {
  _id: string;
  name: string;
  category: string;
  quantity?: string;
  expired_at?: Date;
}

export interface CookingStep {
  picture?: string;
  instruction: string;
}

export interface Refrigerator {
  _id: string;
  name: string;
  owner_id: User["_id"];
  stored_ingredients: Ingredient[];
  last_updated: Date;
}

export interface IconCategoriesByClodinary {
  iconId: string;
  text: string; 
}