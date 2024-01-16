import React from "react";

export default function Listing() {
  return (
    <div className="p-3 max-w-4xl mx-auto">
      <h1 className="font-semibold text-3xl text-center my-7">
        Create a Listing
      </h1>

      <form className="flex gap-4 flex-col  sm:flex-row">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="p-2 rounded-lg"
            required
            maxLength="62"
            minLength="10"
          />
          <input
            type="text"
            placeholder="Description"
            className="p-4 rounded-lg"
          />
          <input type="text" placeholder="Address" className="p-2 rounded-lg" />
          <div className="flex flex-wrap gap-6">
            <div className="gap-2">
              <input type="checkbox" className="w-5" id="sale" />
              <span>Sell</span>
            </div>
            <div className="gap-2">
              <input type="checkbox" className="w-5" id="rent" />
              <span>rent</span>
            </div>
            <div className="gap-2">
              <input type="checkbox" className="w-5" id="sale" />
              <span>Parking spot</span>
            </div>
            <div className="gap-2">
              <input type="checkbox" className="w-5" id="sale" />
              <span>Furnished</span>
            </div>
            <div className="gap-2">
              <input type="checkbox" className="w-5" id="sale" />
              <span>offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6 ">
            <div className="gap-2 flex items-center">
              <input
                type="number"
                className=" rounded-lg border border-gray-300 p-3"
                min="1"
                max="10"
                required
                id="beds"
              />

              <p>Beds</p>
            </div>
            <div className="gap-2 flex items-center ">
              <input
                type="number"
                className="p-3 rounded-lg border border-gray-300"
                min="1"
                max="10"
                required
                id="baths"
              />

              <p>Baths</p>
            </div>
            <div className="gap-2 flex items-center">
              <input
                type="number"
                className="rounded-lg border border-gray-300 p-3"
                min="1"
                max="10"
                required
                id="regularPrice"
              />
              <div className="flex flex-col items-center">
                <p>Regular price</p>
                <span className="text-xs ">($/Month)</span>
              </div>
            </div>
            <div className="gap-2 flex items-center">
              <input
                type="number"
                className="rounded-lg border border-gray-300 p-3"
                min="1"
                max="10"
                required
                id="discountedPrice"
              />
              <div className="flex flex-col items-center">
                <p>Discounted price</p>
                <span className="text-xs ">($/Month)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <p>
            <span className="font-semibold">Images:</span> the first image will
            be the cover (max6)
          </p>
          <div className="flex gap-2 items-center">
            <input
              type="file"
              className="my-3 border border-gray-300 p-3 w-full rounded-lg"
              id="images"
              accept="image/*"
              multiple
            />
            <button className="border text-green-700 rounded border-green-700 p-2 uppercase hover:shadow-lg disabled:opacity-80">
              Upload
            </button>
          </div>
          <button className="bg-slate-700 p-2 text-white uppercase rounded-lg hover:opacity-95 disabled:opacity-80 my-4">
            Create Listing
          </button>
        </div>
      </form>
    </div>
  );
}
