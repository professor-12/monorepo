import React from "react";

const EventCard = ({ title, date, location, description, banner }) => {
      return (
            <div className="max-w-sm asp rounded-2xl overflow-hidden flex-col justify-between  shadow bg-white hover:shadow-xl transition-shadow duration-300">
                  {banner ?
                        <img
                              className="w-full h-48 object-cover"
                              src={banner}
                              alt={title}
                        />
                        :
                        <div className="w-full h-48 object-cover bg-slate-600/30"></div>
                  }
                  <div className="p-5 px-3 space-y-4">
                        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
                        <p className="text-sm text-gray-500 mt-1">{date}</p>
                        <p className="text-sm text-gray-600 flex items-center gap-2"><span><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin-icon lucide-map-pin"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" /><circle cx="12" cy="10" r="3" /></svg></span>{location}</p>
                        <p className="text-gray-700  text-sm mt-3 line-clamp-3">{description ?? " "}</p>
                        <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition-colors">
                              View Details
                        </button>
                  </div>
            </div>
      );
};

export default EventCard;
