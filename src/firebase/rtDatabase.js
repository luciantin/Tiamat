import {database} from "@/firebase/firebase";
import {DatabaseHandler} from "@/firebase/databaseModules/DatabaseHandler.module";

// const tstUID = '4HtPwiDl2wVwXSjtXizvXfOLYVD2';

const dbHandler = new DatabaseHandler(database);


// prepare object
// dbUser.qUID.set(tstUID);
// dbUser.qUserMeta.set({
//     test:'test'
// })
// dbUser.qUserMeta.get().then(a=>console.log(a))
// dbUser.qElement.getKey('container',2,'title').then(a=>console.log(a))
// dbUser.qElement.set('container',2,{
//     title:'312'
// })
// dbUser.qUsername.get().then(a=>console.log(a))


export  {
    dbHandler
}






// dbUser.qUsername.set('test name');
// dbUser.qUsername.get().then((a)=>console.log(a))
// dbUser.doesUserWithUIDExist('4HtPwiDl2wVwXSjtXizvXfOLYVD2').then(a=>console.log(a))


//
// var ref = database.ref('/test').set({
//     test:'test'
// })
//
// let current = 0;
//
// function tstWriteDB(){
//     console.log('write',current+1)
//     let ref = database.ref('/test/val').set(current+=1);
// }
//
// function tstReadDB(){
//     // let ref = database.ref('/test');
//     // ref.on('value', (snapshot) =>{
//     //     const data = snapshot.val();
//     //
//     //     console.log("new val ",data.val)
//     // });
//
//     database.ref('/users/4HtPwiDl2wVwXSjtXizvXfOLYVD2/username').once('value').then((snapshot) => {
//         var username = snapshot.val() ;
//         console.log(username);
//     })
//
//     }
// tstReadDB()
// // setInterval(tstWriteDB,10000)