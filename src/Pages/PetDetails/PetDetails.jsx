import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { usePet } from "../../Contexts/PetContext/PetContext";
import { GridItem } from "../../Components/GridItem/GridItem";
import enableLost from "../../assets/images/enableLost.png";
import enableQR from "../../assets/images/enableQR.png";
import { useNavigate } from "react-router-dom";
import { useIsFetchedPets } from "../../Contexts/IsFetchedPets/IsFetchedPets";
import { useFetchPetById } from "../../Hooks/useFetchPetById/useFetchPetById";
import { ImSpinner2 } from "react-icons/im";
import defaultDog from "../../assets/images/DogProfilePfp.png";
import defaultCat from "../../assets/images/CatProfilePfp.png";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import petPhoto from '../../assets/images/petPhoto.png'
import addPetPhoto from '../../assets/images/addPetPhoto.png'
import { FooterNav } from "../../Components/FooterNav/FooterNav";
import { NavButton } from "../../Components/NavButton/NavButton";
import SharedImg from '../../assets/images/shared.png'
import LocationImg from '../../assets/images/Location.png'

export const PetDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { pet_id } = useParams();
  const [pet, setPet] = useState({});
  const [userData, setUserData] = useState(null);
  const fetchedPets = useIsFetchedPets();
  const { isFetchedPets } = fetchedPets ?? {};
  const pets = usePet();
  const navigate = useNavigate();
  const { findPet } = pets ?? {};
  const { getPetById, petResult } = useFetchPetById();

  const handleBackButton = () => {
    navigate('/home');
  }

  useEffect(() => {
    // Obtener datos del usuario del sessionStorage
    const storedUserData = sessionStorage.getItem("userData");
    if (storedUserData) {
      try {
        const parsedData = JSON.parse(storedUserData);
        setUserData(parsedData);
      } catch (error) {
        console.error("Error al parsear datos del usuario:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (!isFetchedPets) {
      trigguerGetId();
    }
  }, []);

  useEffect(() => {
    if (petResult) {
      setPet(petResult);
    } else {
      setPet(findPet(pet_id));
    }
  }, [petResult, isFetchedPets]);

  const trigguerGetId = () => {
    getPetById(pet_id);
  };

  const petDetails = [
    { title: "Género", subtitle: pet?.gender },
    { title: "Edad", subtitle: pet?.calculatedAge },
    { title: "Raza", subtitle: pet?.breed },
    { title: "Color", subtitle: pet?.color },
    { title: "Tipo", subtitle: pet?.species },
    { title: "Género", subtitle: pet?.gender },
  ];
  return (
    <>
      {pet ? (
        <section className="flex flex-col items-center  sm:py-12">
          <div className="w-full max-w-md sm:max-w-xl md:max-w-2xl bg-white p-4 sm:p-6">
            <div className="flex justify-center items-center  mt-4 w-screen">
                <div className="absolute left-0 ">
                  <NavButton onClick={handleBackButton}/>
                </div>
                <h1 className="text-center pr-10 text-xl sm:text-2xl font-bold text-gray-800">
                  Detalles de la Mascota
                </h1>
                <div className="absolute right-5">
                  <img className="w-6 h-6" src={SharedImg} alt="SharedImg" />
                </div>
              </div>

            <div className="mt-4">
            <div className="sm:m-10 flex justify-center items-center p-3 gap-6 sm:gap-12">
              <div
                onClick={() => navigate(`/scanner/${pet_id}`)}
                className="flex flex-col items-center cursor-pointer"
              >
                <img className="w-8 h-8 sm:w-10 sm:h-10" src={enableQR} alt="Activar QR" />
                <p className="text-xs text-center mt-1">Activar Código QR</p>
              </div>

              <img
                className="w-24 sm:w-32 h-24 sm:h-32 object-cover rounded-full"
                src={
                  pet?.profile_picture ||
                  (pet.species == "dog" ? defaultDog : defaultCat)
                }
                alt="pfp"
              />

              <div
                onClick={() => setIsModalOpen(true)}
                className="flex flex-col items-center cursor-pointer"
              >
                <img className="w-8 h-8 sm:w-10 sm:h-10" src={enableLost} alt="Pet is Lost" />
                <p className="text-xs text-center mt-1">Reportar como Perdida</p>
              </div>
            </div>
            

            {/* Pet details */}
            <div className="p-4 sm:p-6">
              <h1 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">{pet.name}</h1>
              <div className="flex items-center gap-2 mb-4 sm:mb-6">
                <img className="w-5 h-5" src={LocationImg} alt="Location" />
                <span className="text-gray-700 text-base sm:text-lg">
                  {userData?.city || 'Ciudad no especificada'}, {userData?.country || 'País no especificado'}
                </span>
              </div>
              <div className="grid grid-rows-2 grid-cols-3 gap-3 sm:gap-6">
                {petDetails.map((detail, index) => (
                  <GridItem
                    key={index}
                    title={detail.title}
                    subtitle={detail.subtitle}
                  />
                ))}
              </div>
              <div className="flex justify-center my-4 sm:m-5">
                <button 
                  onClick={()=>navigate(`/pet-profile/${pet_id}`)} 
                  className="bg-[#EC9126] text-white text-sm sm:text-base p-2 px-4 rounded-full hover:bg-orange-600 transition-colors"
                >
                  Editar Perfil
                </button>
              </div>
            </div>
            </div>

            {/* Galería de Imagenes de la Mascota */}
            <div className="p-4 sm:p-6">
              <h1 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                Galería de Imágenes
              </h1>
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                {[addPetPhoto, petPhoto, petPhoto, petPhoto].map((photo, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-center bg-[#F8FAFC] rounded-lg aspect-square"
                  >
                    <div className="flex items-center justify-center w-full h-full p-2">
                      <img 
                        src={photo} 
                        alt={`Pet photo ${index + 1}`} 
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>


          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-gray-200/30 backdrop-blur-md flex items-center justify-center z-50 px-4">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs sm:max-w-sm w-full text-center">
                <AiOutlineExclamationCircle className="text-red-500 text-3xl sm:text-4xl mx-auto mb-2" />
                <h2 className="text-base sm:text-lg font-semibold">
                  Reportar mascota perdida
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 mt-2">
                  Si reportas a tu mascota como perdida, cualquier persona que
                  escanee el QR podrá verlo.
                </p>
                <div className="mt-4 flex justify-center gap-3 sm:gap-4">
                  <button
                    className="bg-red-500 text-white text-sm sm:text-base px-3 sm:px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                    onClick={() => {
                      // Lógica para reportar como perdido
                      setIsModalOpen(false);
                    }}
                  >
                    Aceptar
                  </button>
                  <button
                    className="bg-gray-300 text-sm sm:text-base px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          )}
          <FooterNav  navigate={navigate}/>
        </section>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <ImSpinner2 className="animate-pulse text-[#EC9126] text-4xl" />
        </div>
      )}
    </>
  );
};
