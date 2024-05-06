import React, { useState, useEffect } from "react";
import Card from "./JobCard";

const YourComponent = ({ jobObjects }) => {
  const [locationOptions, setLocationOptions] = useState([]);
  const [companyOptions, setCompanyOptions] = useState([]);
  const [searchCompanyNameOptions, setSearchCompanyNameOptions] = useState([]);
  const [jobRoleOptions, setJobRoleOptions] = useState([]);
  const [experienceOptions, setExperienceOptions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedSearchCompanyName, setSelectedSearchCompanyName] =
    useState("");
  const [selectedJobRole, setSelectedJobRole] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [filteredJobsList, setFilteredJobsList] = useState(jobObjects);
  const [searchQuery, setSearchQuery] = useState("");

  const extractOptions = (key) => {
    const values = new Set();
    jobObjects.forEach((job) => {
      if (job[key]) {
        values.add(job[key]);
      }
    });
    return Array.from(values);
  };

  const handleOptionChange = (event, option) => {
    const value = event.target.value;
    switch (option) {
      case "location":
        setSelectedLocation(value);
        break;
      case "company":
        setSelectedCompany(value);
        break;
      case "companyName":
        setSelectedSearchCompanyName(value);
        break;
      case "jobRole":
        setSelectedJobRole(value);
        break;
      case "experience":
        setSelectedExperience(value);
        break;
      default:
        break;
    }
  };

  const handleFilter = () => {
    const filteredList = jobObjects.filter((job) => {
      return (
        (selectedLocation === "" || job.location === selectedLocation) &&
        (selectedCompany === "" || job.company === selectedCompany) &&
        (selectedSearchCompanyName === "" ||
          job.companyName === selectedSearchCompanyName) &&
        (selectedExperience === "" || job.experience === selectedExperience) &&
        (selectedJobRole === "" ||
          job.jobRole.toLowerCase().includes(selectedJobRole.toLowerCase())) &&
        (searchQuery === "" ||
          job.jobRole.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    });
    setFilteredJobsList(filteredList);
  };

  useEffect(() => {
    setLocationOptions(extractOptions("location"));
    setCompanyOptions(extractOptions("company"));
    setSearchCompanyNameOptions(extractOptions("companyName"));
    setJobRoleOptions(extractOptions("jobRole"));
    setExperienceOptions(extractOptions("experience"));
  }, [jobObjects]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleFilter();
    }
  };

  return (
    <div className="container mx-auto my-4">
      <h2 className="text-[24px] font-bold my-2 text-center text-red-900">
        Filter and Job Search
      </h2>

      <div className="flex justify-center my-4">
        <input
          type="text"
          placeholder="Search for jobs....."
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyPress={handleKeyPress}
          className="bg-white xl:border xl:border-gray-700 border border-t-0 border-l-0 border-r-0 border-gray-500 px-5 py-3 xl:px-4 xl:py-3 rounded-full w-72 md:w-64 xl:w-80 text-[16px] font-semibold text-black text-[20px]"
        />
      </div>

      <div className=" flex xl:justify-center xl:items-center md:justify-center md:items-center  xl:my-2 sm:my-2 my-2 overflow-x-auto xl:overflow-x-hidden  xl:overflow-y-visible overflow-y-visible flex flex-nowrap sm:overflow-x-auto p-1 hidden-scrollbar">
        <select
          onChange={(e) => handleOptionChange(e, "location")}
          value={selectedLocation}
          className={`bg-neutral-100 hover:bg-blue-400  hover:text-white border border-gray-700 px-1 h-10 xl:h-full py-0 xl:px-3 xl:py-3 rounded-full w-32 md:w-32 xl:w-32 text-[16px] font-semibold text-black ${
            selectedLocation ? "bg-green-700 text-white" : ""
          }`}
        >
          <option value="">Location</option>
          {locationOptions.map((location, index) => (
            <option key={index} value={location}>
              {location}
            </option>
          ))}
        </select>

        <select
          onChange={(e) => handleOptionChange(e, "companyName")}
          value={selectedSearchCompanyName}
          className={`bg-neutral-100 hover:bg-blue-400  hover:text-white border border-gray-700 px-1 h-10 xl:h-full xl:px-3 xl:py-3 rounded-full w-32 md:w-32 xl:w-32 text-[16px] font-semibold text-black mx-4 ${
            selectedSearchCompanyName ? "bg-green-700 text-white" : ""
          }`}
        >
          <option value="">Company</option>
          {searchCompanyNameOptions.map((companyName, index) => (
            <option key={index} value={companyName}>
              {companyName}
            </option>
          ))}
        </select>

        <select
          onChange={(e) => handleOptionChange(e, "jobRole")}
          value={selectedJobRole}
          className={`bg-neutral-100 hover:bg-blue-400  hover:text-white border border-gray-700 px-1 h-10 xl:h-full xl:px-3 xl:py-3 rounded-full w-48 md:w-32 xl:w-32 text-[16px] font-semibold text-black ${
            selectedJobRole ? "bg-green-700 text-white" : ""
          }`}
        >
          <option value="">Job Role</option>
          {jobRoleOptions.map((jobRole, index) => (
            <option key={index} value={jobRole}>
              {jobRole}
            </option>
          ))}
        </select>

        <button
          onClick={handleFilter}
          className=" bg-neutral-100 hover:bg-blue-400  hover:text-white hover:bg-neutral-600 xl:text-[17px] border border-gray-700 px-6 h-12 md:h-10 xl:h-full xl:px-3 xl:py-3 rounded-full text-[16px] font-semibold text-black mx-4"
        >
          All Filters
        </button>
      </div>

      <div className="job-listings grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3  xl:max-h-[680px]  overflow-y-auto my-14">
        {filteredJobsList.map((job, index) => (
          <Card key={index} job={job} />
        ))}
      </div>
    </div>
  );
};

export default YourComponent;
