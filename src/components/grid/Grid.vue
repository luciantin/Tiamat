<template>
  <div
      :id="this.ID"
      v-bind:class="'dashboard'"
      @mousemove="this.mouseMove($event)"
      @mouseup="onMouseReleaseDrag()"
      :style="{
        gridTemplateRows: makeGridByRepeat(this.gridData.gridRowNum),
        gridTemplateColumns: makeGridByRepeat(this.gridData.gridColNum),
      }"
  >

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
        :title="keyContainer"
        :GridType="type"
    >

      <template v-slot:ContainerDrag>
          <Drag class="dashboardHoverMenu" :id="this.makeDragId([keyContainer])" @mousedown="onContainerMouseDown($event)"  ></Drag>
<!--          <p class="dashboardContainerTitle">Container {{keyContainer}}</p>-->
<!--          < :container-i-d="keyContainer"  :type="type" class="dashboardHoverMenu" ></ContainerMenu>-->
      </template>

      <template v-slot:ContainerGroups>
        <Group
            v-for="(group,keyGroup) in this.getGroups(container)"
            :id="wrapId([keyContainer,container.groupID[keyGroup]])"
            :group="group"
            :key="container.groupID[keyGroup]"
            :style="createGridArea({container,keyGroup})"
            :title="container.groupID[keyGroup]"
            :GroupID="container.groupID[keyGroup]"
            :GridType="type"
        >
          <template v-slot:GroupDrag>
              <Drag class="dashboardHoverMenu" :id="this.makeDragId([keyContainer,container.groupID[keyGroup]])" @mousedown="onGroupMouseDown($event)"  ></Drag>
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



  <!--  Button to add stuff -->
  <Button text="+" @mousedown="addGrid" class="actionButton"/>


</template>


<script src="./grid.script.js" />


<style lang="scss" src="./grid.style.scss" scoped />


















