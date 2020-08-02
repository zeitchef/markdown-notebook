<template>
  <nav>
    <div class="navbar-left">
      <h1 class="nav-header" @click="unselectNote">.markdown notes</h1>
      <h1 class="nav-header2" @click="unselectNote">.md notes</h1>
    </div>
    <div class="navbar-right"></div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    unselectNote () {
      this.$emit('unselect-note')
    }
  }
}
</script>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3rem;
  padding: 0 1rem;
  /* border-bottom: 1px solid #efefef; */
  color: #fff;
  background-color: var(--color-dark);
}

.nav-header2 { display: none; }

@media (max-width: 720px) {
  .nav-header { display: none; }
  .nav-header2 { display: block; }
}
</style>
