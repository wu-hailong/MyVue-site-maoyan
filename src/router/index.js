import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from 'pages/index/Index'
import Cinema from 'pages/index/Cinema'
import Mine from 'pages/index/Mine'
import Movies from 'pages/index/movies/Movies'
import Comingsoon from 'pages/index/movies/comingsoon/Comingsoon'
import Intheater from 'pages/index/movies/Intheater'
import Detail from "pages/details/Detail"
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
         component : Movies,
         redirect : '/index/movies/intheater',
         children:[
           {
             path : 'intheater',
             name : 'intheater', 
             component : Intheater
           },
           {
             path : 'comingsoon',
             name : 'comingsoon',
             component : Comingsoon
           }
         ]
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
   },
   {
     path:"/detail/:id",
     name:"detail",
     component:Detail
   }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
