import React from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi", "Mumbai", "Pune", "Baramati", "Pimpri"],
  },
  {
    filterType: "Industry",
    array: [
      "Frontend Devloper",
      "Backend Devlopers",
      "Fullstack Developers",
      "Software Engineer",
      "Cloud Engineers",
    ],
  },
  {
    filterType: "Salary",
    array: [
      "0 to 40k",
      "40 to 1lakh",
      "1 to 5 lakh",
      "5 to 10 lakh",
      "10 - 15 lakh",
    ],
  },
];

const FilterCard = () => {
  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3" />
      <RadioGroup>
        {filterData.map((data, index) => (
          <div key={index}>
            <h1 className="font-bold text-lg">{data.filterType}</h1>
            {data.array.map((item, index) => {
              return (
                <div className="flex items-center space-x-2 my-2">
                  <RadioGroupItem value={item} key={index}/>
                  <Label>{item}</Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
