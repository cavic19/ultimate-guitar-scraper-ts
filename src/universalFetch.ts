export default async function universalFetch(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> {
  if (typeof fetch === 'function') {
    // Native fetch (browser or Node 18+)
    return fetch(input, init);
  } else {
    // Node <18: dynamically import node-fetch
    const { default: fetch } = await import('node-fetch');

    // Cast to fix type mismatch — because node-fetch uses its own types
    return fetch(input as any, init as any) as unknown as Response;
  }
}