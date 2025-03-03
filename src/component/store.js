// import { create } from "zustand";
// import React from 'react'

// const useStore = create((set) => (
//     {
//         count: 0,
//         api: [],
//         increments: () => set((state) => ({ count: state.count + 1 })),
//         reset: () => set({ count: 0 }),
//         decrement: () => set((state) => ({ count: state.count - 1 })),
//         fetchApi: async () => {
//             let fetching = await fetch("http://localhost:5000/tents")
//             fetching = await fetching.json()
//             let data = fetching
//             console.log(data);
//             set((state) => ({ ...state, api: data}))
//         }
//     }
// ))

// export default useStore

import { create } from "zustand";

const useStore = create((set) => {
    const fetchApi = async () => {
        try {
            let fetching = await fetch("http://localhost:5000/tents");
            let data = await fetching.json();
            console.log(data);
            set((state) => ({ ...state, api: data }));
        } catch (error) {
            console.error("Error fetching API:", error);
        }
    };

    // Automatically fetch data when store is initialized
    fetchApi();

    return {
        count: 0,
        api: [],
        increments: () => set((state) => ({ count: state.count + 1 })),
        reset: () => set({ count: 0 }),
        decrement: () => set((state) => ({ count: state.count - 1 })),
        fetchApi,
    };
});

export default useStore;
