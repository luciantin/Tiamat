import {database} from "@/firebase/firebase";
import {QueryBase} from "@/firebase/databaseModules/queryBase";

export class DatabaseHandler extends QueryBase{
    constructor(database){
        super(database);
        this.path = 'user';

        this.UID = '';

        this.elementTypePath = {
            'dashboard':'dsb',
            'stuffspace':'stf',
            'container':'cnt',
            'group':'grp',
            'section':'sec',
            'item':'itm'
        }
    }


    qUsername = {
        get: ()=>{ return this.qGetOnce(`/${this.path}/${this.UID}`,'username') },
        set: (val)=>{ this.qSet(`/${this.path}/${this.UID}`,'username',val) }
    }

    qDashboardID = {
        get: ()=>{ return this.qGetOnce(`/${this.path}/${this.UID}`,'dashboardID') },
        set: (val)=>{ this.qSet(`/${this.path}/${this.UID}`,'dashboardID',val) }
    }

    qElement = {
        get: (type,id)=>{ return this.qGetOnce(`/${type}/${this.UID}+${this.elementTypePath[type]}-${id}`,'')},
        set: (type,id,val)=>{return this.qSet(`/${type}`,`${this.UID}+${this.elementTypePath[type]}-${id}`,val)},
        getKey: (type,id,key)=>{ return this.qGetOnce(`/${type}/${this.UID}+${this.elementTypePath[type]}-${id}`,key)},
        setKey: (type,id,key,val)=>{ return this.qSet(`/${type}/${this.UID}+${this.elementTypePath[type]}-${id}`,key,val) },
    }

    // qUserMeta = {
    //     get: ()=>{ return this.qGetOnce(`/${this.path}/${this.UID}`,'meta')},
    //     set: (val)=>{return this.qSet(`/${this.path}/${this.UID}`,'meta',val)},
    //     // getKey: (key)=>{ return this.qGetOnce(`/${this.path}/${this.UID}/meta/${key}`)}, FIXME
    //     // setKey: (key,val)=>{ return this.qSet(`//${this.path}/${this.UID}/meta`,key,val) }, FIXME
    // }

    qUser = {
        get: ()=>{ return this.qGetOnce(`/${this.path}`,this.UID)},
        set: (val)=>{return this.qSet(`/${this.path}`,this.UID,val)},
        getCounterKey: (key) => {return this.qGetOnce(`/${this.path}/${this.UID}/counters`,key)},
        setCounterKey: (key,val) => {return this.qSet(`/${this.path}/${this.UID}/counters`,key,val)}
    }

    qUID = {
        get: ()=>{ return this.UID; },
        set: (val)=>{ this.UID = val; }
    }

    // nextID = {
    //     get: (type)=>{},
    // }

    doesUserWithUIDExist(uid){
        return new Promise((resolve, reject) => {
            this.qGetOnce(`/${this.path}`,uid).then(a => {
                resolve(a !== null )
            }).catch(()=>{
                reject(false);
            })
        })
    }
}


