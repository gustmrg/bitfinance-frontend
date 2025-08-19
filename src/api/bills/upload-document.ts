import { privateAPI } from "@/lib/axios";

const api = privateAPI();

export type DocumentType = "Invoice" | "Receipt" | "Contract" | "Other";

export interface UploadDocumentRequest {
  organizationId: string;
  billId: string;
  file: File;
  documentType: DocumentType;
}

export interface UploadDocumentResponse {
  id: string;
  fileName: string;
  fileSize: number;
  documentType: DocumentType;
  uploadedDate: string;
}

export async function uploadDocument({
  organizationId,
  billId,
  file,
  documentType,
}: UploadDocumentRequest): Promise<UploadDocumentResponse> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("documentType", documentType);

  try {
    const response = await api.post<UploadDocumentResponse>(
      `/organizations/${organizationId}/bills/${billId}/documents`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Failed to upload document:", error);
    throw error;
  }
}

export async function uploadMultipleDocuments(
  organizationId: string,
  billId: string,
  files: File[],
  documentType: DocumentType
): Promise<UploadDocumentResponse[]> {
  const uploadPromises = files.map((file) =>
    uploadDocument({ organizationId, billId, file, documentType })
  );

  try {
    const results = await Promise.all(uploadPromises);
    return results;
  } catch (error) {
    console.error("Failed to upload some documents:", error);
    throw error;
  }
}