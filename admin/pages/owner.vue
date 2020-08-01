<template>
    <main>
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-3"></div>
                <div class="col-sm-6">
                    <div class="a-section"></div>
                    <div class="a-spacing-top-medium"></div>
                    <h2 style="text-align:center">Add a new Owner</h2>
                    <form>
                        <!-- Name Input -->
                        <div class="a-spacing-top-medium">
                            <label style="margin-bottom:0-px;">Name</label>
                            <input type="text" v-model="name" class="a-input-text" style="width:100%;">
                        </div>

                        <!-- About Input -->
                        <div class="a-spacing-top-medium">
                            <label style="margin-bottom:0-px;">About</label>
                            <input type="text" v-model="about" class="a-input-text" style="width:100%;">
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
                                    <span class="a-button-text" @click="onAddOwner">Add Owner</span>
                                </span>
                            </span>
                        </div>
                    </form>
                    <br>
                    <ul class="list-group">
                        <li v-for="owner in owners" :key="owner._id">{{owner.name}}</li>
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
            let response=await $axios.$get("http://localhost:3000/api/owners");
            return {
                owners: response.message
            };
        } catch(err){
            console.log(err);
        }
    },
    data(){
        return{
            name:"",
            about:"",
            selectedFile:null,
            fileName:"",
        };
    },
    methods:{
        onFileSelect(event){
            this.selectedFile=event.target.files[0],
            this.fileName=event.target.files[0].name
        },
        async onAddOwner(){
            try{
                let data=new FormData();
                data.append("name",this.name);
                data.append("about",this.about);
                data.append("photo",this.selectedFile,this.selectedFile.name);
                let response=await this.$axios.$post("http://localhost:3000/api/owners",data);
                //The  below line updates the owners list shown on the page.
                this.owners.push({name:this.name}); 
            } catch(err){
                console.log(err);
            }
        }
    }
};
</script>