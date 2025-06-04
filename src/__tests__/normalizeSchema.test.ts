import { describe, it, expect } from 'vitest'
import { spawnSync } from 'child_process'

describe('normalize_schema', () => {
  const run = (schema: string) => {
    const py = [
      'import sys, os',
      "sys.path.append('public')",
      "from python.model_checker import normalize_schema",
      `print(normalize_schema('${schema}'))`
    ].join('\n')
    return spawnSync('python3', ['-c', py])
  }

  it('handles IFC4X3_ADD2', () => {
    const r = run('IFC4X3_ADD2')
    expect(r.status).toBe(0)
    expect(r.stdout.toString().trim()).toBe('IFC4X3')
  })

  it('defaults unknown to IFC4', () => {
    const r = run('UNKNOWN')
    expect(r.status).toBe(0)
    expect(r.stdout.toString().trim()).toBe('IFC4')
  })
})
