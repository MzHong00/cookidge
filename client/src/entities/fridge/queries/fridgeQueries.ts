import { queryOptions } from "@tanstack/react-query";

import { FridgeService, IFridge, IFridgeList } from "shared/api/fridge";

export class FridgeQueries {
  static readonly keys = {
    list: "fridge-list",
    detail: "fridge-detail",
  };

  static listQuery() {
    return queryOptions<IFridgeList[]>({
      queryKey: [this.keys.list],
      queryFn: async () => await FridgeService.fetchFridgeListQuery(),
    });
  }

  static detailQuery(id: string) {
    return queryOptions<IFridge>({
        queryKey: [this.keys.detail, id],
        queryFn: async () => await FridgeService.fetchFridgeDetailQuery(id),
        enabled: !!id
      })
  }
}
