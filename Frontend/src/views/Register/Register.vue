<template>
  <div>
    <div class="container sm:px-10">
      <div class="block xl:grid grid-cols-2 gap-4">
        <!-- BEGIN: Register Info -->
        <div class="hidden xl:flex flex-col min-h-screen">
          <a href="" class="-intro-x flex items-center pt-5">
            <img
              alt="Midone Tailwind HTML Admin Template"
              class="w-6"
              src="@/assets/images/logo.svg"
            />
            <span class="text-white text-lg ml-3"> Todos </span>
          </a>
          <div class="my-auto">
            <img
              alt="Midone Tailwind HTML Admin Template"
              class="-intro-x w-1/2 -mt-16"
              src="@/assets/images/illustration.svg"
            />
            <div
              class="-intro-x text-white font-medium text-4xl leading-tight mt-10"
            >
              A few more clicks to <br />
              sign up to your account.
            </div>
            <div
              class="-intro-x mt-5 text-lg text-white text-opacity-70 dark:text-slate-400"
            >
              Manage all your e-commerce accounts in one place
            </div>
          </div>
        </div>
        <!-- END: Register Info -->
        <!-- BEGIN: Register Form -->
        <div class="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
          <div
            class="my-auto mx-auto xl:ml-20 bg-white dark:bg-darkmode-600 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto"
          >
            <h2
              class="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left text-blue-700"
            >
              Sign Up
            </h2>
            <div
              class="intro-x mt-2 text-slate-400 dark:text-slate-400 xl:hidden text-center"
            >
              A few more clicks to sign in to your account. Manage all your
              e-commerce accounts in one place
            </div>
            <div class="intro-x mt-8">
              <input
                type="text"
                class="intro-x login__input form-control py-3 px-4 block"
                v-model="fullname"
                required
                placeholder="FullName"
              />

              <input
                type="text"
                class="intro-x login__input form-control py-3 px-4 block mt-4"
                v-model="username"
                required
                placeholder="Username"
              />
              <input
                type="password"
                class="intro-x login__input form-control py-3 px-4 block mt-4"
                v-model="password"
                required
                placeholder="Password"
              />
            </div>

            <div class="intro-x mt-5 xl:mt-8 text-center xl:text-left">
              <button
                class="btn btn-primary py-3 px-4 w-full xl:w-32 xl:mr-3 align-top"
                @click="handlRegister()"
              >
                Register
              </button>
              <button
                class="btn btn-outline-secondary py-3 px-4 w-full xl:w-32 mt-3 xl:mt-0 align-top"
                @click="router.push('/login')"
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
        <!-- END: Register Form -->
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import {ref} from 'vue';
import { requestRegister } from '../../services/authService';
import dom from '@left4code/tw-starter/dist/js/dom';
export default {
  name: 'Register',
  setup() {
    const router = useRouter();
    const fullname = ref('');
    const username = ref('');
    const password = ref('');
    const handlRegister = async () => {
      try {
        const registerForm = {
          fullname: fullname.value,
          username: username.value,
          password: password.value
        };
        console.log(registerForm)
        const res = await requestRegister(registerForm);
        console.log('res', res.data);
      } catch (error) {
        console.log(error);
      }
      router.push('/login');
    }
    onMounted(() => {
      dom('body')
        .removeClass('main')
        .removeClass('error-page')
        .addClass('login');
    });
    return {
      router,
      fullname,
      username,
      password,
      handlRegister
    };
  }
};
</script>
