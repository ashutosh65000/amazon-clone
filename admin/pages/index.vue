<template>
  <main>
    <div class="a-spacing-large"></div>
    <div class="container-fluid browsing-history">
      <div class="row">
        <div class="col-sm-8 col-8">
          <h1 class="a-size-large a-spacing-none a-text-normal">All products</h1>
          <div class="a-spacing-large"></div>
          <!-- Buttons -->
          <!-- nuxt-link tag makes single page responsive websites -->
          <nuxt-link to="/products" class="a-button-buy-again">Add a new product</nuxt-link>
          <nuxt-link to="/category" class="a-button-history margin-right-10">Add a new category</nuxt-link>
          <nuxt-link to="/owner" class="a-button-history margin-right-10">Add a new owner</nuxt-link>
        </div>
      </div>
    </div>
    <!-- Listing of all previous added products -->
    <div class="a-spacing-large"></div>
    <div class="container-fluid browsing-history">
      <div class="row">
        <div 
          v-for="(product,index) in products" 
          :key="product._id"
          class="col-xl-2 col-lg-3 col-md-3 col-sm-6 col-6 br bb"
        >
          <div class="history-box">
            <!-- Product image -->
            <a href="#" class="a-link-normal">
              <img :src="product.photo" class="img-fluid">
            </a>
            <!-- Product title -->
            <div class="a-spacing-top-base asin-title">
              <span class="a-text-normal">
                <div class="p13n-sc-truncated"> {{product.title}}</div>
              </span>
            </div>
            <!-- Product rating -->
            <div class="a-row">
              <a href="#">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
              </a>
              <span class="a-letter-space"></span>
              <span class="a-color-tertiary a-size-small asin-reviews">(1732)</span>
            </div>
            <!-- Product price -->
            <div class="a-row">
              <span class="a-size-base a-color-price">
                <span class="p13n-sc-price">&#8377;{{product.price}}</span>
              </span>
            </div>
            <!-- Product buttons -->
            <div class="row">
              <nuxt-link :to="`/products/${product._id}`" class="a-button-history margin-right-10">Update</nuxt-link>
              <a href="#" class="a-button-history margin-right-10" @click="onDeleteProduct(product._id,index)">Delete</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  //asynData fetches data before nuxt page finishes loading on the browser of client.
  //It is good for SEO as data gets loaded first fot google to crawling and scrapping.
  async asyncData({$axios}){
    try{
      let response=await $axios.$get("http://localhost:3000/api/products");
      console.log(response);
      return{
        products:response.Products
      };
    } catch(err){
      console.log(err);
    }
  },
  methods:{
    async onDeleteProduct(id,index){
      console.log(index);
      console.log(id);
      try {
        let response=await this.$axios.$delete(`http://localhost:3000/api/product/${id}`);
        if(response.status){
          this.products.splice(index,1)
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>
