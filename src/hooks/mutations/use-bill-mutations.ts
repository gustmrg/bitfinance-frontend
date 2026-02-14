import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CreateBill } from "@/api/bills/create-bill";
import { DeleteBill } from "@/api/bills/delete-bill";
import { UpdateBill } from "@/api/bills/update-bill";
import {
  type DocumentType,
  uploadMultipleDocuments,
} from "@/api/bills/upload-document";
import type { CreateBillRequest } from "@/api/bills/create-bill";
import type { UpdateBillRequest } from "@/api/bills/update-bill";
import { queryKeys } from "@/lib/query-keys";

interface UploadBillDocumentsPayload {
  billId: string;
  files: File[];
  documentType: DocumentType;
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

      return CreateBill({
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

      return UpdateBill({
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
      return DeleteBill(billId, orgId);
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

      return uploadMultipleDocuments(
        orgId,
        payload.billId,
        payload.files,
        payload.documentType
      );
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
