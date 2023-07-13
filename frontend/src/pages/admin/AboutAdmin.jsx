import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import connexion from "../../services/connexion";
import "react-toastify/dist/ReactToastify.css";

function AboutAdmin() {
  const aboutModel = {
    id: null,
    name: "",
    summary: "",
  };

  const [about, setAbout] = useState(aboutModel);

  const [abouts, setAbouts] = useState([]);

  const handleAbout = (name, value) => {
    setAbout({ ...about, [name]: value });
  };

  const notifyWrong = () =>
    toast("Un problème est survenu, veuillez recommencer.", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const notifyAdd = () =>
    toast("La section à propos a été correctement mise à jour.", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const notifyUpdate = () =>
    toast("La section à propos a été correctement mise à jour.", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const notifyDelete = () =>
    toast("La section à propos a été supprimée de la base de données.", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const getAbouts = async () => {
    try {
      const ab = await connexion.get("/about");
      setAbouts(ab);
    } catch (error) {
      notifyWrong();
      console.error(error);
    }
  };

  useEffect(() => {
    getAbouts();
  }, []);

  const refreshAbout = (id) => {
    if (id === "") {
      setAbout(aboutModel);
    } else {
      setAbout(abouts.find((ab) => ab.id === +id));
    }
  };

  const postAbout = async (event) => {
    event.preventDefault();
    try {
      await connexion.post("/about", about);
      setAbout(aboutModel);
      getAbouts();
      notifyAdd();
    } catch (err) {
      notifyWrong();
      console.error(err);
    }
  };

  const deleteAbout = async (event) => {
    event.preventDefault();
    try {
      await connexion.delete(`/about/${about.id}`);
      setAbout(aboutModel);
      getAbouts();
      notifyDelete();
    } catch (error) {
      notifyWrong();
      console.error(error);
    }
  };

  const updateAbout = async (event) => {
    event.preventDefault();
    try {
      await connexion.put(`/about/${about.id}`, about);
      getAbouts();
      notifyUpdate();
    } catch (error) {
      notifyWrong();
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <h1 className="text-right pr-5 pt-5 text-2xl font-bold">Page Admin</h1>
      <h2 className="text-xl font-bold p-4">Gestion du à propos</h2>
      <form className="ml-10" onSubmit={(event) => postAbout(event)}>
        <label className="flex flex-col font-semibold w-80 pb-5">
          <select
            className="border border-black h-7 mt-10"
            onChange={(event) => refreshAbout(event.target.value)}
            value={about.id}
          >
            <option value="">Choisir un à propos</option>
            {abouts.map((ab) => (
              <option key={ab.id} value={ab.id}>
                {ab.name}
              </option>
            ))}
          </select>
          <input
            className="border border-black h-7 mt-10 placeholder:pl-2"
            type="text"
            minLength={4}
            placeholder="Nom du commentaire"
            name="name"
            onChange={(event) =>
              handleAbout(event.target.name, event.target.value)
            }
            value={about.name}
          />
        </label>
        <label className="flex flex-col font-semibold w-80">
          Commentaire
          <textarea
            className="border border-black placeholder:pl-2"
            required
            placeholder="Tapez ici votre commentaire"
            minLength={20}
            name="summary"
            onChange={(event) =>
              handleAbout(event.target.name, event.target.value)
            }
            value={about.summary}
          />
        </label>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <div className="flex pt-10 pb-5 pr-10 gap-10">
          {!about.id && (
            <button type="submit" className="bg-black text-white py-2 px-4">
              Ajouter
            </button>
          )}
        </div>
      </form>
      <div className="flex justify-end pb-5 pr-10 gap-10">
        {about.id && (
          <button
            className="bg-black text-white py-2 px-4"
            type="button"
            onClick={(e) => deleteAbout(e)}
          >
            Supprimer
          </button>
        )}
        {about.id && (
          <button
            className="bg-black text-white py-2 px-4"
            type="button"
            onClick={(e) => updateAbout(e)}
          >
            Modifier
          </button>
        )}
      </div>
    </div>
  );
}

export default AboutAdmin;
