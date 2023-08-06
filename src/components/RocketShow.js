import RocketCard from "./RocketCard";

function RocketShow({ rocket, admin }){
    return (
            <RocketCard rocket={rocket} admin={admin}/>
    );
}

export default RocketShow;