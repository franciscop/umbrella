declare module 'umbrellajs' {
  type IterateCallback<NODE, RETURN = void> = (this: Umbrella<NODE>, node: NODE, index: number) => RETURN;

  type InsertIterateCallback<NODE, RETURN = void, ARG> = (
    this: Umbrella<NODE>,
    arg: ARG,
    argIndex: number,
    node: NODE,
    index: number,
  ) => RETURN;

  type Many<T> = T | T[] | ArrayLike<T>;

  type Maybe<T> = T | null | undefined;

  type EmptyObject = {
    [key: string]: never;
  };

  /**
   * The `Selector` type can be one of the following:
   *
   * - A text CSS selector
   * - A single HTML Node. This is specially useful in events where you can just pass this
   * - A NodeList or other similar objects that can be converted to an array
   * - An array of nodes
   * - Another Umbrella instance
   * - An HTML fragment as a string
   * - `null` values are allowed and can be used to represent the absence of a selection.
   *
   * @example
   *   u('ul#demo li');
   *   u(document.getElementById('demo'));
   *   u(document.getElementsByClassName('demo'));
   *   u([document.getElementById('demo')]);
   *   u(u('ul li'));
   *   u('<a>');
   *   u('li', u('ul').first());
   */
  type Selector<Node = Element> = string | Many<Node | string | null> | Umbrella<Node> | null;

  export interface Umbrella<NODE = Element> {
    /**
     * Find nodes from the HTML with a CSS selector within the certain scope (context DOM node) for the query.
     *
     * [Documentation](https://umbrellajs.com/documentation)
     *
     * @example
     *   u('li', u('ul').first());
     *
     * @template NODE - Defines the type of DOM elements that the Umbrella instance manipulates. `NODE` extends from the
     *   standard DOM `Element`, allowing for specific element types like `HTMLDivElement` or `SVGElement`.
     * @param {Selector<NODE>} selector - The selector used to find elements {@linkcode Selector}.
     * @param {Element} context - The DOM Element within which to search for the selector. This defines the scope of the
     *   query.
     * @returns {Umbrella<NODE>} An instance of Umbrella so you can chain it to any of the other methods.
     */ <NODE extends Element = Element>(selector: Selector<NODE>, context: Element): Umbrella<NODE>;

    /**
     * Find nodes from the HTML with a CSS selector.
     *
     * [Documentation](https://umbrellajs.com/documentation)
     *
     * @example
     *   u('ul#demo li');
     *   u(document.getElementById('demo'));
     *   u(document.getElementsByClassName('demo'));
     *   u([document.getElementById('demo')]);
     *   u(u('ul li'));
     *   u('<a>');
     *
     * @template NODE - Defines the type of DOM elements that the Umbrella instance manipulates. `NODE` extends from the
     *   standard DOM `Element`, allowing for specific element types like `HTMLDivElement` or `SVGElement`.
     * @param {Selector<NODE>} parameter - The selector used to find elements {@linkcode Selector}.
     * @returns {Umbrella<NODE>} An instance of Umbrella so you can chain it to any of the other methods.
     */ <NODE extends Element = Element>(parameter: Selector<NODE>): Umbrella<NODE>;

    /**
     * Create an empty Umbrella instance.
     *
     * [Documentation](https://umbrellajs.com/documentation)
     *
     * @example
     *   u();
     *
     * @template NODE - Defines the type of DOM elements that the Umbrella instance manipulates. `NODE` extends from the
     *   standard DOM `Element`, allowing for specific element types like `HTMLDivElement` or `SVGElement`.
     * @returns {Umbrella<NODE>} An instance of Umbrella so you can chain it to any of the other methods.
     */ <NODE extends Element = Element>(): Umbrella<NODE>;

    /**
     * Array of DOM nodes managed by the Umbrella instance. Each element in the array is of the type specified by the
     * `Node` template parameter.
     *
     * [Documentation](https://umbrellajs.com/documentation)
     *
     * @example
     *   const divs = u<HTMLDivElement>('div').nodes;
     *
     * @template NODE - Defines the type of DOM elements that the Umbrella instance manipulates.
     * @type {NODE[]}
     */
    nodes: Array<NODE>;

    /**
     * You can check how many elements are matched with **.length**
     *
     * [Documentation](https://umbrellajs.com/documentation#length)
     *
     * @example
     *   u<HTMLDivElement>('div').length;
     *
     * @type {number}
     */
    length: number;

    /**
     * Add some html as a sibling after each of the matched elements.
     *
     * [Documentation](https://umbrellajs.com/documentation#after)
     *
     * @example
     *   // The txt parameter will be inferred as a string type.
     *   u('a.main').after(txt => '<a>' + txt + '</a>', ['One', 'Two', 'Three']);
     *
     * @template NODE - The current iteration DOM element.
     * @template ARG - The type of additional argument(s) passed to the callback function.
     * @param {InsertIterateCallback<NODE, Selector, ARG>} callback - A function that returns {@linkcode Selector} for
     *   querying nodes to be inserted.
     * @param {ARG[]} data - An array of arguments that will be passed to the callback function.
     * @returns {this} - Returns the instance of Umbrella for method chaining.
     */
    after<ARG>(callback: InsertIterateCallback<NODE, Selector, ARG>, data: ARG[]): Umbrella<NODE>;

    /**
     * Add some html as a sibling after each of the matched elements.
     *
     * [Documentation](https://umbrellajs.com/documentation#after)
     *
     * @example
     *   // The count parameter will be inferred as a number type.
     *   u('a.main').after(count => '<a>' + count + '</a>', 3);
     *
     * @template NODE - The current iteration DOM element.
     * @param {InsertIterateCallback<NODE, Selector, number>} callback - A function that returns {@linkcode Selector} for
     *   querying nodes to be inserted.
     * @param {number} repeat - The count of iterations for which the callback function will be executed for each of the
     *   matched elements.
     * @returns {this} - Returns the instance of Umbrella for method chaining.
     */
    after(callback: InsertIterateCallback<NODE, Selector, number>, repeat: number): Umbrella<NODE>;

    /**
     * Add some html as a sibling after each of the matched elements.
     *
     * [Documentation](https://umbrellajs.com/documentation#after)
     *
     * @example
     *   function greeting() {
     *     alert('Hello world');
     *   }
     *
     *   u('a.main').after(() => {
     *     return u('<a>').addClass('hi').on('click', greeting).html('Greetings!');
     *   });
     *
     * @template NODE - The current iteration DOM element.
     * @param {InsertIterateCallback<NODE, Selector, EmptyObject>} callback - A function that returns
     *   {@linkcode Selector} for querying nodes to be inserted.
     * @returns {this} - Returns the instance of Umbrella for method chaining.
     */
    after(callback: InsertIterateCallback<NODE, Selector, EmptyObject>): Umbrella<NODE>;

    /**
     * Add some html as a sibling after each of the matched elements.
     *
     * [Documentation](https://umbrellajs.com/documentation#after)
     *
     * @example
     *   // Add a separator <hr> after each of the main titles <h1>:
     *   u('h1').after('<hr>');
     *
     *   // Add three elements after the link. All of these methods are equivalent:
     *   // Add them all like a single string
     *   u('a.main').after('<a>One</a><a>Two</a><a>Three</a>');
     *
     *   // Add them in a chain
     *   u('a.main').after('<a>Three</a>').after('<a>Two</a>').after('<a>One</a>');
     *
     * @template NODE - Defines the type of DOM elements that the Umbrella instance manipulates.
     * @param {Selector} item - A selector for querying nodes to be inserted.
     * @returns {this} - Returns the instance of Umbrella for method chaining.
     */
    after(item: Selector): Umbrella<NODE>;

    /**
     * Add some html as a child at the end of each of the matched elements.
     *
     * **The signature is the same as the {@linkcode after} method.**
     *
     * [Documentation](https://umbrellajs.com/documentation#append)
     *
     * @example
     *   // Add a footer to each of the articles
     *   u('article').append('<footer>Hello world</footer>');
     *
     *   // Add three elements to the list. All of these methods are equivalent:
     *   // Add them all like a single string
     *   u('ul').append('<li>One</li><li>Two</li><li>Three</li>');
     *
     *   // Add them in a chain
     *   u('ul').append('<li>One</li>').append('<li>Two</li>').append('<li>Three</li>');
     *
     *   // Add them with a function parameter
     *   function cb(txt: string): string {
     *     return '<li>' + txt + '</li>';
     *   }
     *   u('ul').append(cb, ['One', 'Two', 'Three']);
     *
     *   // Same as the previous one but with ES6
     *   u('ul').append(txt => `<li>${txt}</li>`, ['One', 'Two', 'Three']);
     *
     * @template NODE - Defines the type of DOM elements that the Umbrella instance manipulates.
     * @type {this['after']}
     */
    append: Umbrella<NODE>['after'];

    /**
     * Add some html before each of the matched elements.
     *
     * **The signature is the same as the {@linkcode after} method.**
     *
     * [Documentation](https://umbrellajs.com/documentation#before)
     *
     * @example
     *   // Add a header to each of the articles
     *   u('article').after('<header>Hello world</header>');
     *
     *   // Add three elements before the link. All of these methods are equivalent:
     *   // Add them all like a single string
     *   u('a.main').before('<a>One</a><a>Two</a><a>Three</a>');
     *
     *   // Add them in a chain
     *   u('a.main').before('<a>One</a>').before('<a>Two</a>').before('<a>Three</a>');
     *
     *   // Add them with a function parameter
     *   function cb(txt: string): string {
     *     return '<a>' + txt + '</a>';
     *   }
     *   u('a.main').before(cb, ['One', 'Two', 'Three']);
     *
     *   // Same as the previous one but with ES6
     *   u('a.main').before(txt => `<a>${txt}</a>`, ['One', 'Two', 'Three']);
     *
     * @template NODE - Defines the type of DOM elements that the Umbrella instance manipulates.
     * @type {this['after']}
     */
    before: Umbrella<NODE>['after'];

    /**
     * Add some html as a child at the beginning of each of the matched elements.
     *
     * **The signature is the same as the {@linkcode after} method.**
     *
     * [Documentation](https://umbrellajs.com/documentation#prepend)
     *
     * @example
     *   // Add a header to each of the articles
     *   u('article').prepend('<header>Hello world</header>');
     *
     *   // Add three elements at the beginning of the list. All of these methods are equivalent:
     *   // Add them all like a single string
     *   u('ul').prepend('<li>One</li><li>Two</li><li>Three</li>');
     *
     *   // Add them in a chain
     *   u('ul').prepend('<li>Three</li>').append('<li>Two</li>').append('<li>One</li>');
     *
     *   // Add them with a function parameter
     *   function cb(txt: string): string {
     *     return '<li>' + txt + '</li>';
     *   }
     *   u('ul').prepend(cb, ['One', 'Two', 'Three']);
     *
     *   // Same as the previous one but with ES6
     *   u('ul').prepend(txt => `<li>${txt}</li>`, ['One', 'Two', 'Three']);
     *
     * @template NODE - Defines the type of DOM elements that the Umbrella instance manipulates.
     * @type {this['after']}
     */
    prepend: Umbrella<NODE>['after'];

    /**
     * Removes the matched elements.
     *
     * [Documentation](https://umbrellajs.com/documentation#remove)
     *
     * @example
     *   u('ul.demo li').remove();
     *
     * @template NODE - Defines the type of DOM elements that the Umbrella instance manipulates.
     * @returns {this} - Returns the instance of Umbrella for method chaining.
     */
    remove(): Umbrella<NODE>;

    /**
     * Replace the matched elements with the passed argument.
     *
     * [Documentation](https://umbrellajs.com/documentation#replace)
     *
     * @example
     *   // Replace all <div> elements with <span>
     *   u('div').replace(
     *     (arg, argIndex, node, index) => {
     *       return `<span>Replacement for div ${index}: ${arg}</span>`;
     *     },
     *     ['Additional Data'],
     *   );
     *
     * @template NODE - The current iteration DOM element.
     * @template RES_NODE - Specifies the type of the resulting replaced elements.
     * @template ARG - The type of additional argument(s) passed to the callback function.
     * @param {InsertIterateCallback<NODE, Selector<RES_NODE>, ARG>} callback - A function that returns
     *   {@linkcode Selector} for querying nodes to be inserted.
     * @param {ARG[]} data - An array of arguments that will be passed to the callback function.
     * @returns {Umbrella<RES_NODE>} - An Umbrella instance containing the new elements resulting from the replacements.
     */
    replace<RES_NODE extends Element = Element, ARG>(
      callback: InsertIterateCallback<NODE, Selector<RES_NODE>, ARG>,
      data: ARG[],
    ): Umbrella<RES_NODE>;

    /**
     * Replace the matched elements with the passed argument.
     *
     * [Documentation](https://umbrellajs.com/documentation#replace)
     *
     * @example
     *   // Replace each <div> element with <span>, repeated 3 times
     *   u('div').replace((repeat, argIndex, node, index) => {
     *     return `<span>Replacement ${repeat} for div ${index}</span>`;
     *   }, 3);
     *
     * @template NODE - The current iteration DOM element.
     * @template RES_NODE - Specifies the type of the resulting replaced elements.
     * @param {InsertIterateCallback<NODE, Selector<RES_NODE>, number>} callback - A function that returns
     *   {@linkcode Selector} for querying nodes to be inserted.
     * @param {number} repeat - The number of times to repeat the replacement for each element.
     * @returns {Umbrella<RES_NODE>} - An Umbrella instance containing the new elements resulting from the repeated
     *   replacements.
     */
    replace<RES_NODE extends Element = Element>(
      callback: InsertIterateCallback<NODE, Selector<RES_NODE>, number>,
      repeat: number,
    ): Umbrella<RES_NODE>;

    /**
     * Replace the matched elements with the passed argument.
     *
     * [Documentation](https://umbrellajs.com/documentation#replace)
     *
     * @example
     *   // Replace each <div> element with <span>
     *   u('div').replace((emptyObject, argIndex, element, index) => {
     *     return `<span>New content for div ${index}</span>`;
     *   });
     *
     * @template NODE - The current iteration DOM element.
     * @template RES_NODE - Specifies the type of the resulting replaced elements.
     * @param {InsertIterateCallback<NODE, Selector<RES_NODE>, EmptyObject>} callback - A function that returns
     *   {@linkcode Selector} for querying nodes to be inserted.
     * @returns {Umbrella<RES_NODE>} - An Umbrella instance containing the new elements resulting from the replacements.
     */
    replace<RES_NODE extends Element = Element>(
      callback: InsertIterateCallback<NODE, Selector<RES_NODE>, EmptyObject>,
    ): Umbrella<RES_NODE>;

    /**
     * Replace the matched elements with the passed argument.
     *
     * [Documentation](https://umbrellajs.com/documentation#replace)
     *
     * @example
     *   // Replace all <div> elements with a new <span>
     *   u('div').replace('<span>New content</span>');
     *
     * @template RES_NODE - Specifies the type of the resulting replaced elements.
     * @param {Selector<RES_NODE>} item - A selector {@linkcode Selector} for querying nodes to be inserted.
     * @returns {Umbrella<RES_NODE>} - An Umbrella instance containing the elements that replace the original matched
     *   elements.
     */
    replace<RES_NODE extends Element = Element>(item: Selector<RES_NODE>): Umbrella<RES_NODE>;

    /**
     * Map the matched elements into an array by applying a callback function to each DOM element.
     *
     * [Documentation](https://umbrellajs.com/documentation#array)
     *
     * **Note**: "Umbrella JS is made to manipulate HTML nodes, so it will consider the string "" and 0 as false and
     * remove them. Return an HTML node or an HTML string to keep the elements."
     *
     * @example
     *   <ul>
     *     <li>Peter</li>
     *     <li>Mery</li>
     *     <li>John</li>
     *   </ul>;
     *
     *   // The return value will be inferred as an HTMLLIElement[] type.
     *   u('ul li').array(node => {
     *     return u(node);
     *   });
     *
     * @template NODE - The current iteration DOM element.
     * @template RES_NODE - The type of the resulting DOM elements after transformation.
     * @param {IterateCallback<NODE, Selector<RES_NODE>>} callback - A function that is applied to each matched element.
     *   It receives each element as an argument and should return a selector {@linkcode Selector}.
     * @returns {RES_NODE[]} - An array containing the DOM elements of applying the callback function to each element in
     *   the matched set.
     */
    array<RES_NODE extends Element = Element>(callback: IterateCallback<NODE, Selector<RES_NODE>>): RES_NODE[];

    /**
     * Map the matched elements into an array by applying a callback function to each DOM element.
     *
     * [Documentation](https://umbrellajs.com/documentation#array)
     *
     * @example
     *   <ul>
     *     <li>Peter</li>
     *     <li>Mery</li>
     *     <li>John</li>
     *   </ul>;
     *
     *   // The return value will be inferred as an Array<{ name: string; }> type.
     *   u('ul li').array(node => {
     *     return { name: u(node).text() };
     *   });
     *   // [{ name: 'Peter' }, { name: 'Mery' }, { name: 'John' }]
     *
     * @template RETURN - The type of elements in the returned array, as determined by the callback function.
     * @template NODE - The current iteration DOM element.
     * @param {IterateCallback<NODE, RETURN>} callback - A function that is applied to each matched element to generate
     *   the array values. It receives each element as an argument and should return a value that will be included in
     *   the array.
     * @returns {RETURN[]} - An array containing the results of applying the callback function to each element in the
     *   matched set.
     */
    array<RETURN>(callback: IterateCallback<NODE, RETURN>): Array<RETURN>;

    /**
     * Map the matched elements into an array by applying a callback function to each DOM element.
     *
     * [Documentation](https://umbrellajs.com/documentation#array)
     *
     * @example
     *   <ul>
     *     <li>Peter</li>
     *     <li>Mery</li>
     *     <li>John</li>
     *   </ul>;
     *
     *   u('ul li').array();
     *   // ['Peter', 'Mery', 'John']
     *
     * @returns {string[]} - An array of strings extracted from the matched elements (node.innerHTML).
     */
    array(): string[];

    /**
     * Loop through all the nodes and execute a callback for each.
     *
     * [Documentation](https://umbrellajs.com/documentation#each)
     *
     * @example
     *   // Loop through all the links and add them a target="_blank":
     *   u('a').each(node => {
     *     u(node).attr({ target: '_blank' });
     *   });
     *
     * @template NODE - The current iteration DOM element.
     * @param {IterateCallback<NODE>} callback - A function to execute on each element in the set. The callback receives
     *   the current element and its index as arguments.
     * @returns {this} - Returns the instance of Umbrella for method chaining.
     */
    each(callback: IterateCallback<NODE>): Umbrella<NODE>;

    /**
     * Change the content of the current instance by looping each element.
     *
     * [Documentation](https://umbrellajs.com/documentation#map)
     *
     * It returns a value that evaluates to false, a single element, a string, an array or an Umbrella instance
     * {@linkcode Selector}. It will **remove duplicated nodes** from the result.
     *
     * **Note**: "Umbrella JS is made to manipulate HTML nodes, so it will consider the string "" and 0 as false and
     * remove them. Return an HTML node or an HTML string to keep the elements."
     *
     * @example
     *   const links = u<HTMLLIElement>('.special li')
     *     // The node parameter will be inferred as a HTMLLIElement type.
     *     .map(node => {
     *       if (parseInt(node.innerHTML) > 10) {
     *         return '<a>' + u(node).data('id') + '</a>';
     *       }
     *     })
     *     .addClass('expensive');
     *
     * @template RES_NODE - The type of the resulting DOM elements after transformation.
     * @template NODE - The current iteration DOM element.
     * @param {IterateCallback<NODE, Selector<RES_NODE>>} callback - A function that is applied to each element in the
     *   set. It receives each element as an argument and should return a selector {@linkcode Selector}.
     * @returns {Umbrella<RES_NODE>} - A new Umbrella instance containing the elements obtained by the transformation.
     */
    map<RES_NODE extends Element = Element>(callback: IterateCallback<NODE, Selector<RES_NODE>>): Umbrella<RES_NODE>;

    /**
     * Just return the original instance of Umbrella.
     *
     * [Documentation](https://umbrellajs.com/documentation#map)
     *
     * @template NODE - The current iteration DOM element.
     * @returns {this} - Returns the instance of Umbrella for method chaining.
     */
    map(): Umbrella<NODE>;

    /**
     * Remove all the nodes that doesn't match the criteria.
     *
     * [Documentation](https://umbrellajs.com/documentation#filter)
     *
     * @example
     *   // Get all the paragraphs with a link:
     *   const paragraphs = u('p').filter(node => {
     *     return u(node).find('a').length > 0;
     *   });
     *
     *   // Get only the inputs with an answer above 5 and show an error:
     *   u('input')
     *     .filter(node => {
     *       if (parseInt(u(node).first().value) > 5) {
     *         return true;
     *       }
     *     })
     *     .addClass('error');
     *
     * @template NODE - The current iteration DOM element.
     * @param {IterateCallback<NODE, Maybe<boolean>>} predicate - A function that tests each element in the set. It
     *   should return `true` to keep the element, or `false` (or a falsy value) to remove it.
     * @returns {this} - A new Umbrella instance containing the elements that passed the test.
     */
    filter(predicate: IterateCallback<NODE, Maybe<boolean>>): Umbrella<NODE>;

    /**
     * Remove all the nodes that doesn't match the criteria.
     *
     * [Documentation](https://umbrellajs.com/documentation#filter)
     *
     * @example
     *   u('div').filter(u('a'));
     *
     * @template NODE - Defines the type of DOM elements that the Umbrella instance manipulates.
     * @param {Umbrella} filter - Instance of Umbrella with the elements to keep (the intersection will be kept).
     * @returns {this} - A new Umbrella instance containing the filtered set of elements.
     */
    filter(filter: Umbrella): Umbrella<NODE>;

    /**
     * Remove all the nodes that doesn't match the criteria.
     *
     * [Documentation](https://umbrellajs.com/documentation#filter)
     *
     * @example
     *   // Get only the active links
     *   const activeLinks = u('a').filter('.active');
     *
     *   // Using null to get a copy Umbrella instance
     *   const copy = u('div').filter(null);
     *
     * @template NODE - Defines the type of DOM elements that the Umbrella instance manipulates.
     * @param {Maybe<string>} filter - A CSS selector string used to filter the matched elements. `null` or `undefined`
     *   replaces with * selector.
     * @returns {this} - A new Umbrella instance containing the filtered set of elements.
     */
    filter(filter: Maybe<string>): Umbrella<NODE>;

    /**
     * Checks if any of the matched elements pass the test implemented by the provided predicate function.
     *
     * [Documentation](https://umbrellajs.com/documentation#is)
     *
     * @example
     *   u('form.subscribe').on('submit', event => {
     *     if (u(event.target).is(node => u(node).hasClass('.validate'))) {
     *       validate();
     *     }
     *   });
     *
     * @template NODE - The current iteration DOM element.
     * @param {IterateCallback<NODE, Maybe<boolean>>} predicate - A function that tests each element in the set. The
     *   function should return `true` for elements that pass the test, or `false` otherwise.
     * @returns {boolean} - Returns `true` if the function returns `true`, `false` otherwise.
     */
    is(predicate: IterateCallback<NODE, Maybe<boolean>>): boolean;

    /**
     * Check whether any of the nodes matches the provided Umbrella instance.
     *
     * [Documentation](https://umbrellajs.com/documentation#is)
     *
     * @example
     *   u('div').is(u('a'));
     *
     * @param {Umbrella} filter - Instance of Umbrella with the elements to check.
     * @returns {this} - Returns `true` if any of the nodes matches the provided Umbrella instance, `false` otherwise.
     */
    is(filter: Umbrella): boolean;

    /**
     * Check whether any of the nodes matches the selector.
     *
     * [Documentation](https://umbrellajs.com/documentation#is)
     *
     * @example
     *   // Check if the current form needs to be validated
     *   u('form.subscribe').on('submit', function (e) {
     *     // Same as u('form.subscribe').hasClass('validate')
     *     if (u(e.target).is('.validate')) {
     *       validate();
     *     }
     *   });
     *
     * @param {Maybe<string>} filter - A CSS selector string used to filter the matched elements. `null` or `undefined`
     *   replaces with * selector.
     * @returns {this} - A new Umbrella instance containing the filtered set of elements.
     */
    is(filter: Maybe<string>): boolean;

    /**
     * Remove known nodes from nodes.
     *
     * **The signature is the same as the {@linkcode filter} method.**
     *
     * [Documentation](https://umbrellajs.com/documentation#not)
     *
     * @example
     *   // Get only the non-active links on paragraphs
     *   const nonactiveLinks = u('.menu a').not('.active');
     *
     *   // Get all the active:
     *   const activeLinks = u('.menu a').not(nonactiveLinks);
     *
     * @template NODE - Defines the type of DOM elements that the Umbrella instance manipulates.
     * @type {this['filter']}
     */
    not: Umbrella<NODE>['filter'];

    /**
     * Retrieves the children, filtered by a predicate function.
     *
     * [Documentation](https://umbrellajs.com/documentation#children)
     *
     * @example
     *   // Get all <li> with a 'child' class
     *   u('ul').children<HTMLLIElement>(node => u(node).hasClass('child'));
     *
     * @template NODE - The current iteration DOM element.
     * @template RES_NODE - Specifies the type of the resulting child elements.
     * @param {IterateCallback<RES_NODE, Maybe<boolean>>} predicate - A function that tests each child element. Child
     *   elements for which the predicate returns `true` are included in the resulting set.
     * @returns {Umbrella<RES_NODE>} - An Umbrella instance containing the filtered child elements.
     */
    children<RES_NODE extends Element = Element>(
      predicate: IterateCallback<RES_NODE, Maybe<boolean>>,
    ): Umbrella<RES_NODE>;

    /**
     * Retrieves the children are contained in a given Umbrella instance.
     *
     * [Documentation](https://umbrellajs.com/documentation#children)
     *
     * @example
     *   // Get all <div> with a 'specific-class' class
     *   u('div').children(u('.specific-class'));
     *
     * @template RES_NODE - Specifies the type of the child elements.
     * @param {Umbrella} filter - An Umbrella instance whose elements are used to filter the children of the matched
     *   elements.
     * @returns {Umbrella<RES_NODE>} - An Umbrella instance containing the child elements that match those in the
     *   provided Umbrella instance.
     */
    children<RES_NODE extends Element = Element>(filter: Umbrella<RES_NODE>): Umbrella<RES_NODE>;

    /**
     * Retrieves the children that match a given CSS selector.
     *
     * [Documentation](https://umbrellajs.com/documentation#children)
     *
     * @example
     *   // Get all spans for all <div>
     *   u('div').children('span');
     *
     *   // Get all children for all <div>
     *   u('div').children(null);
     *
     * @template RES_NODE - Specifies the type of the child elements.
     * @param {Maybe<string>} filter - A CSS selector string used to filter the matched elements. `null` or `undefined`
     *   replaces with * selector.
     * @returns {Umbrella<RES_NODE>} - An Umbrella instance containing the child elements that match the provided
     *   selector.
     */
    children<RES_NODE extends Element = Element>(filter: Maybe<string>): Umbrella<RES_NODE>;

    /**
     * Retrieves all child elements.
     *
     * [Documentation](https://umbrellajs.com/documentation#children)
     *
     * @example
     *   // Get all children for all <div>
     *   u('div').children();
     *
     * @template RES_NODE - Specifies the type of the resulting child elements.
     * @returns {Umbrella<RES_NODE>} - An Umbrella instance containing all child elements of the matched elements.
     */
    children<RES_NODE extends Element = Element>(): Umbrella<RES_NODE>;

    /**
     * Find the first ancestor that matches the selector for each node
     *
     * **The signature is the same as the {@linkcode children} method.**
     *
     * [Documentation](https://umbrellajs.com/documentation#closest)
     *
     * @example
     *   // Get the <ul> of every <li>
     *   u('li').closest('ul');
     *
     * @type {this['children']}
     */
    closest: Umbrella<NODE>['children'];

    /**
     * Searches for elements that satisfy a condition defined by the provided predicate function.
     *
     * [Documentation](https://umbrellajs.com/documentation#find)
     *
     * @example
     *   // Get the required fields within a submitting form:
     *   u('form').on('submit', function () {
     *     const required = u(this).find(node => node.hasClass('required'));
     *   });
     *
     * @template NODE - The current iteration DOM element.
     * @template RES_NODE - Specifies the type of the resulting elements found.
     * @param {IterateCallback<NODE, Maybe<boolean>>} predicate - A function that tests each element in the set.
     *   Elements for which the function returns `true` are included in the resulting Umbrella instance.
     * @returns {Umbrella<RES_NODE>} - An Umbrella instance containing the elements that match the predicate.
     */
    find<RES_NODE extends Element = Element>(predicate: IterateCallback<NODE, Maybe<boolean>>): Umbrella<RES_NODE>;

    /**
     * Searches for elements that match a given selector.
     *
     * [Documentation](https://umbrellajs.com/documentation#find)
     *
     * @example
     *   // Get all <span> elements within all <div> elements
     *   u('div').find('span');
     *
     * @template RES_NODE - Specifies the type of the resulting elements found.
     * @param {Selector<RES_NODE>} selector - A CSS selector string, an Element, an array of Elements, or an Umbrella
     *   instance used to find matching elements.
     * @returns {Umbrella<RES_NODE>} - An Umbrella instance containing elements that match the provided selector.
     */
    find<RES_NODE extends Element = Element>(selector: Selector<RES_NODE>): Umbrella<RES_NODE>;

    /**
     * Retrieves all child elements.
     *
     * [Documentation](https://umbrellajs.com/documentation#find)
     *
     * @example
     *   // Get all child elements within all <div> elements
     *   u('div').find();
     *
     * @template RES_NODE - Specifies the type of the resulting elements found.
     * @returns {Umbrella<RES_NODE>} - An Umbrella instance containing all child elements.
     */
    find<RES_NODE extends Element = Element>(): Umbrella<RES_NODE>;

    /**
     * Retrieve the first of the matched nodes. If there are no matched elements, it returns `false`.
     *
     * [Documentation](https://umbrellajs.com/documentation#first)
     *
     * @example
     *   // Get the first <div> element
     *   u('div').first();
     *
     * @template NODE - Defines the type of DOM elements that the Umbrella instance manipulates.
     * @returns {NODE | false} - The first element in the matched set if it exists, or `false` if the set is empty.
     */
    first(): NODE | false;

    /**
     * Retrieve the last of the matched nodes. If there are no matched elements, it returns `false`.
     *
     * [Documentation](https://umbrellajs.com/documentation#last)
     *
     * @example
     *   // Get the last <div> element
     *   u('div').last();
     *
     * @template NODE - Defines the type of DOM elements that the Umbrella instance manipulates.
     * @returns {NODE | false} - The last element in the matched set if it exists, or `false` if the set is empty.
     */
    last(): NODE | false;

    /**
     * Retrieve each parent of the matched nodes, filtered by a predicate function.
     *
     * [Documentation](https://umbrellajs.com/documentation#parent)
     *
     * @example
     *   // Retrieve parent elements of <span> that have a specific class
     *   u('span').parent(parent => {
     *     return u(parent).hasClass('specific-class');
     *   });
     *
     * @template RES_NODE - Specifies the type of the resulting parent elements.
     * @param {IterateCallback<RES_NODE, Maybe<boolean>>} predicate - A function that tests each parent element. Parent
     *   elements for which the function returns `true` are included in the resulting set.
     * @returns {Umbrella<RES_NODE>} - An Umbrella instance containing the parent elements that pass the predicate test.
     */
    parent<RES_NODE extends Element = Element>(
      predicate: IterateCallback<RES_NODE, Maybe<boolean>>,
    ): Umbrella<RES_NODE>;

    /**
     * Retrieve each parent of the matched nodes, filtered by a given selector {@linkcode Selector}.
     *
     * [Documentation](https://umbrellajs.com/documentation#parent)
     *
     * @example
     *   // Retrieve parent elements of <span> that match a specific CSS selector
     *   u('span').parent('.specific-class');
     *
     * @template RES_NODE - Specifies the type of the resulting parent elements.
     * @param {Selector<RES_NODE>} selector - A CSS selector string, an Element, an array of Elements, or an Umbrella
     *   instance used to filter parent elements {@linkcode Selector}.
     * @returns {Umbrella<RES_NODE>} - An Umbrella instance containing parent elements that match the provided selector.
     */
    parent<RES_NODE extends Element = Element>(selector: Selector<RES_NODE>): Umbrella<RES_NODE>;

    /**
     * Retrieve all the parents in the page:
     *
     * [Documentation](https://umbrellajs.com/documentation#parent)
     *
     * @example
     *   // Retrieve all the parents of <li> in the page:
     *   u('li').parent();
     *
     * @template RES_NODE - Specifies the type of the resulting parent elements.
     * @returns {Umbrella<RES_NODE>} - An Umbrella instance containing the immediate parent elements of the matched
     *   elements.
     */
    parent<RES_NODE extends Element = Element>(): Umbrella<RES_NODE>;

    /**
     * Get the siblings of all the nodes with an optional filter.
     *
     * **The signature is the same as the {@linkcode children} method.**
     *
     * [Documentation](https://umbrellajs.com/documentation#siblings)
     *
     * @example
     *   // Get the all the siblings of the hovered <li>
     *   u('li:hover').siblings('li:first-child');
     *
     *   // Get all the siblings
     *   u('li').siblings();
     *
     * @type {this['children']}
     */
    siblings: Umbrella<NODE>['children'];

    /**
     * Add html class(es) to all the matched elements.
     *
     * [Documentation](https://umbrellajs.com/documentation#addClass)
     *
     * @example
     *   u('div').addClass('name1');
     *   u('div').addClass('name1 name2 nameN');
     *   u('div').addClass('name1,name2,nameN');
     *   u('div').addClass('name1', 'name2', 'nameN');
     *   u('div').addClass(['name1', 'name2', 'nameN']);
     *   u('div').addClass(['name1', 'name2'], ['name3'], ['nameN']);
     *   u('div').addClass((node, index) => 'name1');
     *   u('div').addClass(
     *     () => 'name1',
     *     () => 'name2',
     *   );
     *
     * @template NODE - Defines the type of DOM elements that the Umbrella instance manipulates.
     * @param {...(Many<string> | IterateCallback<NODE, string>)[]} classes - Class names to add. This can be a single
     *   class name, an array of class names, or a callback function that returns a class name for each element.
     * @returns {this} - Returns the instance of Umbrella for method chaining.
     */
    addClass(...classes: Array<Many<string> | IterateCallback<NODE, string>>): Umbrella<NODE>;

    /**
     * Find if any of the matched elements contains the class passed.
     *
     * [Documentation](https://umbrellajs.com/documentation#hasclass)
     *
     * @example
     *   u('div').hasClass('name1');
     *   u('div').hasClass('name1 name2 nameN');
     *   u('div').hasClass('name1,name2,nameN');
     *   u('div').hasClass('name1', 'name2', 'nameN');
     *   u('div').hasClass(['name1', 'name2', 'nameN']);
     *   u('div').hasClass(['name1', 'name2'], ['name3'], ['nameN']);
     *   u('div').hasClass((node, index) => 'name1');
     *   u('div').hasClass(
     *     () => 'name1',
     *     () => 'name2',
     *   );
     *
     * @template NODE - Defines the type of DOM elements that the Umbrella instance manipulates.
     * @param {...(Many<string> | IterateCallback<NODE, string>)[]} classes - One or more class names, or a callback
     *   function returning a class name, to check for.
     * @returns {boolean} - Returns `true` if any of the matched elements have at least one of the specified classes,
     *   `false` otherwise.
     */
    hasClass(...classes: Array<Many<string> | IterateCallback<NODE, string>>): boolean;

    /**
     * Remove html class(es) to all the matched elements.
     *
     * **The signature is the same as the {@linkcode addClass} method.**
     *
     * [Documentation](https://umbrellajs.com/documentation#removeclass)
     *
     * @example
     *   u('div').removeClass('name1');
     *   u('div').removeClass('name1 name2 nameN');
     *   u('div').removeClass('name1,name2,nameN');
     *   u('div').removeClass('name1', 'name2', 'nameN');
     *   u('div').removeClass(['name1', 'name2', 'nameN']);
     *   u('div').removeClass(['name1', 'name2'], ['name3'], ['nameN']);
     *   u('div').removeClass((node, index) => 'name1');
     *   u('div').removeClass(
     *     () => 'name1',
     *     () => 'name2',
     *   );
     *
     * @template NODE - Defines the type of DOM elements that the Umbrella instance manipulates.
     * @type {this['addClass']}
     */
    removeClass: Umbrella<NODE>['addClass'];

    /**
     * Toggles html class(es) to all the matched elements.
     *
     * [Documentation](https://umbrellajs.com/documentation#toggleclass)
     *
     * @example
     *   u('div').toggleClass('name1');
     *   u('div').toggleClass('name1 name2 nameN');
     *   u('div').toggleClass('name1,name2,nameN');
     *   u('div').toggleClass(['name1', 'name2', 'nameN']);
     *
     * @template NODE - The current iteration DOM element.
     * @param {Many<string> | IterateCallback<NODE, string>} classes - Class names to toggle. This can be a single class
     *   name, an array of class names, or a callback function that returns a class name for each element.
     * @returns {this} - Returns the instance of Umbrella for method chaining.
     */
    toggleClass(classes: Many<string> | IterateCallback<NODE, string>): Umbrella<NODE>;

    /**
     * Toggles html class(es) to all the matched elements.
     *
     * [Documentation](https://umbrellajs.com/documentation#toggleclass)
     *
     * @example
     *   // Force an .addClass() on the element <h2> from the page:
     *   u('h2').toggleClass('main', true);
     *
     *   // Force removing a class from all matched elements
     *   u('div').toggleClass('forced-class', false);
     *
     *   // Note however that this last example by itself doesn't make much sense as you could just use addClass()
     *   // instead. It makes a lot more sense when the second parameter is checked dynamically:
     *   u('h2').toggleClass('main', u('.accept').is(':checked'));
     *
     * @template NODE - The current iteration DOM element.
     * @param {Many<string> | IterateCallback<NODE, string>} classes - Class names to toggle. This can be a single class
     *   name, an array of class names, or a callback function that returns a class name for each element.
     * @param {boolean} forceAdd - If `true`, adds the specified class(es); if `false`, removes them.
     * @returns {this} - Returns the instance of Umbrella for method chaining.
     */
    toggleClass(classes: Many<string> | IterateCallback<NODE, string>, forceAdd: boolean): Umbrella<NODE>;

    /**
     * Sets attributes on each element in the matched set based on the provided key-value pairs. The value can either be
     * a string or a callback function that returns a string (or null to remove the attribute).
     *
     * [Documentation](https://umbrellajs.com/documentation#attr)
     *
     * @example
     *   // Set multiple attributes on all matched elements
     *   u('a').attr({
     *     href: 'https://example.com',
     *     target: '_blank',
     *   });
     *
     *   // Set attributes using callback functions
     *   u('div').attr({
     *     id: (node, index) => `div-id-${index}`,
     *     'data-index': (node, index) => String(index),
     *   });
     *
     * @template NODE - The current iteration DOM element.
     * @param {Record<string, Maybe<string> | IterateCallback<NODE, Maybe<string>>>} pairs - An object specifying
     *   attributes to set. The keys are attribute names and the values are the attribute values or callback functions
     *   returning the values.
     * @returns {this} - Returns the instance of Umbrella for method chaining.
     */
    attr(pairs: Record<string, Maybe<string> | IterateCallback<NODE, Maybe<string>>>): Umbrella<NODE>;

    /**
     * Sets the value of a specified attribute for each element in the matched set, using a callback function. If the
     * callback function returns `null`, the attribute is removed from the element.
     *
     * [Documentation](https://umbrellajs.com/documentation#attr)
     *
     * @example
     *   // Set the 'data-index' attribute based on the <li>'s index
     *   u('li').attr('data-index', (node, index) => String(index));
     *
     * @template NODE - The current iteration DOM element.
     * @param {string} name - The name of the attribute to set.
     * @param {IterateCallback<NODE, Maybe<string>>} callback - A function that returns the value to set for the
     *   attribute. It receives the current element and its index as arguments.
     * @returns {this} - Returns the instance of Umbrella for method chaining.
     */
    attr(name: string, callback: IterateCallback<NODE, Maybe<string>>): Umbrella<NODE>;

    /**
     * Sets the value of a specified attribute for each element in the matched set. If the value is `null`, the
     * attribute is removed from the elements.
     *
     * [Documentation](https://umbrellajs.com/documentation#attr)
     *
     * @example
     *   // Set the 'href' attribute for all matched <a> elements
     *   u('a').attr('href', 'https://example.com');
     *
     *   // Remove the 'title' attribute from all matched elements
     *   u('div').attr('title', null);
     *
     * @template NODE - Defines the type of DOM elements that the Umbrella instance manipulates.
     * @param {string} name - The name of the attribute to set.
     * @param {Maybe<string>} value - The value to set for the attribute, or `null` to remove the attribute.
     * @returns {this} - Returns the instance of Umbrella for method chaining.
     */
    attr(name: string, value: Maybe<string>): Umbrella<NODE>;

    /**
     * Retrieves the value of a specified attribute from the first element in the matched set. If the element does not
     * have the specified attribute, `null` is returned.
     *
     * [Documentation](https://umbrellajs.com/documentation#attr)
     *
     * @example
     *   // Get the alt of an image
     *   u('img.hero').attr('alt');
     *
     * @param {string} name - The name of the attribute whose value is to be retrieved.
     * @returns {string | null} - The value of the specified attribute on the first element in the set, or `null` if the
     *   attribute is not present.
     */
    attr(name: string): string | null;

    /**
     * Gets or sets data attributes (prefixed with 'data-') on the matched set of elements. This method functions as an
     * alias for the 'attr' method, specifically for handling data attributes. It can be used to retrieve the value of a
     * data attribute when a single argument is provided, or to set data attributes when two arguments are provided.
     *
     * [Documentation](https://umbrellajs.com/documentation#data)
     *
     * @example
     *   <ul>
     *     <li data-id='0'>First</li>
     *     <li data-id='1'>Second</li>
     *     <li data-id='2'>Third</li>
     *   </ul>;
     *
     *   // Get the value for data-id:
     *   u('ul li').first().data('id');
     *   // 0
     *
     *   // Set the data-id of an element:
     *   u('ul li').first().data({ id: '1' });
     *   // <li data-id='1'>First</li>
     *
     *   u('ul li').first().data('id', '2');
     *   // <li data-id='2'>First</li>
     *
     * @template NODE - Defines the type of DOM elements that the Umbrella instance manipulates.
     * @type {this['attr']}
     */
    data: Umbrella<NODE>['attr'];

    /**
     * This function is the same as {@linkcode on}, but it executes the **event.preventDefault()** so you don't need to
     * do it.
     *
     * [Documentation](https://umbrellajs.com/documentation#handle)
     *
     * @example
     *   // These two are exactly the same:
     *   u('form.login').on('submit', event => {
     *     event.preventDefault();
     *     // logic
     *   });
     *
     *   u('form.login').handle('submit', event => {
     *     // logic
     *   });
     *
     * @template NODE - Defines the type of DOM elements that the Umbrella instance manipulates.
     * @type {this['on']}
     */
    handle: Umbrella<NODE>['on'];

    /**
     * Removes an event handler function for one or more events from the selected elements that match the specified
     * selector. Typically used with event delegation.
     *
     * [Documentation](https://umbrellajs.com/documentation#off)
     *
     * @example
     *   // Remove a specific click event handler from <li> elements within a <ul>
     *   const specificHandler = () => alert('Called');
     *
     *   u('ul').off('click', 'li', specificHandler);
     *
     *   u('ul').trigger('click'); // No alert
     *
     * @template NODE - Defines the type of DOM elements that the Umbrella instance manipulates.
     * @param {Many<string>} events - One or more event types from which to remove the handler.
     * @param {string} selector - A CSS selector string to filter the descendants of the selected elements for which the
     *   event handler should be removed.
     * @param {() => void} callback - The specific event handler function to remove.
     * @returns {this} - Returns the instance of Umbrella for method chaining.
     */
    off(events: Many<string>, selector: string, callback: () => void): Umbrella<NODE>;

    /**
     * Removes all event handlers for one or more specified events from the selected elements that match the specified
     * selector. Typically used with event delegation.
     *
     * [Documentation](https://umbrellajs.com/documentation#off)
     *
     * @example
     *   // Remove all click event handlers from <li> elements within a <ul>
     *   u('ul').off('click', 'li');
     *
     * @template NODE - Defines the type of DOM elements that the Umbrella instance manipulates.
     * @param {Many<string>} events - One or more event types from which to remove handlers.
     * @param {string} selector - A CSS selector string to filter the descendants of the selected elements for which the
     *   event handlers should be removed.
     * @returns {this} - Returns the instance of Umbrella for method chaining.
     */
    off(events: Many<string>, selector: string): Umbrella<NODE>;

    /**
     * Removes all event handlers for one or more specified events from the selected elements.
     *
     * [Documentation](https://umbrellajs.com/documentation#off)
     *
     * @example
     *   // Remove all click event handlers from all matched <button> elements
     *   u('button').off('click');
     *
     * @template NODE - Defines the type of DOM elements that the Umbrella instance manipulates.
     * @param {Many<string>} events - One or more event types from which to remove handlers.
     * @returns {this} - Returns the instance of Umbrella for method chaining.
     */
    off(events: Many<string>): Umbrella<NODE>;

    /**
     * Attaches an event handler function for one or more events to the selected elements that match the specified
     * selector. The event handler is executed when the event occurs on an element that matches the selector, allowing
     * for event delegation.
     *
     * [Documentation](https://umbrellajs.com/documentation#on)
     *
     * @example
     *   // Handle click events on <li> elements within a <ul>
     *   u('ul').on('click', 'li', event => {
     *     console.log('Clicked on an <li>:', event.currentTarget);
     *   });
     *
     * @template NODE - Defines the type of DOM elements that the Umbrella instance manipulates.
     * @template ARG - Specifies the type of additional arguments that can be passed to the callback function.
     * @param {Many<string>} events - One or more event types.
     * @param {string} selector - A CSS selector string to filter the descendants of the selected elements that trigger
     *   the event.
     * @param {(this: Umbrella<NODE>, event: Event, ...data: ARG[]) => void} callback - A function to execute when the
     *   event is triggered. The function context (`this`) refers to the Umbrella instance, and it receives the native
     *   event object and any additional arguments.
     * @returns {this} - Returns the instance of Umbrella for method chaining.
     */
    on<ARG>(
      events: Many<string>,
      selector: string,
      callback: (this: Umbrella<NODE>, event: Event, ...data: ARG[]) => void,
    ): Umbrella<NODE>;

    /**
     * Attaches an event handler function for one or more events directly to the selected elements. The event handler is
     * executed when the specified event occurs on any of the matched elements.
     *
     * [Documentation](https://umbrellajs.com/documentation#on)
     *
     * @example
     *   // Handle click events on all matched <button> elements
     *   u('button').on('click', function (event) {
     *     console.log('Button clicked:', event.currentTarget);
     *   });
     *
     * @template NODE - Defines the type of DOM elements that the Umbrella instance manipulates.
     * @template ARG - Specifies the type of additional arguments that can be passed to the callback function.
     * @param {Many<string>} events - One or more event types.
     * @param {(this: this, event: Event, ...data: ARG[]) => void} callback - A function to execute when the event is
     *   triggered. The function context (`this`) refers to the Umbrella instance, and it receives the native event
     *   object and any additional arguments.
     * @returns {this} - Returns the instance of Umbrella for method chaining.
     */
    on<ARG>(
      events: Many<string>,
      callback: (this: Umbrella<NODE>, event: Event, ...data: ARG[]) => void,
    ): Umbrella<NODE>;

    /**
     * Triggers the specified event types on each element in the matched set. This method can also pass additional
     * arguments to the event handlers.
     *
     * [Documentation](https://umbrellajs.com/documentation#trigger)
     *
     * @example
     *   // Trigger a 'click' event on all matched <button> elements
     *   u('button').trigger('click');
     *
     *   // Trigger a custom event with additional data
     *   u('div').trigger('customEvent', { detail: { key: 'value' } });
     *
     * @template NODE - Defines the type of DOM elements that the Umbrella instance manipulates.
     * @template ARG - Specifies the type of additional arguments that can be passed to the event handlers.
     * @param {Many<string>} events - One or more event types to trigger.
     * @param {...ARG[]} data - Additional arguments to pass along to the event handler functions.
     * @returns {this} - Returns the instance of Umbrella for method chaining.
     */
    trigger<ARG>(events: Many<string>, ...data: ARG[]): Umbrella<NODE>;

    /**
     * Sets the HTML content of each element in the matched set to the specified value. This method is used to replace
     * the existing inner HTML of an element with new content.
     *
     * [Documentation](https://umbrellajs.com/documentation#html)
     *
     * @example
     *   // Set the main title:
     *   u('h1').html('Hello world');
     *
     * @template NODE - Defines the type of DOM elements that the Umbrella instance manipulates.
     * @param {string} value - The HTML content to set for each matched element.
     * @returns {this} - Returns the instance of Umbrella for method chaining.
     */
    html(value: string): Umbrella<NODE>;

    /**
     * Retrieves the HTML content of the first element in the matched set. This method is used to get the inner HTML of
     * an element, including its child elements and text.
     *
     * [Documentation](https://umbrellajs.com/documentation#html)
     *
     * @example
     *   // Get the HTML content of the first matched <div> element
     *   u('div').html();
     *
     * @returns {string} - The HTML content of the first element in the matched set. If there are no matched elements,
     *   returns an empty string.
     */
    html(): string;

    /**
     * Sets the text content of each element in the matched set to the specified value. This method replaces the
     * existing text content of an element with the new provided text.
     *
     * [Documentation](https://umbrellajs.com/documentation#text)
     *
     * @example
     *   // Set the main title text
     *   u('h1').text('Hello world');
     *
     * @template NODE - Defines the type of DOM elements that the Umbrella instance manipulates.
     * @param {string} value - The text content to set for each matched element.
     * @returns {this} - Returns the instance of Umbrella for method chaining.
     */
    text(value: string): Umbrella<NODE>;

    /**
     * Retrieves the text content of the first element in the matched set.
     *
     * [Documentation](https://umbrellajs.com/documentation#text)
     *
     * @example
     *   // Get the text content of the first matched <div> element
     *   u('div').text();
     *
     * @returns {string} - The text content of the first element in the matched set. If there are no matched elements,
     *   returns an empty string.
     */
    text(): string;

    /**
     * Creates a deep copy of the matched set of elements and returns it as a new Umbrella instance. This method clones
     * each element in the set, including its attributes, text content, and any child elements.
     *
     * [Documentation](https://umbrellajs.com/documentation#clone)
     *
     * **Extensions**:
     *
     * - The following extensions are enabled by default:
     *
     *   - **events** clone the events of all the nodes. To disable it globally, add **u.prototype.mirror.events = false;**
     *       to your code
     *   - **select** select input node values are copied to all cloned nodes. To disable globally, add
     *       **u.prototype.mirror.select = false;** to your code.
     *   - **textarea** textarea input node values are copied to all cloned nodes. To disable globally, add
     *       **u.prototype.mirror.textarea = false;** to your code.
     *
     * @example
     *   // Clone all matched <div> elements
     *   u('div').clone();
     *
     * @template NODE - Defines the type of DOM elements that the Umbrella instance manipulates.
     * @returns {this} - A new Umbrella instance containing the clones of the matched elements.
     */
    clone(): Umbrella<NODE>;

    /**
     * Removes all child nodes from each element in the matched set.
     *
     * [Documentation](https://umbrellajs.com/documentation#empty)
     *
     * @example
     *   // Removes all child nodes from all containers:
     *   u('div.container').empty();
     *
     * @template NODE - Defines the type of DOM elements that the Umbrella instance manipulates.
     * @returns {this} - Returns the instance of Umbrella for method chaining.
     */
    empty(): Umbrella<NODE>;

    /**
     * Scroll to the first matched element, smoothly if supported.
     *
     * [Documentation](https://umbrellajs.com/documentation#scroll)
     *
     * @example
     *   // Scroll to the first <li> in the page:
     *   u('li').scroll();
     *
     *   // On click event, scroll the first <section> element with the class "team":
     *   u('a.team').on('click', event => {
     *     event.preventDefault();
     *     u('section.team').scroll();
     *   });
     *
     * @template NODE - Defines the type of DOM elements that the Umbrella instance manipulates.
     * @returns {this} - Returns the instance of Umbrella for method chaining.
     */
    scroll(): Umbrella<NODE>;

    /**
     * Converts a form into a string to be sent
     *
     * [Documentation](https://umbrellajs.com/documentation#serialize)
     *
     * **Note:** you probably want to use the native **FormData()** instead of .serialize(). [See relevant
     * issue.](https://github.com/franciscop/umbrella/issues/114)
     *
     * **Note:** multiple-select are not supported in Internet Explorer, [similarly to
     * jQuery.](https://github.com/jquery-archive/jquery-mobile/issues/3947)
     *
     * @example
     *   // For this form:
     *   <form action='/contact' method='POST'>
     *     Email:
     *     <input type='email' name='email' value='test@example.com' />
     *     Message:
     *     <textarea type='email' name='message'>
     *       Hello world
     *     </textarea>
     *     <button>Send</button>
     *   </form>;
     *
     *   // When the user clicks on the "Send" button, the following handler can be used to send the data through Ajax:
     *   // .handle() == .on() + preventDefault()
     *   u('form.contact').handle('submit', async event => {
     *     // Body: email=test@example.com&message=Hello+world
     *     const body = u(event.target).serialize();
     *     const data = await fetch('/contact', {
     *       method: 'POST',
     *       body,
     *     }).then(res => res.json());
     *     console.log('Response data:', data);
     *   });
     *
     *   // If you were using the native FormData:
     *   // .handle() == .on() + preventDefault()
     *   u('form.contact').handle('submit', async event => {
     *     const body = new FormData(event.target);
     *     const data = await fetch('/contact', {
     *       method: 'POST',
     *       body,
     *     }).then(res => res.json());
     *     console.log('Response data:', data);
     *   });
     *
     * @returns {string} - Returns the instance of Umbrella for method chaining.
     */
    serialize(): string;

    /**
     * Get the [bounding client rect](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect) of
     * the first matched element. This has height, width, top, left, right and bottom properties
     *
     * [Documentation](https://umbrellajs.com/documentation#size)
     *
     * @example
     *   // Get the size and position of the first matched <div> element
     *   const size = u('div').size();
     *   console.log(`Width: ${size.width}, Height: ${size.height}`);
     *
     * @returns {DOMRect} - A DOMRect object containing the size and position of the first element.
     */
    size(): DOMRect;

    /**
     * Wraps each element in the matched set with the HTML structure specified by a string selector. This method is used
     * to surround each selected element with an HTML structure, effectively nesting each element within the provided
     * HTML.
     *
     * [Documentation](https://umbrellajs.com/documentation#wrap)
     *
     * @example
     *   <span class='example'>Link1</span>;
     *
     *   u('.example').wrap('<a class="wrapper">');
     *
     *   // Result
     *   <a class='wrapper'>
     *     <span class='example'>Link1</span>
     *   </a>;
     *
     * @template RES_NODE - Specifies the type of the resulting wrapped elements.
     * @param {string} selector - A string representing the HTML structure with which to wrap the elements. The string
     *   should be a valid HTML representation.
     * @returns {Umbrella<RES_NODE>} - A new Umbrella instance containing the wrapped elements.
     */
    wrap<RES_NODE extends Element = Element>(selector: string): Umbrella<RES_NODE>;
  }

  const u: Umbrella;
  export default u;
}
