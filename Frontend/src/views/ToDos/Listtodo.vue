<template>
  <div>
    <h2 class="intro-y font-medium mt-10 text-white text-4xl">List Todos</h2>
    <div class="grid grid-cols-12 gap-6 mt-5">
      <div
        class="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2"
      >
        <button
          class="btn btn-primary shadow-md mr-2 text-xl bg-yellow-300 text-dark h-10"
          @click="router.push('/addtodo')"
        >
          Add New Todo
        </button>

        <Dropdown>
          <DropdownToggle class="btn px-2 box float-right bg-yellow-300">
            <span class="w-14 h-5 flex items-center justify-center">
              <!-- <PlusIcon class="w-4 h-4" /> -->
              <p class="text-lg">Option</p>
            </span>
          </DropdownToggle>
          <DropdownMenu class="w-40">
            <DropdownContent class="text-base">
              <DropdownItem @click="handlUser, router.push('/listuser')">
                <UsersIcon class="w-4 h-4 mr-2" /> User
              </DropdownItem>
              <DropdownItem @click="handlLogout">
                <ChevronsLeftIcon class="w-4 h-4 mr-2" /> Logout
              </DropdownItem>
            </DropdownContent>
          </DropdownMenu>
        </Dropdown>
      </div>
      <!-- <button class="btn btn-primary w-24 bg-blue-600 border-solid border-1.5 text-lg h-10  " @click="handlLogout">Logout</button> -->
      <!-- BEGIN: Data List -->
      <div class="intro-y col-span-12 overflow-auto lg:overflow-visible">
        <table class="table table-report mt-4">
          <thead>
            <tr>
              <th class="text-center whitespace-nowrap text-lg text-white">
                TITLE
              </th>
              <th class="text-center whitespace-nowrap text-lg text-white">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in todos" :key="item._id" class="intro-x">
              <td class="text-center text-lg">
                <p class="font-medium whitespace-nowrap text-green-700 text-xl">
                  {{ item.title }}
                </p>
              </td>

              <td class="table-report__action w-3/6 h-14 text-lg">
                <div class="flex justify-center items-center">
                  <a
                    class="flex items-center mr-3"
                    href="javascript:;"
                    @click="handlUpdate(item)"
                  >
                    <CheckSquareIcon class="w-4 h-4 mr-1" /> Edit
                  </a>
                  <a
                    class="flex items-center text-danger"
                    href="javascript:;"
                    
                    @click="handlDelete(item._id)"
                  >
                    <Trash2Icon class="w-4 h-4 mr-1" /> Delete
                  </a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- END: Data List -->
      <!-- BEGIN: Pagination -->
      <!-- <div
        class="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center"
      ></div> -->

      <!-- END: Pagination -->
    </div>

    <!-- <Modal
      :show="deleteConfirmationModal"
      @hidden="deleteConfirmationModal = false"
      v-for="item in todos"
      :key="item._id"
    >
      <ModalBody class="p-0">
        <div class="p-5 text-center">
          <XCircleIcon class="w-16 h-16 text-danger mx-auto mt-3" />
          <div class="text-3xl mt-5">Are you sure?</div>
          <div class="text-slate-500 mt-2">
            Do you really want to delete these records? <br />This process
            cannot be undone.
          </div>
        </div>
        <div class="px-5 pb-8 text-center">
          <button
            type="button"
            @click="deleteConfirmationModal = false"
            class="btn btn-outline-secondary w-24 mr-1"
          >
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-danger w-24 bg-red-700"
            @click="handlDelete(item._id)"
          >
            Delete
          </button>
        </div>
      </ModalBody>
    </Modal> -->
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';
import {
  requestDeleteToDo,
  requestGetAllToDoOwner,
  requestGetAllToDo
} from '../../services/todoService';

export default {
  name: 'Listtodo',
  setup() {
    const title = ref('');
    const todos = ref([]);
    const todoUpdate = ref();
    const router = useRouter();

    // getAll todo
    const getAllToDo = async () => {
      try {
        const res = await requestGetAllToDo();
        todos.value = res.data;
        console.log('todo', res.data);
      } catch (error) {
        console.log(error);
      }   
    };
    onMounted(() => {
      getAllToDo();
    });

    //getAll todo by id
    const getAllToDoOwner = async () => {
      try {
        const res = await requestGetAllToDoOwner();
        todos.value = res.data;
        console.log('todo', res.data);
      } catch (error) {
        console.log(error);
      }
    };
    onMounted(() => {
      getAllToDoOwner();
    });

    // delete todo
    const handlDelete = async (id) => {
      try {
        const todo = await requestDeleteToDo(id);
        deleteConfirmationModal.value = false;
        console.log('todo', todo);
         getAllToDoOwner();
         getAllToDo();
      } catch (error) {
        console.log(error);
      }
    };

    // lấy id của item muốn update todo
    const handlUpdate = async (data) => {
      if (data) {
        todoUpdate.value = data;
        console.log('data', data);
        title.value = data.value;
      }
      router.push(`/edit/${data._id}`);
    };

    //Logout
    const handlLogout = async () => {
      try {
        await Cookies.remove('token');
        router.push('/login');
      } catch (error) {
        console.log(error);
      }
    };

    const deleteConfirmationModal = ref(false);

    return {
      getAllToDoOwner,
      getAllToDo,
      todos,
      handlDelete,
      handlUpdate,
      handlLogout,
      router,
      deleteConfirmationModal
    };
  }
};
</script>
