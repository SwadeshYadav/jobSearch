import React from "react";
import Card from "./Card";

const ParentComponent = ({ jobs }) => {
  return (
    <div className="flex flex-wrap">
      {jobs.map((job, index) => (
        <Card key={index} job={job} />
      ))}
    </div>
  );
};

export default ParentComponent;
