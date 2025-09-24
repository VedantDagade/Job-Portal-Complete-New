import React, { useMemo } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/redux/jobSlice";

const CategoryCarousel = ({ jobs }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const searchJobHandler = (query) => {
    dispatch(setSearchQuery(query));
    navigate("/browse");
  };

  // Memoize unique categories to avoid recalculating on every render
  const uniqueCategories = useMemo(
    () => [...new Set(jobs.map((job) => job.title))],
    [jobs]
  );

 

  return (
    <div className="my-20">
      <Carousel className="w-full max-w-xl mx-auto">
        <CarouselContent>
          {uniqueCategories.map((category) => (
            <CarouselItem
              className="sm:basis-1 md:basis-1/2 lg:basis-1/3"
              key={category} // Use category as key instead of index
            >
              <Button
                variant="outline"
                className="rounded-full"
                onClick={()=>searchJobHandler(category)}
              >
                {category}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
