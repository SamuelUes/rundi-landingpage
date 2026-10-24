/**
 * Datos estructurados (schema.org / JSON-LD). Server-safe:
 * renderiza un <script> estático sin dependencias de cliente.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
