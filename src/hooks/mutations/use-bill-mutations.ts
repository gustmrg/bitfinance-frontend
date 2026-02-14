import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  billsService,
  type BillDocumentType,
  type CreateBillRequest,
  type UpdateBillRequest,
} from "@/api/bills";
import { queryKeys } from "@/lib/query-keys";

interface UploadBillDocumentsPayload {
  billId: string;
  files: File[];
  documentType: BillDocumentType;
}

interface UseBillMutationsOptions {
  organizationId: string | null;
}

function requireOrganizationId(organizationId: string | null): string {
  if (!organizationId) {
    throw new Error("No organization selected.");
  }

  return organizationId;
}

export function useBillMutations({ organizationId }: UseBillMutationsOptions) {
  const queryClient = useQueryClient();

  const invalidateBillQueries = async (orgId: string) => {
    await Promise.all([
      queryClient.invalidateQueries({
        queryKey: queryKeys.bills.listByOrganization(orgId),
      }),
      queryClient.invalidateQueries({
        queryKey: queryKeys.dashboard.upcomingBills(orgId),
      }),
    ]);
  };

  const addBillMutation = useMutation({
    mutationFn: async (request: Omit<CreateBillRequest, "organizationId">) => {
      const orgId = requireOrganizationId(organizationId);

      return billsService.createAsync({
        ...request,
        organizationId: orgId,
      });
    },
    onSuccess: async () => {
      if (organizationId) {
        await invalidateBillQueries(organizationId);
      }
    },
  });

  const updateBillMutation = useMutation({
    mutationFn: async (request: Omit<UpdateBillRequest, "organizationId">) => {
      const orgId = requireOrganizationId(organizationId);

      return billsService.updateAsync({
        ...request,
        organizationId: orgId,
      });
    },
    onSuccess: async () => {
      if (organizationId) {
        await invalidateBillQueries(organizationId);
      }
    },
  });

  const deleteBillMutation = useMutation({
    mutationFn: async (billId: string) => {
      const orgId = requireOrganizationId(organizationId);
      return billsService.deleteAsync(billId, orgId);
    },
    onSuccess: async () => {
      if (organizationId) {
        await invalidateBillQueries(organizationId);
      }
    },
  });

  const uploadBillDocumentsMutation = useMutation({
    mutationFn: async (payload: UploadBillDocumentsPayload) => {
      const orgId = requireOrganizationId(organizationId);

      return billsService.uploadDocumentsAsync({
        organizationId: orgId,
        billId: payload.billId,
        files: payload.files,
        documentType: payload.documentType,
      });
    },
    onSuccess: async () => {
      if (organizationId) {
        await invalidateBillQueries(organizationId);
      }
    },
  });

  return {
    addBillAsync: addBillMutation.mutateAsync,
    deleteBillAsync: deleteBillMutation.mutateAsync,
    updateBillAsync: updateBillMutation.mutateAsync,
    uploadBillDocumentsAsync: uploadBillDocumentsMutation.mutateAsync,
    isAddingBill: addBillMutation.isPending,
    isDeletingBill: deleteBillMutation.isPending,
    isUpdatingBill: updateBillMutation.isPending,
    isUploadingBillDocuments: uploadBillDocumentsMutation.isPending,
  };
}
