import catDefault from "../../assets/images/CatProfilePfp.png";
import dogDefault from "../../assets/images/DogProfilePfp.png";

export const ProfilePetSection = ({pet, navigate})=> {
    
    return(
        <div onClick={()=> navigate(`/pet-details/${pet._id}`)} className="w-18 h-18 rounded-full border-2 border-gray-300">
            <img key={pet._id} src={pet.profile_picture || (pet.species == 'cat'? catDefault: dogDefault)} alt={pet.name} className="rounded-full w-18 h-18 object-cover" />
            <p className="text-center pt-2">{pet.name}</p>
        </div>
    )
}