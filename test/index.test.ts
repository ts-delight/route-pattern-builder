import { pattern } from '../src';

// Interface to witness type compatibility
interface ExtendsWitness<T1 extends T2, T2> {
  _t: T1;
}

test('pattern', () => {
    expect(pattern('/foo').pattern).toEqual('/foo');
    expect(pattern().literal('/foo/bar').pattern).toEqual('/foo/bar');
    expect(pattern().literal('/foo/').param('name').pattern).toEqual('/foo/:name');
    expect(pattern().literal('/foo/').splat('name').pattern).toEqual('/foo/*name');
    expect(pattern().literal('/foo/').splat('name').literal('/bar/').param('baz').pattern).toEqual('/foo/*name/bar/:baz');
    const p = pattern()
        .literal('/foo')
        .optional(
            pattern()
                .literal('/foo')
                .slash()
                .param('name')
                .slash()
                .splat('bar')
        )
        .slash()
        .param('baz')
        .slash()
        .splat('kat');

    type T = ExtendsWitness<typeof p.Type, {
        name?: string | undefined,
        bar?: string | undefined,
        baz: string,
        kat?: string | undefined
    }>

    expect(p.pattern).toEqual('/foo(/foo/:name/*bar)/:baz/*kat');
});
