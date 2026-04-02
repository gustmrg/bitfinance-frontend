import { privateAPI } from "@/lib/axios";

import { normalizeError } from "@/api/shared/normalize-error";

import type {
  Bill,
  BillsListQuery,
  BillsListResponse,
  CreateBillRequest,
  CreateBillResponse,
  DownloadBillDocumentRequest,
  UpdateBillRequest,
  UpdateBillResponse,
  UploadBillDocumentsRequest,
  UploadBillDocumentResponse,
} from "./bills.types";

const authApi = privateAPI();

async function uploadDocumentAsync(
  organizationId: string,
  billId: string,
  file: File,
  documentType: UploadBillDocumentsRequest["documentType"]
): Promise<UploadBillDocumentResponse> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("documentType", documentType);

  const response = await authApi.post<UploadBillDocumentResponse>(
    `/organizations/${organizationId}/bills/${billId}/documents`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
}

export const billsService = {
  async getAsync(organizationId: string, billId: string): Promise<Bill> {
    try {
      const response = await authApi.get<Bill>(
        `/organizations/${organizationId}/bills/${billId}`
      );

      return response.data;
    } catch (error) {
      throw normalizeError(error, "Failed to fetch bill.");
    }
  },

  async listAsync(query: BillsListQuery): Promise<BillsListResponse> {
    try {
      const response = await authApi.get<BillsListResponse>(
        `/organizations/${query.organizationId}/bills`,
        {
          params: {
            from: query.from,
            to: query.to,
          },
        }
      );

      return response.data;
    } catch (error) {
      throw normalizeError(error, "Failed to fetch bills.");
    }
  },

  async createAsync(request: CreateBillRequest): Promise<CreateBillResponse> {
    try {
      const response = await authApi.post<CreateBillResponse>(
        `/organizations/${request.organizationId}/bills`,
        {
          description: request.description,
          category: request.category,
          status: request.status,
          dueDate: request.dueDate,
          amountDue: request.amountDue,
          paymentDate: request.paymentDate,
          amountPaid: request.amountPaid,
        }
      );

      return response.data;
    } catch (error) {
      throw normalizeError(error, "Failed to create bill.");
    }
  },

  async updateAsync(request: UpdateBillRequest): Promise<UpdateBillResponse> {
    try {
      const response = await authApi.patch<UpdateBillResponse>(
        `/organizations/${request.organizationId}/bills/${request.id}`,
        {
          description: request.description,
          category: request.category,
          status: request.status,
          dueDate: request.dueDate,
          amountDue: request.amountDue,
          paymentDate: request.paymentDate,
          amountPaid: request.amountPaid,
        }
      );

      return response.data;
    } catch (error) {
      throw normalizeError(error, "Failed to update bill.");
    }
  },

  async deleteAsync(id: string, organizationId: string): Promise<void> {
    try {
      await authApi.delete(`/organizations/${organizationId}/bills/${id}`);
    } catch (error) {
      throw normalizeError(error, "Failed to delete bill.");
    }
  },

  async uploadDocumentsAsync(
    payload: UploadBillDocumentsRequest
  ): Promise<UploadBillDocumentResponse[]> {
    try {
      const uploadResults = await Promise.all(
        payload.files.map((file) =>
          uploadDocumentAsync(
            payload.organizationId,
            payload.billId,
            file,
            payload.documentType
          )
        )
      );
      return uploadResults;
    } catch (error) {
      throw normalizeError(error, "Failed to upload bill documents.");
    }
  },

  async downloadDocumentAsync(
    payload: DownloadBillDocumentRequest
  ): Promise<void> {
    try {
      const response = await authApi.get(
        `/organizations/${payload.organizationId}/bills/${payload.billId}/documents/${payload.documentId}`,
        {
          responseType: "blob",
        }
      );

      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = payload.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      throw normalizeError(error, "Failed to download bill document.");
    }
  },
};
