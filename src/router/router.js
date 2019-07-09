import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import Protected from '../components/protected.vue'
import Login from '../components/login.vue'
import Home from '../components/home.vue'
import store from '../store.js'
import index from '../components/index.vue'
Vue.use(Router)

Vue.config.productionTip = false
const router= new Router({
	mode:"history",	
	routes:[
		{
		path:"/",
		name:"index",		
		component:index,
		},
		{
		path:"/protected",
		name:"protect",		
		component:Protected,
		meta:{
			requireLogin:true
		}
		},
		{
		path:"/login",
		name:"login",		
		component:Login,
		beforeEnter(to,from,next){
			if (store.getters.isLoggedIn) {
 		return next('/protected')
 	}else{
 		return next()
 	}

		}
		},
		{
		path:"/home",
		name:"home",		
		component:Home
		}
	]

});

router.beforeEach((to,from,next)=>{
 if(to.matched.some(record => record.meta.requireLogin)){
 	if (store.getters.isLoggedIn) {
 		return next()
 	}else{
 		return next("/login")
 	}
 }else{
 	return next()
 }
})
		


export default router
