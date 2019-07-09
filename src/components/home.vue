<template>
	<section>
	<table class="tab">
		<tr>
			<th>No.</th>
			<th>Name</th>
			<th>Age</th>
			<th>color</th>
			<th>delete</th>
			<th>update</th>
		</tr>
		<tr v-for="(item,index) in items" :key="index">
		   	<td>{{index}} </td>
		   	<td>{{item.name}}</td>
		   	<td>{{item.age}} </td>
		   	<td :style="{background:item.status}">{{item.status}}</td>
		   	<td style="text-decoration:underline;color:red;cursor:pointer" @click="delData(item._id)">
		   	delete</td>
		   	<td @click="(inputField =true),n=item._id" style="text-decoration:underline;color:blue;cursor:pointer">update</td>
		   	<td v-if="inputField && item._id===n"><input type="text" name="" v-model="updatedName"><button @click="(update(item)),inputField=false,updatedName=''">change</button></td>
		</tr>
		 
		
	</table><br><br>
		<label>Name:</label> <input type="text"  v-model="data.name"><br><br>

		<label>Age:</label><input type="text"  v-model="data.age"><br><br>
		<label>color:</label><input type="text"  v-model="data.status"><br><br>
		<button @click="insertData()">submit</button>
		
	</section>
	
</template>
<script>
	import axios from "axios"	
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
			updatedName:""

			
		}
	},
	mounted(){
		this.readData();
	},
	updated(){
		this.readData();

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

		}
		
	}
	};
</script>
<style scoped>
	tr,td{
		border: 1px solid black;
		text-color:blue;

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
		width: auto;
		padding: 100,255,60,90px ;
		border-color: red;
	}
</style>