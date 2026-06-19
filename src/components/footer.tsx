import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#212842] text-white">
      <div className="max-w-6xl mx-auto px-4 md:px-10 py-12">

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

          {/* Company */}
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">Company</h2>
            <div className="bg-pink-800 w-16 h-0.5 mt-2 mb-4"></div>

            <div className="space-y-3">
              {["About Us", "Our Services", "Privacy Policy", "Affiliate Program"].map((item) => (
                <Link href={'https://github.com/chinmay21'} key={item}>
                    <p 
                        className="text-neutral-400 text-sm md:text-lg hover:text-white hover:translate-x-2 transition-all cursor-pointer w-fit"
                    >
                        {item}
                    </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Help */}
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">Get Help</h2>
            <div className="bg-pink-800 w-16 h-0.5 mt-2 mb-4"></div>

            <div className="space-y-3">
              {["FAQ", "Cost Breakdown", "Expense breakdown ", "Budget optimization"].map((item) => (
                <Link href={'https://github.com/chinmay21'} key={item}>
                    <p 
                        className="text-neutral-400 text-sm md:text-lg hover:text-white hover:translate-x-2 transition-all cursor-pointer w-fit"
                    >
                        {item}
                    </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">Follow Us</h2>
            <div className="bg-pink-800 w-16 h-0.5 mt-2 mb-4"></div>

              <Link  className="flex gap-4 mt-4 text-2xl md:text-3xl" href={'https://github.com/chinmay21'}>
                <FaFacebook className="text-neutral-400 hover:text-white cursor-pointer transition-all" />
                <FaInstagram className="text-neutral-400 hover:text-white cursor-pointer transition-all" />
                <FaSquareXTwitter className="text-neutral-400 hover:text-white cursor-pointer transition-all" />
                <FaLinkedin className="text-neutral-400 hover:text-white cursor-pointer transition-all" />
              </Link>
          </div>

        </div>

        {/* Bottom line */}
        <div className="mt-10 border-t border-neutral-700 pt-5 text-center text-sm text-neutral-400">
          © {new Date().getFullYear()} Voyage. All rights reserved.
        </div>

      </div>
    </footer>
  );
}