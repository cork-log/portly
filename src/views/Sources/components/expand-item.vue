<template>
  <md-content class="md-layout md-gutter">
    <span class="md-layout-item md-xlarge-size-5 md-large-size-5 md-medium-size-10 md-small-size-10 md-xsmall-size-25">
      <md-button @click="expand = !expand" class="md-icon-button md-primary">
        <md-icon>{{icon}}</md-icon>
      </md-button>
    </span>
    <span class="md-layout-item vertical-center expand">
      <div class="md-size-100">
        <slot name="closed" :item="item">
        </slot>
      </div>
      <transition name="show">
        <slot v-if="expand" name="open" :item="item">
        </slot>
      </transition>
    </span>
  </md-content>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";
@Component({})
export default class ExpandItem extends Vue {
  @Prop() item!: any;
  private expand = false;
  private get icon(){
    return this.expand ? "expand_less" : "expand_more";
  }

  private mounted() {
    debugger;
  }
}
</script>


<style>
.vertical-center {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.expand {
  transition: all 1s;
}
</style>
