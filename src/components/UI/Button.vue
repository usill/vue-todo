<template>
  <button class="button">
    <slot></slot>
  </button>
</template>

<script>

</script>

<style scoped>
.button {
  padding: 10px 40px;
  border: none;
  background-color: #fff;
  border: solid 1px rgb(255, 116, 74);
  cursor: pointer;
  transition: 0.3s ease;
  font-size: 18px;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

.button:hover {
  background-color: rgb(255, 116, 74);
  color: white;
}

.button:active {
  background-color: rgb(214, 98, 62);
}
</style>