<template>
  <div class="md-layout">
    <div class="md-layout md-gutter">
      <div class="md-layout-item md-size-100">
        <md-field>
          <label for="job-report-name">Job Report Name</label>
          <md-input name="job-report-name" id="job-report-name" v-model="name" />
        </md-field>
      </div>
      <div class="md-layout-item md-size-100">
        <span class="md-subheading">Job Fequency</span>
        </br>
        <md-radio v-model="intervalScope" value="H">Hourly</md-radio>
        <md-radio v-model="intervalScope" value="D">Daily</md-radio>
        <md-radio v-model="intervalScope" value="W">Weekly</md-radio>
        <md-radio v-model="intervalScope" value="M">Monthly</md-radio>
      </div>
      <div class="md-layout-item md-size-100">
        <ConfigureTolerance :interval="intervalScope" v-model.number="tolerance" />
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop } from "vue-property-decorator";
import { Action } from "vuex-class";

import Vue from "vue";
import ToleranceConfig from "@/views/Sources/components/tolerance-config.vue";
@Component({ components: { ConfigureTolerance: ToleranceConfig } })
export default class NewSourceJob extends Vue {
  @Action private createSource: any;
  @Prop() public sourceId!: string;
  public name = "";
  public sending = false;
  public intervalScope: string = "D";
  //Tolerance in Hours
  public tolerance = 0;

  submit() {
    // const result = await this.createSource({ name: this.name });
    this.$router.push(`/sources/${this.sourceId}/jobs`);
  }
}
</script>

<style>
</style>
