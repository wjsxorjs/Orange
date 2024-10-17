import React, { useState, useEffect } from "react";
import { Fab } from "@mui/material";
import { KeyboardArrowUp } from "@mui/icons-material";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (document.body.scrollTop > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    if (document.body.scrollTop > 0) {
      document.body.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };
  
  useEffect(() => {
    const handleScroll = () => toggleVisibility();
    window.addEventListener("scroll", handleScroll);
    document.body.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <Fab
          onClick={scrollToTop}
          sx={{ position: "fixed", bottom: 40, right: 40, zIndex: 9999, width: 40, height: 40,
            bgcolor: "#FF9800",
            '&:hover': {
              bgcolor: "#FF8000",
            },
          }}>
          <KeyboardArrowUp />
        </Fab>
      )}
    </>
  );
}
