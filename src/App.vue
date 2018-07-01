<template>
  <md-app class="full-height">
    <md-app-drawer md-persistent="mini" :md-active.sync="menuVisible">
      <md-list>
        <md-list-item>
          <router-link to="/"><md-icon>home</md-icon></router-link>
          <span class="md-list-item-text">
            <router-link to="/">Home</router-link>
          </span>
        </md-list-item>
        <md-list-item>
          <router-link to="/source/new"><md-icon>info</md-icon></router-link>
          <span class="md-list-item-text">
            <router-link to="/source/new">Source</router-link>
          </span>
        </md-list-item>
      </md-list>
    </md-app-drawer>
    <md-app-toolbar class="md-primary">
      <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
        <md-icon>menu</md-icon>
      </md-button>
      <span class="md-title">My Title</span>
    </md-app-toolbar>
    <md-app-content>
      <router-view/>
    </md-app-content>
  </md-app>
</template>

<style lang="scss">
@import "~vue-material/dist/theme/engine"; // Import the theme engine

@include md-register-theme(
  "default",
  (
    primary: md-get-palette-color(indigo, 500),
    accent: md-get-palette-color(green, A200)
  )
);
@import "~vue-material/dist/theme/all"; // Apply the theme
.full-height{
  height: 100vh;
}

</style>
<script>
export default {
  data: () => ({
    menuVisible: false,
  }),
};
</script>
