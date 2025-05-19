import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Pencil, Settings, Star, Heart } from "lucide-react";
import ElementList from "./ElementList";

function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed top-0 right-0 h-full z-50 flex">
      {/* b */}
      <button
        className="w-8 h-12 mt-4 bg-gray-100 rounded-l-xl hover:bg-gray-300 flex items-center justify-center"
        onClick={() => setOpen(!open)}
        data-tooltip={open ? "Close menu" : "Open menu"}
      >
        {open ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>

      <div className={`bg-white shadow-md transition-all duration-300 ${
          open ? "w-64" : "w-0 overflow-hidden"
        }`}>
        <div className="p-4">
          <div className="grid grid-cols-4 gap-2">
            <button className="p-3 bg-white border border-gray-300 rounded-lg hover:border-gray-600 transition-colors flex flex-col items-center justify-center gap-2">
              <Pencil size={24} className="text-gray-600" />
            </button>
            <button className="p-3 bg-white border border-gray-300 rounded-lg hover:border-gray-600 transition-colors flex flex-col items-center justify-center gap-2">
              <Settings size={24} className="text-gray-600" />
            </button>
            <button className="p-3 bg-white border border-gray-300 rounded-lg hover:border-gray-600 transition-colors flex flex-col items-center justify-center gap-2">
              <Star size={24} className="text-gray-600" />
            </button>
            <button className="p-3 bg-white border border-gray-300 rounded-lg hover:border-gray-600 transition-colors flex flex-col items-center justify-center gap-2">
              <Heart size={24} className="text-gray-600" />
            </button>
          </div>
          
          <ElementList />
        </div>
      </div>
      

    </div>
  );
}

export default Sidebar;
