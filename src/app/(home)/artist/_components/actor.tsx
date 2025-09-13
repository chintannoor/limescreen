"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import "@/styles/css/actors.css";
import { getAllActors } from "../_actions/artistServerAction";
import { Actors } from "@/types/types";

const ActorForm = () => {
  const [artistList, setArtistList] = useState<Actors[]>([]);
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
        data: artistList,
        next_page_url,
        prev_page_url,
        last_page,
      } = await getAllActors(pageNumber);

      setArtistList(artistList);
      setNextPageUrl(next_page_url);
      setPrevPageUrl(prev_page_url);
      setLastPage(last_page);
    };

    fetchData();
  }, [currentPage]);

  return (
    <>
      <main role="main" className="container">
        <div className="row">
          <div className="col-md">
            <div className="starter-template">
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item">
                  <Link href="/artist" className="nav-link active" passHref>
                    Actor
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/artist/model" className="nav-link" passHref>
                    Model
                  </Link>
                </li>
              </ul>

              {/* Content Section */}
              <div>
                <div className="card-group">
                  {artistList &&
                    artistList.map((artist) => (
                      <div className="card" key={artist.fname}>
                        <>
                          <img
                            className="card-img-top"
                            src={`https://admin.anantainternationals.com${artist.file!}`}
                            alt="Card image cap"
                          />
                          <div className="card-body">
                            <h5 className="card-title">{artist.fname}</h5>
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
                        href={`/artist?page=${currentPage - 1}`}
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
                        href={`/artist?page=${currentPage + 1}`}
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
    </>
  );
};

export default ActorForm;
