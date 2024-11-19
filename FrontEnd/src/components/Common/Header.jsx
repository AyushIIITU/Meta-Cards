import { useEffect, useState } from "react";
import weddingIcon from "../../assets/weddingSvg";
import greetingCard from "../../assets/greetingCard";
import { jwtDecode } from "jwt-decode";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import { MdOutlineCake } from "react-icons/md";
import { FaRegCirclePlay } from "react-icons/fa6";
import { Link } from "react-router-dom";

const products = [
  { name: "BirthDay Card", description: "Get a better understanding of your traffic", href: "editCake", icon: MdOutlineCake },
  { name: "Engagement Card", description: "Speak directly to your customers", href: "editWedding", icon: weddingIcon },
  { name: "Wishing Card", description: "Your customers’ data will be safe and secure", href: "editWishCard", icon: greetingCard },
];

const PrivateCard = [
  { name: "BirthDay Card", description: "Get a better understanding of your traffic", href: "private/cake", icon: MdOutlineCake },
  { name: "Engagement Card", description: "Speak directly to your customers", href: "private/wedding", icon: weddingIcon },
  { name: "Wishing Card", description: "Your customers’ data will be safe and secure", href: "private/wish", icon: greetingCard },
];

const PublicCard = [
  { name: "BirthDay Card", description: "Get a better understanding of your traffic", href: "public/cake", icon: MdOutlineCake },
  { name: "Engagement Card", description: "Speak directly to your customers", href: "public/wedding", icon: weddingIcon },
  { name: "Wishing Card", description: "Your customers’ data will be safe and secure", href: "public/wish", icon: greetingCard },
];

const callsToAction = [{ name: "Watch demo", href: "#", icon: FaRegCirclePlay  }];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("UserID");
    localStorage.removeItem("UserName");
    setLoggedIn(false);
  };

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;
    const { exp } = jwtDecode(token);
    if (exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      localStorage.removeItem("UserID");
      localStorage.removeItem("UserName");
      setLoggedIn(false);
    } else {
      setLoggedIn(true);
    }
  }, [token]);

  const renderPopover = (items, label) => (
    <Popover className="relative">
      <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
        {label}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon" className="h-5 w-5 flex-none text-gray-400"><path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd"></path></svg>
      </PopoverButton>
      <PopoverPanel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
        <div className="p-4">
          {items.map(item => (
            <div key={item.name} className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
              <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                <item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
              </div>
              <div className="flex-auto">
                <Link to={item.href} className="block font-semibold text-gray-900">{item.name}</Link>
                <p className="mt-1 text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 divide-x divide-gray-900/5 bg-gray-50">
          {callsToAction.map(item => (
            <Link key={item.name} to={item.href} className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100">
              <item.icon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
              {item.name}
            </Link>
          ))}
        </div>
      </PopoverPanel>
    </Popover>
  );

  const renderDisclosure = (items, label) => (
    <Disclosure as="div" className="-mx-3">
      {({ open }) => (
        <>
          <DisclosureButton className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
            {label}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon" className={classNames(open ? "rotate-180" : "", "h-5 w-5 flex-none")}><path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd"></path></svg>

            {/* <ChevronDownIcon className={classNames(open ? "rotate-180" : "", "h-5 w-5 flex-none")} aria-hidden="true" /> */}
          </DisclosureButton>
          <DisclosurePanel className="mt-2 space-y-2">
            {items.map(item => (
              <Link
                key={item.name}
                // as="a"
                to={item.href}
                className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >
                {item.name}
              </Link>
            ))}
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );

  return (
    <header className="bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <img className="h-8 w-auto" src="./Logo.png" alt="Logo" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700" onClick={() => setMobileMenuOpen(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="h-6 w-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path></svg>
            {/* <Bars3Icon className="h-6 w-6" aria-hidden="true" /> */}
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Link to="/" className="text-sm font-semibold leading-6 text-gray-900">Home</Link>
          {token && renderPopover(products, "Create")}
          {renderPopover(PublicCard, "Public Cards")}
          {token && renderPopover(PrivateCard, "Your Card")}
          <Link to="about" className="text-sm font-semibold leading-6 text-gray-900">About Us</Link>
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {isLoggedIn ? (
            <Link to="/" onClick={handleLogOut} className="text-sm font-semibold leading-6 text-gray-900">Log out<span aria-hidden="true">&rarr;</span></Link>
          ) : (
            <Link to="/auth" className="text-sm font-semibold leading-6 text-gray-900">Register Or Log in<span aria-hidden="true">&rarr;</span></Link>
          )}
        </div>
      </nav>

      <Dialog className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <img className="h-8 w-auto" src="./Logo.png" alt="Logo" />
            </a>
            <button type="button" className="-m-2.5 rounded-md p-2.5 text-gray-700" onClick={() => setMobileMenuOpen(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="h-6 w-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"></path></svg>
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {token && renderDisclosure(products, "Create")}
                {renderDisclosure(PublicCard, "Public Cards")}
                {token && renderDisclosure(PrivateCard, "Your Card")}
              </div>
              <div className="py-6">
                <Link
                  onClick={token ? handleLogOut : undefined}
                  to={token ? "" : "auth"}
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  {token ? "Log out" : "Log in"}
                </Link>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
