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
    <section className="flex flex-col h-screen w-1/2 bg-bgLogin">
       <div className="flex flex-col items-center mt-40 h-90 w-full">
      <h2 className="text-3xl font-semibold pb-4">Congratulations!</h2>
      <div className="w-20% max-w-130px">
        <img src={CheckMarkIcon} alt="Check mark" />
      </div>
      <p className="font-sans text-sm w-60% text-center mb-0.2rem mt-0.2rem">
        We’ve sent a confirmation code to your email
      </p>
      <p className="font-sans text-sm w-60% text-center">{userEmail}</p>
        <button
          className="w-full max-w-md px-4 py-3 text-white mt-5 bg-ifOrange rounded hover:bg-orange-500 focus:outline-none"
          onClick={handleContinueClick}
        >
          CONTINUE
        </button>
       </div>
    </section>
  );
}

export default CongratsRight;


