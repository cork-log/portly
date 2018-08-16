<template>
  <div>
    <Tabs :id="sourceId"></Tabs>
    <h2>{{name}}</h2>
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

  private get entries(): Entry[] {
    const entries = this.getEntries(this.sourceId);
    return entries || [];
  }
  public get name(): Source {
    const src = this.getSource(this.sourceId);
    return src ? src.name : "";
  }

  mounted() {
    this.fetchEntries(this.sourceId);
  }
}
</script>
