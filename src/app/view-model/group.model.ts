export class Group{
    static from<T>(array: T[], f: (t: T) => any) {
        const groups: {
          [key: string]: T[],
        } = {};
        array.forEach((item) => {
          const group = JSON.stringify(f(item));
          groups[group] = groups[group] || [];
          groups[group].push(item);
        });
        return groups;
      };
}