declare module 'umbrellajs' {

  type Iterator<Node, Return = void> = (this: Umbrella<Node>, node: Node, index: number) => Return;

  type AfterIterator<Node, Return = void, Arg> = (this: Umbrella<Node>, item: Arg, itemIndex: number, node: Node, index: number) => Return;

  type Many<T> = T | T[] | ArrayLike<T>;

  type Maybe<T> = T | null | undefined;

  type EmptyObject = {
    [key: string]: never;
  };

  type Selector<Node = Element> = string | Many<Node | string | null> | Umbrella<Node> | null;

  type NodeFromSelector<Sel extends Selector, Node extends Element> = Sel extends Element ? Sel : Sel extends Element[] ? Sel[number] : Sel extends Umbrella<infer InferredNode> ? InferredNode : Node;

  export interface Umbrella<Node = Element> {
    <Node extends Element = Element>(): Umbrella<Node>;

    <Node extends Element = Element>(parameter: Selector<Node>): Umbrella<Node>;

    <Node extends Element = Element>(selector: Selector<Node>, context: Element): Umbrella<Node>;

    nodes: Array<Node>;

    length: number;


    // Inserting methods
    after(): this;

    after(item: Selector): this;

    after(callback: AfterIterator<Node, Selector, EmptyObject>): this;

    after(callback: AfterIterator<Node, Selector, number>, data: number): this;

    after<Arg>(callback: AfterIterator<Node, Selector, Arg>, data: Arg[]): this;

    append: this['after'];

    before: this['after'];

    prepend: this['after'];

    remove(): this;

    replace: this['after'];


    // Iterating methods
    array(): string[];

    array<Return>(callback: Iterator<Node, Return>): Array<Return>;

    each(callback: Iterator<Node>): this;

    map(): this;

    map<ResNode extends Element = Element, Sel extends Selector = Selector<ResNode>>(callback: Iterator<Node, Sel>): Umbrella<NodeFromSelector<Sel, ResNode>>;


    // Filtering methods
    filter(filter: Maybe<string>): this;

    filter(predicate: Iterator<Node, Maybe<boolean>>): this;

    filter(filter: Umbrella): this;

    is(filter: Maybe<string>): boolean;

    is(predicate: Iterator<Node, Maybe<boolean>>): boolean;

    is(filter: Umbrella): boolean;

    not: this['filter'];


    // Finding methods
    children<Node extends Element = Element>(): Umbrella<Node>;

    children<Node extends Element = Element>(filter: Maybe<string>): Umbrella<Node>;

    children<ResNode extends Element = Element>(predicate: Iterator<Node, Maybe<boolean>>): Umbrella<ResNode>;

    children<Node extends Element>(filter: Umbrella<Node>): Umbrella<Node>;

    closest: this['children'];

    find(): Umbrella;

    find<ResNode extends Element = Element, Sel extends Selector = Selector<ResNode>>(selector: Sel): Umbrella<NodeFromSelector<Sel, ResNode>>;

    find(predicate: Iterator<Node, Maybe<boolean>>): Umbrella;

    first(): Node | false;

    last(): Node | false;

    parent<Node extends Element = Element>(): Umbrella<Node>;

    parent<ResNode extends Element = Element, Sel extends Selector = Selector<ResNode>>(selector: Sel): Umbrella<NodeFromSelector<Sel, ResNode>>;

    parent<ResNode extends Element = Element>(predicate: Iterator<Node, Maybe<boolean>>): Umbrella<ResNode>;

    siblings: this['children'];


    // Class methods
    addClass(...classes: Array<Many<string> | Iterator<Node, string>>): this;

    hasClass(...classes: Array<Many<string> | Iterator<Node, string>>): boolean;

    removeClass: this['addClass'];

    toggleClass(classes: Many<string> | Iterator<Node, string>): this;

    toggleClass(classes: Many<string> | Iterator<Node, string>, forceAdd: boolean): this;


    // Attributes methods
    attr(name: string): string | null;

    attr(name: string, value: Maybe<string>): this;

    attr(name: string, callback: Iterator<Node, Maybe<string>>): this;

    attr(pairs: Record<string, Maybe<string> | Iterator<Node, Maybe<string>>>): this;

    data: this['attr'];


    // Event listeners methods
    handle: this['on'];

    off(events: Many<string>): this;

    off(events: Many<string>, selector: string): this;

    off(events: Many<string>, selector: string, callback: () => void): this;

    on<Arg>(
      events: Many<string>,
      callback: (this: this, event: Event, ...data: Arg[]) => void,
    ): this;

    on<Arg>(
      events: Many<string>,
      selector: string,
      callback: (this: this, event: Event, ...data: Arg[]) => void,
    ): this;

    trigger<Arg>(events: Many<string>, ...data: Arg[]): this;


    // Content insert methods
    html(): string;

    html(value: string): this;

    text(): string;

    text(value: string): this;

    // Other
    clone(): this;

    empty(): this;

    scroll(): this;

    serialize(): string;

    size(): DOMRect;

    wrap<ResNode extends Element = Element, Sel extends Selector = Selector<ResNode>>(selector: Sel): Umbrella<NodeFromSelector<Sel, ResNode>>;
  }

  const u: Umbrella;
  export default u;

}
