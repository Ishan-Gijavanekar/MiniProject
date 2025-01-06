import React, { useEffect, useState } from "react";
import { useFarmStore } from "../store/farmStore";
import FieldCard from "../pages/FeildCard";

const FieldList = () => {
  const { fields, fetchFields, isLoading } = useFarmStore();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFieldData = async () => {
      await fetchFields();
      setLoading(false);
    };
    fetchFieldData();
  }, [fetchFields]);

  if (loading || isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-wrap justify-start m-2 gap-y-4">
      {fields.map((field) => (
        <FieldCard key={field._id} field={field} />
      ))}
    </div>
  );
};

export default FieldList;
