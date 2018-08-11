<template>
  <div>
    <Tabs :id="sourceId"></Tabs>
    <h2>{{source.name}}</h2>
    <!-- The table component in vue-material does not work with computed fields -->
    <Table :entries="entries"></Table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from "vue-property-decorator";
import { Getter, Action, State } from "vuex-class";
import { Source, Entry } from "@/store/state";
import Vue from "vue";
import EntryTable from "@/views/Sources/components/entry-table.vue";
import SourceTabs from "@/views/Sources/components/source-tabs.vue";
@Component({ components: { Table: EntryTable, Tabs: SourceTabs } })
export default class SourceEntries extends Vue {
  @Prop() public sourceId!: string;
  @Action private fetchEntries!: any;
  @Getter private getSource!: any;
  @Getter private getEntries!: any;

  private entries: any = [];

  private get entriesP(): Entry[] {
    const entries = this.getEntries(this.sourceId);
    this.entries = entries || [];
    this.$forceUpdate();
    return entries || [];
  }
  private entriesF(): Entry[] {
    const entries = this.getEntries(this.sourceId);
    this.entries = entries || [];
    this.$forceUpdate();
    return entries || [];
  }
  public get source(): Source {
    const src = this.getSource(this.sourceId);
    this.$set(this, "entries", src.entries);
    // this.entries = [...this.entries, ...src.entries];
    this.$forceUpdate();
    return src;
  }

  mounted() {
    this.fetchEntries(this.sourceId);
  }
}
</script>

<style>
</style>
