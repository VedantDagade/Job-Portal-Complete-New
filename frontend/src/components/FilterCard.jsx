import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/redux/jobSlice";

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
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchQuery(selectedValue));
  }, [selectedValue,dispatch]);

  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3" />
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((data, index) => (
          <div key={data.filterType}>
            <h1 className="font-bold text-lg mt-4">{data.filterType}</h1>
            {data.array.map((item, idx) => {
              const itemId = `r${index}-${idx}`;
              return (
                <div className="flex items-center space-x-2 my-2" key={itemId}>
                  <RadioGroupItem value={item} id={itemId} />
                  <Label htmlFor={itemId}>{item}</Label>
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
