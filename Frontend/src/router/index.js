import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login/Login.vue"
import Register from "../views/Register/Register.vue"
import Listtodo from "../views/ToDos/Listtodo.vue"
import Addtodo from "../views/ToDos/Addtodo.vue"
import Updatetodo from '../views/ToDos/Updatetodo.vue'
import Listuser from '../views/User/Listuser.vue'
import Adduser from '../views/User/Adduser.vue'
import Updateuser from '../views/User/Updateuser.vue'

const routes = [
  {
    path: "/",
    component: Register,
   
  },
  {
    path: "/login",
    component: Login,
   
  },
  {
    path: "/todolist",
    component: Listtodo, 
  },
  {
    path: "/addtodo",
    component: Addtodo,
  },
  {
    path: "/edit/:id",
    component: Updatetodo,
  },
  {
    path: "/listuser",
    component: Listuser,
  },
  {
    path: "/adduser",
    component: Adduser,
  },
  {
    path: "/edituser/:id",
    component: Updateuser,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 };
  },
});

export default router;
