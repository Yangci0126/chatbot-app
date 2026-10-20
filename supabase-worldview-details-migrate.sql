ALTER TABLE worldviews ADD COLUMN IF NOT EXISTS details TEXT DEFAULT '';

UPDATE worldviews
SET details = CONCAT_WS(chr(10),
  NULLIF(era, ''),
  NULLIF(technology, ''),
  NULLIF(world_events, '')
)
WHERE COALESCE(details, '') = ''
  AND (COALESCE(era,'') <> '' OR COALESCE(technology,'') <> '' OR COALESCE(world_events,'') <> '');
