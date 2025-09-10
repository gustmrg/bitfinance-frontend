import { createFileRoute } from '@tanstack/react-router'
import { CreateOrganization } from '@/pages/organizations'

export const Route = createFileRoute('/_dashboard/organizations')({
  component: CreateOrganization,
})