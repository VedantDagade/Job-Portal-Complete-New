import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const CategoryCarousel = ({ jobs }) => {
  const navigate = useNavigate();

  // Get unique job titles
  const uniqueCategories = [...new Set(jobs.map((job) => job.title))];

  // Find first job ID of the clicked category
  const handleClick = (category) => {
    const job = jobs.find((job) => job.title === category);
    if (job) navigate(`/jobs/${job._id}`);
  };

  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent>
          {uniqueCategories.map((cat, index) => (
            <CarouselItem
              className="sm:basis-1 md:basis-1/2 lg:basis-1/3"
              key={index}
            >
              <Button
                variant="outline"
                className="rounded-full"
                onClick={() => handleClick(cat)}
              >
                {cat}
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
