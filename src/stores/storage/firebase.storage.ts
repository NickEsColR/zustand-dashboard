import { StateStorage, createJSONStorage } from "zustand/middleware";

const firebaseUrl:string = import.meta.env.VITE_FIREBASE_URL as string;

const storageApi: StateStorage = {
    getItem: async function (name: string): Promise<string | null> {
        try {
            const data = await fetch(`${firebaseUrl}/${name}.json`).then((res) => res.json());

            return JSON.stringify(data);
        } catch (error) {
            throw error;
        }
    },
    setItem: async function (name: string, value: string): Promise<void> {
        await fetch(`${firebaseUrl}/${name}.json`, {
            method: "PUT",
            body: value,
        }).then((res) => res.json());
    },
    removeItem: async function (name: string): Promise<void> {
        await fetch(`${firebaseUrl}/${name}.json`, {
            method: "DELETE",
        }).then((res) => res.json());
    },
};

export const firebaseStorage = createJSONStorage(() => storageApi);
