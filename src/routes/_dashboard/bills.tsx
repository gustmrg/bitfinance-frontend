import { createFileRoute } from '@tanstack/react-router'
import { Bills } from '@/pages/bills'

export const Route = createFileRoute('/_dashboard/bills')({
  component: Bills,
})