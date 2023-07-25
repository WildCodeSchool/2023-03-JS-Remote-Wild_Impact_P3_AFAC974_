/* eslint-disable import/no-named-as-default */
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import connexion from "../services/connexion";
import ImageCard from "../components/ImageCard";
import hexaRose from "../assets/hexa_rose.png";
import Carousel from "../components/Carousel";
import FavoriteButton from "../components/FavoriteButton";

function OneImage() {
  const { id } = useParams();
  const [oneImage, setOneImage] = useState([]);
  const [oneArticle, setOneArticle] = useState([]);

  const getOneImage = async () => {
    try {
      const desc = await connexion.get(`/works/${id}`);
      setOneImage(desc);
    } catch (error) {
      console.error(error);
    }
  };

  const getOneArticle = async () => {
    try {
      const art = await connexion.get(`/works/${id}/articles`);
      setOneArticle(art);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getOneImage();
    getOneArticle();
  }, [id]);

  return (
    <div className="bg-black h-full pt-44">
      <h1 className="text-xl text-white ml-10 pb-1">{oneImage.title}</h1>
      <div className=" h-[2px] bg-gradient-to-r from-pink to-purple z-10 ml-10 mr-10" />
      <div className="flex justify-center">
        <ImageCard
          cls="content-center pr-10 pl-10 mt-10"
          src={oneImage.image_src}
          alt={oneImage.image_alt}
        />
      </div>
      <div className="flex pt-10 pl-5 pb-5 text-white">
        <img className="w-11 h-10 mr-2 ml-3" src={hexaRose} alt="logo" />
        <h3 className="mt-2 font-bold text-xl">Description</h3>
      </div>
      <div className="flex text-white mr-5 pt-1">
        <div className="flex w-2/3 flex-col text-white ml-10">
          <p className="text-sm pb-5 mr-5">{oneImage.summary1}</p>
          <p className="text-sm pb-5 mr-5">{oneImage.summary2}</p>
          <p className="text-sm pb-5 mr-5">{oneImage.summary3}</p>
          <p className="text-sm pb-5 mr-5">{oneImage.summary4}</p>
        </div>

        <div className="flex flex-col w-1/3 pt-1">
          <div className="border-t-[1px] border-pink w-[90%]" />
          <p className="text-left text-sm mt-3">
            Technique : {oneImage.technique}
          </p>
          <div className="border-t-[1px] border-pink w-[90%] mt-3" />
          <p className="text-left text-sm mt-3">
            Catégorie : {oneImage.category}
          </p>
          <div className="border-t-[1px] border-pink w-[90%] mt-3" />
          <p className="text-left text-sm mt-3">
            Dimensions : {oneImage.format}
          </p>
          <div className="border-t-[1px] border-pink w-[90%] mt-3" />
          <p className="text-left text-sm mt-3">Date : {oneImage.date}</p>
          <div className="border-t-[1px] border-pink w-[90%] mt-3 mb-6" />
          {oneArticle && (
            <div>
              <p className="text-left text-sm mr-5">
                Plus d'infos :{" "}
                <Link
                  to={oneArticle.src}
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-pink"
                >
                  cliquez ici
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col justify-end ml-14">
        <FavoriteButton item={oneImage} refresh={getOneImage} />
      </div>
      <div className="flex ml-10 pt-10 pb-5 text-white">
        <img className="w-11 h-10 mr-2 ml-[-10px]" src={hexaRose} alt="logo" />
        <h3 className="mt-2 font-bold text-xl">Oeuvres similaires</h3>
      </div>
      <Carousel />
    </div>
  );
}

export default OneImage;
