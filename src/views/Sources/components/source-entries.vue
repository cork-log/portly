<template>
  <div>
    <h1>{{source.name}}</h1>
    <md-content class="md-primary">
      <md-list v-for="entry in source.entries">
        <md-list-item>
          Entry
        </md-list-item>
      </md-list>
    </md-content>

  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from "vue-property-decorator";
import { Getter } from "vuex-class";
import { Source } from "@/store/state";
import Vue from "vue";
@Component
export default class SourceEntries extends Vue {
  @Prop() public source!: Source;
}
</script>

<style>
</style>
