import React, { useEffect, useRef, useCallback } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

import { useLocation } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useScrollToTop = (options = {}) => {
  const { smooth = true, additionalSelectors = [], offset = 0 } = options;

  const { pathname } = useLocation();
  const lastPathname = useRef(pathname);
  const scrollTimeout = useRef(null);

  const resetScroll = useCallback(() => {
    // Clear any existing timeout
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    // Use timeout to ensure DOM is updated
    scrollTimeout.current = setTimeout(() => {
      // Primary window scroll
      window.scrollTo({
        top: 0 + offset,
        left: 0,
        behavior: smooth ? "smooth" : "auto",
      });

      // Reset specific elements
      const elementsToReset = [
        document.querySelector("#main-content"),
        ...additionalSelectors.map((selector) =>
          document.querySelector(selector)
        ),
      ].filter(Boolean); // Remove null elements

      elementsToReset.forEach((el) => {
        if (el) {
          el.scrollTop = 0;
        }
      });

      // Optional: Improve accessibility
      const mainContent = document.querySelector("main, #main-content");
      if (mainContent) {
        mainContent.focus();
      }
    }, 100); // Small delay to ensure route transition is complete
  }, [smooth, offset, additionalSelectors]);

  useEffect(() => {
    // Check if the pathname has actually changed
    if (pathname !== lastPathname.current) {
      resetScroll();
      lastPathname.current = pathname;
    }

    // Cleanup timeout on unmount
    return () => {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [pathname, resetScroll]);
};

const AppLayout = () => {
  useScrollToTop();
  return (
    <div className="overflow-x-hidden min-h-screen flex flex-col scroll-smooth">
          <Navbar />
      <Outlet />

      <Footer />
      <ToastContainer />
    </div>
  );
};

export default AppLayout;
