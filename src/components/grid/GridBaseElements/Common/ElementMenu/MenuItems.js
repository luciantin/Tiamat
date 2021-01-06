let items = {
    'Add':{id:'Add',icon:'Add.svg',text:'Add'},
    'AddMultiple':{id:'AddMultiple',icon:'AddMultiple.svg',text:'Add Multiple'},
    'Delete':{id:'Delete',icon:'Delete.svg',text:'Delete'},
    'Edit':{id:'Edit',icon:'Edit.svg',text:'Edit'},
    'Filter':{id:'Filter',icon:'Filter.svg',text:'Filter'},
    'Lock':{id:'Lock',icon:'Lock.svg',text:'Lock'},
    'Settings':{id:'Settings',icon:'Settings.svg',text:'Settings'},
    'Tags':{id:'Tags',icon:'Tags.svg',text:'Tags'},
}




let dashCnt = {
    top:[
        items['Add'],
        items['Edit'],
    ],
    mid:[
        items['Filter'],
        items['Lock'],
    ],
    bot:[
        items['Tags'],
        items['Delete'],
    ]
}





let MenuItems={
    'dashboard':{
        'container':dashCnt,
        'group':dashCnt
    },
    'stuffspace':{
        'container':dashCnt,
        'group':dashCnt
    }
}


export {
    MenuItems
}