import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CheckMarkIcon from "../../Assets/Icons/checkmark.svg";
import { signUpEmail} from "../../Redux/Slices/signUpEmailAddress"; 


function CongratsRight() {
  const navigate = useNavigate();
  const userEmail = useSelector((store) => store.signupemail); 

  //navigate to verification page
  const handleContinueClick = () => {
    navigate("/verification");
  };

  return (
    <section className="flex flex-col items-center  h-screen w-1/2 bg-bgLogin">
      <h2 className="text-2xl font-normal mt-20%">Congratulations!</h2>
      <div className="w-20% max-w-130px">
        <img src={CheckMarkIcon} alt="Check mark" />
      </div>
      <p className="font-sans text-xs w-60% text-center mb-0.2rem mt-0.2rem">
        We’ve sent a confirmation code to your email
      </p>
      <p className="font-sans text-xs w-60% text-center">{userEmail}</p>
      <button
        className="px-6 py-1.2 rounded-full bg-ifOrange text-white text-xs font-sans tracking-wider mt-12% focus:outline-none hover:cursor-pointer"
        onClick={handleContinueClick}
      >
        CONTINUE
      </button>
      <div className="flex justify-center mt-8%">
        <svg className="h-20 w-20">
          <circle
            cx="8"
            cy="8"
            r="0.3rem"
            fill="white"
            stroke="rgba(0, 0, 0, 0.2)"
            strokeWidth="2"
          />
        </svg>
        <svg className="h-20 w-20">
          <circle cx="8" cy="8" r="0.3rem" fill="black" stroke="black" />
        </svg>
        <svg className="h-20 w-20">
          <circle
            cx="8"
            cy="8"
            r="0.3rem"
            fill="white"
            stroke="rgba(0, 0, 0, 0.2)"
            strokeWidth="2"
          />
        </svg>
      </div>
    </section>
  );
}

export default CongratsRight;
