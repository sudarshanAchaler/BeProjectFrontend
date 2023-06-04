import Image from "next/image";

export default function Home() {
  return (
    <>
      <div
        id="carouselExample"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div
            className="carousel-item active"
            style={{ width: "100vw", height: "30vh" }}
          >
            <Image
              src="/landingpage.jpg"
              fill={true}
              quality={75}
              style={{ objectFit: "cover" }}
            />
            <div className="container">
              <div className="carousel-caption text-center">
                <h1 className="fw-normal">
                  College Social Network Platform with Machine Learning
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid mt-3 pt-3 bg-light">
        <div className="row text-center my-2">
          <h3>Meet the Developers</h3>
        </div>
        <div className="row bg-light text-center">
          <div className="col-lg-3">
            <Image
              src="/sudarshan.jpeg"
              className="bd-placeholder-img rounded-circle"
              width="140"
              height="140"
            />
            <h3 className="fw-normal mt-2">Sudarshan Achaler</h3>
            <p className="text-secondary">Backend and Devops</p>
          </div>
          <div className="col-lg-3">
            <Image
              src="/aditya.jpg"
              className="bd-placeholder-img rounded-circle"
              width="140"
              height="140"
            />
            <h3 className="fw-normal mt-2">Aditya Shelke</h3>
            <p className="text-secondary">Frontend</p>
          </div>
          <div className="col-lg-3">
            <Image
              src="/vaibhav.png"
              className="bd-placeholder-img rounded-circle"
              width="140"
              height="140"
            />
            <h3 className="fw-normal mt-2">Vaibhav Bhand</h3>
            <p className="text-secondary">Frontend</p>
          </div>
          <div className="col-lg-3">
            <Image
              src="/om.jpeg"
              className="bd-placeholder-img rounded-circle"
              width="140"
              height="140"
            />
            <h3 className="fw-normal mt-2">Om Mate</h3>
            <p className="text-secondary">
              Machine Learning and Sentiment Analysis
            </p>
          </div>
        </div>
      </div>
      <div className="container-fluid my-3 pt-3 text-center">
        <h3>Downloads</h3>
        <div className="row mt-4">
          <div className="col-lg-4">
          <Image
              src="/research1.jpeg"
              className="bd-placeholder-img"
              width="151"
              height="195"
            />
            <div className="mt-4">
              <h5>Research Paper 1</h5>
              <a href="https://sudarshanbeproject.s3.ap-south-1.amazonaws.com/researchPaper2.pdf" className="btn btn-primary">Download</a>
            </div>
          </div>
          <div className="col-lg-4">
          <Image
              src="/research2.jpeg"
              className="bd-placeholder-img"
              width="151"
              height="195"
            />
            <div className="mt-4">
              <h5>Black Book Report</h5>
              <a href="https://sudarshanbeproject.s3.ap-south-1.amazonaws.com/blackBookReport.pdf" className="btn btn-primary">Download</a>
            </div>
          </div>
          <div className="col-lg-4">
          <Image
              src="/report.jpeg"
              className="bd-placeholder-img"
              width="151"
              height="195"
            />
            <div className="mt-4">
              <h5>Research Paper 2</h5>
              <a href="https://sudarshanbeproject.s3.ap-south-1.amazonaws.com/researchPaper1.pdf" className="btn btn-primary">Download</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
