/**
 * Generates a new guid.
 * @returns The newly generated guid.
 */
export function newGuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    (character: string) => {
      const random = (Math.random() * 16) | 0;
      const value = character === 'x' ? random : (random & 0x3) | 0x8;
      return value.toString(16);
    }
  );
}

/**
 * Checks if an object is a guid.
 * @param obj The object to check.
 * @returns True if the object is a guid.
 */
export function isGuid(obj: any): boolean {
  if (typeof obj !== 'string') {
    return false;
  }

  const pattern =
    '^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-(4|0)[0-9A-Fa-f]{3}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}$';
  const validator = new RegExp(pattern, 'i');
  return validator.test(obj);
}

/** An empty guid. */
export const emptyGuid = '00000000-0000-0000-0000-000000000000';
