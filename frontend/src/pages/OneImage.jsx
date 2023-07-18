/* eslint-disable import/no-named-as-default */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import connexion from "../services/connexion";
import ImageCard from "../components/ImageCard";
import hexaRose from "../assets/hexa_rose.png";
import Carousel from "../components/Carousel";

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
  }, []);

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
      <div className="flex text-white ml-10">
        <div className="flex flex-col w-1/3 pt-1">
          <div className="border-t-[1px] border-pink w-56" />
          <p className="text-left text-sm mt-3">
            Technique : {oneImage.technique}
          </p>
          <div className="border-t-[1px] border-pink w-56 mt-3" />
          <p className="text-left text-sm mt-3">
            Catégorie : {oneImage.category}
          </p>
          <div className="border-t-[1px] border-pink w-56 mt-3" />
          <p className="text-left text-sm mt-3">
            Dimensions : {oneImage.format}
          </p>
          <div className="border-t-[1px] border-pink w-56 mt-3" />
          <p className="text-left text-sm mt-3">Date : {oneImage.date}</p>
          <div className="border-t-[1px] border-pink w-56 mt-3 mb-6" />
        </div>
        <div className="flex flex-col w-4/6 mr-10 pl-2">
          <p className="text-sm pb-5 ">{oneImage.summary1}</p>
          <p className="text-sm pb-5 ">{oneImage.summary2}</p>
        </div>
      </div>
      <div className="flex flex-col text-white mr-10 ml-10 pt-1">
        <p className="text-sm pb-5 ">{oneImage.summary3}</p>
        <p className="text-sm pb-5">{oneImage.summary4}</p>
        {oneArticle && (
          <div>
            <p className="text-left text-sm ml-5 mr-5">
              Plus d'infos :{" "}
              <a
                href={oneArticle.src}
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                cliquez ici
              </a>
            </p>
            <div className="border-t-2 border-pink h-100 m-5" />
          </div>
        )}
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
