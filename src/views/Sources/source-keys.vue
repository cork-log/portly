<template>
  <div class="md-layout row">
    <md-dialog-confirm :md-active.sync="confirm" :md-title="`${dialogDirection} Key?`" :md-content="`Are you sure you want to <strong>${dialogDirection}</strong> this key? <br> A disabled key cannot be used to store new entries.`" md-confirm-text="Okay" md-cancel-text="Nope" @md-cancel="onCancel" @md-confirm="onConfirm" />
    <Tabs :id="sourceId"></Tabs>
    <md-button @click="showNewContextDialog = true" class="md-fab-top-right md-fab md-accent">
      <md-icon>add</md-icon>
    </md-button>
    <md-content class="md-primary">
      <md-dialog-prompt :md-active.sync="showNewContextDialog" md-title="Enter name for new Auth Context?" md-input-maxlength="30" md-input-placeholder="Auth Context Name..." md-confirm-text="Create" @md-confirm="newContext" />
      <md-dialog-prompt :md-active.sync="showTokenDialog" @md-confirm="token = ''" v-model="token" md-title="Copy the token below:" md-confirm-text="Okay" md-cancel-text="" />
      <md-list v-for="context in contexts">
        <md-list-item @click="">
          <md-button @click.prevent="getToken(context, $event)" class="md-icon-button">
            <md-icon>vpn_key</md-icon>
          </md-button>
          <span class="md-list-item-text">{{context.name}}</span>
          <md-switch class="md-list-action" @change="toggle(context)" v-model="context.enabled" />
        </md-list-item>
      </md-list>
    </md-content>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";
import { Source, AuthContext } from "@/store/state";
import SourceTabs from "@/views/Sources/components/source-tabs.vue";
import Vue from "vue";
@Component({ components: { Tabs: SourceTabs } })
export default class SourceKeys extends Vue {
  @Prop() private sourceId!: string;
  @Action private createAuthContext!: any;
  @Action private requestToken!: any;
  @Action private toggleAuthContext!: any;
  @Action private fetchContexts!: any;
  @Getter private getContexts!: any;
  private showNewContextDialog = false;
  private showTokenDialog = false;
  private token = "";
  private confirm = false;
  private pendingContext!: AuthContext | null;

  mounted(){
    this.fetchContexts(this.sourceId);
  }

  private onConfirm() {
    if (this.pendingContext) {
      this.toggleAuthContext({
        sourceId: this.sourceId,
        contextId: this.pendingContext.id
      });
      this.pendingContext = null;
    }
  }
  private onCancel() {
    this.pendingContext!.enabled = !this.pendingContext!.enabled;
    this.pendingContext = null;
  }
  toggle(context: AuthContext) {
    debugger;
    this.pendingContext = context;
    this.confirm = true;
  }

  private get dialogDirection(): string {
    // This is backwards becuase the switch toggles the value early
    if (this.pendingContext && this.pendingContext.enabled) {
      return "Enable";
    } else {
      return "Disable";
    }
  }

  public get contexts(): AuthContext[] {
    const contexts: AuthContext[] = this.getContexts(this.sourceId);
    return contexts;
  }
  async getToken(context: AuthContext, event: Event) {
    const token = await this.requestToken({
      sourceId: this.sourceId,
      contextId: context.id
    });
    this.token = token;
    this.showTokenDialog = true;
    event.stopPropagation();
  }

  newContext(name: string) {
    this.createAuthContext({ sourceId: this.sourceId, name: name });
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

