// components/Loading.tsx
import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-amber-600"></div>
    </div>
  );
};

export default Loading;
