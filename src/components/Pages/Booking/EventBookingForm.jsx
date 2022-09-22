import axios from "axios"
import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom"
import { useAuth } from "../../App/Auth/Auth"
import Styles from "./EventBookingForm.module.scss"

import { useEffect, useState } from "react"
import styling from "./EventBookingSeats.module.scss"



export const Seats = ({event_id}) => {
    const [seatData, setSeatData] = useState([])

    useEffect(() => {
        const getData = async () => {
            try {
                const result = await axios.get(`https://api.mediehuset.net/detutroligeteater/seats/${event_id}`)
                setSeatData(result.data.items)
            }
            catch (error) {
                console.log(error)
                console.log("der er fejl i seats fetch")
            }
        }
        getData()

    }, [event_id])


    return (

        <section className={styling.seatsContainer}>
        {seatData && seatData.map((seat) => {
                return (
                        <div key={seat.id}>
                            <input type="checkbox" name="seats[]" value={seat.id} />{seat.id}
                        </div>
                )
   
                
            })}
            </section>
    )
}
export const EventBookingForm = () => {
    const { event_id } = useParams()
    const { loginData } = useAuth()

    const { register,  handleSubmit, formState: {errors} } = useForm()

    const submitForm = async (data, e) => {

        const endpoint = "https://api.mediehuset.net/detutroligeteater/reservations"
        const options = {
            headers: {
                Authorization: `Bearer ${loginData.access_token}`
            }
        }
        const formData = new FormData(e.target)
        console.log(`dit event id er: ${event_id}`)
        console.log(...formData)
        // Appender ønsket data til form
        formData.append('event_id', event_id)
        formData.append('firstname', data.firstname)
        formData.append('lastname', data.lastname)
        formData.append('address', data.address)
        formData.append('zipcode', data.zipcode)
        formData.append('city', data.city)
        formData.append('email', data.email)
        
        const result = await axios.post(endpoint, formData, options)
        if(result.data.status) {
            console.log('Godkendt reservation')
        }
        else {
            console.log("Fejl i booking form post submit")
        }
    }
    
    // console.log(`dit event id er ${event_id}`)
    return (
        // Closure på onSubmit
        <form onSubmit={handleSubmit(submitForm)} className={Styles.bookingForm}>
            {/* <input type="hidden" name="event_id" value={event_id} /> */}

            <div className={Styles.formDiv}>
                <label htmlFor="firstname">Fornavn: </label>
                <input type="text" id="firstname" placeholder="Fornavn" 
                {...register("firstname", {
                    required: true,
                    pattern: /^[A-Za-z]+$/i
                })} />
            </div>
                {errors.firstname && errors.firstname.type === "required" && <span>Indtast Fornavn</span>}
                {errors.firstname && errors.firstname.type === "pattern" && <span>Indtast Fornavn.. uden tal</span>}

            <div className={Styles.formDiv}>
                <label htmlFor="lastname">Efternavn: </label>
                <input type="text" id="lastname" placeholder="Efternavn" 
                {...register("lastname", {
                    required: true,
                    pattern: /^[A-Za-z]+$/i
                })} />
            </div>
                {errors.lastname && errors.lastname.type === "required" && <span>Indtast Efternavn</span>}
                {errors.lastname && errors.lastname.type === "pattern" && <span>Indtast Efternavn.. uden tal</span>}

            <div className={Styles.formDiv}>
                <label htmlFor="address">Vejnavn: </label>
                <input type="text" id="address" placeholder="Addresse" 
                {...register("address", {
                    required: true
                })} />
            </div>
                {errors.address && errors.address.type === "required" && <span>Indtast Vejnavn</span>}


            <div className={Styles.formDiv}>
                <label htmlFor="zipcode">Post nr.: </label>
                <input type="number" id="zipcode" placeholder="postnummer" 
                {...register("zipcode", {
                    required: true,
                    pattern: /[0-9]*/i,
                    maxLength: 4
                })} />
            </div>
                {errors.zipcode && errors.zipcode.type === "required" && <span>Indtast postnr.</span>}
                {errors.zipcode && errors.zipcode.type === "pattern" && <span>Postnummer er ugyldigt, brug kun tal</span>}
                {errors.zipcode && errors.zipcode.type === "maxLength" && <span>Postnummer er for langt</span>}

            <div className={Styles.formDiv}>
                <label htmlFor="city">By: </label>
                <input type="text" id="city" placeholder="By" 
                {...register("city", {
                    required: true,
                    pattern: /^[A-Za-z]+$/i
                })} />
            </div>
                {errors.city && errors.city.type === "required" && <span>Indtast By</span>}
                {errors.city && errors.city.type === "pattern" && <span>By er ugyldig, brug kun bogstaver </span>}

            <div className={Styles.formDiv}>
                <label htmlFor="email">Email: </label>
                <input type="email" id="email" placeholder="email" 
                {...register("email", {
                    required: true,
                    // pattern: /^[A-Za-z]+$/i
                })} />
            </div>
                {errors.email && errors.email.type === "required" && <span>Indtast email</span>}
                {/* {errors.email && errors.email.type === "pattern" && <span>By er ugyldig, brug kun bogstaver </span>} */}

            <br />
            <hr />
            <section className={Styles.seatContainer}>
                {/* <Seats /> */}
                
            </section>
            <hr />

            <section className={styling.seatsContainer}>
                <Seats event_id={event_id} />
            </section>
            <button>Godkend bestilling</button>

        </form>
    )
}

