<template>
  <div>
    <div class="intro-y flex items-center mt-8">
      <h2 class="font-medium mr-auto text-3xl text-white">Form Add todos</h2>
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
              class="form-control w-full border-1 border-neutral-200 rounded-md"
              placeholder="Add todo"
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
              @click="handlAddToDo"
            >
              Add
            </button>
          </div>
        </div>
        <!-- END: Form Layout -->
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { requestAddToDo } from '../../services/todoService';
export default {
  name: 'Addtodo',
  setup() {
    const router = useRouter();
    const title = ref('');
    const todos = ref([]);

    //create
    const handlAddToDo = async () => {
      try {
        const addToDo = {
          title: title.value
        };

        const res = await requestAddToDo(addToDo);
        console.log('res', res.data);
        getAllToDoOwer();
        title.value = '';
      } catch (err) {
        console.log(err);
      }
      router.push('/todolist');
    };
    return {
      router,
      todos,
      title,
      handlAddToDo
    };
  }
};
</script>
