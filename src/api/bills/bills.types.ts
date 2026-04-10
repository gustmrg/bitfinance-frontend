import type {
  Attachment,
  AttachmentType,
  FileCategory,
} from "@/api/shared/attachment.types";

export type BillCategory =
  | "housing"
  | "transportation"
  | "food"
  | "utilities"
  | "clothing"
  | "healthcare"
  | "insurance"
  | "personal"
  | "debt"
  | "savings"
  | "education"
  | "entertainment"
  | "miscellaneous"
  | "subscriptions"
  | "taxes"
  | "pets";

export type BillStatus =
  | "created"
  | "due"
  | "paid"
  | "overdue"
  | "cancelled"
  | "upcoming";

export type BillFileCategory = FileCategory;

export type BillAttachmentType = AttachmentType;

export type BillAttachment = Attachment;

export interface Bill {
  id: string;
  description: string;
  category: BillCategory;
  status: BillStatus;
  amountDue: number;
  amountPaid?: number | null;
  createdDate?: string;
  createdAt?: string;
  dueDate: string;
  paymentDate?: string | null;
  paidDate?: string | null;
  notes?: string;
  attachments?: BillAttachment[];
}

export interface BillsListQuery {
  organizationId: string;
  from?: Date;
  to?: Date;
}

export interface BillsListResponse {
  data: Bill[];
  page: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
}

export interface CreateBillRequest {
  description: string;
  category: BillCategory;
  status: BillStatus;
  dueDate: string;
  paymentDate?: string | null;
  amountDue: number;
  amountPaid?: number | null;
  organizationId: string;
}

export interface CreateBillResponse {
  id: string;
  description: string;
  category: BillCategory;
  status: BillStatus;
  amountDue: number;
  amountPaid: number;
  createdDate: string;
  dueDate: string;
  paidDate?: string | null;
}

export interface UpdateBillRequest {
  id: string;
  description: string;
  category: BillCategory;
  status: BillStatus;
  dueDate: string;
  paymentDate?: string | null;
  amountDue: number;
  amountPaid?: number | null;
  organizationId: string;
}

export interface UpdateBillResponse {
  id: string;
  description: string;
  category: BillCategory;
  status: BillStatus;
  dueDate: string;
  paymentDate?: string | null;
  amountDue: number;
  amountPaid?: number | null;
}

export interface UploadBillDocumentsRequest {
  organizationId: string;
  billId: string;
  files: File[];
  fileCategory: BillFileCategory;
}

export interface UploadBillDocumentResponse {
  id: string;
  fileName: string;
  contentType: string;
  fileCategory: BillFileCategory;
  attachmentType: BillAttachmentType;
}

export interface DownloadBillDocumentRequest {
  organizationId: string;
  billId: string;
  documentId: string;
  fileName: string;
}

export interface DeleteBillAttachmentRequest {
  organizationId: string;
  billId: string;
  attachmentId: string;
}
