"use client"

const PropertySearch = ({ setSearchValue, searchValue, setIsSearching }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSearching(true);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setSearchValue({
      address: "",
      maxPrice: 0,
      minPrice: 0,
      bedrooms: 0,
      bathrooms: 0,
    });
    setIsSearching(false);
  };

  return (
    <div className="mx-auto p-6">
      <h1 className="text-2xl font-semibold text-primary mb-6 text-center">
        Find property for rent.
      </h1>

      <div className="bg-primary rounded-lg p-8">
        <div className="space-y-6">
          <div>
            <label className="block text-white mb-2 text-sm font-medium">
              Where
            </label>
            <input
              type="text"
              placeholder="Search locations"
              className="w-full p-2.5 rounded border-gray-300 text-gray-700 bg-white"
              onChange={(e) => setSearchValue({ ...searchValue, address: e.target.value })}
            />
          </div>

          <div className="flex gap-4 lg:items-end flex-col lg:flex-row">
            <div>
              <label className="block text-white mb-2 text-sm font-medium">
                Price Range
              </label>
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Minimum"
                  className="w-1/2 lg:w-36 p-2.5 rounded border-gray-300 text-gray-700 bg-white"
                  onChange={(e) => setSearchValue({ ...searchValue, minPrice: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Maximum"
                  className="w-1/2 lg:w-36 p-2.5 rounded border-gray-300 text-gray-700 bg-white"
                  onChange={(e) => setSearchValue({ ...searchValue, maxPrice: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-white mb-2 text-sm font-medium">
                Bedrooms
              </label>
              <select className="w-full lg:w-36 p-2.5 rounded border-gray-300 text-gray-700 bg-white" onChange={(e)=>setSearchValue({...searchValue,bedrooms:e.target.value})}>
                <option>Select</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4+</option>
              </select>
            </div>

            <div>
              <label className="block text-white mb-2 text-sm font-medium">
                Bathrooms
              </label>
              <select className="w-full lg:w-36 p-2.5 rounded border-gray-300 text-gray-700 bg-white" onChange={(e)=>setSearchValue({...searchValue,bathrooms:e.target.value})}>
                <option>Select</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4+</option>
              </select>
            </div>

            <button className="bg-white text-primary px-8 py-2.5 rounded font-medium hover:bg-gray-400" onClick={handleSubmit}>
              Search
            </button>
            <button className="bg-red-500 text-white px-8 py-2.5 rounded font-medium hover:bg-gray-50 hover:text-primary" onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertySearch;
