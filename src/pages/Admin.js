import CreditsButton from "../components/CreditsButton";
import RocketList from "../components/RocketList";
import NavBar from "../components/NavBar";
import { useContext, useEffect, useState } from "react";
import RocketsContext from "../context/rockets";
import Pagination from "../components/Pagination";

function Admin() {
    const { rockets, fetchRockets } = useContext(RocketsContext);
    const [curPage, setCurPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(15);

    useEffect (() => {
        fetchRockets();
    }, []);

    const lastPageIndex = curPage * itemsPerPage;
    const firstPageIndex = lastPageIndex - itemsPerPage;
    const curRockets = rockets.slice(firstPageIndex,lastPageIndex);

    return (
        <div>
            <div className="absolute"><NavBar admin/></div>
            <div className="h-screen w-screen bg-admin">
                <RocketList curRockets={curRockets} admin/>
                <Pagination totalPosts={rockets.length} itemsPerPage={itemsPerPage} curPage={curPage} setCurPage={setCurPage}/>
                <CreditsButton />
            </div>
        </div>
    );
}

export default Admin;
