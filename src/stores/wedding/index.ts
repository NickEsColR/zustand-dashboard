import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { PersonSlice, createPersonSlice } from "./person.slice";
import { GuestSlice, createGuestSlice } from "./guest.slice";
import { DateSlice, createDateSlice } from "./date.slice";

//?Aqui esta el store
type ShareState = PersonSlice & GuestSlice & DateSlice;

export const useWeddingBoundStore = create<ShareState>()(
    devtools((...a) => ({
        ...createPersonSlice(...a),
        ...createGuestSlice(...a),
        ...createDateSlice(...a)
    }))
);
