// import { createRouter, createWebHistory } from 'vue-router';

// // Admin paths
// import Admins from '../views/Admins/Admins.vue';
// import Adminlogin from '../views/Admins/Adminlogin.vue';
// import NotFound from '../views/NotFound.vue';
// import EditHouse from "@/components/Admins-page/EditHouse.vue";

// function isAuthenticated() {
//   return localStorage.getItem('token') !== null;
// }

// const routes = [

//   {
//     path: '/',
//     name: 'adminlogin',
//     component: Adminlogin,
//   },

//   {
//     path: '/admins',
//     name: 'admins',
//     component: Admins,
//     meta: { requiresAuth: true }
//   },

//   {
//     path: "/edithouse/:id",
//     name: "EditHouse",
//     component: EditHouse,
//   },

//   {
//     path: '/:pathMatch(.*)*',
//     name: 'notfound',
//     component: NotFound
//   }
// ];

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes,
//   scrollBehavior(to, from, savedPosition) {
//     if (to.hash) {
//       return {
//         el: to.hash,
//         behavior: 'smooth',
//       };
//     }
//     return { left: 0, top: 0 }; 
//   },
// });

// // Navigation Guard
// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (!isAuthenticated()) {
//       next({
//         path: '/adminlogin',
//         query: { redirect: to.fullPath }
//       });
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// });

// export default router;


import { createRouter, createWebHistory } from 'vue-router';

// Admin paths
import Admins from '../views/Admins/Admins.vue';
import Adminlogin from '../views/Admins/Adminlogin.vue';
import NotFound from '../views/NotFound.vue';
import EditHouse from "@/components/Admins-page/EditHouse.vue";

function isAuthenticated() {
  return localStorage.getItem('token') !== null;
}

const routes = [
  {
    path: '/',
    name: 'login',
    component: Adminlogin,
    meta: { requiresAuth: false }  // Explicitly mark as not requiring auth
  },
  {
    path: '/admins',
    name: 'admins',
    component: Admins,
    meta: { requiresAuth: true }
  },
  {
    path: "/edithouse/:id",
    name: "EditHouse",
    component: EditHouse,
    meta: { requiresAuth: true }  // Add authentication requirement
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notfound',
    component: NotFound
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      };
    }
    return { left: 0, top: 0 }; 
  },
});

// Updated Navigation Guard
router.beforeEach((to, from, next) => {
  // Check if the route requires authentication
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated()) {
      next({
        path: '/',  // Redirect to login page
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    // If user is authenticated and trying to access login page, redirect to admin
    if (to.path === '/' && isAuthenticated()) {
      next('/admins');
    } else {
      next();
    }
  }
});

export default router;