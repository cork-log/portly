<template>
  <md-content class="md-primary">
    <md-button to="/source/new" class="md-fab md-accent md-fab-top-right md-elevation-8">
      <md-icon>add</md-icon>
    </md-button>
    <md-list v-for="source in sources">
      <md-list-item :to="`sources/${source.id}`">{{source.name}}</md-list-item>
    </md-list>
  </md-content>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { Getter, State, Action } from "vuex-class";
import Vue from "vue";
import { Source } from "@/store/state";
@Component
export default class Sources extends Vue {
  @State private sources!: Source[];
  @Action private fetchSources!: any;

  mounted() {
    this.fetchSources();

  }
}
</script>

<style>
</style>
