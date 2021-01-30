import {storage} from "@/firebase/firebase";

class StorageHandlerClass{
    constructor() {
        this.UID = ''
    }

    qUID = {
        get: ()=>{ return this.UID; },
        set: (val)=>{ this.UID = val; }
    }

    getFileURL(filename){
        return storage.ref(`${this.UID}/${filename}`).getDownloadURL()
    }
    putFile(filename,file){ //BLOB probably...
        return storage.ref(`${this.UID}/${filename}`).put(file)
    }
}

let StorageHandler = new StorageHandlerClass();

export {
    StorageHandler
}