import { privateAPI } from "@/lib/axios";

import { normalizeError } from "@/api/shared/normalize-error";

import type {
  CreateExpenseRequest,
  CreateExpenseResponse,
  ExpensesListQuery,
  ExpensesListResponse,
  UpdateExpenseRequest,
  UpdateExpenseResponse,
} from "./expenses.types";

const authApi = privateAPI();

export const expensesService = {
  async listAsync(query: ExpensesListQuery): Promise<ExpensesListResponse> {
    try {
      const response = await authApi.get<ExpensesListResponse>(
        `/organizations/${query.organizationId}/expenses`,
        {
          params: {
            from: query.from,
            to: query.to,
          },
        }
      );

      return response.data;
    } catch (error) {
      throw normalizeError(error, "Failed to fetch expenses.");
    }
  },

  async createAsync(
    request: CreateExpenseRequest
  ): Promise<CreateExpenseResponse> {
    try {
      const response = await authApi.post<CreateExpenseResponse>(
        `/organizations/${request.organizationId}/expenses`,
        {
          description: request.description,
          category: request.category,
          status: request.status,
          amount: request.amount,
          occurredAt: request.occurredAt,
          createdBy: request.createdBy,
        }
      );

      return response.data;
    } catch (error) {
      throw normalizeError(error, "Failed to create expense.");
    }
  },

  async updateAsync(
    request: UpdateExpenseRequest
  ): Promise<UpdateExpenseResponse> {
    try {
      const response = await authApi.patch<UpdateExpenseResponse>(
        `/organizations/${request.organizationId}/expenses/${request.id}`,
        {
          description: request.description,
          category: request.category,
          status: request.status,
          amount: request.amount,
          occurredAt: request.occurredAt,
          createdBy: request.createdBy,
        }
      );

      return response.data;
    } catch (error) {
      throw normalizeError(error, "Failed to update expense.");
    }
  },

  async deleteAsync(id: string, organizationId: string): Promise<void> {
    try {
      await authApi.delete(`/organizations/${organizationId}/expenses/${id}`);
    } catch (error) {
      throw normalizeError(error, "Failed to delete expense.");
    }
  },
};
