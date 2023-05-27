let Product=require('./product');
class ShoppingCart{
    constructor(){
        // this.user=user;
        this.products=[];
        this.totalPrice=0;
    }
    addProducts(product){
        //if find
        this.products.push(product);
        let prod=Product.getAll().find(p=>p.id==product.id);
        // prod.quantity--;//adding to cart will reduce stock quntity
        // this.totalPrice+=product.price;
        return product;
    }
    removeProduct(product){
        this.products=this.products.filter(p=>p!==product);
        let prod=Product.getAll().find(p=>p.id===product.id);
        prod.quantity++;//removing from cart will increase stock quntity
        this.totalPrice-=product.price;
    }
    getProducts(){
        return this.products;
    }
    getTotalPrice(){
        return this.totalPrice;
    }
    
}

module.exports=ShoppingCart;