import React, { useState, useEffect } from "react";
import { registerToastCallback } from "../../utils/toast";
import { CheckCircle, AlertTriangle, X } from "lucide-react";

export default function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    registerToastCallback((message, type) => {
      const id = Date.now() + Math.random();
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 5000);
    });
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="fixed bottom-24 left-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`flex items-start justify-between p-4 rounded-lg shadow-premium border text-sm transition-all duration-300 pointer-events-auto animate-fade-in ${
            t.type === "success" 
              ? "bg-green-50 border-green-200 text-green-800" 
              : "bg-red-50 border-red-200 text-red-800"
          }`}
        >
          <div className="flex gap-2.5">
            {t.type === "success" ? (
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
            )}
            <span className="font-medium">{t.message}</span>
          </div>
          <button 
            onClick={() => removeToast(t.id)} 
            className="text-slate-400 hover:text-slate-600 ml-3 flex-shrink-0 focus:outline-none"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
