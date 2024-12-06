// localStorage.d.ts
export interface LocalStorage_IdentifiersType {
    UserToken: string;
}

export interface LocalStorageType {
    getStringData: (key: string, callback?: (value: string | null) => void) => Promise<string | undefined>;
    setStringData: (key: string, value: string, callback?: (success: boolean) => void) => Promise<void>;
    getObjectData: <T>(key: string, callback?: (value: T | null) => void) => Promise<T | null>;
    setObjectData: <T>(key: string, value: T, callback?: (success: boolean) => void) => Promise<void>;
    ClearStorage: () => Promise<void>;
}

export const LocalStorage_Identifiers: LocalStorage_IdentifiersType;
export const LocalStorage: LocalStorageType;

export function loadState(): any | undefined;
export function saveState(state: { user: any }): void;

export function getStringData(key: string, callback?: (value: string | null) => void): Promise<string | undefined>;
export function setStringData(key: string, value: string, callback?: (success: boolean) => void): Promise<void>;
export function getObjectData<T>(key: string, callback?: (value: T | null) => void): Promise<T | null>;
export function setObjectData<T>(key: string, value: T, callback?: (success: boolean) => void): Promise<void>;
export function ClearStorage(): Promise<void>;