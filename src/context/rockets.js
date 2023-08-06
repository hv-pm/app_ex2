import { createContext, useContext, useState } from "react";
import axios from 'axios';
import AuthContext from "./auth";
import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RocketsContext = createContext();

function RocketsProvider({children}){
    const [rockets, setRockets] = useState([]);
    const {authTokens} = useContext(AuthContext);

    const fetchRockets = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/rocket/');
        
        setRockets(response.data);
        
    } catch (error) {
        toast.error(`${error.response.status}: ${error.response.statusText}`, {position: toast.POSITION.TOP_CENTER});
        console.log(error.response);
        }
    };

    const addRocket = async (rocket) => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/rocket/create/', {
            name: rocket.name,
            description: rocket.description,
            height: rocket.height,
            diameter: rocket.diameter,
            mass: rocket.mass,
            image: rocket.image,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "Authorization": `Bearer ${authTokens.access}`
          }
        });

        const updateRockets = [
            ...rockets,
           response.data
        ];
        setRockets(updateRockets);
        if (response.status === 201){
            toast(`${rocket.name} blasting off at the speed of light!`, {position: toast.POSITION.TOP_CENTER});
        } 
    } catch (error) {
        toast.error(`${error.response.status}: ${error.response.statusText}`, {position: toast.POSITION.TOP_CENTER});
        console.log(error.response);
        }
    };

    const editRocketById = async (id, rocketChanges) => {
    try {
        const response = await axios.put(`http://127.0.0.1:8000/api/rocket/update/${id}`, {
            name: rocketChanges.name,
            description: rocketChanges.description,
            height: rocketChanges.height,
            diameter: rocketChanges.diameter,
            mass: rocketChanges.mass,
            image: rocketChanges.image,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "Authorization": `Bearer ${authTokens.access}`
          }
        });
        
        const updateRockets = rockets.map((rocket) => {
            if (rocket.id === id) {
                return { ...rockets, ...response.data}
            }
        
            return rocket;
    });

        setRockets(updateRockets);
        if (response.status === 200){
            toast(`${rocketChanges.name} repaired and blasting off!`, {position: toast.POSITION.TOP_CENTER});
        }

    } catch (error) {
        toast.error(`${error.response.status}: ${error.response.statusText}`, {position: toast.POSITION.TOP_CENTER});
        console.log(error.response);
        }
    };

    const deleteRocketById = async (id) => {
    try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/rocket/delete/${id}`, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "Authorization": `Bearer ${authTokens.access}`
          }
        });

        const updateRockets = rockets.filter ((rocket) => {
            return rocket.id !== id;
        });
        setRockets(updateRockets);
        if (response.status === 204){
            toast(`Fare thee well! You've done great!`, {position: toast.POSITION.TOP_CENTER});
        }

    } catch (error) {
        toast.error(`${error.response.status}: ${error.response.statusText}`, {position: toast.POSITION.TOP_CENTER});
        console.log(error.response);
        }
    };

    return <RocketsContext.Provider value={{rockets, fetchRockets, addRocket, editRocketById, deleteRocketById}}>
            {children}
        </RocketsContext.Provider>
}

export {RocketsProvider};
export default RocketsContext;