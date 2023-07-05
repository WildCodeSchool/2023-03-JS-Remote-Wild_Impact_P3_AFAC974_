import React, { useState, useEffect } from "react";
import connexion from "../../services/connexion";

function BiographiesAdmin() {
  const biographyModel = {
    name: "",
    title1: "",
    image1_src: "",
    image1_alt: "",
    text1: "",
    title2: "",
    image2_src: "",
    image2_alt: "",
    text2: "",
    title3: "",
    image3_src: "",
    image3_alt: "",
    text3: "",
  };

  const [biography, setBiography] = useState({ biographyModel });
  const [biographies, setBiographies] = useState([]);

  const refreshBiography = (id) => {
    if (id === "") {
      setBiography(biographyModel);
    } else {
      setBiography(biographies.find((bio) => bio.id === +id));
    }
  };

  const getBiographies = async () => {
    try {
      const bio = await connexion.get("/biographies");
      setBiographies(bio);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getBiographies();
  }, []);

  const handleBiography = (name, value) => {
    setBiography({ ...biography, [name]: value });
  };

  const postBiography = async (e) => {
    e.preventDefault();
    try {
      const bio = await connexion.post("/biographies", biography);
      setBiography(bio);
      setBiography(biographyModel);
      getBiographies();
    } catch (error) {
      console.error(error);
    }
  };

  const updateBiography = async (e) => {
    e.preventDefault();
    try {
      await connexion.put(`/biographies/${biography.id}`, biography);
      getBiographies();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteBiography = async (e) => {
    e.preventDefault();
    try {
      await connexion.delete(`/biographies/${biography.id}`);
      setBiography(biographyModel);
      getBiographies();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col w-full pr-10">
      <h1 className="text-right pr-5 pt-5 text-2xl font-bold">Page Admin</h1>
      <h2 className="text-xl font-bold p-4">Gestion des Biographies</h2>

      <form className="flex gap-20" onSubmit={(e) => postBiography(e)}>
        <div className="flex flex-col w-5/12">
          <label
            htmlFor="Select biographies"
            className="flex flex-col font-semibold pl-10"
          >
            <select
              onChange={(e) => refreshBiography(e.target.value)}
              value={biography.id}
              className="border border-black h-7 mt-10 text-black"
            >
              <option value="">Choisir la biographie</option>
              {biographies.map((bio) => (
                <option key={bio.id} value={bio.id}>
                  {bio.name}
                </option>
              ))}
            </select>
          </label>
          <label
            htmlFor="Write biographie"
            className="flex flex-col font-semibold pl-10"
          >
            <input
              required
              type="text"
              className="border border-black h-7 mt-10 placeholder:pl-2"
              placeholder="Tapez ici le nom de la biographie"
              name="name"
              value={biography.name}
              onChange={(e) => handleBiography(e.target.name, e.target.value)}
            />
          </label>

          <div>
            <label className="flex flex-col font-semibold pb-5 pl-10 pt-5">
              Texte alternatif de l'image part.1
              <input
                className="border border-black h-7 placeholder:pl-2"
                type="text"
                required
                placeholder="Décrivez l'image en quelques mots (à destination des personnes déficientes visuelles"
                name="image1_alt"
                value={biography.image1_alt}
                onChange={(e) => handleBiography(e.target.name, e.target.value)}
              />
            </label>
          </div>
          <div>
            <label className="flex flex-col font-semibold pb-5 pl-10">
              Image part.1
              <input
                className="border border-black h-7 placeholder:pl-2"
                type="text"
                required
                placeholder="Image"
                name="image1_src"
                onChange={(e) => handleBiography(e.target.name, e.target.value)}
                value={biography.image1_src}
              />
            </label>
          </div>
          <div className="pt-5">
            <label className="flex flex-col font-semibold pb-5 pl-10">
              Titre biographie part.1
              <input
                className="border border-black h-7 placeholder:pl-2"
                type="text"
                required
                placeholder="Titre de la biographie"
                minLength={5}
                maxLength={255}
                name="title1"
                onChange={(e) => handleBiography(e.target.name, e.target.value)}
                value={biography.title1}
              />
            </label>
          </div>

          <div>
            <label className="flex flex-col font-semibold pb-5 pl-10">
              Commentaire 1
              <textarea
                className="border border-black placeholder:pl-2"
                required
                placeholder="Description"
                minLength={50}
                name="text1"
                onChange={(e) => handleBiography(e.target.name, e.target.value)}
                value={biography.text1}
              />
            </label>
          </div>

          <div>
            <label className="flex flex-col font-semibold pb-5 pl-10">
              Texte alternatif de l'image part.2
              <input
                className="border border-black h-7 placeholder:pl-2"
                type="text"
                required
                placeholder="Décrivez l'image en quelques mots (à destination des personnes déficientes visuelles"
                name="image2_alt"
                onChange={(e) => handleBiography(e.target.name, e.target.value)}
                value={biography.image2_alt}
              />
            </label>
          </div>
          <div>
            <label className="flex flex-col font-semibold pb-5 pl-10">
              Image part.2
              <input
                className="border border-black h-7 placeholder:pl-2"
                type="text"
                required
                placeholder="Image"
                name="image2_src"
                onChange={(e) => handleBiography(e.target.name, e.target.value)}
                value={biography.image2_src}
              />
            </label>
          </div>
        </div>
        <div className="flex flex-col w-5/12">
          <div className="pt-5">
            <label className="flex flex-col font-semibold pb-5 pl-10">
              Titre biographie part.2
              <input
                className="border border-black h-7 placeholder:pl-2"
                type="text"
                required
                placeholder="Titre de la biographie"
                minLength={5}
                maxLength={255}
                name="title2"
                onChange={(e) => handleBiography(e.target.name, e.target.value)}
                value={biography.title2}
              />
            </label>
          </div>
          <div>
            <label className="flex flex-col font-semibold pb-5 pl-10">
              Commentaire 2
              <textarea
                className="border border-black placeholder:pl-2"
                placeholder="Description"
                minLength={50}
                name="text2"
                onChange={(e) => handleBiography(e.target.name, e.target.value)}
                value={biography.text2}
              />
            </label>
          </div>

          <div>
            <label className="flex flex-col font-semibold pb-5 pl-10">
              Texte alternatif de l'image 3
              <input
                className="border border-black h-7 placeholder:pl-2"
                type="text"
                required
                placeholder="Décrivez l'image en quelques mots (à destination des personnes déficientes visuelles"
                name="image3_alt"
                onChange={(e) => handleBiography(e.target.name, e.target.value)}
                value={biography.image3_alt}
              />
            </label>
          </div>
          <div>
            <label className="flex flex-col font-semibold pb-5 pl-10">
              Image part.3
              <input
                className="border border-black h-7 placeholder:pl-2"
                type="text"
                required
                placeholder="Image"
                name="image3_src"
                onChange={(e) => handleBiography(e.target.name, e.target.value)}
                value={biography.image3_src}
              />
            </label>

            <div className="pt-5">
              <label className="flex flex-col font-semibold pb-5 pl-10">
                Titre biographie part.3
                <input
                  className="border border-black h-7 placeholder:pl-2"
                  type="text"
                  required
                  placeholder="Titre de la biographie"
                  minLength={5}
                  maxLength={255}
                  name="title3"
                  onChange={(e) =>
                    handleBiography(e.target.name, e.target.value)
                  }
                  value={biography.title3}
                />
              </label>
            </div>
            <div>
              <label className="flex flex-col font-semibold pb-5 pl-10">
                Commentaire 3
                <textarea
                  className="border border-black placeholder:pl-2"
                  placeholder="Description"
                  minLength={50}
                  name="text3"
                  onChange={(e) =>
                    handleBiography(e.target.name, e.target.value)
                  }
                  value={biography.text3}
                />
              </label>
            </div>
            <div className="flex justify-end pt-10 pb-5 pr-10 gap-10">
              {!biography.id && (
                <button type="submit" className="bg-black text-white py-2 px-4">
                  Ajouter
                </button>
              )}
              {biography.id && (
                <button
                  type="button"
                  className="bg-black text-white py-2 px-4"
                  onClick={(e) => updateBiography(e)}
                >
                  Modifier
                </button>
              )}
              {biography.id && (
                <button
                  type="button"
                  className="bg-black text-white py-2 px-4"
                  onClick={(e) => deleteBiography(e)}
                >
                  Supprimer
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default BiographiesAdmin;
