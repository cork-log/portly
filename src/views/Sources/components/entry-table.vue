<template>
  <md-content class="md-primary">
    <ExpandList :items="entries">
      <template scope="{ item }">
        <ExpandItem :item="item">
          <span slot="closed" slot-scope="{ item }">
            <div>
              <span class="md-title">{{item.timestamp_occurred | date}}</span>
              |
              <span>{{item.level}}</span>
            </div>
          </span>
          <div slot="open" slot-scope="{ item }">
            <pre class="wrap">
              {{item.content}}
            </pre>
          </div>
        </ExpandItem>
      </template>
    </ExpandList>
  </md-content>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component, Watch } from "vue-property-decorator";

import { Entry } from "@/store/state";
import ExpandList from "@/views/Sources/components/expand-list.vue";
import ExpandItem from "@/views/Sources/components/expand-item.vue";
@Component({
  components: { ExpandList: ExpandList, ExpandItem: ExpandItem },
  filters: {
    date: (date: string) => {
      debugger;
      return new Date(parseInt(date)).toString();
    }
  }
})
export default class EntryTable extends Vue {
  @Prop() private entries!: Entry[];
}
</script>
<style>
.wrap {
  white-space: pre-wrap;
}
</style>
