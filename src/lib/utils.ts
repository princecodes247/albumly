import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertImageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to convert image to base64'));
      }
    };
    reader.onerror = (error) => reject(error);
  });
}

type Serializable = {
  toJSON(): any;
  toString(): any;
};

export type Serialized<T> = T extends Serializable
  ? ReturnType<T['toString']>
  : T extends (infer U)[]
  ? Serialized<U>[]
  : T extends object
  ? { [K in keyof T]: Serialized<T[K]> }
  : T;

/**
 * Serializes all values of an object using their .toJSON() method if available.
 * @param obj - The input object to serialize.
 * @returns A new object with serialized values and an accurate type.
 */
export function serializeValues<T>(obj: T): Serialized<T> {
  if (Array.isArray(obj)) {
    return obj.map(item => serializeValues(item)) as Serialized<T>;
  }

  if (obj && typeof obj === 'object') {
    const result: any = {};
    for (const [key, value] of Object.entries(obj)) {
      if (value && typeof value === 'object' && 'toJSON' in value && typeof (value as Serializable).toJSON === 'function') {
        result[key] = (value as Serializable).toString();
      } else {
        result[key] = serializeValues(value); // Recursively serialize nested objects/arrays
      }
    }
    return result as Serialized<T>;
  }

  return obj as Serialized<T>;
}

export function getExtension(url: string) {
	// @ts-ignore
	return url.split(/[#?]/)[0].split(".").pop().trim();
}


export function convertToSlug(text: string): string {
	return text
		.toLowerCase()
		.replace(/[^\w\s-]/g, "") // Remove special characters except hyphen and whitespace
		.replace(/\s+/g, "-") // Replace spaces with hyphens
		.replace(/--+/g, "-") // Replace consecutive hyphens with a single hyphen
		.trim(); // Trim leading and trailing spaces
}


// Utility function to normalize a route
function normalizeRoute(route: string): string {
  try {
    if (!route || route.trim() === '') return '/'; // Treat empty routes as "/"
    const [path] = route.split(/[?#]/); // Remove query and hash
    return decodeURIComponent(path.replace(/\/+$/, '') || '/'); // Remove trailing slashes, fallback to "/"
  } catch (error) {
    console.error(`Error normalizing route: ${route}`, error);
    return '/';
  }
}

export function compareRoutes(route1: string, route2: string): boolean {
  const normalizedRoute1 = normalizeRoute(route1);
  const normalizedRoute2 = normalizeRoute(route2);

  return normalizedRoute1 === normalizedRoute2;
}