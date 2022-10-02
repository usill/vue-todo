<template>
  
 <section class="task">
  <h1 class="title">{{ task.title }} <span class="status tags__item">{{ task.status }}</span></h1>
  <p>deadline: {{ task.date }}</p>
  <transition-group name="list" tag="ul" class="tags">
        <li class="tags__item" v-for="tag in task.tags" :key="tag">
          {{ tag }} <Close @click="removeTag(tag)" fill="#fff"/>
        </li>
      </transition-group>
      <p class="description">{{ task.description }}</p>

      <Button style="width: 100%;" class="mr-t" @click="compleatedTask" v-if="task.status !== 'completed'">Complete</Button>
 </section>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import Close from '../components/icons/Close.vue'
import Button from '../components/UI/Button.vue'
export default {
  data() {
    return {
      task: {}
    }
  },
  methods: {
    ...mapMutations({
      setId: 'list/setId',
      setList: 'list/setList',
    }),

    compleatedTask() {
      this.setList(this.taskList.filter(item => item !== this.findOneTask));
      this.task.status = 'completed';
      this.taskList.push(this.task);

      localStorage.setItem('list', JSON.stringify(this.taskList))
    }
  },
  computed: {
    ...mapState({
      selectedId: state => state.list.selectedId,
      taskList: state => state.list.taskList,
    }),
    ...mapGetters({
      findOneTask: 'list/findOneTask'
    })
  },
  mounted() {
    const sessionData = JSON.parse(localStorage.getItem('list'))
    this.setId(this.$route.params.id)
    this.setList(sessionData)
    
    
    this.task = {...this.findOneTask}["0"]
    console.log(this.task)
  },
  components: {
    Close,
    Button
}
}
</script>

<style scoped>
  .task {
    max-width: 500px;
    margin: auto;
    margin-top: 60px;
  }

  .description {
    margin-top: 30px;
    word-wrap: break-word;
  }

  .status {
    margin-left: auto;
    font-size: 14px;
  }

  .title {
    display: flex;
    align-items: center;
  }
</style>