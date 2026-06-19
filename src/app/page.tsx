import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-[#F0E7D5] text-[#212842] h-fit">
      <div className="flex justify-center py-30 flex-col items-center gap-y-5 pt-25">
        <p className="font-bold text-5xl">Plan smarter trips with real budget clarity</p>
        <p className="text-lg mt-5">
          Voyago helps you instantly calculate the real cost of your trip before you book.
          Get accurate estimates for flights, hotels, food, transport, and activities based on your destination and budget
        </p>
        <div>
          <Link href={'/plan-trip'}>
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

      <div className="">
          <p>HOW IT WORKS</p>

          <div>
            <p>Step 1: Choose Destination</p>
            <p>Select where you want to travel.</p>
          </div>
          <div>
            <p>Step 2: Set Budget & Details</p>
            <p>Enter your budget, number of travelers, and trip duration.</p>
          </div>
          <div>
            <p>Step 3: Get Full Cost Breakdown</p>
            <p>Receive an estimate of your complete trip cost.</p>
          </div>
      </div>
    </div>
  );
}
