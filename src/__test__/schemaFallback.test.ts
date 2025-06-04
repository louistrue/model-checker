import { execFileSync } from 'child_process';
import { expect, test } from 'vitest';

test('IFC schema fallback opens IFC4X3_RC1 file', () => {
  const output = execFileSync('python3', ['scripts/test_schema_fallback.py'], { encoding: 'utf-8' });
  expect(output.trim()).toBe('OK');
});
