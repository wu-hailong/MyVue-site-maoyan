import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from 'pages/index/Index'
import Cinema from 'pages/index/Cinema'
import Mine from 'pages/index/Mine'
import Movies from 'pages/index/movies/Movies'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/index/movies'
   },
   {
     path: '/index',
     name: 'index',
     component:Index,
     children:[
       {
         path : 'movies',
         name : 'movies',
         component : Movies
       },
       {
         path : 'cinema',
         name : 'cinema',
         component : Cinema
       },
       {
         path : 'mine',
         name : 'mine',
         component : Mine
       }
     ]
   }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
