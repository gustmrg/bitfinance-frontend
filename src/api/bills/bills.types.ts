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

export type BillDocumentType = "Invoice" | "Receipt" | "Contract" | "Other";

export interface BillDocument {
  id: string;
  billId: string;
  fileName: string;
  contentType: string;
  documentType: number;
}

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
  deletedDate?: string | null;
  notes?: string;
  documents?: BillDocument[];
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
  documentType: BillDocumentType;
}

export interface UploadBillDocumentResponse {
  id: string;
  fileName: string;
  fileSize: number;
  documentType: BillDocumentType;
  uploadedDate: string;
}

export interface DownloadBillDocumentRequest {
  organizationId: string;
  billId: string;
  documentId: string;
  fileName: string;
}
