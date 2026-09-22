CREATE POLICY "No public access to authority applications"
ON public.authority_engine_applications
FOR ALL
TO anon, authenticated
USING (false)
WITH CHECK (false);

CREATE POLICY "No public access to project inquiries"
ON public.project_inquiries
FOR ALL
TO anon, authenticated
USING (false)
WITH CHECK (false);

CREATE POLICY "No public access to audit leads"
ON public.audit_leads
FOR ALL
TO anon, authenticated
USING (false)
WITH CHECK (false);