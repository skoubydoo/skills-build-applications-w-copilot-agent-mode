const codespaceName = import.meta.env.VITE_CODESPACE_NAME

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

function extractCollection(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (!payload || typeof payload !== 'object') {
    return []
  }

  for (const key of ['data', 'results', 'items', 'docs']) {
    const value = payload[key]

    if (Array.isArray(value)) {
      return value
    }

    if (value && typeof value === 'object') {
      const nested = extractCollection(value)
      if (nested.length > 0) {
        return nested
      }
    }
  }

  return []
}

export async function fetchResource(resource) {
  const response = await fetch(`${apiBaseUrl}/${resource}/`)

  if (!response.ok) {
    throw new Error(`Unable to load ${resource}: ${response.status}`)
  }

  const payload = await response.json()
  return extractCollection(payload)
}
