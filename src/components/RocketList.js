import RocketShow from './RocketShow';
import RocketCard from './RocketCard';

const RocketList = ({admin, curRockets}) => {
    const classnames = admin ? "h-full w-full grid grid-cols-4 auto-rows-max pb-20 pt-20 p-4 gap-4" : "h-full w-full grid grid-cols-1 pb-20 pt-20 p-16 gap-16 sm:grid-cols-2 sm:p-20 sm:gap-20 md:pb-20 md:pt-20 md:p-24 md:gap-24 lg:pt-20 lg:pb-20 lg:p-32 lg:gap-32"

    const rocketinhos = curRockets;
    const renderedRockets = rocketinhos.map((rocket) => {
        return <RocketShow key={rocket.id} rocket={rocket} admin={admin}/>;
    });

    return (
            <div id="container" className={classnames}> 
                {admin? <RocketCard admin add/> : <></>}
                {renderedRockets}        
            </div>
    );
}

export default RocketList;