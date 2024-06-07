import { create } from "zustand";
import { PersonSlice, createPersonSlice } from "./person.slice";
import { devtools } from "zustand/middleware";

//?Aqui esta el store
type ShareState = PersonSlice;

export const useWeddingBoundStore = create<ShareState>()(
    devtools((...a) => ({
        ...createPersonSlice(...a),
    }))
);
