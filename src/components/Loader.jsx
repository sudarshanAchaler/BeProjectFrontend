import { BounceLoader } from "react-spinners";
import Image from "next/image";  

const Loader = () => {
  return (
    <div className="container">
      <h1 className="text-center mt-5 pt-5"><Image src="/chat.png" height={50} width={50} className="mx-2" alt="we-share-logo"/>WeShare</h1>
      <h4 className="text-center mt-3 pt-3">
        I'm obsessed with perfection. I want to work.<br></br> I don't want to take this for granted.
      </h4>
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "40vh" }}
      >
        <BounceLoader color={"#1fb6f6"} size={290} />                                          
      </div>
    </div>
  );
};

export default Loader;
