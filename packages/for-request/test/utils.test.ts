import serialize from '../src/utils/serialize';

describe('utils', () => {
  describe('serialize', () => {
    it('empty', () => {
      expect(serialize({})).toBe('');
      expect(serialize([])).toBe('');
      expect(serialize('')).toBe('');
      expect(serialize(null)).toBe('');
    });

    it('array', () => {
      expect(serialize(['a', 'b'])).toBe('0=a&1=b');
    });

    it('object', () => {
      expect(serialize({ a: '1', b: 2 })).toBe('a=1&b=2');
      expect(serialize({ a: [1, 2] })).toBe('a=1&a=2');
      expect(serialize({ a: ['a1', 'a2'], b: 'b' })).toBe('a=a1&a=a2&b=b');
    });
  });
});
