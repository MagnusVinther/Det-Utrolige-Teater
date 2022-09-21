import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Layout } from "../../App/Layout/Layout"
import Styles from "./ActorDetails.module.scss"


export const ActorDetails = () => {

    //Destructure actor_id som senere skal bruges til at fange et id i URL gennem useParams hook
    const { actor_id } = useParams(0)

    //Destructure af useState hook så tilstandsværdi kan settes. (Objekt)
    const [ actorData, setActorData ] = useState([])

    //useEffect til styring af rendering.
    useEffect(() => {

        //Asynkron funktion til at indhente API data
        const getActorData = async () => {

            //Errorhandling til at vide hvor fejl sker.
            try {
                
                //gemmer resultat i en variable
                const result = await axios.get(`https://api.mediehuset.net/detutroligeteater/actors/${actor_id}`)

                //Setter resultat i tilstanden
                setActorData(result.data.item)
            }

            //Fanger hvis fejl..
            catch(error) {
                console.log(error)
                console.log("Der er fejl i ActorDetails fetch")
            }

        }
        //Funktionskald
        getActorData()
    //Dependancy array som holder øje med ændringer i url linjen
    }, [actor_id])

    //returnering i DOMen
    return (
        <Layout title="Skuespillere" description="underside til skuespillere" hidetitle="true">
            {/* Indsætter ternary operator til at vise noget HVIS det findes. */}
            {actorData ?
            (
                <div className={Styles.ActorDataContainer}>
                    <article>
                        <header>
                            <h1>Skuespillere</h1>
                        </header>
                    <figure key={actorData.id}>
                        <img src={actorData.image} alt={actorData.name} />
                        <figcaption>
                            <h2>{actorData.name}</h2>
                            <p>
                                {actorData.description}
                            </p>
                        </figcaption>
                    </figure>
                    </article>

                    <div className={Styles.goBtn}>
                        <button ><Link to={'/actors'}>alle skuespillere</Link></button>
                    </div>
                </div>

            ) : null}
        </Layout>
    )
}