/* eslint-disable no-useless-escape */
import { describe, it, expect } from 'vitest'
import { spawnSync } from 'child_process'

describe('schema fallback', () => {
  it('maps IFC4X3_RC1 to IFC4X3', () => {
    const py = "from ifcopenshell.util.schema import get_fallback_schema;print(get_fallback_schema('IFC4X3_RC1'))"
    const result = spawnSync('python3', ['-c', py])
    expect(result.status).toBe(0)
    expect(result.stdout.toString().trim()).toBe('IFC4X3')
  })
})
