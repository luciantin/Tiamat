/*

TODO kasnije

- get new ID
    - group
    - content
    - dashboard

- za transakcije

 */

import {QueryBase} from "@/firebase/databaseModules/queryBase";

class DatabaseConsistency extends QueryBase {
    constructor() {
        super();
        this.nextDsbID = 0;
        this.nextStfID = 0;
        this.nextCntID = 0;
        this.nextGrpID = 0;
        this.nextSecID = 0;
        this.nextItemID = 0;
    }

}