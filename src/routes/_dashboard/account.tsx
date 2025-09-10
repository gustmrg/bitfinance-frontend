import { createFileRoute } from '@tanstack/react-router'
import { Account } from '@/pages/account'

export const Route = createFileRoute('/_dashboard/account')({
  component: Account,
})