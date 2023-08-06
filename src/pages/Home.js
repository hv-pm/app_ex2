import { useContext, useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import RocketList from '../components/RocketList';
import RocketsContext from '../context/rockets';
import CreditsButton from '../components/CreditsButton';
import Pagination from '../components/Pagination';
import React from 'react';

function Home() { 
    const { rockets, fetchRockets } = useContext(RocketsContext);
    const [curPage, setCurPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(2);

    useEffect (() => {
        fetchRockets();
    }, []);

    const lastPageIndex = curPage * itemsPerPage;
    const firstPageIndex = lastPageIndex - itemsPerPage;
    const curRockets = rockets.slice(firstPageIndex,lastPageIndex);

    return (
        <div>
            <div className="absolute"><NavBar/></div>
            <div className="h-screen w-screen bg-public">
                <RocketList curRockets={curRockets}/>
                <Pagination totalPosts={rockets.length} itemsPerPage={itemsPerPage} curPage={curPage} setCurPage={setCurPage}/>
                <CreditsButton />
            </div>
        </div>
    );
}

export default Home;



// import { Link } from "react-router-dom";

// function HomeTwo() { 
    
//     return (
//     <div>
//         <button className="w-30 h-10 bg-purple-500"><Link to={"/admin"}>VC DISSE OQ?</Link></button>
//     </div>
//     );
// }

// export default HomeTwo;

