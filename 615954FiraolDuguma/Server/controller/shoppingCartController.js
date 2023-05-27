let ShoppingCart=require('../models/shoppingCart');
let Product=require('../models/product')

let controller={
    addProduct:function(req,res,next){
        let header = req.header.authorization
        let arr=Product.getAll().filter(prod=>parseInt(prod.id)==req.body.prodId);
        let prod=arr[0];

        let product=new Product(prod.id,prod.name,prod.price,prod.quantity,prod.imageUrl,prod.cartUrl);
        let shoppingCart=new ShoppingCart();
        if(prod.quantity>0){
            shoppingCart.addProducts(product);
            // res.status(200).json({ message: 'Product added to cart' });
            let arr=shoppingCart.getProducts();
            res.status(201).json(arr);
        }
        else{
            res.status(404).json({ error: 'Product not found or out of stock' });
        }
    },

    updateProduct:function(req,res,next){
       
        const idQtyCollector = req.body;
        console.log(idQtyCollector);
        for (let i=0;i<idQtyCollector.length;i++){
            Product.getAll().forEach(prod=>{
                if(parseInt(prod.id)==parseInt(req.body[i][0])){
                    new Product(prod.id,prod.name,prod.price,prod.quantity-req.body[i][1],prod.imageUrl,prod.cartUrl).edit();
                }
                // else {
                //     console.error(`Product with ID ${req.body[i][0]} not found.`);
                // }
            })
    
        }
        res.status(200).json(Product.getAll())
        
        
        
    }
}

module.exports=controller;

