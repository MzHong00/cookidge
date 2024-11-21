import { queryOptions } from "@tanstack/react-query";

import { FridgeService, IFridge, IFridgeList } from "shared/api/fridge";
import { useGlobalStore } from "shared/lib/zustand/useStore";

export class FridgeQueries {
  static readonly keys = {
    list: "fridge-list",
    detail: "fridge-detail",
  };

  static readonly staleTime = 60 * 60 * 1000;

  static listQuery() {
    const { isLogin } = useGlobalStore.getState();

    return queryOptions<IFridgeList[]>({
      queryKey: [this.keys.list],
      queryFn: async () => await FridgeService.fetchFridgeListQuery(),
      staleTime: this.staleTime,
      enabled: isLogin,
    });
  }

  static detailQuery(id?: string) {
    return queryOptions<IFridge>({
      queryKey: [this.keys.detail, id],
      queryFn: async () => await FridgeService.fetchFridgeDetailQuery(id),
      staleTime: this.staleTime,
      enabled: !!id,
    });
  }
}
