export interface Customer {
  id: string
  full_name: string
  email: string | null
  phone: string | null
  notes: string | null
  created_at: string
}

export interface Event {
  id: string
  customer_id: string
  name: string
  slug: string
  description: string | null
  event_date: string | null
  active_from: string | null
  active_until: string | null
  storage_expires_at: string | null
  is_active: boolean
  created_at: string
  created_by: string | null
  customers?: Customer
}

export interface Guest {
  id: string
  event_id: string
  display_name: string
  created_at: string
}

export interface Photo {
  id: string
  event_id: string
  guest_id: string | null
  uploader_name: string
  storage_path: string
  created_at: string
  is_deleted: boolean
  is_approved: boolean
  url?: string
}

export interface ContactRequest {
  id: string
  name: string
  email_or_phone: string
  event_type: string | null
  event_date: string | null
  note: string | null
  created_at: string
}
