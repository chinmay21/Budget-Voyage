export default function DeveloperDropdown() {
  return (
    <div className="relative inline-block group">
      <button
        className="rounded-lg px-4 py-2 font-medium transition-colors"
        style={{
          backgroundColor: "#212842",
          color: "#F0E7D5",
        }}
      >
        Developed By
      </button>

      <div
        className="absolute right-0 mt-2 w-64 rounded-lg p-4 opacity-0 invisible
                   group-hover:visible group-hover:opacity-100
                   transition-all duration-200 shadow-lg"
        style={{
          backgroundColor: "#212842",
          color: "#F0E7D5",
          border: "1px solid #F0E7D5",
        }}
      >
        <p className="font-semibold">Chinmay Dhaundiyal</p>
        <p className="text-sm mt-1">dhaundiyalchinmay@gmail.com</p>
      </div>
    </div>
  );
}