<template>
  <div>
    <md-tabs md-sync-route>
      <md-tab id="entries" :to="`/sources/${id}/entries`" md-label="Entries">
      </md-tab>
      <md-tab id="keys" :to="`/sources/${id}/keys`" md-label="Keys">
      </md-tab>
    </md-tabs>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from "vue-property-decorator";

@Component
export default class SourceTabs extends Vue {
  @Prop() public id!: string;
}
</script>
