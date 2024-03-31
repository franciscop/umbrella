declare module "umbrellajs" {
  export interface Umbrella {
    new (
      parameter: this | string | Element | ArrayLike<Element | null> | null
    ): this;
    new (selector: string, context?: Element | Document | null): this;
    new (): this;

    (
      parameter: this | string | Element | ArrayLike<Element | null> | null
    ): this;
    (selector: string, context?: Element | Document | null): this;
    (): this;

    nodes: Array<Element>;
    length: number;

    addClass(
      ...classes: Array<
        string | string[] | ((node: Element, i: number) => string)
      >
    ): this;

    after(item: this | string | Element | ArrayLike<Element>): this;
    after(
      callback: (
        placeholderItem: {},
        placeholderIndex: 0,
        node: Element,
        nodeIndex: number
      ) => this | string | Element | ArrayLike<Element>
    ): this;
    after<T>(
      callback: (
        dataItem: T,
        dataIndex: number,
        node: Element,
        nodeIndex: number
      ) => this | string | Element | ArrayLike<Element>,
      data: ArrayLike<T>
    ): this;
    after<T>(
      callback: (
        selectorMatchItem: Element,
        selectorMatchIndex: number,
        node: Element,
        nodeIndex: number
      ) => this | string | Element | ArrayLike<Element>,
      selector: string
    ): this;
    after(
      callback: (
        repeatCounterValue: number,
        repeatCounterIndex: number,
        node: Element,
        nodeIndex: number
      ) => this | string | Element | ArrayLike<Element>,
      repeat: number
    ): this;

    append: typeof u.after;

    /**
     * Returns the innerHTML string of each node.
     */
    array(): string[];
    /**
     * Maps the given callback function for each node.
     * If the callback function returns a falsy value, then it is excluded from the array.
     * Else if the callback function returns a string, then it is used to create a new u() instance, and the matched node(s) are then concatenated to the array.
     * Else if the callback function returns an array, then it is concatenated to the array.
     * Otherwise, the callback function's return value is concatenated to the array.
     * @param callback
     */
    array(callback: (node: Element, i: number) => string): Array<Element>;
    /**
     * Maps the given callback function for each node.
     * If the callback function returns a falsy value, then it is excluded from the array.
     * Else if the callback function returns a string, then it is used to create a new u() instance, and the matched node(s) are then concatenated to the array.
     * Else if the callback function returns an array, then it is concatenated to the array.
     * Otherwise, the callback function's return value is appended to the array.
     * @param callback
     */
    array<T>(callback: (node: Element, i: number) => Array<T>): Array<T>;
    /**
     * Maps the given callback function for each node.
     * If the callback function returns a falsy value, then it is excluded from the array.
     * Else if the callback function returns a string, then it is used to create a new u() instance, and the matched node(s) are then concatenated to the array.
     * Else if the callback function returns an array, then it is concatenated to the array.
     * Otherwise, the callback function's return value is appended to the array.
     * @param callback
     */
    array<T>(callback: (node: Element, i: number) => T): Array<any>;

    attr(name: string): string | null;
    attr(
      name: string,
      callback: (node: Element, i: number) => string | number | null | undefined
    ): this;
    attr(name: string, value: string | number | null | undefined): this;
    attr(pairs: {
      [key: string]:
        | ((node: Element, i: number) => string | number | null | undefined)
        | string
        | null
        | undefined;
    }): this;

    before: typeof u.after;

    children(): this;
    children(selector: string): this;
    children(u: this): this;
    children(callback: (node: Element, index: number) => boolean): this;

    clone(): this;

    closest(filter?: any): this;

    first(): Element | false;

    data: typeof u.attr;

    each(callback: (node: Element, i: number) => void): this;

    empty(): this;

    filter(selector: string): this;
    filter(u: this): this;
    filter(callback: (node: Element, index: number) => boolean): this;

    find(selector?: string): this;

    first(): Element | false;

    handle: typeof u.on;

    hasClass(...classNames: (string | string[] | (() => string))[]): boolean;

    html(): string;
    html(html: string): this;

    is(filter: this): boolean;
    is(selector: string): boolean;
    is(
      callback: (this: this, node: Element, index: number) => boolean
    ): boolean;

    last(): Element | false;

    map(callback: (node: Element, index: number) => any): this;

    not: typeof u.filter;

    off(events: string | string[]): this;
    off(events: string | string[], selector: string): this;
    off(events: string | string[], callback: () => void): this;
    off(
      events: string | string[],
      selector: string,
      callback: () => void
    ): this;

    on(
      events: string | string[],
      callback: (this: this, e: Event, ...data: any[]) => void
    ): this;
    on(
      events: string | string[],
      selector: string,
      callback: (this: this, e: Event, ...data: any[]) => void
    ): this;

    parent(): this;
    parent(selector: string): this;
    parent(u: this): this;
    parent(callback: (node: Element, index: number) => boolean): this;

    prepend: typeof u.after;

    remove(): this;

    removeClass: typeof u.addClass;

    replace: typeof u.after;

    scroll(): this;

    serialize(): string;

    siblings: typeof u.children;

    size(): DOMRect | null;

    text(): string;
    text(text: string): this;

    toggleClass(classes: string | string[], forceAdd?: boolean): this;

    trigger(events: string | string[], ...data: any[]): this;

    wrap(
      parameter: this | string | Element | ArrayLike<Element | null> | null
    ): this;
  }

  const u: Umbrella;
  export default u;
}
