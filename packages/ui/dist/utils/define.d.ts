/** Registers an element under its tag unless the page already defines it, so a second copy of a bundle registers nothing and throws nothing. */
export declare const customElement: (tag: string) => (element: CustomElementConstructor) => void;
