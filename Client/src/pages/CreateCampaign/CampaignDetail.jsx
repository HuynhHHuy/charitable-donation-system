import React from "react";

const CampaignDetail = () => {
  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Frank’s 12-Year Battle Against Leukemia: Help Us Save Him
        </h1>
        <img
          src="/path-to-image.jpg"
          alt="Frank and his family"
          className="w-full h-auto rounded-lg mb-4"
        />
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-xl font-semibold">$507,053 AUD raised</p>
            <p className="text-gray-600">$530K goal • 6.7K donations</p>
          </div>
          <div className="w-16 h-16 flex items-center justify-center border-4 border-green-500 rounded-full">
            <span className="text-lg font-bold">96%</span>
          </div>
        </div>
        <div className="flex gap-4 mb-4">
          <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded w-full">
            Share
          </button>
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded w-full">
            Donate now
          </button>
        </div>
        <p className="text-gray-600 text-center mb-4">644 people just donated</p>
        <div className="border-t pt-4">
          <p><strong>Tamara Hogg</strong> - $20 <span className="text-gray-500">• Recent donation</span></p>
          <p><strong>BOBABOBA MORLEY</strong> - $5,513 <span className="text-gray-500">• Top donation</span></p>
          <p><strong>Laura Suizu</strong> - $500 <span className="text-gray-500">• First donation</span></p>
        </div>
      </div>
    </div>
  );
};

export default CampDetail;