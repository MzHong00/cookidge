import { IRecipeQueryOption } from "../interface/IRecipe";
import { Recipe } from "../models/recipe";
import { User } from "../models/user";

export class RankService {
  // ※ 레시피 좋아요 랭킹은 기존의 Recipe 서비스에서 사용이 가능

  static followRank(option: IRecipeQueryOption) {
    const { limit = 10, offset = 0 } = option;

    return User.aggregate([
      {
        $addFields: {
          follower_count: { $size: "$follower" },
        },
      },
      { $sort: { follower_count: -1 } },
      { $skip: Number(`${offset}`) },
      { $limit: Number(`${limit}`) },
      {
        $project: {
          _id: 1,
          name: 1,
          picture: 1,
          follower_count: 1,
        },
      },
    ]);
  }

  static RecipeMakerRank(option: IRecipeQueryOption) {
    const { limit = 10, offset } = option;

    return Recipe.aggregate([
      {
        $group: {
          _id: "$author_id",
          recipe_count: { $sum: 1 },
        },
      },
      { $sort: { recipe_count: -1 } },
      { $skip: Number(`${offset}`) },
      { $limit: Number(`${limit}`) },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "author_info",
        },
      },
      { $unwind: "$author_info" },
      {
        $project: {
          recipe_count: 1,
          author: {
            _id: "$author_info._id", 
            name: "$author_info.name",
            picture: "$author_info.picture", 
          },
        },
      },
    ]);
  }
}
