<template>
  <md-content>
    <md-content v-for="item in items">
      <slot :item="item">
      </slot>
    </md-content>
  </md-content>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";
@Component
export default class ExpandList extends Vue {
  @Prop() items!: any[];
}
</script>
