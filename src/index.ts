class Pattern<TMatch extends {} = {}> {
    constructor(public pattern = '') {}
    get Type(): TMatch {
        throw new Error('This property is present only to facilitate a type accessor and is not intended to be accessed directly'); //
    }
    literal(fragment: string) {
        return new Pattern<TMatch>(`${this.pattern}${fragment}`);
    }
    slash() {
        return new Pattern<TMatch>(`${this.pattern}/`);
    }
    param<TParam extends string>(name: TParam) {
        return new Pattern<TMatch & Record<TParam, string>>(`${this.pattern}:${name}`);
    }
    splat<TParam extends string>(name: TParam) {
        return new Pattern<TMatch & Record<TParam, string | undefined>>(`${this.pattern}*${name}`);
    }
    optional<TSubMatch>(pattern: Pattern<TSubMatch>) {
        return new Pattern<TMatch & Partial<TSubMatch>>(`${this.pattern}(${pattern.pattern})`);
    }
}

export const pattern = <TMatch extends {} = {}>(root = '') => new Pattern<TMatch>(root);
