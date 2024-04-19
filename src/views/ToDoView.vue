<!-- <script>
import ToDoSpinner from '@/components/ToDoSpinner.vue'
import ToDoFormAdd from '@/components/ToDoFormAdd.vue'
import ToDoItems from '@/components/ToDoItems.vue'
import ToDoEmpty from '@/components/ToDoEmpty.vue'

export default{
  name: 'App', 
    components:{
      ToDoEmpty,
      ToDoFormAdd,
      ToDoItems,
      ToDoSpinner
    },
    data() {
      return{
        loading : false
      }
    },
    created(){
      this.loading = true
      this.$store.dispatch('getTodos').finally(() =>{
        this.loading = false
      })
    }
}
</script> -->

<script setup >
import { ref } from 'vue'
import { useStore } from 'vuex'

import ToDoSpinner from '@/components/ToDoSpinner.vue'
import ToDoFormAdd from '@/components/ToDoFormAdd.vue'
import ToDoItems from '@/components/ToDoItems.vue'
import ToDoEmpty from '@/components/ToDoEmpty.vue'
import ToDoErrorNetwork from '@/components/ToDoErrorNetwork.vue'

const loading = ref(true)
const store = useStore()

store.dispatch('getTodos')
  .finally(() => {
    loading.value = false
    if(store.state.erroMessage != ''){
      loading.value = true
    }
  })
</script>

<template>
  <!-- Content -->
  <div class="px-3 py-10 md:px-10">
    <div class="w-full sm:w-1/2 lg:w-1/3 mx-auto">
  
      <ToDoSpinner v-if="loading" />
  
      <ToDoErrorNetwork v-if="$store.state.erroMessage.length ">
        {{$store.state.erroMessage}}
      </ToDoErrorNetwork>
      <template>
        <ToDoFormAdd />
  
        <ToDoItems v-if="$store.state.todos.length" />
  
        <ToDoEmpty v-else />
  
      </template>
  
    </div>
  </div>
  <!--/ Content -->
</template>