

import { Footer } from "flowbite-react";
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";
import { NavLink } from "react-router-dom";

export function Component() {
  return (
    <Footer container>
      <div className="w-full p-4 pt-10 bg-slate-900 text-slate-100">
        <div className="grid max-w-6xl mx-auto justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <NavLink to="/">
            <div className="ml-5">
              <img src="../logo.png" className="h-10 sm:h-14 pb-2" alt="Logo" />
            </div>
          </NavLink>
          <div className="grid grid-cols-1 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6 pb-10">
            <div>
              <Footer.Title title="Contact" className="text-slate-400" />
              <Footer.LinkGroup col>
                <Footer.Link href="#" className="text-slate-100">Linked in</Footer.Link>
                <Footer.Link href="#" className="text-slate-100">Muditdwivedi2016@gmail.com</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow us" className="text-slate-400" />
              <Footer.LinkGroup col>
                <Footer.Link href="#" className="text-slate-100">Github</Footer.Link>
                <Footer.Link href="#" className="text-slate-100">Linked in</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" className="text-slate-400" />
              <Footer.LinkGroup col>
                <Footer.Link href="#" className="text-slate-100">Privacy Policy</Footer.Link>
                <Footer.Link href="#" className="text-slate-100">Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="max-w-6xl mx-auto sm:flex sm:items-center sm:justify-between p-8">
          <Footer.Copyright href="#" by=" Mudit Dwivedi" year={2024}  className="text-slate-100" />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon href="#" icon={BsFacebook} className="text-slate-100" />
            <Footer.Icon href="#" icon={BsInstagram} className="text-slate-100" />
            <Footer.Icon href="#" icon={BsTwitter} className="text-slate-100" />
            <Footer.Icon href="#" icon={BsGithub} className="text-slate-100" />
            <Footer.Icon href="#" icon={BsLinkedin} className="text-slate-100" />
          </div>
        </div>
      </div>
    </Footer>
  );
}
