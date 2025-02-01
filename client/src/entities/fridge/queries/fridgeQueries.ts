import { queryOptions } from "@tanstack/react-query";

import { FridgeService, type IFridgeList } from "shared/api/fridge";

export class FridgeQueries {
  static readonly keys = {
    list: "fridge-list",
    detail: "fridge-detail",
  };

  static listQuery() {
    return queryOptions<IFridgeList[]>({
      queryKey: [this.keys.list],
      queryFn: () => FridgeService.fetchFridgeList(),
      retry: false
    });
  }

  static detailQuery(id?: string) {
    return queryOptions({
      queryKey: [this.keys.detail, id],
      queryFn: async () => await FridgeService.fetchFridgeDetail(id),
      enabled: !!id,
      retry: false
    });
  }
}
