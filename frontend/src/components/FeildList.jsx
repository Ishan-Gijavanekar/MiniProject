import React, { useEffect } from "react";
import { useFarmStore } from "../store/farmStore";
import FieldCard from "../pages/FeildCard";

const FieldList = () => {
  const { fields, fetchFields } = useFarmStore();

  useEffect(() => {
    fetchFields();
  }, [fetchFields]);

  console.log(fields)

  return (
    <div className="flex flex-wrap justify-start m-2 gap-y-4">
      {fields.map((field) => (
        <FieldCard key={field._id} field={field} />
      ))}
    </div>
  );
};

export default FieldList;
