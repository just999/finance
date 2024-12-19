-- CREATE OR REPLACE FUNCTION calculate_total (
--   range_arg VARCHAR default 'last30days', type_arg VARCHAR default null
-- ) RETURNS table(current_amount numeric, previous_amount numeric) AS $$ 
-- DECLARE
--   currentStart TIMESTAMP;
--   currentEnd TIMESTAMP;
--   previousStart TIMESTAMP;
--   previousEnd TIMESTAMP;
-- BEGIN
--   currentEnd := NOW();
--   currentStart := CASE
--       WHEN range_arg = 'last24hours' THEN currentEnd - interval '24 hours'
--       WHEN range_arg = 'last7days' THEN currentEnd - interval '7 days'
--       WHEN range_arg = 'last30days' THEN currentEnd - interval '30 days'
--       WHEN range_arg = 'last12months' THEN currentEnd - interval '12 months'
--       else currentEnd - interval '30 days'
--   END;
--   previousEnd := currentStart - interval '1 second';
--   previousStart := currentStart - (currentEnd - currentStart);
--   current_amount := (
--     SELECT COALESCE(SUM(amount),0)
--     FROM transactions
--     WHERE
--         (type = type_arg OR type_arg is null)
--         AND (created_at between currentStart AND currentEnd)
--   );
--   previous_amount := (
--     SELECT COALESCE(SUM(amount),0)
--     FROM transactions
--     WHERE
--         (type = type_arg OR type_arg is null)
--         AND (created_at between previousStart AND previousEnd)
--   );
--   RETURN next;
-- END;
-- $$ LANGUAGE plpgsql


CREATE OR REPLACE FUNCTION calculate_total (
  range_arg VARCHAR default 'last30days', type_arg VARCHAR default null
) RETURNS table(current_amount numeric, previous_amount numeric) AS $$ 
DECLARE
  currentStart TIMESTAMP;
  currentEnd TIMESTAMP;
  previousStart TIMESTAMP;
  previousEnd TIMESTAMP;
BEGIN
  currentEnd := NOW() + interval '7 hours';  -- Add 7 hours to UTC
  currentStart := CASE
      WHEN range_arg = 'last24hours' THEN currentEnd - interval '24 hours'
      WHEN range_arg = 'last7days' THEN currentEnd - interval '7 days'
      WHEN range_arg = 'last30days' THEN currentEnd - interval '30 days'
      WHEN range_arg = 'last12months' THEN currentEnd - interval '12 months'
      ELSE currentEnd - interval '30 days'
  END;
  previousEnd := currentStart - interval '1 second';
  previousStart := currentStart - (currentEnd - currentStart);
  
  current_amount := (
    SELECT COALESCE(SUM(amount),0)
    FROM transactions
    WHERE
        (type = type_arg OR type_arg IS null)
        AND (created_at BETWEEN currentStart AND currentEnd)
  );
  
  previous_amount := (
    SELECT COALESCE(SUM(amount),0)
    FROM transactions
    WHERE
        (type = type_arg OR type_arg IS null)
        AND (created_at BETWEEN previousStart AND previousEnd)
  );
  
  RETURN NEXT;
END;
$$ LANGUAGE plpgsql;