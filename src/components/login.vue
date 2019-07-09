<template>
	<body>
	<div class="padding-all">
		<div class="header">
			<h1>Master  Login Form</h1>
		</div>

		<div class="design-w3l">
			<div class="mail-form-agile">
				<form v-on:submit.prevent="login()">
					<input type="text" name="name" v-model="user.email" placeholder="User Name  or  email..." required=""/>
					<input type="password"  name="password" v-model="user.pwd"  class="padding" placeholder="Password" required=""/>
					<input type="submit" value="login" >
				</form>
			</div>
		  <div class="clear"> </div>
		</div>
		
		<div class="footer">
		<p>© 2019  jean de Dieu. All Rights Reserved | Design by: Me</p>
		</div>
	</div>
</body>
</template>
<script>
	require("../../css/style.css")

	export default{
		data(){
			return{
			user:{
				email:"",
				pwd:"",
			}

			}
		},
		mounted(){
			console.log(this.$store.getters.isLoggedIn)
		},
		methods:{

			login(){						
		        this.$store.dispatch('login', this.user)
		        .then(e=>{
		        	this.$router.push("/protected")
		        })
		        .catch(e=>{
		        	console.log(e)
		        })

      			}     
    
			},
		};
	
</script>
<style scoped>
	
</style>