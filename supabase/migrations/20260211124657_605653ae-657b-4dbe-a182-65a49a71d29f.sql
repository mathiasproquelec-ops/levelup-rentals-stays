
CREATE OR REPLACE FUNCTION public.generate_invoice_number()
RETURNS TEXT
LANGUAGE sql
SET search_path = public
AS $$
  SELECT 'LS-' || EXTRACT(YEAR FROM CURRENT_DATE)::TEXT || '-' || LPAD(nextval('invoice_number_seq')::TEXT, 3, '0')
$$;
