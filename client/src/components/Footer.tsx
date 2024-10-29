import { FaGithub } from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

import { FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
      <div className="max-w-7xl mx-auto py-8 flex justify-center items-center gap-10">
        <FaGithub className="text-black text-3xl" />
        <FaXTwitter className="text-black text-3xl" />
        <FaLinkedin className="text-black text-3xl" />
      </div>
  );
}

export default Footer;
