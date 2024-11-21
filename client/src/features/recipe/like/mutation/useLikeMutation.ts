import { useMutation } from "@tanstack/react-query"
import { IRecipe, RecipeService } from "shared/api/recipe"

export const useLikeMutation = (recipeId: IRecipe['_id']) => {
    return useMutation({
        mutationFn: () => RecipeService.likeRecipe(recipeId)
    })
}

export const useUnlikeMutation = (recipeId: IRecipe['_id']) => {
    return useMutation({
        mutationFn: () => RecipeService.unlikeRecipe(recipeId)
    })
}