import productModel from '../../models/product.models.js'

class ProductManager {

    static getAllProducts = async() => {
        try{
            const getProducts = await productModel.find().lean().exec()
            return getProducts
        } catch (error) {
            return console.log(error)
        }
    }

    static addProduct = async( body ) => {
        try {
            const newProduct = await productModel.create(body)
            return newProduct
            
        } catch(error) {
            return console.log(error, 'product creation failed')
        }
        
    }

    static getProductById = async(pid) => {
        try {
            const productId = await productModel.findOne({_id: pid})
            return productId
        } catch (error) {
            return console.log(error, 'get product failed')
        }
    }

    static updateProduct = async (id, fieldUpdate) => {
        if (!fieldUpdate || !id) return console.log('empty field')
      
        try {
            const updateProduct = await productModel.updateOne({_id: id}, fieldUpdate)
            return updateProduct
        } catch (error) {
            console.log('product update failed')
            throw new Error('Error updating product')
        }
    }

    static deleteProduct = async (id) => {
        try {
            const deleteProduct = await productModel.deleteOne({_id: id})

            if ( deleteProduct.deletedCount === 0 ) {
                return 0 
            } else {
                return []
            }
        } catch (error) {
            console.log('Product delete failed')
            throw new Error('Error deleting product')
        }
    }
}

export default ProductManager