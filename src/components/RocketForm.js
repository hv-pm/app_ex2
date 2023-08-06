import { useContext, useState } from "react";
import RocketsContext from "../context/rockets";

const RocketForm = ({add, edit, profile, curRocket}) => { 
    const {addRocket, editRocketById} = useContext(RocketsContext);
    const [rocket, setRocket] = useState(add ? {
        name: '',
        description: '',
        height:'',
        diameter:'',
        mass: '',
        image:'',
    } : curRocket);

    const handleChange = (event) => {
        setRocket({
        ...rocket,
         [event.target.id]: event.target.value
        });
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setRocket({
            ...rocket,
             [event.target.id]: {file}
            });
            console.log(rocket);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (add) {
            addRocket(rocket);
            setRocket({
                name: '',
                description: '',
                height:'',
                diameter:'',
                mass: '',
                image:'',
            });
        } else if (edit) {
            editRocketById(rocket.id, rocket);
        }
    };

    const labelClasses = "block text-gray-700 text-sm font-bold cursor-pointer";
    const inputClasses = "shadow appearance-none border rounded mb-2 w-[80%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
    const buttonClasses = "shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded";
    const fileClasses = buttonClasses + " w-[14rem] lg:w-[18rem]";

    return (
    <div className="w-full h-full">
        <form className="w-full h-full" onSubmit={handleSubmit}>
            <div className="flex flex-wrap justify-evenly content-center w-full h-full">
                <div className="flex flex-col">
                    <label className={labelClasses} htmlFor="image">Image</label>
                    <img className="mb-2 h-[19rem] w-[13rem] sm:flex sm:w-[14rem] md:w-[18rem] object-contain" src={rocket.image ? rocket.image : require("../img/rocketPlaceHolder.avif")} alt="a rocket"></img>
                        {profile ? <></> : 
                        <>
                            <input id='image' className={fileClasses} type='file' accept='image/*' onChange={handleFileChange}></input>
                        </>
                        }
                </div>
                <div className="flex flex-col">
                    <div>
                        <label className={labelClasses} htmlFor='name'>Name</label>
                        {profile ? <input className={inputClasses} id='name' type='text' value={rocket.name} onChange={handleChange} readOnly></input>:
                        <input className={inputClasses} id='name' type='text' value={rocket.name} onChange={handleChange} required></input>}
                    </div>
                    <div>
                        <label className={labelClasses} htmlFor='description'>Description</label>
                        {profile ? <input className={inputClasses} id='description' type='text' value={rocket.description} onChange={handleChange} readOnly></input>:
                        <input className={inputClasses} id='description' type='text' value={rocket.description} onChange={handleChange}></input>}
                    </div>
                    <div>
                        <div>
                            <label className={labelClasses} htmlFor='height'>Height</label>
                            {profile ? <input className={inputClasses} id='height' type='number' min="0" value={rocket.height} onChange={handleChange} readOnly></input>:
                            <input className={inputClasses} id='height' type='number' min="0" value={rocket.height} onChange={handleChange} ></input>}
                        </div>
                        <div>
                            <label className={labelClasses} htmlFor='diameter'>Diameter</label>
                            {profile ? <input className={inputClasses} id='diameter' type='number' min="0" value={rocket.diameter} onChange={handleChange} readOnly></input>:
                            <input className={inputClasses} id='diameter' type='number' min="0" value={rocket.diameter} onChange={handleChange}></input>}
                        </div>
                        <div>
                            <label className={labelClasses} htmlFor='mass'>Mass</label>
                            {profile ? <input className={inputClasses} id='mass' type="number" min="0" value={rocket.mass} onChange={handleChange} readOnly/>:
                            <input className={inputClasses} id='mass' type="number" min="0" value={rocket.mass} onChange={handleChange}/>}
                        </div>
                    </div>
                    {profile ? <></> : 
                    <>
                        <button className={buttonClasses}>{add ? <>Create Rocket!</> : <>Save Changes!</>}</button>
                    </>
                    }
                </div>
            </div>
        </form>
    </div>
    );
}

RocketForm.propTypes = {
    checkVariationValue: ({ add, edit, profile }) => {
        const count = Number(!!add) + Number(!!edit) + Number(!!profile)
        if (count > 1) {
            return new Error('The Form can only assume one function at a time (add, edit or profile)!')
            }
        },
};

export default RocketForm;
