import React from 'react';

const ShimmerBrowse = () => {
  return (
    <section className="animate-pulse space-y-6 p-4 pt-20 bg-gray-100 min-h-screen">
    
      <div className="h-56 bg-gray-300 rounded-lg w-full" />

      
      <div className="h-6 bg-gray-300 rounded w-1/3" />

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {Array(10).fill(0).map((_, index) => (
          <div key={index} className="h-40 bg-gray-300 rounded" />
        ))}
      </div>
    </section>
  );
};

export default ShimmerBrowse;
