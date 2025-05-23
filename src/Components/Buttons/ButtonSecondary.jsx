import { useNavigate } from 'react-router-dom'

export const ButtonSecondary = ({path, text}) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(path)} 
      className="w-full max-w-md bg-gray-100 text-brand text-lg py-3 rounded-full mt-5 font-medium inset-shadow-sm">
        {text}
    </button>
  )
}
