<template>
  <div class="md-layout">
    <div class="md-layout md-gutter gutters">
      <div class="md-layout-item md-size-100">
        <md-field>
          <label for="job-report-name">Job Report Name</label>
          <md-input name="job-report-name" id="job-report-name" v-model="value.name" />
        </md-field>
      </div>
      <div class="md-layout-item md-size-100">
        <span class="md-subheading">Job Fequency</span>
        </br>
        <md-radio v-model="value.frequency" :value="1">Hourly</md-radio>
        <md-radio v-model="value.frequency" :value="2">Daily</md-radio>
        <md-radio v-model="value.frequency" :value="3">Weekly</md-radio>
        <md-radio v-model="value.frequency" :value="4">Monthly</md-radio>
      </div>
      <div class="md-layout-item md-size-100">
        <ConfigureTolerance :interval="value.frequency" v-model.number="value.tolerance" />
      </div>
    </div>
    <md-dialog-actions class="md-layout-item md-size-100">
      <md-button class="md-accent" @click="$emit('done')">Cancel</md-button>
      <md-button class="md-primary" @click="submitJob">{{ isUpdate ? "Update" : "Create"}}</md-button>
    </md-dialog-actions>
  </div>
</template>

<script lang='ts'>
import { Component, Prop } from "vue-property-decorator";
import { Action } from "vuex-class";
import { JobDescriptor } from "@/store/state";
import Vue from "vue";
import ToleranceConfig from "@/views/Sources/components/tolerance-config.vue";
@Component({ components: { ConfigureTolerance: ToleranceConfig } })
export default class NewSourceJob extends Vue {
  @Action private createJob!: any;
  @Action private modifyJobDescriptor!: any;
  @Prop() public value!: JobDescriptor;


  
  public get isUpdate() : boolean {
    return !!this.value.id;
  }
  

  submitJob() {
    // Check if this is an update or a new
    if (this.isUpdate) {
      this.modifyJobDescriptor(this.value);
      this.$emit("done");
    } else {
      this.createJob(this.value);
      this.$emit("done");
    }
  }
}
</script>

<style lang="scss">
.gutters {
  padding: 0rem 2rem;
}
</style>
