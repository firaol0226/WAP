let Product=require('../models/product')

let controller ={
    getById:function(req,res,next){
        console.log(req.params.id);
        let data =Product.getById(req.params.id);
        console.log(data);
        data!=undefined?res.status(200).json(data):res.status(404).json({message:'didnt find the product'});
    },
    getAll:function(req,res,next){
        // console.log(product.getAll());
        let arr= Product.getAll();
        res.status(201).json(arr);
    },
    save:function(req,res,next){
        let newProduct= new Product(req.body.id,req.body.name,req.body.price,req.body.quantity);
        newProduct.save();
        console.log(newProduct);
        res.json(newProduct);
    },
    edit:function(req,res,next){
        
        for(let prod of req.body){
            new Product(prod.id,prod.name,prod.price,prod.quantity).edit();
        }

        // let changeProduct= new Product(req.body.id,req.body.name,req.body.price,req.body.quantity);
        // changeProduct.save();
        // console.log(changeProduct);
        // res.json(changeProduct);
    },
    delete:function(req,res,next){
        let data=Product.deleteById(req.params.id);
        data!=undefined?res.status(200).json(data):res.status(404).json({message:`product with ${req.params.id} is not found`})
    }

}
module.exports=controller;