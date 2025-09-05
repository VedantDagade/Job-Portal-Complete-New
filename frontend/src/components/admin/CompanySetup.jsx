import React from 'react'
import Navbar from '../shared/Navbar';
import { useSelector } from 'react-redux';


const CompanySetup = () => {

  const singleCompany = useSelector((state) => state.company.singleCompany);


  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto my-10">
        <h1>{singleCompany?.name || "No Company Selected"}</h1>
      </div>
    </div>
  );
}

export default CompanySetup;