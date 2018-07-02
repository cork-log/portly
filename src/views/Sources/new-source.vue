<template>
  <form novalidate class="md-layout" @submit.prevent="submit">
    <md-card class="md-layout-item md-size-50 md-small-size-100">
      <md-card-header>
        <div class="md-title">Source</div>
      </md-card-header>
      <md-card-content>
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-small-size-100">
            <md-field>
              <label for="source-name">Logging Source Name</label>
              <md-input name="source-name" id="source-name" v-model="name" />
            </md-field>
          </div>
        </div>
      </md-card-content>
      <md-card-actions>
        <md-button type="submit" class="md-primary">Create Source</md-button>
      </md-card-actions>
    </md-card>
  </form>
</template>

<script lang='ts'>
import { Component } from "vue-property-decorator";
import { Action } from "vuex-class";
import Vue from "vue";
@Component
export default class NewSource extends Vue {
  @Action private createSource: any;

  public name = "";
  public sending = false;

  async submit() {
    if (this.name === "") {
      return;
    }
    this.sending = true;
    const result = await this.createSource({ name: this.name });
    this.sending = false;
    this.$router.push(`/sources/${result.id}`);
  }
}
</script>

<style>
</style>
