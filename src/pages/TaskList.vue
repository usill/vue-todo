<template>
  <div class="content">
  <h1 class="title">Tasks</h1>
  <select class="select" @change="setSortedBy($event.target.value)">
    <option disabled selected>Sorted by</option>
    <option v-for="option in sortOptions" :key="option.value" :value="option.value">
       {{ option.name }}
    </option>
  </select>
  <ul class="list">
    <li class="list__element">
      <p><b>Title</b></p>
      <p><b>Date</b></p>
      <p><b>Description</b></p>
      <p><b>Status</b></p>
      <p><b>Open</b></p>
    </li>
    <li class="list__element" v-for="task in sortArray">
      <p>{{ task.title }}</p>
      <p>{{ task.date }}</p>
      <p>{{ task.description }}</p>
      <p>{{ task.status }}</p>
      <p>
        <router-link 
        :to="{name: 'task', params: {id: task.id}}" 
        class="list__button" 
        
        
        >Open
      </router-link>
      </p>
    </li>
  </ul>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';

export default {
  data() {
    return {
      sortOptions: [
        {value: 'active', name: 'Sort by active'},
        {value: 'overdue', name: 'Sort by overdue'},
        {value: 'completed', name: 'Sort by completed'}
      ],
    }
  },
  methods: {
    ...mapMutations({
      setList: 'list/setList',
      setSortedBy: 'list/setSortedBy',
      setId: 'list/setId',
    }),
  },
  computed: {
    ...mapState({
      taskList: state => state.list.taskList,
      sortedBy: state => state.list.taskList,
    }),
    ...mapGetters({
      sortArray: 'list/sortArray',
    })
  },
  mounted() {
    const sessionData = JSON.parse(localStorage.getItem('list'))
    if(this.taskList.length <= 0 && sessionData) {
      const date = new Date()
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      

      sessionData.forEach(item => {
        const taskDate = item.date.split(':');
        const taskDay = +taskDate[0];
        const taskMonth = +taskDate[1];
        const taskYear = +taskDate[2];
        
        if(taskDay < day ||
          taskDay > day && taskMonth < month ||
          taskMonth > month && taskYear < year) {
            item.status = 'overdue'
          }
      })
      this.setList(sessionData)
    } 
  },
}
</script>

<style scoped>
  .content {
    max-width: 800px;
    margin: auto;
  }
  .list__element {
    padding: 15px 0;
    border-bottom: 1px solid rgb(255, 116, 74);
    max-height: 100px;
  }

  .list__element:nth-child(1) {
    margin-top: 60px;
    border-top: 1px solid rgb(255, 116, 74);
  }
  .title {
    margin-top: 60px;
    font-size: 48px;
  }

  .list__element {
    display: grid;
    grid-template-columns: 20% 12% 46% 12% 10%;
  }

  p {
    overflow: hidden;
    padding: 0 10px;
    display: flex;
    align-items: center;
  }

  .list__button {
    padding: 5px 10px;
    background-color: rgb(255, 116, 74);
    color: #fff;
    border: none;
    cursor: pointer;
    transition: 0.3s ease;
    border: 1px solid transparent;
    text-decoration: none;
    font-size: 14px;
  }

  .list__button:hover {
    border: solid 1px rgb(255, 116, 74);
    background-color: #fff;
    color: #000;
  }

  .select {
    margin-top: 60px;
    width: 200px;
    height: 60px;
    font-size: 14px;
    border: none;
    cursor: pointer;
    background-color: rgb(255, 116, 74);
    color: #fff;
    padding: 10px;
  }
  
</style>