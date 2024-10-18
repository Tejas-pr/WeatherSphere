import React from "react";

const TopButton = ({setQuery}) => {
    const cities = [
        {
            id: 1,
            name: "Bangalore",
        },
        {
            id: 2,
            name: "Delhi",
        },
        {
            id: 3,
            name: "Mumbai",
        },
        {
            id: 4,
            name: "Chennai",
        },
        {
            id: 5,
            name: "Kolkata",
        },
        {
            id: 6,
            name: "Hyderabad",
        },
    ];
  return (
    <>
      <div className="flex justify-around items-center my-1">
        {
            cities.map((city) => (
                <button 
                    key={city.id}
                    onClick={() => setQuery({ q: city.name})}
                    className="text-lg font-medium hover:bg-gray-700/20 px-3 py-2 rounded-md transition ease-in">
                    {city.name}
                    
                </button>
            ))
        }
      </div>
    </>
  );
};

export default TopButton;
