const user = {
    state : {
        info: null
    },
    mutations: {
        SET_INFO: (state, data) => {
            state.info = data;
        }
    },
    actions: {
        setUserInfo({commit}, data) {
            console.log(data);
            commit('SET_INFO', data);
        }
    }
};
export default user;