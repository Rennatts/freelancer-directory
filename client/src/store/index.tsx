import { createStore } from "easy-peasy";


export interface IStore {
    name: string;
    country: string;
}


const store = createStore<IStore>({
    name: 'ooo',
    country: 'ooo'
})


export default store;

