declare namespace Global {
  export type Dictionary<T> = { [key: string]: T };
}

declare function getAllPropertyNames<T>(t: T): string[];
