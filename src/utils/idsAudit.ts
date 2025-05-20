export interface IdsAuditResult {
  valid: boolean
  errors: string[]
}

export async function auditIds(content: string): Promise<IdsAuditResult> {
  const parser = new DOMParser()
  const doc = parser.parseFromString(content, 'application/xml')
  const parserError = doc.getElementsByTagName('parsererror')[0]
  if (parserError) {
    return { valid: false, errors: [parserError.textContent || 'Unknown XML error'] }
  }

  const root = doc.documentElement
  if (!root || root.localName.toLowerCase() !== 'ids') {
    return { valid: false, errors: ['Root element <ids> not found'] }
  }

  return { valid: true, errors: [] }
}
