<template>
  <div>
    <div class="intro-y flex items-center mt-8">
      <h2 class="font-medium mr-auto text-3xl text-white">Form update todos</h2>
    </div>
    <div class="grid grid-cols-12 gap-6 mt-5">
      <div class="intro-y col-span-12 lg:col-span-6">
        <!-- BEGIN: Form Layout -->
        <div class="intro-y box p-5">
          <div>
            <label for="crud-form-1" class="form-label text-xl text-green-600"
              >Todo</label
            >
            <input
              id="crud-form-1"
              type="text"
              v-model="title"
              class="form-control w-full border-neutral-200 border-1 rounded-md"
              placeholder="Edit todo"
            />
          </div>

          <div class="text-right mt-5">
            <button
              type="button"
              class="btn btn-outline-secondary w-24 mr-1"
              @click="router.push('/todolist')"
            >
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-primary w-24 bg-blue-600 border-solid border-1.5"
              @click="actionUpdateTodo()"
            >
              Update
            </button>
          </div>
        </div>
        <!-- END: Form Layout -->
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter, useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import {
  requestFindToDoUpdate,
  requestUpdateToDo
} from '../../services/todoService';
export default {
  name: 'Updatetodo',
  setup() {
    const router = useRouter();
    const title = ref('');
    const data = ref();
    const route = useRoute();
    const updateTodoId = ref('');
    // update todo
    const actionUpdateTodo = async () => {
      try {
        const updateTodo = {
          _id: updateTodoId.value,
          title: title.value
        };
        const res = await requestUpdateToDo(updateTodo);
        router.push('/todolist');
      } catch (error) {
        console.log(error);
      }
      title.value = '';
    };

    // tìm title tương ứng theo id
    const findTodoToUpdate = async () => {
      try {
        const res = await requestFindToDoUpdate(route.params.id);
        console.log('todo', res.data);
        title.value = res.data.data.title;
        updateTodoId.value = res.data.data._id;
      } catch (error) {
        console.log(error);
      }
    };

    onMounted(() => {
      findTodoToUpdate();
    });
    return {
      router,
      title,
      actionUpdateTodo
    };
  }
};
</script>
