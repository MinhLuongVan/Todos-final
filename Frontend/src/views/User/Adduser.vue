<template>
  <div>
    <div class="intro-y flex items-center mt-8">
      <h2 class="font-medium mr-auto text-3xl text-white">Form Add Users</h2>
    </div>
    <div class="grid grid-cols-12 gap-6 mt-5">
      <div class="intro-y col-span-12 lg:col-span-6">
        <!-- BEGIN: Form Layout -->
        <div class="intro-y box p-5">
          <div>
            <label for="crud-form-1" class="form-label text-xl text-green-600"
              >User</label
            >
            <input
              id="crud-form-1"
              type="text"
              v-model="fullname"
              class="form-control w-full border-1 border-neutral-200 rounded-md"
              placeholder="fullname"
            />

            <input
              id="crud-form-1"
              type="text"
              v-model="username"
              class="form-control w-full border-1 border-neutral-200 rounded-md mt-4"
              placeholder="username"
            />
            <input
              id="crud-form-1"
              type="password"
              v-model="password"
              class="form-control w-full border-1 border-neutral-200 rounded-md mt-4"
              placeholder="password"
            />
          </div>

          <div class="text-right mt-5">
            <button
              type="button"
              class="btn btn-outline-secondary w-24 mr-1"
              @click="router.push('/listuser')"
            >
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-primary w-24 bg-blue-600 border-solid border-1.5"
              @click="handlAddUser"
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
import { requestAddUser } from '../../services/userServices';
export default {
  name: 'Adduser',
  setup() {
    const router = useRouter();
    const fullname = ref('');
    const username = ref('');
    const password = ref('');
    const users = ref([]);

    //create

    const handlAddUser = async () => {
      try {
        const addUser = {
          fullname: fullname.value,
          username: username.value,
          password: password.value
        };
        const res = await requestAddUser(addUser);
        console.log('res', res.data);
        getAllUsers();
        title.value = '';
      } catch (err) {
        console.log(err);
      }
      router.push('/listuser');
    };

    return {
      router,
      username,
      fullname,
      password,
      users,
      handlAddUser
    };
  }
};
</script>
