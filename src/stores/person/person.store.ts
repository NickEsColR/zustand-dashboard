import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PersonState {
    firstName: string;
    lastName: string;
}

interface Actions {
    setFirstName: (firstName: string) => void;
    setLastName: (lastName: string) => void;
}

export const usePersonStore = create<PersonState & Actions>()(
    persist(
        (set) => ({
            firstName: "",
            lastName: "",
            setFirstName: (firstName: string) => set({ firstName }),
            setLastName: (lastName: string) => set({ lastName }),
        }),
        {
            name: "person-storage",
        }
    )
);
