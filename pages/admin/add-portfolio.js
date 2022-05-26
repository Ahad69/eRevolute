import Head from "next/head";
import Link from "next/link";
import "react-quill/dist/quill.snow.css";
import Swal from "sweetalert2";
import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  FormGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import dynamic from "next/dynamic";
import DashboardNav from "../components/dashboard";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () =>   <Spinner
  className="spinner"
  animation="border"
  variant="info"
/>,
});

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

function AddPortfolio({ title = "Admin" }) {
  const [description, setDescription] = useState("");
 
  const [isLoading, setIsLoading] = useState();
 

  //	image upload

  const handleValidSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true)
    const name = event.target.portfolio.value;
    const catagory = event.target.catagory.value;
    const siteLink = event.target.siteLink.value;
    const date = new Date().toLocaleDateString();
    const img = event.target.img.value;
    const img2 = event.target.img2.value;
    const img3 = event.target.img3.value;

    const data = ({
      description,
      date,
      name,
      siteLink,
      img,
      img3,
      img2,
      catagory,
    })
    console.log(data);

    await fetch("https://gentle-everglades-88789.herokuapp.com/add-portfolio", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        setIsLoading(true)
        if(result.insertedId){
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          })
        }
        else(
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          })
        )
      });
    event.target.reset();

    setDescription(" ");
  };

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>

      <div className="dashboard">
        <div className="side-nav">
          <img
            width={200}
            className="m-2"
            src="https://i.ibb.co/2nXZjsY/final.png"
            alt=""
          />
          <hr />

          <li>
            <Link href="/admin">Dashboard</Link>{" "}
          </li>
          <li>
            <Link href="/admin/add-blog">Add Blog</Link>
          </li>
          <li>
            <Link href="/admin/blog-list">Blog List</Link>
          </li>
          <li>
            <Link href="/admin/add-portfolio">Add Portfolio</Link>
          </li>
          <li>
            <Link href="/admin/portfolio-list">Portfolio List</Link>
          </li>
        </div>
        <div className="nav-content">
        <DashboardNav></DashboardNav>
    
          <Container fluid={true} className="container-padding">
            <Row>
              <Col sm="12">
                <Card className="form-card">
                  <>
                    <h1>Add Porfolio</h1>
                  </>
                  <div>
                    <div className="product-adding " lg={6}>
                      <Col xl="7">
                      <Form
                      className="needs-validation add-product-form"
                      onSubmit={handleValidSubmit}
                    >
                      <div className="form2 form-label-center">
                        <FormGroup className="form-group mb-3 row">
                          <label className="col-xl-3 col-sm-4 mb-0">
                            Portfolio Name :
                            
                          </label>
                          <div className="col-xl-8 col-sm-7">
                            <input
                              className="form-control"
                              name="portfolio"
                              id="validationCustom01"
                              type="text"
                              required
                            />
                          </div>
                        
                        </FormGroup>
                        
                        <FormGroup className="form-group mb-3 row">
                          <label className="col-xl-3 col-sm-4 mb-0">
                            Portfolio Catagory :
                          </label>
                          <div className="col-xl-8 col-sm-7">
                            <input
                              className="form-control "
                              name="catagory"
                              
                              
                              required
                            />
                          </div>
                         
                        </FormGroup>
                        <FormGroup className="form-group mb-3 row">
                          <label className="col-xl-3 col-sm-4 mb-0">
                            Site Link :
                          </label>
                          <div className="col-xl-8 col-sm-7">
                            <input
                              className="form-control "
                              name="siteLink"
                              
                              
                              required
                            />
                          </div>
                         
                        </FormGroup>
                        <FormGroup className="form-group mb-3 row">
                          <label className="col-xl-3 col-sm-4 mb-0">
                           Image
                          </label>
                          <div className="col-xl-8 col-sm-7">
                            <input
                              className="form-control "
                              name="img"
                              id="validationCustomUsername"
                             
                              required
                            />
                          </div>
                          
                        </FormGroup>
                        <FormGroup className="form-group mb-3 row">
                          <label className="col-xl-3 col-sm-4 mb-0">
                           Image 2
                          </label>
                          <div className="col-xl-8 col-sm-7">
                            <input
                              className="form-control "
                              name="img2"
                              id="validationCustomUsername"
                             
                              required
                            />
                          </div>
                          
                        </FormGroup>
                        <FormGroup className="form-group mb-3 row">
                          <label className="col-xl-3 col-sm-4 mb-0">
                           Image 3
                          </label>
                          <div className="col-xl-8 col-sm-7">
                            <input
                              className="form-control "
                              name="img3"
                              id="validationCustomUsername"
                             
                              required
                            />
                          </div>
                          
                        </FormGroup>
                      </div>
                  
                        <FormGroup className="form-group row">
                          <label className="col-xl-3 col-sm-4">
                            Add Description :
                          </label>
                          <div   className="col-xl-8 col-sm-7 description-sm">
                          
                      
                          <QuillNoSSRWrapper
                              modules={modules}
                              onChange={setDescription}
                              formats={formats}
                            />
                        
                           
                          </div>
                        </FormGroup>
                      
                      <div className="offset-xl-3  offset-sm-4">
                        <button type="submit" className="btnFillup anglebg bg-white w-50" >
                         {
                           isLoading ?  <Spinner  animation="border" variant="dark" /> : "Add Portfolio"
                         }
                        </button>
                     
                      </div>
                    </Form>
                      </Col>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
          </Container>
      
       
          <div
            className="offcanvas offcanvas-start"
           
            id="offcanvasExample"
            aria-labelledby="offcanvasExampleLabel"
          >
            <div className="offcanvas-header">
            <img
            width={150}
            className="m-2"
            src="https://i.ibb.co/2nXZjsY/final.png"
            alt=""
          />
           <button type="button" className="btn-close  text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          <hr />
         
              
            </div>
            <div className="offcanvas-body">
            <li>
            <Link href="/admin">Dashboard</Link>{" "}
          </li>
          <li>
            <Link href="/admin/add-blog">Add Blog</Link>
          </li>
          <li>
            <Link href="/admin/blog-list">Blog List</Link>
          </li>
          <li>
            <Link href="/admin/add-portfolio">Add Portfolio</Link>
          </li>
          <li>
            <Link href="/admin/portfolio-list">Portfolio List</Link>
          </li>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPortfolio;