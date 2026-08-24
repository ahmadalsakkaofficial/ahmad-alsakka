CREATE TABLE public.audit_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  social_handle TEXT,
  profession TEXT,
  industry TEXT,
  answers JSONB NOT NULL DEFAULT '{}'::jsonb,
  overall_score INTEGER NOT NULL DEFAULT 0,
  category_scores JSONB NOT NULL DEFAULT '{}'::jsonb,
  analysis JSONB,
  clicked_strategy BOOLEAN NOT NULL DEFAULT false,
  clicked_work_with_me BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT ALL ON public.audit_leads TO service_role;

ALTER TABLE public.audit_leads ENABLE ROW LEVEL SECURITY;
