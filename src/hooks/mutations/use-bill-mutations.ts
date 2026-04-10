import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  billsService,
  type BillFileCategory,
  type CreateBillRequest,
  type UpdateBillRequest,
} from "@/api/bills";
import { queryKeys } from "@/lib/query-keys";

interface UploadBillDocumentsPayload {
  billId: string;
  files: File[];
  fileCategory: BillFileCategory;
}

interface DeleteBillAttachmentPayload {
  billId: string;
  attachmentId: string;
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

  const invalidateBillQueries = async (orgId: string, billId?: string) => {
    const promises: Promise<void>[] = [
      queryClient.invalidateQueries({
        queryKey: queryKeys.bills.listByOrganization(orgId),
      }),
      queryClient.invalidateQueries({
        queryKey: queryKeys.dashboard.upcomingBills(orgId),
      }),
    ];

    if (billId) {
      promises.push(
        queryClient.invalidateQueries({
          queryKey: queryKeys.bills.detail(orgId, billId),
        })
      );
    }

    await Promise.all(promises);
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
    onSuccess: async (_data, variables) => {
      if (organizationId) {
        await invalidateBillQueries(organizationId, variables.id);
      }
    },
  });

  const deleteBillMutation = useMutation({
    mutationFn: async (billId: string) => {
      const orgId = requireOrganizationId(organizationId);
      return billsService.deleteAsync(billId, orgId);
    },
    onSuccess: async (_data, billId) => {
      if (organizationId) {
        await invalidateBillQueries(organizationId, billId);
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
        fileCategory: payload.fileCategory,
      });
    },
    onSuccess: async (_data, variables) => {
      if (organizationId) {
        await invalidateBillQueries(organizationId, variables.billId);
      }
    },
  });

  const deleteBillAttachmentMutation = useMutation({
    mutationFn: async (payload: DeleteBillAttachmentPayload) => {
      const orgId = requireOrganizationId(organizationId);

      return billsService.deleteAttachmentAsync({
        organizationId: orgId,
        billId: payload.billId,
        attachmentId: payload.attachmentId,
      });
    },
    onSuccess: async (_data, variables) => {
      if (organizationId) {
        await invalidateBillQueries(organizationId, variables.billId);
      }
    },
  });

  return {
    addBillAsync: addBillMutation.mutateAsync,
    deleteBillAttachmentAsync: deleteBillAttachmentMutation.mutateAsync,
    deleteBillAsync: deleteBillMutation.mutateAsync,
    updateBillAsync: updateBillMutation.mutateAsync,
    uploadBillDocumentsAsync: uploadBillDocumentsMutation.mutateAsync,
    isAddingBill: addBillMutation.isPending,
    isDeletingBillAttachment: deleteBillAttachmentMutation.isPending,
    isDeletingBill: deleteBillMutation.isPending,
    isUpdatingBill: updateBillMutation.isPending,
    isUploadingBillDocuments: uploadBillDocumentsMutation.isPending,
  };
}
