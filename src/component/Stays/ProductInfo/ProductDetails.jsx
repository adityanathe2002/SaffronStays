import { Box } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductDetailSection1 from "./ProductDetailSection1";
import ProductDetailSection2 from "./ProductDetailSection2";
import ProductDetailSection3 from "./ProductDetailSection3";
import ProductDetailSection4 from "./ProductDetailSection4";
import ProductDetailSection5 from "./ProductDetailSection5";

const ProductDetails = () => {


    return (
        <Box sx={{ width: "100%", height: "auto", padding: { xs: "1rem", lg: "2rem" }, backgroundColor: "#F8F8F8" }}>

            {/* Section 1*/}
            <ProductDetailSection1/>
            
            {/* section 2 */}
           <ProductDetailSection2/>

            {/* section 3 dining options */}
            <ProductDetailSection3/>

            {/* section 4 reviews*/}
            <ProductDetailSection4/>
            

            {/* Related camp */}
            <ProductDetailSection5/>
           
        </Box>
    );
};

export default ProductDetails;