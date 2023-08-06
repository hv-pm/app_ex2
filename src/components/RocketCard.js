import { useContext, useState } from 'react';
import RocketsContext from '../context/rockets';
import RocketForm from './RocketForm';
import { PencilIcon, PlusIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/solid'

function RocketCard({rocket, admin, add}) {
    const { deleteRocketById } = useContext(RocketsContext);
    const [showEdit, setShowEdit] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    const handleEdit = () => {
        setShowEdit(!showEdit);
    };

    const handleProfile = () => {
        setShowProfile(!showProfile);
    };
    
    let content = <></>;
    if (showEdit) {
        content = (
            <div className="absolute top-0 left-0 h-screen w-screen grid content-center">
                <div className="z-[1] absolute h-screen w-screen inset-0 opacity-80 bg-black"></div>
                <div className="z-[2] grid place-self-center w-[29rem] h-[29rem] sm:w-[40rem] sm:h-[29rem] bg-white shadow-md rounded">
                    <button className="justify-self-end pr-2" onClick={handleEdit}><XMarkIcon className="h-6 w-6 text-red-500"/></button>
                    <div className="z-[3] flex pb-[2rem] w-full h-full">
                        {add? <RocketForm curRocket={rocket} add/> : <RocketForm curRocket={rocket} edit/>}
                    </div>
                </div>
            </div>
        )
    } else if (showProfile) {
        content = (
            <div className="absolute top-0 left-0 h-screen w-screen grid content-center">
                <div className="z-[1] absolute h-screen w-screen inset-0 opacity-80 bg-black"></div>
                <div className="z-[2] grid place-self-center w-[29rem] h-[29rem] sm:w-[40rem] sm:h-[29rem] bg-white shadow-md rounded">
                <button className="justify-self-end pr-5" onClick={handleProfile}><XMarkIcon className="h-6 w-6 text-red-500"/></button>
                    <div className="z-[3] flex pb-[2rem] w-full h-full">
                        <RocketForm curRocket={rocket} profile/>
                    </div>
                </div>
            </div>
        )
    }

    const handleDelete = () => {
        deleteRocketById(rocket.id);
    };

    return (
        <>{admin ?  
            <>
                <div className="z-0 flex flex-col cardhover-animation max-h-[95%] bg-slate-300 drop-shadow-md rounded-2xl">
                    <div className="flex justify-end">
                        {add? 
                        <div>
                            <button onClick={handleEdit}><PlusIcon className="h-12 w-12 text-red-500"/></button>
                        </div> : 
                        <div className="grid place-items-center grid-flow-col-dense w-full grid-rows-2 sm:grid-rows-none sm:grid-cols-3 h-[5rem]">
                            <h2 className="block text-white text-sm font-bold cursor-pointer text-center pt-2 sm:col-span-2 rounded-r-2xl bg-red-500 h-10 w-full">
                                {add? <></> : rocket.name}
                            </h2>
                            <div className="grid w-full place-items-center grid-cols-2">
                                <div className="sm:px-1">
                                    <button className="iconhover-animation" onClick={handleEdit}><PencilIcon className="h-6 w-6 text-red-500"/></button>
                                </div>
                                <div className="sm:px-1">
                                    <button className="iconhover-animation" onClick={handleDelete}><TrashIcon className="h-6 w-6 text-red-500"/></button> 
                                </div>
                            </div>
                        </div>}
                    </div>
                </div>
                {content}
            </>: 
        <>
            <button className="h-full w-full cardhover-animation cursor-pointer max-h-[95%] flex flex-col justify-center bg-red-500 drop-shadow-md rounded-2xl" onClick={handleProfile}>
                <div className="h-full w-full self-center pb-10">
                    <div className="absolute inset-5 max-h-[60%] min-h-[30%] sm:max-h-[80%] bg-white rounded-2xl">
                        <img src={rocket.image? rocket.image : require("../img/rocketPlaceHolder.avif")} className="object-center object-none sm:object-cover w-[100%] h-[100%] rounded-2xl" alt="rocket submitted to the platform"/>
                    </div>
                </div>
                <h2 className="p-5 self-center text-white text-lg font-bold">{rocket.name}</h2>
            </button>
            {content}
        </>
        }
        </>
    );
}

export default RocketCard;