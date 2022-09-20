import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Layout } from "../../App/Layout/Layout"
import Styles from "./EventDetails.module.scss"
import { EventActors } from "./EventActors"


export const EventDetails = () => {
    //destructure til event ID med useParams
    const { event_id } = useParams(0)
    //useState destructure for at finde et objekt
    const [ eventData, setEventData ] = useState([])

    //UseEffect til at styrer rendering af siden.
    useEffect(() => {
        //Api udtræk
        const getEventData = async () => {
            //error handling i try/catch
            try {
                // gemmer udtræk i result variable
                const result = await axios.get(`https://api.mediehuset.net/detutroligeteater/events/${event_id}`)
                setEventData(result.data.item)
            }
            catch (err) {
                console.log(err)
                console.log("der er fejl i fetch på details")
            }
        }
        // Funktionskald
        getEventData()
    // Dependancy array som holder øje med ændringer - hvis noget ændres skal siden renderer.
    }, [event_id])

    return (
        <Layout title="Skuespillere">
                {/* Ternary operator som viser side hvis der er noget at vise */}
                {eventData ? (
                <section className={Styles.sectionEventDetails}>
                    <figure key={eventData.id}>
                        <img src={eventData.image_large} alt={eventData.title} className={Styles.heroImg} />

                        <figcaption>
                            <article>
                                    <div className={Styles.articleHeader}>
                                        <div>
                                            <h4>{eventData.stage_name}</h4>
                                            <h3>{eventData.startdate} - {eventData.stopdate}</h3>
                                        </div>
                                        <b style={{textAlign: "right"}}>Billetpris: {eventData.price} DKK</b>
                                    </div>
                                    <hr />
                                <h1>{eventData.title}</h1>  
                                <h2>{eventData.genre}</h2>
                                <p className={Styles.nl2br}>{eventData.description}</p>
                            </article>
                            
                            <h3>Medvirkende</h3>
                            <EventActors />
                                
                        </figcaption>
                    </figure>
                </section>
                ) : null }
        </Layout>
    )
}