<template>
<!--<div id="GridMain">-->

  <div :id="modalID" v-if="showModal">
  </div>

  <div :id="SideMenuContentID" v-if="showSideMenuContent" v-click-outside="onClickOutsideOfSideMenuContent" >
    <component v-bind:is="SideMenuContentRegisteredComponentName" />
  </div>

  <!--  Button to add stuff -->
<!--  <Button text="+" class="actionButton"/>-->
<!--  -->
<!--  -->
<!--  -->

<!--  za taj Number(this.ID) bi trebao ici u neke toplice na mjesec dana, ili psihijatriju -->
  <div
      :id="Number(this.ID)"
      v-bind:class="'dashboard'"
      @mousemove="this.mouseMove($event)"
      @mouseup="onMouseRelease()"
      :style="{
        gridTemplateRows: makeGridByRepeat(this.gridData.gridRowNum),
        gridTemplateColumns: makeGridByRepeat(this.gridData.gridColNum),
      }"
  >

    <div id="GridMenu">
      <div class="Top">
        <img :src="require('@/assets/img/GridMenu/SideMenu.svg')" @click="onClickShowSideMenuContent('BrowseDashboards')" />

      </div>
      <div class="Mid">

      </div>
      <div class="Bot">
        <div   @mousedown="addGrid" >
          <img class="actionDragButton" :src="require('@/assets/img/GridMenu/SideAdd.svg')"/>
        </div>
        <img :src="require('@/assets/img/GridMenu/SideSettings.svg')" @click="onClickShowSideMenuContent('UserSettings')" />
        <img :src="require('@/assets/img/GridMenu/SideMenuLogout2.svg')" @click="Logout" />
      </div>



      <!--    <GridMenuItem  class="actionButton" />-->
    </div>

    <Container
        v-for="(container,keyContainer) in containers"
        :id="this.wrapId([keyContainer])"
        :key="keyContainer"
        :style="{
        gridColumnStart: container.pos.x,
        gridColumnEnd: container.pos.x + container.pos.w ,
        gridRowStart: container.pos.y,
        gridRowEnd: container.pos.y + container.pos.h ,
      }"
        :groupGridRowCount="container.innerGrid.rows"
        :groupGridColCount="container.innerGrid.cols"
        :containerID="keyContainer"
        :gridID="String(ID)"
        :meta="container.meta"
        :GridType="type"
        :modalID="modalID"
        @loadData="onStateChange"
        @showModal="onShowModal"
    >

      <template v-slot:ContainerDrag>
          <Drag class="dashboardHoverMenu" :id="this.makeDragId([keyContainer])" @mousedown="onContainerMouseDown($event)"  ></Drag>
      </template>


      <template v-slot:ContainerFooter>
          <Resize class="dashboardResize" :id="this.makeResizeId([keyContainer])" @mousedown="onContainerResizeMouseDown($event)"  ></Resize>
      </template>

      <template v-slot:ContainerGroups>
        <Group
            v-for="(group,keyGroup) in this.getGroups(container)"
            :id="wrapId([keyContainer,keyGroup])"
            :group="group"
            :key="keyGroup"
            :style="createGridArea({container,keyGroup})"
            :meta="group.meta"
            :GroupID="keyGroup"
            :GridType="type"
            :containerID="keyContainer"
            :sectionPlaceholderPos="makeSectionPlaceholderForGroup(keyContainer,keyGroup)"
            :showSectionItems="shouldGroupShowSectionItems(keyContainer,keyGroup)"
            :modalID="modalID"
            @loadData="onStateChange"
            @onSectionDragDown="onSectionDragDown"
            @showModal="onShowModal"
        >
          <template v-slot:GroupDrag>
              <Drag class="dashboardHoverMenu" :id="this.makeDragId([keyContainer,keyGroup])" @mousedown="onGroupMouseDown($event)"  ></Drag>
          </template>

          <template v-slot:GroupFooter>
            <Resize class="dashboardResize" :id="this.makeResizeId([keyContainer,keyGroup])" @mousedown="onGroupResizeMouseDown($event)"  ></Resize>
          </template>

        </Group>

        <!--  Container Placeholder   -->
        <div
            :id="makePlaceholderId([keyContainer])"
            class="containerPlaceholder"
            :style="{
              gridColumnStart:  container.groupPlaceholderPos.x,
              gridColumnEnd: container.groupPlaceholderPos.x + container.groupPlaceholderPos.w ,
              gridRowStart: container.groupPlaceholderPos.y,
              gridRowEnd: container.groupPlaceholderPos.y + container.groupPlaceholderPos.h ,
            }"
        > <p> Hi, I'm a placeholder for {{keyContainer}}</p></div>
      </template>

    </Container>

    <!--  Container Placeholder   -->
    <div
        :id="makePlaceholderId([this.gridData.gridID])"
        class="dashboardPlaceholder"
        :style="{
              gridColumnStart: tmpContainerData.placeholderPos.x,
              gridColumnEnd: tmpContainerData.placeholderPos.x + tmpContainerData.placeholderPos.w ,
              gridRowStart: tmpContainerData.placeholderPos.y,
              gridRowEnd: tmpContainerData.placeholderPos.y + tmpContainerData.placeholderPos.h ,
            }"
    > <p> Hi, I'm a placeholder for dashboard</p></div>
  </div>

<!--</div>-->

</template>


<script src="./grid.script.js" />


<style lang="scss" src="./grid.style.scss" scoped />


















