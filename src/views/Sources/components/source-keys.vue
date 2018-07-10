<template>
  <div class="md-layout row">
    <md-button @click="showNewContextDialog = true" class="md-fab md-accent self-end">
      <md-icon>add</md-icon>
    </md-button>
    <md-content class="md-primary">
      <md-dialog-prompt :md-active.sync="showNewContextDialog" md-title="Enter name for new Auth Context?" md-input-maxlength="30" md-input-placeholder="Auth Context Name..." md-confirm-text="Create" @md-confirm="newContext" />
      <md-dialog-prompt :md-active.sync="showTokenDialog" @md-confirm="token = ''" v-model="token" md-title="Copy the token below:" md-confirm-text="Okay" md-cancel-text="" />
      <md-list v-for="context in source.contexts">
        <md-list-item>
          <md-button @click.prevent.native="getToken(context)" class="md-icon-button">
            <md-icon>vpn_key</md-icon>
          </md-button>
          <span class="md-list-item-text">{{context.name}}</span>
          <md-switch @change="toggle(context)" v-model="context.enabled" />
        </md-list-item>
      </md-list>
    </md-content>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";
import { Source, AuthContext } from "@/store/state";
import Vue from "vue";
@Component
export default class SourceKeys extends Vue {
  @Prop() private source!: Source;
  @Action private createAuthContext!: any;
  @Action private requestToken!: any;
  @Action private toggleAuthContext!: any;
  private showNewContextDialog = false;
  private showTokenDialog = false;
  private token = "";

  toggle(context: AuthContext) {
    this.toggleAuthContext({
      sourceId: this.source.id,
      contextId: context.id
    });
  }
  async getToken(context: AuthContext) {
    const token = await this.requestToken({
      sourceId: this.source.id,
      contextId: context.id
    });
    this.token = token;
    this.showTokenDialog = true;
  }

  newContext(name: string) {
    this.createAuthContext({ sourceId: this.source.id, name: name });
  }
}
</script>
<style lang="scss" scoped>
.row {
  flex-direction: column;
}
.self-end {
  align-self: flex-end;
}
</style>

