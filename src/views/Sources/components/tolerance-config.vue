<template>
  <div>
    <span class="md-subheading">Tolerance Window</span>
    </br>
    <span class="md-caption">Amount of time before a Job Report is considered missing.</span>
    <div class="md-layout md-gutter md-alignment-center-space-around">
      <md-field md-clearable class="md-layout-item md-size-40 md-small-size-100">
        <label for="days">Days</label>
        <md-input @input="updateValue" min="0" type="number" id="days" name="days" v-model.number="tolerance.days" />
      </md-field>
      <md-field md-clearable class="md-layout-item md-size-40 md-small-size-100">
        <label for="hours">Hours</label>
        <md-input @input="updateValue" step="0.5" min="0" type="number" id="hours" name="hours" v-model.number="tolerance.hours" />
      </md-field>
    </div>
    <span class="md-caption">
      A Job Report will be considered missing after {{ "day" | unitLabel(this.tolerance.days)}}
       and {{ "hour" | unitLabel(this.tolerance.hours)}}.
    </span>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
type unit = "H" | "D" | "W" | "M";
@Component
export default class ToleranceConfig extends Vue {
  @Prop({ default: () => 0 })
  value!: number;
  @Prop() interval!: unit;

  private tolerance = { hours: 0, days: 0 };

  private get explanation(): string {
    return `A Job Report will be considered missing after 
    ${this.tolerance.days} days and ${this.tolerance.hours} hours.`;
  }
  private getLabel(field: string): string {
    return field[0].toUpperCase() + field.slice(1);
  }
  private get label(): string {
    return this.getLabel(this.interval);
  }
  private updateValue() {
    const val = this.tolerance.hours + this.tolerance.days * 24;
    this.$emit("input", val);
  }
  private mounted() {
    this.tolerance.hours = this.value % 24;
    this.tolerance.days = (this.value - this.tolerance.hours) / 24;
  }
}
</script>

<style>
</style>
