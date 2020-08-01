<template>
    <main>
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-3"></div>
                <div class="col-sm-6">
                    <div class="a-section"></div>
                    <div class="a-spacing-top-medium"></div>
                    <h2 style="text-align:center">Add a new Category</h2>
                    <form>
                        <!-- Category Input -->
                        <div class="a-spacing-top-medium">
                            <label style="margin-bottom:0-px;">Type</label>
                            <input type="text" v-model="type" class="a-input-text" style="width:100%;">
                        </div>

                        <!-- Submit Button -->
                        <hr>
                        <div class="a-spacing-top-large">
                            <span class="a-button-register">
                                <span class="a-button-inner">
                                    <span class="a-button-text" @click="onAddCategory">Add Category</span>
                                </span>
                            </span>
                        </div>
                    </form>
                    <br>
                    <ul class="list-group">
                        <li v-for="category in categories" :key="category._id">{{category.type}}</li>
                    </ul>
                </div>
                <div class="col-sm-3"></div>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    async asyncData({$axios}){
        try{
            let response=await $axios.$get("http://localhost:3000/api/categories");
            return {
                categories: response.message
            };
        } catch(err){
            console.log(err);
        }
    },
    data(){
        return{
            type:""
        };
    },
    methods:{
        async onAddCategory(){
            try{
                let data={type:this.type}
                let response=await this.$axios.$post("http://localhost:3000/api/categories",data);
                //The  below line updates the categories list shown on the page.
                this.categories.push(data); 
            } catch(err){
                console.log(err);
            }
        }
    }
};
</script>