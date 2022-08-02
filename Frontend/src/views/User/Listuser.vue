<template>
  <div>
    <h2 class="intro-y font-medium mt-10 text-white text-4xl">List Users</h2>
    <div class="grid grid-cols-12 gap-6 mt-5">
      <div
        class="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2"
      >
        <button
          class="btn btn-primary shadow-md mr-2 text-xl bg-yellow-300 text-dark h-10"
          @click="router.push('/adduser')"
        >
          Add New User
        </button>

        <DropdownToggle class="btn px-2 box float-right bg-yellow-300">
          <span class="w-18 h-5 flex items-center justify-center">
            <!-- <PlusIcon class="w-4 h-4" /> -->
            <p class="flex text-base mr-2" @click="router.push('/todolist')">
              <ChevronsLeftIcon class="w-10 h-6" />Back
            </p>
          </span>
        </DropdownToggle>
      </div>
      <!-- BEGIN: Users Layout -->
      <div
        v-for="item in users"
        :key="item._id"
        class="intro-y col-span-12 md:col-span-6"
      >
        <div class="box h-24">
          <div class="flex flex-col lg:flex-row items-center p-5 h-8">
            <img
              src="../../assets/logo/logo.png"
              class="w-12 h-12 ml-8 mt-14"
            />
            <div class="mt-14">
              <p class="font-medium ml-8 text-base">{{ item.fullname }}</p>
              <p class="font-medium ml-8 text-base">{{ item.username }}</p>
            </div>
          </div>
          <div class="flex lg:mt-0 float-right mr-20">
            <div class="flex justify-center items-center">
              <a
                class="flex items-center mr-3 text-lg"
                href="javascript:;"
                @click="handlUpdate(item)"
              >
                <CheckSquareIcon class="w-5 h-5 mr-1" /> Edit
              </a>
              <a
                class="flex items-center text-danger text-lg"
                href="javascript:;"
                @click="deleteConfirmationModal = true"
              >
                <Trash2Icon class="w-5 h-5 mr-1" /> Delete
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal
      :show="deleteConfirmationModal"
      @hidden="deleteConfirmationModal = false"
      v-for="item in users"
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
    </Modal>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import {
  requestGetAllUsers,
  requestDeleteUser
} from '../../services/userServices';

export default {
  name: 'Listuser',
  setup() {
    const username = ref('');
    const fullname = ref('');
    const password = ref('');
    const users = ref([]);
    const userUpdate = ref();
    const router = useRouter();

    //get tất cả user
    const getAllUsers = async () => {
      try {
        const res = await requestGetAllUsers();
        users.value = res.data.user;
        console.log('res', res.data);
      } catch (error) {
        console.log(error);
      }
    };
    onMounted(() => {
      getAllUsers();
    });

    // lấy id của item muốn update
    const handlUpdate = async (data) => {
      if (data) {
        userUpdate.value = data;
        console.log('data', data);
        username.value = data.value;
        password.value = data.value;
      }
      router.push(`/edituser/${data._id}`);
    };

    // delete user

    const handlDelete = async (id) => {
      try {
        const user = await requestDeleteUser(id);
        deleteConfirmationModal.value = false;
        console.log('user', user);
        getAllUsers();
      } catch (error) {
        console.log(error);
      }
    };
    const deleteConfirmationModal = ref(false);
    return {
      users,
      username,
      fullname,
      password,
      router,
      getAllUsers,
      handlUpdate,
      handlDelete,
      deleteConfirmationModal
    };
  }
};
</script>
