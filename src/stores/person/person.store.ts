import { StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { firebaseStorage } from "../storages/firebase-storage.storage";

interface PersonSate {
    firstName: string;
    lastName: string;
}


interface Actions {
    setFirstName: (value: string) => void;
    setLastName: (value: string) => void;
}

const storeAPI: StateCreator<PersonSate & Actions, [["zustand/devtools", never]]> = (set) => ({
    firstName: '',
    lastName: '',
    setFirstName: (value: string) => set(() => ({firstName: value}), false, 'setFirstName'),
    setLastName: (value: string) => set(() => ({lastName: value}), false, 'setLastName') 
})



export const usePersonStore = create<PersonSate & Actions>()(
devtools(persist(
            storeAPI,
        {
            name: "person-storage",
            storage: firebaseStorage
        }
    ))
)