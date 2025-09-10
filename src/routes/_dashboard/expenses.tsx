import { createFileRoute } from '@tanstack/react-router'
import { Expenses } from '@/pages/expenses'

export const Route = createFileRoute('/_dashboard/expenses')({
  component: Expenses,
})