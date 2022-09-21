import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Layout } from "../../App/Layout/Layout"
import Styles from "./EventList.module.scss"



const EventList = () => {
    const [eventsData, setEventsData] = useState([])

    useEffect(() => {

        const getEventList = async () => {
            const result = await axios.get('https://api.mediehuset.net/detutroligeteater/events')
            setEventsData(result.data.items)
        }
        getEventList()
    }, [setEventsData])

    return (
        <Layout title="Events" description="Her kan man se alle events" hidetitle={true}>
            {eventsData && eventsData.map(event => {
                return (
                    <EventListItem key={event.id} data={event} />
                )
            })}
        </Layout>
    )
}

const EventListItem = props => {
    return (
        <div className={Styles.EventListContainer}>            
                <figure>
                    <img src={props.data.image_small} alt={props.data.title} />
                    <figcaption>
                        <div>
                            <h2>{props.data.title}</h2>
                        </div>

                        <div className={Styles.verticalLine}></div>

                        <div>
                            <p>{props.data.stage_name}</p>
                            <b>{props.data.startdate} - {props.data.stopdate}</b>
                        </div>
                        <div>
                            <button className={Styles.btnRead}><Link to={`/events/${props.data.id}`}>læs mere</Link></button>
                            <button className={Styles.btnBuy}>køb billet</button>
                        </div>
                    </figcaption>
                </figure>
        </div>
    )
}

export { EventList, EventListItem }