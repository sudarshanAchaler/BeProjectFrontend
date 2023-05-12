import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <header>
      <div className="container d-sm-flex align-items-center justify-content-between">
        <Link href="/" className="d-flex align-items-center">
          <Image src="/chat.png" width={50} height={50} alt="weshare-logo" />
          <h1 className="fw-bold">WeShare</h1>
        </Link>
        <nav className="d-flex align-items-center">
          <div className="mt-3 mb-2 my-sm-0 ">
            <Link href="/login">Login</Link>
            <Link href="/signup">Signup</Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
