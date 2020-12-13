import {createStore} from 'vuex'

import storeAuth from './modules/storeAuth.module'
import storeClient from './modules/storeClient.module'

export const store = createStore({
    modules: {
        storeAuth,
        storeClient
    }
});