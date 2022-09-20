
// Fetch
import axios from "axios"

// Hooks
import { useEffect, useState } from "react"

// Styles
import Styles from "./HomeCards.module.scss"

// Function component
export const HomeCards = () => {
    //destructor af data. useState skal finde et array af data.
    const [data, setData] = useState([])

    // useEffect skal styre rendering når der sker en ændring.
    useEffect(() => {
        // Finder data i en asynkron funktion
        const getData = async () => {
            // Variable med resultat fra fetch med get-metode. (afventer, da den er asynkron.). Skal bruge 3 cards, så sætter limit til 3 i query-params
            const result = await axios.get('https://api.mediehuset.net/detutroligeteater/events?limit=3')
            // Setter data fra udtræk i api.
            setData(result.data.items)
        }
        // Funktionskald.
        getData();
    //Dependancy array som styrer rendering ved at holde øje med ændringer.
    }, [setData])

    // returnering i DOM

    return (
        <section className={Styles.sectionCards}>
            {/* mapper data */}
            {data && data.map((item) => {
                return (
                    <figure key={item.id}>
                        <img src={item.image} alt={item.title} />
                        <figcaption>
                            <article>
                                <div>
                                    <p style={{color: '#808080'}}>{item.stage_name}</p>
                                    <b style={{textTransform: "uppercase"}}>{item.startdate} - {item.stopdate}</b>
                                    <hr />
                                </div>
                                <div>
                                    <h2>{item.title}</h2>
                                    <p style={{color: '#808080'}}>{item.genre}</p>
                                </div>
                                <div className={Styles.btnContainer}>
                                    <button className={Styles.btnRead}>LÆS MERE</button>
                                    <button className={Styles.btnBuy}>KØB BILLET</button>
                                </div>
                            </article>
                        </figcaption>
                    </figure>
                )
            })}

        </section>
    )
}