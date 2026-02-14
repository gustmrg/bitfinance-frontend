import { useQuery } from "@tanstack/react-query";

import type { BillResponseModel } from "@/api/bills/get-bills";
import { getBills } from "@/api/bills/get-bills";
import { queryKeys } from "@/lib/query-keys";
import type { Bill } from "@/pages/bills/types";

export interface BillsQueryFilters {
  from?: Date;
  to?: Date;
}

function normalizeBillStatus(status: string): Bill["status"] {
  return status.toLowerCase() as Bill["status"];
}

function mapBillResponse(bill: BillResponseModel): Bill {
  return {
    ...bill,
    status: normalizeBillStatus(bill.status),
    createdDate: bill.createdAt ?? bill.createdDate ?? "",
  };
}

export function useBillsQuery(
  organizationId: string | null,
  filters: BillsQueryFilters
) {
  return useQuery({
    queryKey: queryKeys.bills.list(organizationId ?? "", filters.from, filters.to),
    enabled: Boolean(organizationId),
    queryFn: async (): Promise<Bill[]> => {
      if (!organizationId) {
        return [];
      }

      const response = await getBills({
        organizationId,
        from: filters.from,
        to: filters.to,
      });

      return response.data.map(mapBillResponse);
    },
  });
}
