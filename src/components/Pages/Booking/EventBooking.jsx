
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import { useAuth } from "../../App/Auth/Auth"
import { Layout } from "../../App/Layout/Layout"
import { Login } from "../Login/Login"
import { EventBookingForm } from "./EventBookingForm"
import Styles from "./EventBooking.module.scss"
// import { Seats } from "./EventBookingSeats"

export const EventBooking = () => {
    const { loginData } = useAuth()
    const { event_id } = useParams()
    const [ eventData, setEventData ] = useState([])

    useEffect(() => {
        const getEventData = async () => {
            try {
                const result = await axios.get(`https://api.mediehuset.net/detutroligeteater/events/${event_id}`)
                setEventData(result.data.item)
            }
            catch (error) {
                console.log(error)
                console.log("Der er fejl i getEventData fetch til Booking")
            }
        }
        getEventData()
    }, [event_id])

    return (
        <Layout title="Køb Billet" description="Her kan du købe billet" hidetitle="true">
            {loginData && loginData.access_token ?
            (
                <div>
                    <p>køb billet her</p>
                    <figure key={eventData.id} className={Styles.mainFigure}>
                        <img src={eventData.image} alt={eventData.title} />
                        <figcaption>
                            <h1>Køb billet</h1>
                            <hr />
                            <div>
                                <b>{eventData.title}</b>
                                <p>{eventData.stage_name} {eventData.startdate} {eventData.starttime}</p>
                            </div>
                            <EventBookingForm />

                        </figcaption>
                    </figure>
                </div>
            ) : (
                <div>
                    <b style={{fontSize:"2vw", color:"red", fontFamily:"Titillium Web"}}>Du skal logge ind for at kunne booke en billet..</b>
                    <Login />
                </div>
            )}
        </Layout>
    )
    
}