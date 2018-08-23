<template>
  <div>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Create Job Monitor</md-dialog-title>
      <NewJob v-model="dialogJob" @done="closeDialog"></NewJob>
    </md-dialog>
    <md-button @click="showDialog = true" class="md-fab md-accent md-fab-top-right md-elevation-8">
      <md-icon>add</md-icon>
    </md-button>
    <Tabs :id="sourceId"></Tabs>
    <h2>{{name}}</h2>
    <div class="md-layout">
      <md-card v-for="job in jobs" class="md-layout-item space-bottom md-size-25 md-medium-size-40 md-small-size-100 md-xsmall-size-100">
        <md-card-header>
          <div class="md-title">{{job.name}}</div>
          <div class="md-subheading">{{job.expected_at}}</div>
        </md-card-header>
        <md-card-content>
          content
        </md-card-content>
        <md-card-actions class="md-layout md-alignment-bottom-space-between">
          <md-button @click="edit(job)" class="md-icon-button">
            <md-icon>settings</md-icon>
          </md-button>
          <md-button class="md-icon-button">
            <md-icon>view_list</md-icon>
          </md-button>
        </md-card-actions>
      </md-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from "vue-property-decorator";
import { Getter, Action, State } from "vuex-class";
import { Source, JobDescriptor } from "@/store/state";
import Vue from "vue";
import SourceTabs from "@/views/Sources/components/source-tabs.vue";
import NewSourceJob from "@/views/Sources/new-source-job.vue";
@Component({ components: { Tabs: SourceTabs, NewJob: NewSourceJob } })
export default class SourceJobs extends Vue {
  @Prop() public sourceId!: string;
  @Getter private getSource!: any;
  @Action private fetchJobDescriptors!: any;
  private showDialog = false;
  private dialogJob = {
    name: "",
    tolerance: 0,
    frequency: 1,
    source_id: this.sourceId
  };
  @Getter private getJobs!: any;

  private get jobs(): JobDescriptor[] {
    const jobs = this.getJobs(this.sourceId);
    debugger;
    return jobs;
  }

  private get name(): Source {
    const src = this.getSource(this.sourceId);
    return src ? src.name : "";
  }
  private edit(job: JobDescriptor) {
    this.dialogJob = job;
    this.showDialog = true;
  }

  private closeDialog() {
    this.showDialog = false;
    this.dialogJob = {
      name: "",
      tolerance: 0,
      frequency: 1,
      source_id: this.sourceId
    };
  }

  mounted() {
    this.fetchJobDescriptors(this.sourceId);
  }
}
</script>
<style lang="scss" scoped>
.md-dialog {
  max-width: 40rem;
}
.gutters {
  margin: 0rem 2rem;
}
.space-bottom {
  margin-bottom: 1.5rem;
  margin: 0 0.8rem 1.5rem 0.8rem;
}
</style>

