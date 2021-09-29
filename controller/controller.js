'use strict'
const models = require('../models')


const create = async(req, res) =>{

    try{

        //take request
        const product_name = req.body.product_name
        const qty_per_unit = req.body.qty_per_unit
        const unit_price = req.body.unit_price
        const unit_in_stock = req.body.unit_in_stock
        const discontinued = req.body.discontinued
        const category_name = req.body.category_name

        const findCategory = await models.category.findOne({
            where:{
                category_name: category_name
            }
        })

        let category_id

        if(!findCategory){

            const createCategory = await models.category.create({
                category_name: category_name
            })

            category_id = createCategory.id
        }else{
            category_id = findCategory.id
        }

        //create product
        const product = await models.product.create({
            product_name: product_name,
            qty_per_unit: qty_per_unit,
            unit_price: unit_price,
            unit_in_stock: unit_in_stock,
            discontinued: discontinued,
            category_id: category_id
        })

        //send response
        res.send({
            message:'product added successfully',
            product: {
                id: product.id,
                product_name: product.product_name,
                qty_per_unit: product.qty_per_unit,
                unit_price: product.unit_price,
                unit_in_stock: product.unit_in_stock,
                discontinued: product.discontinued,
                category_id: product.category_id
            },
            category: category_name
        })
    
        } catch(err){
                console.log(err);
            }
    
}


const read = async(req, res) =>{

    try{
        //take request
        const product_name = req.body.product_name

        //find product
        const product = await models.product.findOne({
            where:{
                product_name: product_name
            },
            include:{
                model:models.category,
            
            }
        })

        //send response
        res.send({
            product:{
                id: product.id,
                product_name: product.product_name,
                qty_per_unit: product.qty_per_unit,
                unit_price: product.unit_price,
                unit_in_stock: product.unit_in_stock,
                discontinued: product.discontinued,
                category_name: product.category.category_name
            }
        })
    } catch(err){
        console.log(err);
    }
    
}


const readAll = async(req, res) =>{

try{
    //find all products and count them
    const products = await models.product.findAndCountAll({
        
        include:{
            model: models.category
        }
    })

    let AllProducts = []

    //to separate each product
    for(let i=0; i< products.rows.length; i++){

        AllProducts.push({
            id: products.rows[i].id,
            product_name: products.rows[i].product_name,
            qty_per_unit: products.rows[i].qty_per_unit,
            unit_price: products.rows[i].unit_price,
            unit_in_stock: products.rows[i].unit_in_stock,
            discontinued: products.rows[i].discontinued,
            category_name: products.rows[i].category.category_name
        })
    }

    //send response
    res.send({
        total_products: products.count,
        AllProducts
    })
}catch(err){
    console.log(err);
}
}


const update = async(req, res) =>{
    
    try{
        //take request
        const product_id = req.params.id
        const product_name = req.body.product_name
        const qty_per_unit = req.body.qty_per_unit
        const unit_price = req.body.unit_price
        const unit_in_stock = req.body.unit_in_stock
        const discontinued = req.body.discontinued

        //update product
        const productUpdate = await models.product.update({
            product_name: product_name,
            qty_per_unit: qty_per_unit,
            unit_price: unit_price,
            unit_in_stock: unit_in_stock,
            discontinued: discontinued 
        }, {
            where:{
                id: product_id
            }
        })

        //check product is updated or not
        if(productUpdate[0]){
            res.send({
                message:'product updated successfully'
            })
        }else{
            res.send({
                message:'product is not available'
            })
        }
        


    } catch(err){
        console.log(err);
    }
}


const deleteProduct = async(req, res) =>{

    try{
        //take product id to be deleted
        const product_id = req.params.id

        //delete product
        const deleteProduct = await models.product.destroy({
            where:{
                id: product_id
            }
        })

        
        if(deleteProduct){
            res.send({
                message:'product deleted successfully'
            })
        }else{
            res.send({
                message:'product is not available'
            })
        }
        
    }catch(err){
        console.log(err);
    }
}


module.exports = {create, read, readAll, update, deleteProduct}