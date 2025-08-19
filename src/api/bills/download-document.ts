import { privateAPI } from "@/lib/axios";

const api = privateAPI();

export async function downloadDocument(
  organizationId: string,
  billId: string,
  documentId: string,
  fileName: string
): Promise<void> {
  try {
    const response = await api.get(
      `/organizations/${organizationId}/bills/${billId}/documents/${documentId}`,
      {
        responseType: "blob",
      }
    );

    const blob = new Blob([response.data]);
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Failed to download document:", error);
    throw error;
  }
}