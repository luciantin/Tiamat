import {createDashboard} from "@/factory/elementsFactory/modules/dashboard.module";
import {createContainer} from "@/factory/elementsFactory/modules/container.module";
import {createGridData} from "@/factory/elementsFactory/modules/gridData.module";
import {createGroup} from "@/factory/elementsFactory/modules/group.module";
import {createItem} from "@/factory/elementsFactory/modules/item.module";
import {createMeta} from "@/factory/elementsFactory/modules/meta.module";
import {createSection} from "@/factory/elementsFactory/modules/section.module";
import {createStuffspace} from "@/factory/elementsFactory/modules/stuffspace.module";


export class ElementsFactory{
    constructor() {
    }

    createDashboard = createDashboard;
    createContainer = createContainer;
    createGridData = createGridData;
    createGroup = createGroup;
    createItem = createItem;
    createMeta = createMeta;
    createSection = createSection;
    createStuffspace = createStuffspace;

}