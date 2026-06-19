import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-[#F0E7D5] text-[#212842] h-fit">
      <div className="flex justify-center py-15 flex-col items-center gap-y-5 pt-25">
        <p className="font-bold text-5xl">Plan smarter trips with real budget clarity</p>
        <p className="text-lg mt-5">
          Voyago helps you instantly calculate the real cost of your trip before you book.
          Get accurate estimates for flights, hotels, food, transport, and activities based on your destination and budget
        </p>
        <div>
          <Link href={'/plan'}>
            <button className="text-lg mt-5 bg-[#212842] rounded-lg hover:scale-x-110 transition-all ease-out duration-100
            cursor-pointer delay-100">
            <p className="text-[#F0E7D5] px-5 py-1.5">Start Planning</p>
          </button>
          </Link>
        </div>

        <div className="bg-[#212842] text-[#F0E7D5] py-15 px-10 mt-30">
          <p className="font-bold text-5xl">WHAT THE APP DOES</p>

          <p className="text-lg mt-5 mb-5">
            Voyago is a travel planner that helps you understand exactly how much your trip will cost.
            Instead of guessing expenses, you enter your destination, budget, and travel details — and the system
            breaks down every cost category for you.
          </p>

          <div>
            <p className="mb-3 text-lg">It helps you:</p>

            <ul className="text-sm md:text-lg font-medium space-y-2 list-disc pl-7">
              <li>Avoid overspending</li>
              <li>Compare destinations by cost</li>
              <li>Plan trips within your budget</li>
              <li>Make faster travel decisions</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="px-10 pb-10">
          <p className="text-5xl font-bold">HOW IT WORKS</p>

          <div className="pl-10 pt-5 text-xl font-semibold">
            <p>Step 1: Choose Destination</p>
            <div className="flex items-center gap-x-3 pl-5 pt-3">
              <div className="bg-[#212842] rounded-full w-2 h-2 mt-1"></div>
              <p>Select where you want to travel.</p>
            </div>
          </div>
          <div className="pl-10 pt-5 text-xl font-semibold">
            <p>Step 2: Set Budget & Details</p>
            <div className="flex items-center gap-x-3 pl-5 pt-3">
              <div className="bg-[#212842] rounded-full w-2 h-2 mt-1"></div>
              <p>Enter your budget, number of travelers, and trip duration.</p>
            </div>
          </div>
          <div className="pl-10 pt-5 text-xl font-semibold">
            <p>Step 3: Get Full Cost Breakdown</p>
            <div className="flex items-center gap-x-3 pl-5 pt-3">
              <div className="bg-[#212842] rounded-full w-2 h-2 mt-1"></div>
              <p>Receive an instant estimate of your complete trip cost.</p>
            </div>
          </div>
      </div>

      <div className="bg-[#212842] text-[#F0E7D5] py-15 px-10 mt-30">
        <p className="font-bold text-5xl">CORE FEATURES</p>

        <div className="mt-7">
          <ul className="text-sm md:text-lg font-medium space-y-2 list-disc pl-7">
            <li>Budget calculator</li>
            <li>Realistic travel cost estimation</li>
            <li>Destination-based pricing insights</li>
            <li>Expense breakdown by category</li>
            <li>Budget optimization suggestions</li>
            <li>Fast and simple trip planning</li>
          </ul>
        </div>
      </div>

      <div className="py-30 pl-10">
        <div className="text-5xl font-bold">VALUE PROPOSITION</div>

        <p className="mt-5 text-xl font-semibold">
          Voyago removes uncertainty from travel planning.
          Instead of searching multiple websites for prices, you get everything in one place — structured, clear,
          and optimized for your budget.
        </p>
      </div>
    </div>
  );
}
