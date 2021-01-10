
export class UserFactory{
    constructor() {
    }
    createUser(username,dashboardID){
        return {
            'username':username,
            'dashboardID':dashboardID,
            counters:{
                nextDsbID : 5,
                nextStfID : 5,
                nextCntID : 5,
                nextGrpID : 5,
                nextSecID : 5,
                nextItemID: 5,
            }
        }
    }
}