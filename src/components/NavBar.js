import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/auth";
import { RocketLaunchIcon } from "@heroicons/react/24/outline";

function NavBar({admin}) { 
    const {user, logoutUser} = useContext(AuthContext);
    
    const handleClick = () => {
        logoutUser();
    }

    const h1Classes="absolute top-3 sm:top-1 left-3 text-white text-sm sm:text-lg font-mono font-bold italic";
    const buttonColor = admin && user? " border-slate-700 text-slate-700" : " border-red-700 text-red-700";
    const buttonClasses="absolute top-2 right-3 bg-white border-2 h-6 w-20 rounded-xl text-sm font-bold" + buttonColor;
    const navBarColor = admin && user ? " bg-slate-400" : " bg-red-500";
    const navBarClasses = "flex shadow-md justify-center w-screen h-10" + navBarColor;
    const circleColor = admin && user? " bg-slate-400": " bg-red-500";
    const navBarCircleClasses="-top-4 flex items-center hover:w-30 h-16 w-16 rounded-full" + circleColor;
    const rocketColor = admin && user? " text-slate-400": " text-red-500";
    const rocketIconClasses = "h-8 w-8" + rocketColor;

    return <div className={navBarClasses}>
        {admin && user ? 
        <>
            <h1 className={h1Classes}>⋙ {user.username} is orbitating!</h1>
            <Link to="/"><button className={buttonClasses}  onClick={handleClick}>Sign Out</button></Link>
        </> :
        <>
            <h1 className={h1Classes}>⋙ Rocketinho?!</h1>
            <Link to="/signin"><button className={buttonClasses}>Sign In</button></Link>
        </>}
        <div className={navBarCircleClasses}></div>
        <div className="absolute grid place-items-center top-2 h-12 w-12 bg-white rounded-full">
            <span className="rocket-animation"><RocketLaunchIcon className={rocketIconClasses}/></span>
        </div>
    </div>;
}

export default NavBar;