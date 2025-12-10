export const CustomLoader = () => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
      }}
    >
      <div className="flex flex-col items-center space-y-4 p-8 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/50 max-w-sm mx-4">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
        <div className="text-lg font-semibold text-gray-800 text-center">
          Wait a moment, please....
        </div>
        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="w-1/2 h-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};
