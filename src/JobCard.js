import React, { useState } from "react";

const Card = ({ job }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="container max-auto shadow border border-blue-100 rounded-lg bg-slate-50 hover:bg-blue-50 px-3 py-2">
      <div className="flex">
        <img
          src={job.logoUrl}
          alt={`${job.companyName} Logo`}
          className="w-10 rounded-full"
        />
        <p className="mx-4 text-[19px] font-semibold text-red-900">
          {job.companyName}
        </p>
      </div>
      <div className="flex">
        <h2 className="xl:mx-14 text-[18px] font-semibold">
          {job.jobRole.charAt(0).toUpperCase() + job.jobRole.slice(1)}
        </h2>
        <h2 className="font-semibold mx-14">
          {job.location
            ? job.location.charAt(0).toUpperCase() + job.location.slice(1)
            : "Not specified"}
        </h2>
      </div>
      <div className="my-3">
        <h2 className="font-semibold text-gray-900 text-[15px] ">
          Experience Required: {job.minExp} - {job.maxExp} years
        </h2>

        <div className="text-gray-900">
          <h2 className="font-semibold">
            Max Salary: {job.maxJdSalary || "Not specified"} LPA
          </h2>
          <h2 className="font-semibold">
            Min Salary: {job.minJdSalary || "Not specified"} LPA
          </h2>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-gray-800 text-[14px opacity-70 font-medium">
          {expanded
            ? job.jobDetailsFromCompany
            : `${job.jobDetailsFromCompany.slice(0, 150)}...`}{" "}
          <button
            onClick={toggleExpand}
            className="text-blue-500 text-[14px] hover:text-blue-700"
          >
            {expanded ? "Show Less" : "Show More"}
          </button>
        </p>
      </div>

      <div className="bg-blue-500 hover:bg-blue-600 px-4 py-3 rounded-md text-[17px] md:text-[18px] xl:text-[18px] text-white font-semibold text-center w-90 my-4">
        <a href={job.jdLink} className="job-card__apply-link">
          Easy Apply
        </a>
      </div>
    </div>
  );
};

export default Card;
