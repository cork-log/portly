<template>
  <div>
    {{source.name}} {{source.id}}
  </div>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { Getter } from "vuex-class";
import Vue from "vue";
@Component
export default class Source extends Vue {
  @Prop()
  public id!: string;
  @Getter private getSource!: any;

  public get source(): string {
    return this.getSource(this.id);
  }

  mounted() {
    console.log(this.id);
    debugger;
  }
}
</script>

<style>
</style>
