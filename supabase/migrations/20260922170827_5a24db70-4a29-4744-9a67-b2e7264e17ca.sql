CREATE TABLE public.authority_engine_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profession text NOT NULL,
  market text NOT NULL,
  content_stage text NOT NULL,
  primary_goal text NOT NULL,
  start_timeline text NOT NULL,
  investment_fit text NOT NULL,
  decision_maker text NOT NULL,
  name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  instagram text,
  linkedin text,
  website text,
  note text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  fbclid text,
  referrer text,
  landing_page_url text NOT NULL,
  event_id text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT ALL ON public.authority_engine_applications TO service_role;

ALTER TABLE public.authority_engine_applications ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.update_authority_engine_applications_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER authority_engine_applications_updated_at
BEFORE UPDATE ON public.authority_engine_applications
FOR EACH ROW
EXECUTE FUNCTION public.update_authority_engine_applications_updated_at();