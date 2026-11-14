CREATE TABLE public.workshop_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  whatsapp text NOT NULL,
  country text NOT NULL,
  profession text NOT NULL,
  content_stage text NOT NULL,
  workshop_key text NOT NULL DEFAULT 'workshop-1',
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  fbclid text,
  referrer text,
  landing_page_url text,
  event_id text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT ALL ON public.workshop_registrations TO service_role;

ALTER TABLE public.workshop_registrations ENABLE ROW LEVEL SECURITY;
