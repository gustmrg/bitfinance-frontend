export type FileCategory = "Boleto" | "Receipt" | "Other";

export type AttachmentType = "BillDocument" | "ExpenseDocument" | "UserAvatar";

export interface Attachment {
  id: string;
  fileName: string;
  contentType: string;
  fileCategory: FileCategory;
  attachmentType: AttachmentType;
}
