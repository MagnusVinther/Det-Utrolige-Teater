import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import Styles from "./EventActors.module.scss"


export const EventActors = () => {
    const { event_id } = useParams(0)
    const [ actorList, setActorList ] = useState([])

    useEffect(() => {
        const getActorList = async () => {
            const result = await axios.get(`https://api.mediehuset.net/detutroligeteater/events/${event_id}`)
            setActorList(result.data.item.actors)
        }
        getActorList()
    },[event_id])

    return (
        <div className={Styles.actorGallery}>
        {actorList && actorList.map(item => {
            return (
                <figure key={item.id} className={Styles.actorCard}>
                    <Link to={`/actors/${item.id}`}>
                        <img src={item.image} alt="#" />
                    </Link>
                    <figcaption>
                        <h2>{item.name}</h2>
                    </figcaption>
                </figure>
            )
        })}
        </div>
    )
}