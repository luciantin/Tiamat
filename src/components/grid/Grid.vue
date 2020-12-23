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
    >
      <template v-slot:ContainerHeader>
        <div class="dashboardContainerHeader">
          <Drag class="dashboardHoverMenu" :id="this.makeDragId([keyContainer])" @mousedown="onContainerMouseDown($event)"  ></Drag>
          <p class="dashboardContainerTitle">Container {{keyContainer}}</p>
          <!--          // TODO dashboardTitle component-->
          <ContainerMenu class="dashboardHoverMenu" ></ContainerMenu>
        </div>
      </template>

      <template v-slot:ContainerGroups>
        <Group
            v-for="(group,keyGroup) in this.getGroups(container)"
            :id="wrapId([keyContainer,keyGroup])"
            :group="group"
            :key="keyGroup"
            :style="
              createGridArea(container.groupPos[keyGroup])
            "
        >
<!--v-if="group.attributes.title"-->
          <template v-slot:GroupHeader>
            <div  class="dashboardGroupHeader">
              <Drag class="dashboardHoverMenu" :id="this.makeDragId([keyContainer,keyGroup])" @mousedown="onGroupMouseDown($event)"  ></Drag>
              <p class="dashboardGroupTitle">Group {{keyGroup}}</p>
              <GroupMenu class="dashboardHoverMenu"></GroupMenu>
            </div>
          </template>

          <template v-slot:GroupContent>

            <Package
              :id="wrapId([1])"
              :sectionID="group.items"
            />

          </template>

        </Group>
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

  <Button text="Action" @buttonClick="addGrid" class="actionButton"/>

</template>


<script src="./grid.script.js" />


<style lang="scss" src="./grid.style.scss" scoped />


















