import { describe, expect, it } from 'vitest'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

// Use the translated report shape to avoid excess/missing property errors
import type { ValidationResult as ReportValidationResult } from '../../../services/IDSTranslationService'
import { generateHtmlReport } from './useEnhancedHtmlReport'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const reportTemplate = readFileSync(resolve(__dirname, '../../../..', 'public', 'report.html'), 'utf-8')

const stubTranslator = (key: string, defaultValue?: string) => defaultValue ?? key

describe('generateHtmlReport', () => {
  it('renders entity tables for requirements with passed and failed entities', async () => {
    const validationResult: ReportValidationResult = {
      title: 'Test Report',
      filename: 'demo.ifc',
      date: '2025-01-01',
      status: false,
      status_text: 'FAIL',
      _lang: 'de',
      language_code: 'de',
      total_specifications: 1,
      total_specifications_pass: 0,
      total_specifications_fail: 1,
      percent_specifications_pass: 0,
      total_requirements: 1,
      total_requirements_pass: 0,
      total_requirements_fail: 1,
      percent_requirements_pass: 0,
      total_checks: 1,
      total_checks_pass: 0,
      total_checks_fail: 1,
      percent_checks_pass: 0,
      specifications: [
        {
          name: 'Sample Specification',
          description: 'Sample description',
          instructions: '',
          status: false,
          status_text: 'FAIL',
          percent_checks_pass: 0,
          total_checks: 1,
          total_checks_pass: 0,
          total_checks_fail: 1,
          total_applicable: 1,
          total_applicable_pass: 0,
          applicability: ['All Sample data'],
          requirements: [
            {
              description: 'Requirement desc',
              status: false,
              total_checks: 2,
              total_pass: 1,
              total_fail: 1,
              has_omitted_passes: false,
              has_omitted_failures: false,
              passed_entities: [
                {
                  globalId: '1ABC',
                  type: 'IfcWall',
                  name: 'Wall A',
                  tag: 'WALL-01',
                  description: 'Main wall',
                },
              ],
              failed_entities: [
                {
                  globalId: '2DEF',
                  type: 'IfcDoor',
                  name: 'Door B',
                  tag: 'DOOR-02',
                  description: 'Door missing property',
                },
              ],
            },
          ],
        },
      ],
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const html = await generateHtmlReport(reportTemplate, validationResult as any, stubTranslator)

    expect(html).toContain('<td>IfcWall</td>')
    expect(html).toContain('<td>Wall A</td>')
    expect(html).toContain('<td>Door B</td>')
    expect(html).toContain('<td>IfcDoor</td>')
  })
})
