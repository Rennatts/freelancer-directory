import { createStore } from "easy-peasy";


export interface IStore {
    name: string;
    país: string;
}


const store = createStore<IStore>({
    name: 'Renata machado',
    país: 'Brazil'
})


export default store;

