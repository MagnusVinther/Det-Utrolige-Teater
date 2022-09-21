//Fetch
import axios from "axios"

//Hooks
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Layout } from "../../App/Layout/Layout"

//Styles
import Styles from "./ActorList.module.scss"

// Function Component.
const ActorList = () => {
    //Destructure af useState, så tilstanden kan administræres
    const [ actorList, setActorList ] = useState([])

    // Til styring af rendering.
    useEffect(() => {
        
        const getActorList = async () => {
            // Errorhandling
            try {
                const result = await axios.get('https://api.mediehuset.net/detutroligeteater/actors')
                setActorList(result.data.items)
            }
            // Udskriver i console hvor fejl er.
            catch (error) {
                console.log(error)
                console.log("fejl i getActorList fetch")
            }
        }

        // Funktionskald
        getActorList()
    }, [setActorList])

    return (
        // Generisk Layout
        <Layout title="Skuespiller side" description="liste af skuespillere" hidetitle={true}>
            {actorList && actorList.map(actor => {
                return (
                    <ActorListItem key={actor.id} data={actor} />
                )
            })}
        </Layout>
    )
}

const ActorListItem = props => {
    return (
        <div className={Styles.ActorListContainer}>
            <figure>
                <img src={props.data.image} alt={props.data.name} />
                <figcaption>
                    <h2>{props.data.name}</h2>
                    <p className={Styles.nl2br}>
                        {props.data.description.substring(0, 359)}
                        ... 
                        {/* senere en function */}
                    </p>
                </figcaption>
                <div className={Styles.goBtn}>
                    <button><Link to={`/actors/${props.data.id}`}>læs mere</Link></button>
                </div>
            </figure>
            <hr />
        </div>
    )
}

export { ActorList, ActorListItem}