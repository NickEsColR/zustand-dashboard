import { create } from "zustand";
import { PersonSlice, createPersonSlice } from "./person.slice";
import { devtools } from "zustand/middleware";
import { GuestSlice, createGuestSlice } from "./guest.slice";

//?Aqui esta el store
type ShareState = PersonSlice & GuestSlice;

export const useWeddingBoundStore = create<ShareState>()(
    devtools((...a) => ({
        ...createPersonSlice(...a),
        ...createGuestSlice(...a),
    }))
);
