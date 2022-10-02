<template>
  <input type="text" class="input" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)">
</template>

<script>
export default {
  name: 'input-basic',
  props: {
    modelValue: String,
  }
}
</script>

<style>
  .input {
    width: 100%;
    height: 30px;
    border: none;
    background-color: rgb(231, 231, 231);
    padding: 15px;
    outline: none;
    transition: 0.2s ease;
  }

  .input:focus {
    background-color: #fff;
    border-bottom: solid 1px rgb(255, 116, 74);
  }
</style>