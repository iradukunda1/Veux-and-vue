<template>
	<section>
	    <button @click="logout()" style="float:right;background:black;color:white;font-size:16px; width:70px">logout</button>
	    <center>
	    	<div style="    
	    height: 213px;
	    box-shadow: grey 0px 0px 10px;
	    padding: 5%;
	    border-radius: 4%;
	    width: 30%;
	    margin: 5%;
	    cursor:pointer">
	    	<h1>Add Items</h1><br>
	    	<label for="name">Name:</label>
	    <input class="inputAdd" type="text" name="name" v-model="data.name" placeholder="Insert Name"><br>
	    	<label for="age">Age:</label>

		<input class="inputAdd" type="text" name="age" v-model="data.age" placeholder="Insert age"><br>
	    	<label for="color">Color:</label>

		<input class="inputAdd" type="text" name="color" v-model="data.status" placeholder="Enter color"><br><br>
		<button @click="insertData()" style="width:50%;background:lightblue; color:white;border-radius:20%;height:40px;cursor:pointer">Add</button>
	    </div>
	    
		
		
		
     <table class="tab">
		<tr class="trHead">
			<th>No.</th>
			<th>Name</th>
			<th>Age</th>
			<th>Color</th>
			<th v-if="upd">Option</th>
		</tr>
		<tr v-for="(item,index) in items" :key="index" class="trBody">
		   	<td>{{index}} </td>
		   	<td>{{item.name}}</td>
		   	<td>{{item.age}} </td>
		   	<td :style="{background:item.status}">{{item.status}}</td>
		   
		   	<td v-if="upd" style=" max-width: 50px; text-align:center">
		   		<span @click="(inputField =true),n=item._id,upd=false" style="text-decoration:underline;color:blue;cursor:pointer">Update</span>
		   		<span style="text-decoration:underline;color:red;cursor:pointer" @click="delData(item._id)">Delete</span>

		   	</td>
		   	<td v-if="inputField && item._id===n && upd===false" style="max-width:53px">
		   		<input type="text" name="" v-model="updatedName">
		   		<button @click="(update(item)),inputField=false,updatedName='',upd=true">change</button>
		   		<button @click="inputField=false,updatedName='',upd=true">cancel</button></td>
		    </td>
		</tr>
		 
		
	</table>
	    </center>


	</section>
	
</template>
<script type="text/javascript">
	import axios from "axios"
	import store from '../store.js'
	
	export default{
		name:"simple",
		data(){
		return{
			n:"",
			size:"",
			data:{
				name:"",
				age:"",
				status:""
			},
			items:[],
			inputField:false,
			updatedName:"",
			upd:true

			
		}
	},
	mounted(){
		this.readData();
	},
	updated(){
		this.readData();

	},
	 computed : {
      isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
    },
	methods:{
		readData(){
			axios
			.get('/get')
			.then(response => {
				// console.log(response.data)
				this.items = response.data
			})
			.catch(error =>{
				console.log(error)
			})
		},
		update(id){
			axios
			 .post('/update',{id:id,newName:this.updatedName})
			.then(response => {
				if (response.data==="updated") {
					alert("updated successfuly")
				}else{
					alert("not inserted")
				}
			})
			.catch(error =>{
				console.log('error' +error)
			})

		},

		delData(id){
			axios.post('/del',{id:id})
			.then(e=>{
				console.log(e.data)
				if(e.data==="deleted"){
				}else{
					alert("errrrr")
				}
			})
			.catch(err=>{
				console.log(err.response)
			})
		},
		insertData(){

			axios
			.post('/enter',this.data)
			.then(response => {

				if (response.data==="success") {
					alert("inserted successfuly")
				}else{
					alert("not inserted")
				}
			})
			.catch(error =>{
				console.log(error)
			})

		},
		logout(){
				this.$store.dispatch('logout')
				.then(e=>{
		        	this.$router.push("/login")
		        	console.log(this.$store.getters.isLoggedIn)
		        })
		        .catch(e=>{
		        	console.log(e)
		        })		    
			}
		
	}
	};
</script>
<style scoped>
	.inputAdd{
		width: 60%;
		height: 24px;
		padding: 1%;
		margin: 2%;
		font-size: 16px;
		border-top:0;
		border-right: 0;
		border-left: 0;


	}
	.inputAdd:focus{
		border-bottom: 1px blue solid;
		border-top:0;
		border-right: 0;
		border-left: 0;
	}
	.trHead{
		    height: 30px;
            background: lightgrey;
		cursor: pointer

	}
	.trBody{
		height: 20px;
        background: #ececec;

	}
	.trBody:hover{
		background: lightgrey;
		cursor: pointer
	}
	td,th{
		border: 1px black solid
	}

/*	.blue{
		background: blue;
	}
	.red{
		background: red;
	}
	.yellow{
		background: yellow;
	}*/
	.tab{
		width: 80%;
		height: auto;
	}
	section{
		background: white !important;
		position: absolute;
		width: 100%;
		height: 100%;
	}
</style>