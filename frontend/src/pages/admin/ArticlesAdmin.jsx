import React, { useState, useEffect } from "react";
import connexion from "../../services/connexion";

function ArticlesAdmin() {
  const articleModel = { id: null, name: "", src: "", works_id: "" };
  const [article, setArticle] = useState({ articleModel });
  const [articles, setArticles] = useState([]);
  const [works, setWorks] = useState([]);

  const refreshArticle = (id) => {
    if (id === "") {
      setArticle(articleModel);
    } else {
      setArticle(articles.find((art) => art.id === +id));
    }
  };

  const getArticles = async () => {
    try {
      const art = await connexion.get("/articles");
      setArticles(art);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getArticles();
  }, []);

  const handleArticle = (name, value) => {
    setArticle({ ...article, [name]: value });
  };

  const postArticle = async (e) => {
    e.preventDefault();
    try {
      const art = await connexion.post("/Articles", article);
      setArticle(art);
      setArticle(articleModel);
      getArticles();
    } catch (err) {
      console.error(err);
    }
  };

  const updateArticle = async (e) => {
    e.preventDefault();
    try {
      await connexion.put(`/articles/${article.id}`, article);
      getArticles();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteArticle = async (e) => {
    e.preventDefault();
    try {
      await connexion.delete(`/articles/${article.id}`);
      setArticle(articleModel);
      getArticles();
    } catch (error) {
      console.error(error);
    }
  };

  const getWorks = () => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/works`)
      .then((res) => res.json())
      .then((data) => setWorks(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getArticles();
    getWorks();
  }, []);

  return (
    <div className="flex-1">
      <h1 className="text-right pr-5 pt-5 text-2xl font-bold">Page Admin</h1>
      <h2 className="text-xl font-bold p-4 pb-10">Gestion des Articles</h2>
      <form className="ml-10" onSubmit={(e) => postArticle(e)}>
        <label
          htmlFor="Select Articles"
          className="flex flex-col font-semibold w-80"
        >
          Selectionner un article
          <select
            onChange={(e) => refreshArticle(e.target.value)}
            value={article.id}
            className="border border-black h-7 mt-10 text-black"
          >
            <option value="">Choisir l'article</option>
            {articles.map((art) => (
              <option key={art.id} value={art.id}>
                {art.name}
              </option>
            ))}
          </select>
        </label>
        <label
          htmlFor="Write article"
          className="flex flex-col font-semibold w-80"
        >
          <input
            required
            type="text"
            className="border border-black h-7 mt-10 placeholder:pl-2"
            placeholder="Tapez ici le nom de l'article"
            name="name"
            value={article.name}
            onChange={(e) => handleArticle(e.target.name, e.target.value)}
          />
        </label>
        <label
          htmlFor="Write article"
          className="flex flex-col font-semibold w-80"
        >
          <input
            required
            type="text"
            className="border border-black h-7 mt-10 placeholder:pl-2"
            placeholder="Lien de l'article"
            name="src"
            value={article.src}
            onChange={(e) => handleArticle(e.target.name, e.target.value)}
          />
        </label>
        <label className="flex flex-col font-semibold pt-5 pb-5 w-80">
          Oeuvres associée
          <select
            className="border border-black h-7"
            name="works_id"
            type="text"
            onChange={(event) =>
              handleArticle(event.target.name, +event.target.value)
            }
            value={article.works_id}
          >
            <option value="">Choisissez l'oeuvre a associer</option>
            {works.map((work) => (
              <option key={work.id} value={work.id}>
                {work.title}
              </option>
            ))}
          </select>
        </label>
        <div className="flex pt-10 pb-5 pr-10 gap-10">
          {!article.id && (
            <button type="submit" className="bg-black text-white py-2 px-4">
              Ajouter
            </button>
          )}
        </div>
      </form>
      {article.id && (
        <button
          type="button"
          className="bg-black text-white py-2 px-4"
          name="name"
          onClick={(e) => updateArticle(e)}
        >
          Modifier
        </button>
      )}

      {article.id && (
        <button
          type="button"
          className="bg-black text-white py-2 px-4"
          name="name"
          onClick={(e) => deleteArticle(e)}
        >
          Supprimer
        </button>
      )}
    </div>
  );
}

export default ArticlesAdmin;
