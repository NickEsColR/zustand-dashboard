import { StateStorage, createJSONStorage } from "zustand/middleware";

const storageApi: StateStorage = {
    getItem: function (name: string): string | Promise<string | null> | null {
        return sessionStorage.getItem(name);
    },
    setItem: function (name: string, value: string): void {
        sessionStorage.setItem(name, value);
    },
    removeItem: function (name: string): void | Promise<void> {
        sessionStorage.removeItem(name);
    },
};

export const customSessionStorage = createJSONStorage(() => storageApi);
