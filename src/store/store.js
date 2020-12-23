import {createStore} from 'vuex'

import storeAuth from './modules/storeAuth.module'
import storeData from './modules/storeData.module'
import storeUser from './modules/storeUser.module'

export const store = createStore({
    modules: {
        storeAuth,
        storeData,
        storeUser
    }
});