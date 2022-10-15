const productsModel=require('../models/product');
const ITEMS_PER_PAGE=1;
exports.getProducts=(req,res,next)=>{
    // productsModel.findAll()
    // .then(result=>res.json(result))
    // .catch(err=>console.log(err));
    async function getProductsAsync(){
        // lerproductsModel.findAll();
        try{
            let currentPage=+req.query.page || 1;
            let products=await productsModel.findAll({offset:(currentPage-1)*ITEMS_PER_PAGE,limit:ITEMS_PER_PAGE});
            let totalNoProducts=await productsModel.count();
            res.json({
                products:products,
                totalProducts:totalNoProducts,
                hasPreviousPage:(currentPage>1),
                hasNextPage:(currentPage*ITEMS_PER_PAGE)<totalNoProducts,
                currentPage:currentPage,
                previousPage:currentPage-1,
                nextPage:currentPage+1,
                lastPage:Math.ceil(totalNoProducts/ITEMS_PER_PAGE)
            });

        }
        catch(err){
            console.log(err);
        }
    }
    getProductsAsync();
}