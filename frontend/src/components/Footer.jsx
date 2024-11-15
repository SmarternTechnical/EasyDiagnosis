import React from 'react';  

const Footer = () => {  
  return (  
    <footer className="bg-[#1fab89] text-white py-8 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-8">  
      <div className="container mx-auto flex flex-col md:flex-row justify-between  gap-4">  
        <div className="mb-4 md:mb-0   w-[15%]">  
          <h3 className="text-lg font-bold">LOGO</h3>  
          <p className="text-sm">Everyone deserves a better way of Living.</p>  
        </div>  
        <div className=" grid grid-cols-2 md:grid-cols-4 gap-4 w-full">  
          <div>  
            <h4 className="text-base font-bold mb-2">Quick Links</h4>  
            <ul className="text-sm space-y-2">  
              <li><a href="#">Easy Diagnosis Gold/Plus</a></li>  
              <li><a href="#">Buy Medicine</a></li>  
              <li><a href="#">Video Consultation</a></li>  
              <li><a href="#">In-clinic Consultation</a></li>       
            </ul>  
          </div>  
          <div>  
            <h4 className="text-base font-bold mb-2">Company</h4>  
            <ul className="text-sm space-y-2">  
              <li><a href="#">About Us</a></li>  
              <li><a href="#">Terms & Conditions</a></li>  
              <li><a href="#">FAQ</a></li>  
              <li><a href="#">Refund Policy</a></li>  
            </ul>  
          </div>  
          <div>  
            <h4 className="text-base font-bold mb-2">Support</h4>  
            <ul className="text-sm space-y-2">  
              <li><a href="#">Help Center</a></li>  
              <li><a href="#">Customer Care</a></li>  
              <li><a href="#">My Account</a></li>  
            </ul>  
          </div>  
          <div>  
            <h4 className="text-base font-bold mb-2">Reach Us</h4>  
            <ul className="text-sm space-y-2">  
              <li><a href="tel:+91 7489237400">Contact Us (+91 7489237400)</a></li>  
              <li><a href="mailto:mail@easydiagnosis.com">Mail Us mail@easydiagnosis.com</a></li>  
            </ul>  
          </div>  
        </div>  
      </div>  
      <hr className=' mt-10 h-1'/>
      <div className="container mx-auto mt-8 text-center text-sm">  
        <p>&copy; 2024 Easy Diagnosis. All rights reserved.</p>  
      </div>  
    </footer>  
  );  
};  

export default Footer;