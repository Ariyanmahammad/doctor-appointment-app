import React, { useEffect, useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const RelatedDoctors = ({ speciality, docId }) => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  const [relDoc, setRelDoc] = useState([]);

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const filtered = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      );
      setRelDoc(filtered);
    }
  }, [doctors, speciality, docId]);

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900">
      <h1 className="text-3xl font-semibold">Related Doctors</h1>
      <p className="w-1/3 text-center text-sm">
        Browse more doctors with the same specialty.
      </p>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-6 px-3 w-full max-w-7xl mx-auto pt-5">
        {relDoc.slice(0, 5).map((item, index) => (
          <div
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              scrollTo(0, 0);
            }}
            key={index}
            className="border border-blue-200 rounded-2xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-300 bg-white shadow-sm"
          >
            <img
              className="w-full h-40 bg-blue-50 object-cover"
              src={item.image}
              alt={item.name}
            />
            <div className="p-4">
              <div className="flex items-center gap-2 text-sm">
                <div
                  className={`w-2 h-2 rounded-full ${
                    item.available ? "bg-green-500" : "bg-red-500"
                  }`}
                ></div>
                <p
                  className={item.available ? "text-green-600" : "text-red-500"}
                >
                  {item.available ? "Available" : "Not Available"}
                </p>
              </div>
              <p className="font-semibold mt-2">{item.name}</p>
              <p className="text-sm text-gray-500">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          navigate("/doctors");
          scrollTo(0, 0);
        }}
        className="px-6 py-2 mt-6 text-white bg-blue-600 hover:bg-blue-700 rounded-full shadow-md transition duration-300"
      >
        More
      </button>
    </div>
  );
};

export default RelatedDoctors;
