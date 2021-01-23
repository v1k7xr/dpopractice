import { createStore } from 'vuex'

export default createStore({
  state: {
    count : 15,
    profession: 'profession',
    city: 'city',
    photoURL: 'photoURL',
    fullname: 'fullname',
    phone: 'phone',
    email: 'email',
    birthdayData: 'birthdayData',
    education: 'education',
    salary: 'salary',
    keySkils: 'key skils',
    about: 'about',
    educationInstitutionList: [],
  
  },
  mutations: {
    increment(state) {
      state.count++;
    }
  },
  actions: {
  },
  modules: {
  }
})
