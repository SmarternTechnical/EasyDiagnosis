import React,{ useEffect} from 'react';
import DiscountCarousel from './DiscountCarousel';
import ShopByCategory from './ShopByCategory';
import BrowseByHealth from './BrowseByHealth';
import ProductCarousel from './PopularProductCarousel';


const BuyMedLanding = () => {
  
  return (
    <div className="bg-[#F3F3F3] flex flex-col items-center p-12 pl-32 text-center">
      <div className=" font-inter text-[35px] font-bold tracking[-0.03em] text-left text-[#19456B] w-full mb-10">
        All Offers
      </div>
      <DiscountCarousel />
      <div className=" font-inter text-[35px] font-bold tracking[-0.03em] text-left text-[#19456B] w-full mt-10 ">
        Shop by Category
      </div>
      <ShopByCategory
          service="medical_services"
          category="Pharma Support"
        />
      <div className=" font-inter text-[35px] font-bold tracking[-0.03em] text-left text-[#19456B] w-full mt-10 mb-10">
        Browse by Health Condition
      </div>
      <BrowseByHealth />
      <div className=" font-inter text-[35px] font-bold tracking[-0.03em] text-left text-[#19456B] w-full mt-10 mb-10">
        Popular Products
      </div>
      <ProductCarousel />
      
    </div>
  );
};

export default BuyMedLanding;
