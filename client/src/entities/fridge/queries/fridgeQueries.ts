import { queryOptions } from "@tanstack/react-query";

import { FridgeService, type IFridgeList } from "shared/api/fridge";

export class FridgeQueries {
  static readonly keys = {
    list: "fridge-list",
    detail: "fridge-detail",
  };

  static readonly staleTime = 60 * 60 * 1000;

  static listQuery() {
    return queryOptions<IFridgeList[]>({
      queryKey: [this.keys.list],
      queryFn: async () => await FridgeService.fetchFridgeList(),
      staleTime: this.staleTime,
      retry: false
    });
  }

  static detailQuery(id?: string) {
    return queryOptions({
      queryKey: [this.keys.detail, id],
      queryFn: async () => await FridgeService.fetchFridgeDetail(id),
      staleTime: this.staleTime,
      enabled: !!id,
    });
  }
}
