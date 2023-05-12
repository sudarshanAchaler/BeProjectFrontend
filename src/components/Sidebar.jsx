import { useAuthContext } from "@/hooks/useAuthContext";
import Link from "next/link";
import logo from "@/static/chat.png";

const Sidebar = ({ navlinks, handleLogout }) => {
  const { user } = useAuthContext();
  return (
    <div className="homesidebar">
          <div className="col-3 mt-2 ps-5  d-none d-lg-block">
            <div
              className="col-12 vh-100 ps-5"
              style={{ position: "fixed", maxWidth: "20%" }}
            >
              <Link href="/">
                <img src={logo} alt="" width="40" className="img-fluid" />
              </Link>
              <ul
                className="nav mt-5 d-flex flex-column"
                style={{ height: "80vh" }}
              >
                {navlinks.map((link) => (
                  <li className="nav item" key={link.text}>
                    <Link
                      className="fs-5 my-2 nav-item text-dark"
                      href={link.href}
                    >
                      {link.icon} {link.text}
                    </Link>
                  </li>
                ))}
                <button className="btn btn-primary btn-lg w-75 rounded-pill fw-bold">
                  Post
                </button>
                <div className="dropdown mt-auto">
                  <button
                    className="butns rounded-pill p-3"
                    id="dropdownMenuLink"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <div className="d-flex align-items-center justify-content-center">
                      <img
                        src={(user && user.user.profilePictureUrl!="") ? user.user.profilePictureUrl : "/avatar.jpg" }
                        alt=""
                        className="bd-placeholder-img  rounded-circle mx-1"
                        width="40"
                        height="40"
                      />
                      <div className="small">
                        <p className="my-0">{user && user.user.first_name}</p>
                        <p className="text-secondary my-0">
                          @{user && user.user.username}
                        </p>
                      </div>
                      <i className="bi bi-three-dots ms-3 d-none d-xl-inline"></i>
                    </div>
                  </button>

                  <ul
                    className="dropdown-menu mb-3 px-2"
                    aria-labelledby="dropdownMenuLink"
                    style={{ borderRadius: "15px" }}
                  >
                    <li className="p-3">
                      <div className="d-flex align-items-center">
                        <img
                          src={(user && user.user.profilePictureUrl!="") ? user.user.profilePictureUrl : "/avatar.jpg" }
                          alt=""
                          className="bd-placeholder-img  rounded-circle mx-1"
                          width="40"
                          height="40"
                        />
                        <div className="small">
                          <p className="my-0">
                            {user && user.user.first_name + user.user.last_name}
                          </p>
                          <p className="text-secondary my-0">
                            @{user && user.user.username}
                          </p>
                        </div>
                        <i className="bi bi-check2 ms-3 text-primary"></i>
                      </div>
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        Log out @{user && user.user.username}
                      </button>
                    </li>
                  </ul>
                </div>
              </ul>
            </div>
          </div>
    </div>
  );
};

export default Sidebar;
