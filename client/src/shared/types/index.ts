export interface User {
  _id: string;
  tag_name: string;
  email: string;
  picture: string;
  created_at: Date;
  like_recipes: Recipe["_id"][];
  follower: User["_id"][];
  following: User["_id"][];
}

export interface Recipe {
  _id: string;
  name: string;
  picture: string[];
  author_tag_name: User['tag_name'][];
  ingredients: Ingredient[];
  instructions: string;
  servings: number;
  cooking_time: number;
  like_members: User["_id"][];
  comments: Comment[];
  created_at: Date;
}

export interface Comment {
  user_tag_name: User['tag_name'];
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

export interface Refrigerator {
  _id: string;
  name: string;
  owner_id: User["_id"];
  stored_ingredients: Ingredient[];
  last_updated: Date;
}
