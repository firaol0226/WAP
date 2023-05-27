let path=require('path');
let products=[{id:'1',name:'banana',price:'50',quantity:'5',imageUrl:'banana.jpg',cartUrl:'cart.jpg'},
            {id:'2',name:'orange',price:'60',quantity:'4',imageUrl:'orange.jpg',cartUrl:'cart.jpg'},
            {id:'3',name:'mango',price:'10',quantity:'4',imageUrl:'mango.jpg',cartUrl:'cart.jpg'}];
class Product{
    constructor(id,name,price,quantity,imageUrl,cartUrl){
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.imageUrl=imageUrl;
        this.cartUrl=cartUrl;
    }

    save(){
        products.push(this);
        return this;
    }
    edit(){
        let index=products.findIndex(product=>product.id===this.id);
        if (index !== -1) {
            products.splice(index, 1, this);
        }
        return this;
    }
    static getAll(){
        return products;
    }
    static getById(pId){
        return products.find(product => product.id === pId);
    }
    static deleteById(pId){
        let index=products.findIndex(product=>product.id===pId);
        let delProd=products[index];
        products.splice(index,1);
        return delProd;
        
    }
    
   

}

module.exports=Product;


