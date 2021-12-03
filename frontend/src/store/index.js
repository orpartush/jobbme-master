import { createStore } from 'vuex';
import position from './modules/position';
import user from './modules/user'

export default createStore({
    strict: process.env.NODE_ENV !== 'production',
    state: {},
    mutations: {},
    actions: {},
    modules: {
        position,
        user
    }
});
