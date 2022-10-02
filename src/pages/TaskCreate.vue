<template>
  <div class="create">
    <h1 class="create__title">Create task</h1>
    <form class="create__form" @submit.prevent @keydown.enter.prevent>
      <Input placeholder="title" :modelValue="title" @update:modelValue="setTitle"></Input>
      <Input placeholder="tag" class="mr-t" @keyup.enter="addTag" @blur="$event.target.value = ''"></Input>
      <transition-group name="list" tag="ul" class="tags">
        <li class="tags__item" v-for="tag in tags" :key="tag">
          {{ tag }} <Close @click="removeTag(tag)" fill="#fff"/>
        </li>
      </transition-group>
      <TextArea
        maxlength="670"
        placeholder="discription"
        class="mr-t"
        :modelValue="description"
        @update:modelValue="setDescription"
      ></TextArea>
      <Datepicker class="date" :modelValue="date" @update:modelValue="setDate"></Datepicker>
      <p class="mr-t error"> {{ errorMessage }} </p>
      <Button class="mr-t" @click="createTask">Create</Button>
    </form>
    <div class="modalbg" :class="{ visible: isModalShow, hidden: !isModalShow }" @click="isModalShow = false">
      <div class="modal" @click.stop>
        Task added to the list!
        <Close @click="isModalShow = false" fill="#000" class="modal__close"></Close>
      </div>
    </div>
  </div>
</template>

<script>
import Input from "../components/UI/input.vue";
import TextArea from "../components/UI/TextArea.vue";
import Button from '../components/UI/Button.vue'
import Close from "../components/icons/Close.vue";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { mapState, mapMutations } from "vuex";

export default {
  components: {
    Input,
    TextArea,
    Close,
    Datepicker,
    Button,
  },
  data() {
    return {
      errorMessage: '',
      isModalShow: false,
    };
  },
  methods: {
    ...mapMutations({
      setTitle: 'task/setTitle',
      setTags: 'task/setTags',
      setDescription: 'task/setDescription',
      setDate: 'task/setDate',
      setList: 'list/setList',
    }),
    addTag(e) {
      if (e.target.value.length > 0) {
        this.tags.push(e.target.value);
        this.setTags([...new Set(this.tags)]);
        e.target.value = '';
      }
    },

    removeTag(tag) {
      this.setTags(this.tags.filter((item) => item !== tag))
    },

    getDate() {
      return `${this.date.getDate() <= 9 ? '0' + this.date.getDate() : this.date.getDate()}:${this.date.getMonth() + 1}:${this.date.getFullYear()}`
    },
  
    createTask() {
      if(this.title.length > 0) {
        const task = {
          id: Date.now(),
          title: this.title,
          tags: this.tags,
          description: this.description,
          date: this.getDate(),
          status: "active",
        }
        this.taskList.push(task);
        this.isModalShow = true;
        this.setTitle('');
        this.setDescription('');
        this.setTags([]);
        localStorage.setItem('list', JSON.stringify(this.taskList));
      } else {
        this.errorMessage = 'Value cannot be empty'
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000)
      }
    }
  },
  computed: {
    ...mapState({
      title: state => state.task.title,
      tags: state => state.task.tags,
      description: state => state.task.description,
      date: state => state.task.date,
      day: state => state.task.day,
      month: state => state.task.month,
      year: state => state.task.year,
      taskList: state => state.list.taskList,
    })
  },
  mounted() {
    const sessionData = JSON.parse(localStorage.getItem('list'))
    if(sessionData) {
      this.setList(sessionData)
    }
    
    
  }
};
</script>

<style>
.create {
  margin: auto;
  max-width: 500px;
  display: flex;
  flex-direction: column;
}

.create__form {
  width: 500px;
  margin-top: 60px;
}
.create__title {
  margin-top: 60px;
  font-size: 48px;
}
.mr-t {
  margin-top: 15px;
}
.tags {
  display: flex;
  flex-wrap: wrap;
}

.tags__close {
  fill: red;
}
.tags__item {
  background-color: rgb(255, 116, 74);
  width: max-content;
  padding: 5px;
  border-radius: 5px;
  margin: 15px 5px 0 5px;
  display: flex;
  justify-content: space-between;
  color: #fff;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
.date {
  margin-top: 15px;
}

.modalbg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
}
.modal {
  min-width: 300px;
  min-height: 100px;
  padding: 20px;
  position: absolute;
  background-color: #fff;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
}


.modal__close {
  position: absolute;
  top: 0;
  right: 0;
  height: 10px;
  margin: 15px 15px 0 0;
}

.visible {
  display: block;
}

.hidden {
  display: none;
}

.error {
  color: rgb(194, 28, 28);
}
</style>
