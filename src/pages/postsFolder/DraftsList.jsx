import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../constants/Api";
import Loading from "../loading/Loading";
import Posts from "./Posts";

const DraftsList = () => {
  const [drafts, setDrafts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDrafts = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${API_URL}/api/v1/posts`, {
          params: { status: 'draft' },
        });
        setDrafts(data.posts);
        setLoading(false);
        setError(null);
      } catch (error) {
        setError(error);
        setLoading(false);
        setTimeout(() => {
          setError(null);
        }, 5000);
      }
    };

    fetchDrafts();
  }, []);

  return (
    <div className="container relative z-10 px-4 mx-auto">
      <section className="relative bg-white">
        <div className="container px-4 mx-auto">
          <div className="md:max-w-5xl mx-auto mb-10 md:mb-16 text-center">
            <span className="inline-block py-px px-2 mb-6 mt-10 text-xs leading-5 text-green-500 bg-green-100 font-medium uppercase rounded-full shadow-sm">
              Drafts
            </span>
            <h3 className="mb-0 text-1xl md:text-2xl leading-tight text-darkCoolGray-900 font-bold tracking-tighter">
              Your Draft Articles
            </h3>
          </div>
          {loading ? (
            <Loading />
          ) : error ? (
            <div className="text-red-500 text-center">{error?.message}</div>
          ) : drafts.length === 0 ? (
            <div className="text-center text-lg font-md text-gray-500 mb-6">No Drafts yet</div>
          ) : (
            <Posts posts={drafts} />
          )}
        </div>
      </section>
    </div>
  );
};

export default DraftsList;
