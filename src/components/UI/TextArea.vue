<template>
  <div class="text">
    <textarea class="textarea" :value="modelValue" @input="setLength" v-bind="$attrs"></textarea>
    <span class="value">{{ value }} / 670</span>
  </div>
  
</template>

<script>
export default {
  name: 'textarea-basic',
  props: { 
    modelValue: String,
  },
  data() {
    return {
      text: '',
      value: 0,
    }
  },
  methods: {
    setLength(event) {
      this.value = event.target.value.length;
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<style scoped>
  .textarea {
    resize: none;
    width: 100%;
    height: 200px;
    border: none;
    background-color: rgb(231, 231, 231);
    padding: 15px;
    outline: none;
    transition: 0.2s ease;
  }
  .textarea:focus {
    background-color: #fff;
    border-bottom: solid 1px rgb(255, 116, 74);
  }
  .text {
    position: relative;
  }
  .value {
    position: absolute;
    bottom: 5px;
    right: 5px;
  }
</style>