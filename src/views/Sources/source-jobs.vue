<template>
  <div>
    <md-dialog :md-active.sync="showDialog">
      <NewJob></NewJob>
    </md-dialog>
    <!-- to="jobs/new" -->
    <md-button @click="showDialog = true" class="md-fab md-accent md-fab-top-right md-elevation-8">
      <md-icon>add</md-icon>
    </md-button>
    <Tabs :id="sourceId"></Tabs>
    <h2>{{name}}</h2>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from "vue-property-decorator";
import { Getter, Action, State } from "vuex-class";
import { Source } from "@/store/state";
import Vue from "vue";
import SourceTabs from "@/views/Sources/components/source-tabs.vue";
import NewSourceJob from "@/views/Sources/new-source-job.vue";
@Component({ components: { Tabs: SourceTabs, NewJob: NewSourceJob } })
export default class SourceJobs extends Vue {
  @Prop() public sourceId!: string;
  @Getter private getSource!: any;
  private showDialog = false;

  public get name(): Source {
    const src = this.getSource(this.sourceId);
    return src ? src.name : "";
  }

  mounted() {}
}
</script>
