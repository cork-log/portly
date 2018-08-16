<template>
  <md-content>
    <md-button to="/source/new" class="md-fab md-accent md-fab-top-right md-elevation-8">
      <md-icon>add</md-icon>
    </md-button>
    <div class="md-layout md-gutter md-active">
      <md-card v-for="source in sources" class="md-elevation-3 md-layout-item space-bottom md-xlarge-size-30 md-large-size-40 md-medium-size-100 md-small-size-100 md-xsmall-size-100">
        <md-card-header>
          <div class="md-title">{{source.name}}</div>
        </md-card-header>
        <md-card-content>
          <div class="md-layout md-gutter md-alignment-top-space-around">
            <div class="md-layout-item md-size-40 md-elevation-1 md-layout md-alignment-top-center">
              <span class="md-subheading md-layout-item md-size-100">Logs</span>
              <md-button class="md-accent" :to="`sources/${source.id}/entries`">
                <md-icon>
                  view_list
                </md-icon>
                View Logs
              </md-button>
            </div>
            <div class="md-layout-item md-size-40 md-elevation-1 md-layout md-alignment-top-center">
              <span class="md-subheading md-layout-item md-size-100">Status</span>
              <md-button class="md-accent">
                <md-icon>
                  insert_chart_outlined
                </md-icon>
                View Status
              </md-button>
            </div>
          </div>
        </md-card-content>
      </md-card>
    </div>
    <!-- <md-list v-for="source in sources">
      <md-list-item :to="`sources/${source.id}/entries`">{{source.name}}</md-list-item>
    </md-list> -->
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
.space-bottom {
  margin-bottom: 1.5em;
  margin: 0 0.8em 1.5em 0.8em;
}
</style>
