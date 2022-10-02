<template>
  <header class="header">
    <h2 class="header__logo">Tasks</h2>
    <nav class="nav">
      <router-link to="/" class="nav__item">List</router-link>
      <router-link to="/create" class="nav__item">Create</router-link>
    </nav>
  </header>
</template>

<script>

</script>

<style scoped>
  .header {
    height: 60px;
    background-color: rgb(255, 116, 74);
    padding: 0 30px;
    display: flex;
    justify-content: space-between;
  }
  .header__logo {
    color: white;
    font-size: 36px;
  }
  .nav {
    height: 100%;
    display: flex;
  }
  .nav__item {
    width: 100px;
    text-decoration: none;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
  }
  .nav__item:hover {
    background-color: rgb(194, 88, 56);
  }

  .nav__item:active {
    color: rgba(255, 255, 255, 0.3)
  }
</style>