"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import "@/styles/css/models.css";
import Header from "@/components/common/Header/page";
import Footer from "@/components/common/Footer/page";
import { getAllModels } from "../_actions/artistServerAction";
import { Models } from "@/types/types";
import Script from "next/script";

const ModelForm = () => {
  const [modelList, setModelList] = useState<Models[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [prevPageUrl, setPrevPageUrl] = useState<string | null>(null);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const page = searchParams.get("page");
    const pageNumber = page ? parseInt(page, 10) : 1;
    setCurrentPage(pageNumber);

    const fetchData = async () => {
      const {
        data: modelList,
        next_page_url,
        prev_page_url,
        last_page,
      } = await getAllModels(pageNumber);

      setModelList(modelList);
      setNextPageUrl(next_page_url);
      setPrevPageUrl(prev_page_url);
      setLastPage(last_page);
    };

    fetchData();
  }, [currentPage]);
  return (
    <>
      <Script
        id="bootstrap-css"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-beta.2/css/bootstrap.css';
            document.head.appendChild(link);
          `,
        }}
      />
      <Header />
      <main role="main" className="container">
        <div className="row">
          <div className="col-md">
            <div className="starter-template">
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item">
                  <Link href="/artist" className="nav-link" passHref>
                    Actor
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    href="/artist/model"
                    className="nav-link active"
                    passHref
                  >
                    Model
                  </Link>
                </li>
              </ul>

              {/* Content Section */}
              <div>
                <div className="card-group">
                  {modelList &&
                    modelList.map((model) => (
                      <div className="card" key={model.fname}>
                        <>
                          <img
                            className="card-img-top"
                            src={`https://admin.limescreen.net${model.file!}`}
                            alt={`${model.fname} ${model.lname}`}
                          />
                          <div className="card-body">
                            <h5 className="card-title">
                              {model.fname} {model.lname}
                            </h5>
                          </div>
                        </>
                      </div>
                    ))}
                </div>

                {/* Pagination Section */}
                <div className="row mt-4">
                  <div
                    className="col-sm-12"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    {prevPageUrl && (
                      <a
                        href={`/artist/model?page=${currentPage - 1}`}
                        className="theme-btn mx-2 rounded-3"
                        type="button"
                      >
                        Previous
                      </a>
                    )}
                    <span className="mt-2 mr-2 ml-2">
                      Page {currentPage} of {lastPage}
                    </span>
                    {nextPageUrl && (
                      <a
                        href={`/artist/model?page=${currentPage + 1}`}
                        className="theme-btn mx-2 rounded-3"
                        type="button"
                      >
                        Next
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ModelForm;
