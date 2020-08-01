<template>
    <main>
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-3"></div>
                <div class="col-sm-6">
                    <div class="a-section"></div>
                    <div class="a-spacing-top-medium"></div>
                    <h2 style="text-align:center">Update {{product.title}}</h2>
                    <form>
                        <!-- Category Dropdown -->
                        <div class="a-spacing-top-medium">
                            <label>Category</label>
                            <select class="a-select-option" v-model="categoryID">
                                <option v-for="category in categories" 
                                    :value="category._id" 
                                    :key="category._id">
                                    {{category.type}}
                                </option>
                            </select>
                        </div>

                        <!-- Owner Dropdown -->
                        <div class="a-spacing-top-medium">
                            <label>Owner</label>
                            <select class="a-select-option" v-model="ownerID">    
                                <option v-for="owner in owners" 
                                    :value="owner._id" 
                                    :key="owner._id">
                                    {{owner.name}}
                                </option>
                            </select>
                        </div>

                        <!-- Title Input -->
                        <div class="a-spacing-top-medium">
                            <label style="margin-bottom:0-px;">Title</label>
                            <input type="text" v-model="title" class="a-input-text" 
                            style="width:100%;" :placeholder="product.title">
                        </div>

                        <!-- Price Input -->
                        <div class="a-spacing-top-medium">
                            <label style="margin-bottom:0-px;">Price</label>
                            <input type="number" class="a-input-text" style="width:100%;" 
                            v-model="price" :placeholder="product.price">
                        </div>

                        <!-- Stock Quantity input -->
                        <div class="a-spacing-top-medium">
                            <label style="margin-bottom:0-px;">Stock Quantity</label>
                            <input type="number" class="a-input-text" style="width:100%;" 
                            v-model="stockQuantity" :placeholder="product.stockQuantity">
                        </div>

                        <!-- Description of product -->
                        <div class="a-spacing-top-medium">
                            <label style="margin-bottom:0-px;">Description</label>
                            <textarea :placeholder="product.description" 
                            style="width:100%;" v-model="description"></textarea>
                        </div>

                        <!-- Photo upload Section -->
                        <div class="a-spacing-top-medium">
                            <label style="margin-bottom:0-px;">Add a Photo</label>
                            <div class="a-row a-spacing-top-medium">
                                <label class="choosefile-button">
                                    <i class="fal fa-plus"></i>
                                    <input type="file" @change="onFileSelect">
                                    <p style="margin-top:-70px;">{{fileName}}</p>
                                </label>
                            </div>
                        </div>

                        <!-- Submit Button -->
                        <hr>
                        <div class="a-spacing-top-large">
                            <span class="a-button-register">
                                <span class="a-button-inner">
                                    <span class="a-button-text" @click="onUpdateProduct">Update Product</span>
                                </span>
                            </span>
                        </div>
                    </form>
                </div>
                <div class="col-sm-3"></div>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    async asyncData({$axios,params}){
        try{
            let categories=$axios.$get("http://localhost:3000/api/categories");
            let owners=$axios.$get("http://localhost:3000/api/owners");
            let product=$axios.$get(`http://localhost:3000/api/product/${params.id}`);

            const [catResponse,ownerResponse,productResponse]= await Promise.all([
                categories,
                owners,
                product
            ]);
            return {
                categories:catResponse.message,
                owners:ownerResponse.message,
                product:productResponse.Product
            } ;
        } catch(err){
            console.log(err);
        }
    },
    data(){
        return{
            categoryID:null,
            ownerID:null,
            title:"",
            price:"",
            stockQuantity:"",
            description:"",
            selectedFile:null,
            fileName:""
        };
    },
    methods:{
        onFileSelect(event){
            this.selectedFile=event.target.files[0],
            this.fileName=event.target.files[0].name
        },

        async onUpdateProduct(){
            try{
                let data=new FormData();
                data.append("categoryID",this.categoryID);
                data.append("ownerID",this.ownerID);
                data.append("title",this.title);
                data.append("price",this.price);
                data.append("stockQuantity",this.stockQuantity);
                data.append("description",this.description);
                data.append("photo",this.selectedFile,this.selectedFile.name);

                let result=await this.$axios.$put(
                    `http://localhost:3000/api/product/${this.$route.params.id}`,
                    data);
                //The below line redirects to the desired page.
                this.$router.push("/");
            } catch(err){
                console.log(err);
            }
        }
    }
};
</script>