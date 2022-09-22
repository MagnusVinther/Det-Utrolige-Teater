
// fetch
import axios from "axios";

// Hooks
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

// Komponenter
import { useAuth } from "../../App/Auth/Auth";
import { Login } from "../Login/Login";



// Laver en function component som skal vise Admin-side, hvor man kan se liste over comments, og redigerer.
export const MyPage = () => {
    // LoginData Kontekst destructure
    const { loginData } = useAuth()
    // Params content/product ID destructure
    const { event_id } = useParams()
    // Tilstands deconstructor på reservationData
    const [reservationData, setReservationData] = useState([]) // Fanger et Array

    //useEffect hook til at hente api data
    useEffect(() => {
        // asynkron function da den skal trække fra api.
        const getReservations = async () => {
            // Laver er en options variable til at transporterer header properties og give adgang til token
            const options = {
                headers: {
                    Authorization: `Bearer ${loginData.access_token}`
                }
            }
            // Error handling try/catch.
            try {
                // Endpoint relativt til hvad man vil finde
                const endpoint = `https://api.mediehuset.net/detutroligeteater/reservations`
                // result med get-metode med endpoint og options properties
                const result = await axios.get(endpoint, options)
                    // if-betingelse. Hvis "true" så skal den give reservationData nye værdier fra api
                    if(result.data.items) {
                        // reverse funktion laver omvendt rækkefølge i udtræk. (closure?)
                        setReservationData(result.data.items.reverse())
                        console.log(result.data.items)
                    }
            }
            // Fortæller hvor fejlen sker.
            catch(err) {
                console.error(`Fejl i fetch af reservationer på min side: ${err}`)
            }
        }

        // Findes loginData.access_token så laves et funktionskald på getReservations.
        if(loginData.access_token) {
            getReservations()
        }
    // Dependency array som fortæller at der først skal renderes når der sker en ændring i access token eller i forhold til indholdet
    }, [loginData.access_token, event_id]) // event_id relativt til hvad man leder efter. !!

    // Delete metode
    const deleteReservation = async (reservation_id) => {
        const options = {
            headers: {
                Authorization: `Bearer ${loginData.access_token}`
            }
        }

        // If-betingelse (vil du slette?)
        if(window.confirm("vil du virkelig slette denne reservation?")) {
            // Laver endpoint for relativ reservation
            const endpoint = `https://api.mediehuset.net/detutroligeteater/reservations/${reservation_id}`
            // Result slettes udfra endpoint, og autoriseres af options.
            const result = await axios.delete(endpoint, options)
                // If-betingelse som får siden til at refresh når en reservation slettes. reservationen bliver nemlig ikke fjernet før siden er blevet genindlæst.
                if(result.status) (
                    window.location.reload(false)
                )
        }
    }


    // Dom return
    return loginData.access_token ? (
        <table className="CommentListTable"> 

        <thead>
            <tr>
                <th>Dato og tid</th>
                <th>Forestilling</th>
                <th>Scene</th>
                <th>Antal</th>
                <th>Pris</th>
                <th>Rediger</th>
            </tr>
        </thead>
        

        <tbody>
        {reservationData && reservationData.map(item => {
            return (
                <tr key={item.id}>
                {/* <input type="hidden" name="event_id" value={event_id}></input> */}

            {/* <td>{item.}</td> */}
                
            <td> {/* table data-cell */}
                {/* icon/knap til at redigerer */}
                <span title="rediger">
                    <Link to={`/login/${item.id}`}>&#9998;</Link>
                </span>

                {/* icon/knap til at slette */}
                <span title="slet">
                    <Link to="#" onClick={() => deleteReservation(item.id)}>&#128465;</Link>
                </span>
            </td>
            </tr>
            )
        })}
        </tbody>

        </table>
    ) : (
        <>
            <p>Du skal være logget ind for at kunne se admin-panel</p>
            <Login />
        </>
    )
}
