import { FaGithub } from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

import { FaLinkedin } from "react-icons/fa";

import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="max-w-7xl mx-auto py-8 md:py-20 flex justify-center items-center gap-12">
      <div className="flex flex-col gap-3">
      <Link to="https://github.com/bandhan-majumder/Referral-System">
        <FaGithub className="text-black text-3xl" />
      </Link>

      <Link to="https://x.com/MEbandhan">
        <FaXTwitter className="text-black text-3xl" />
      </Link>

      <Link to="https://www.linkedin.com/in/bandhan-majumder-5a10a1248/">
        <FaLinkedin className="text-black text-3xl" />
      </Link>
      </div>
      <div className="flex flex-row justify-around gap-5">
        <div className="flex flex-col gap-1">
          <p className="text-xl font-semibold">About</p>
          <div className="flex flex-col gap-2">
          <p>About us</p>
          <p>Why us?</p>
          <p>Our story</p>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xl font-semibold">Service</p>
          <div className="flex flex-col gap-2">
          <p>Products</p>
          <p>Feedbacks</p>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xl font-semibold">Contact</p>
          <div className="flex flex-col gap-2">
          <p>Call us</p>
          <p>Chat with us</p>
          <p></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
