<!-- <script>
export default {
  props: {
    todo: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      isCompleted: this.todo.completed,
      title: this.todo.title,
    };
  },

  methods: {

    uptadeTodo() {
      const payload = {
        id: this.todo.id,
        data: {
          title: this.title,
          completed: this.isCompleted,
        },
      };
      this.$store.dispatch("updateTodo", payload);
    },

    onTitleChange() {
      if (!this.title) {
        return;
      }

      this.uptadeTodo();
    },

    onCheckClick() {
      this.isCompleted = !this.isCompleted;
      this.uptadeTodo();
    },
    onDeleteClick() {
      this.$store.dispatch('deleteTodo', this.todo.id)
    }
  },
};
</script> -->


<script setup>

import { ref, defineProps } from "vue"
import { useStore } from "vuex"

const props = defineProps({
  todo: {
    type: Object,
    default: () => {},
  },
});

const isCompleted = ref(props.todo.completed)
const title = ref(props.todo.title)
const store = useStore();

const updateTodo = () => {
  const payload = {
    id: props.todo.id,
      data : {
        title: title.value,
        completed: isCompleted.value
      }
  }
  store.dispatch("updateTodo", payload)
}

const onTitleChange = () =>{
  if(!title.value){
    return false
  }

  updateTodo()
}

const onCheckClick = () =>{
  isCompleted.value = !isCompleted.value
  updateTodo()
}


const onDeleteClick = () => {
  store.dispatch("deleteTodo", props.todo.id)
}




</script>

<template>
  <!-- Todo item -->
  <div
    :class="{
      'bg-green-200 border-l-4 border-green-500': isCompleted,
      'bg-gray-300 border-l-4 border-gray-300': !isCompleted,
    }"
  >
    <div
      class="flex items-center px-4 py-3 border-b border-gray-400 last:border-b-0"
    >
      <div class="flex items-center justify-center mr-2">
        <button
          :class="{
            'text-green-800': isCompleted,
            'text-gray-400': !isCompleted,
          }"
          @click="onCheckClick"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </button>
      </div>

      <div class="w-full">
        <input
          type="text"
          placeholder="Digite a sua tarefa"
          v-model="title"
          :class="{
            'bg-gray-300 placeholder-gray-500 text-gray-700 font-light focus:outline-none block w-full appearance-none leading-normal mr-3':
              !isCompleted,
            'bg-green-200 placeholder-gray-500 text-gray-700 font-light focus:outline-none block w-full appearance-none leading-normal mr-3':
              isCompleted,
          }"
          @keyup.enter="onTitleChange"
        />
      </div>

      <div class="ml-auto flex items-center justify-center">
        <button 
        class="focus:outline-none"
        @click="onDeleteClick"
        >
          <svg
            class="ml-3 h-4 w-4 text-black"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 7L18.1327 19.1425C18.0579 
20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 
19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 
3 9 3.44772 9 4V7M4 7H20"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
  <!--/ Todo item -->
</template>