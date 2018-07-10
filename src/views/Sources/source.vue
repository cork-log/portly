<template>
  <div>
    <md-tabs>
      <md-tab id="entries" md-label="Entries">
        <Entries :source="source" />
      </md-tab>
      <md-tab id="keys" md-label="Keys">
        <Keys :source="source" />
      </md-tab>
    </md-tabs>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";
import Vue from "vue";
import SourceEntries from "@/views/Sources/components/source-entries.vue";
import SourceKeys from "@/views/Sources/components/source-keys.vue";
@Component({
  components: {
    Entries: SourceEntries,
    Keys: SourceKeys
  }
})
export default class Source extends Vue {
  @Prop() public id!: string;
  @Getter private getSource!: any;
  @Action private fetchSources!: any;

  public get source(): string {
    return this.getSource(this.id);
  }
  mounted(){
    this.fetchSources();
  }
}
</script>

<style>
</style>
