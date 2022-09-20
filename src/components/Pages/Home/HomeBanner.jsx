
// Hooks
import { useEffect, useState } from 'react'

// Fetch
import axios from "axios"

// Styles
import Styles from "./HomeBanner.module.scss"

// Function Component til Home banner
export const HomeBanner = () => {
    // Destructure af data. Usestate skal finde et array.
    const [data, setData] = useState([])

    // UseEffect hook til at styre rendering af siden.
    useEffect(() => {
        // Vi skal fange data fra api. Gøres med en asynkron funktion.
        const getData = async () => {
            // try/catch til error handling
            try {
                // Variable med get resultat udtræk fra api. Skal kun bruge 1 udtræk og bruger limit=1 ( Query parameter )
                const result = await axios.get('https://api.mediehuset.net/detutroligeteater/events?limit=1')
                // setter data tilstand.
                setData(result.data.items)
            } 
            catch (err) {
                console.log(err)
                // for at fortælle hvor fejlen sker
                console.log("der er fejl i homebanner fetch")
            }
        }
        // Funktionskald.
        getData()
    // Dependancy array til at fortælle hvilke forandringer der skal lave en rendering.
    }, [setData])

    // Returnering i DOM
    return (
        // laver en section til banner
        <section className={Styles.sectionBanner}>
            {/* mapper data */}
            {data && data.map((item) => {
                return (
                    // Indsætter data i en figure med figcaption.
                    <figure key={item.id}>
                        <figcaption>
                            <article>
                                {/* inline-styling */}
                                <div>
                                    <p style={{color: '#808080'}}>{item.stage_name}</p>
                                    <b >{item.startdate} - {item.stopdate}</b>
                                    <hr />
                                </div>
                                <div>
                                    <h2>{item.title}</h2>
                                    <p style={{color: '#707070', fontSize: '2rem'}}>{item.genre}</p>
                                </div>
                            </article>
                        </figcaption>
                        <img src={item.image} alt={item.title} loading="lazy" />
                    </figure>
                )
            })}
        </section>
    )
}