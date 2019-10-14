const base = {
    state: {
        userImg: '',
        userName: ''
    },
    mutations: {
        'SET_USERNAME'(state, userName) {
            state.userName = userName;
        }
    },
    actions: {
        'set-username'({ commit }, userName) {
            commit('SET_USERNAME', userName);
        }
    }
};

export default base;
