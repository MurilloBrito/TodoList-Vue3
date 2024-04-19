<script setup>
    import ToDoItem from '@/components/ToDoItem.vue';
</script>

<template>
    <!-- Todo items -->
    <div class="space-y-2">
        <ToDoItem 
            v-for="todo in $store.state.todos"
            :key="todo.id"
            :todo="todo"
        />

    </div>
    <!--/ Todo items -->
</template>

