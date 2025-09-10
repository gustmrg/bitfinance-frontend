import { createFileRoute } from '@tanstack/react-router'
import { AddBill } from '@/pages/bills/add'

export const Route = createFileRoute('/_dashboard/bills/add')({
  component: AddBill,
})