import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import Image from "next/image";
import { AiFillHome } from "react-icons/ai";
import { FaHashtag } from "react-icons/fa";
import { BsFillPersonFill, BsGearFill } from "react-icons/bs";
import { useLogout } from "@/hooks/useLogout";

const HomeLayout = ({ children }) => {
  const { logout } = useLogout();
  const navlinks = [
    { text: "Home", href: "/home", icon: <AiFillHome /> },
    { text: "Explore", href: "/explore", icon: <FaHashtag /> },
    { text: "Profile", href: "/profile/me", icon: <BsFillPersonFill /> },
    { text: "Settings and Privacy", href: "/settings", icon: <BsGearFill /> },
  ];
  const handleLogout = () => {
    logout();
  };
  return (
    <>
    <div className="container-fluid px-0">
      <nav className="navbar navbar-expand-lg navbar-light d-lg-none">
        <div className="container-fluid">
          <Link className="navbar-brand fs-3 fw-bold" href="/">
            <Image
              src="/chat.png"
              width={40}
              height={40}
              alt="weshare-logo"
              className="image-fluid"
            />{" "}
            WeShare
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {navlinks.map((link) => (
                <li className="nav item" key={link.text}>
                  <Link className="nav-link active" href={link.href}>
                    {link.icon} {link.text}
                  </Link>
                </li>
              ))}
              <li className="nav item ms-3">
                <button
                  onClick={handleLogout}
                  className="btn btn-outline-dark fw-bold "
                  href="/home"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="row ">
        <div className="col-3 mt-2 ps-5  d-none d-lg-block">
          <Sidebar navlinks={navlinks} handleLogout={handleLogout} />
        </div>

        <div className="col px-0 px-md-2">
          <div className="container px-2 ">
            <div className="row min-vh-100">

              <div className="col-lg-12  px-md-5">
                {children}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  );
};

export default HomeLayout;
