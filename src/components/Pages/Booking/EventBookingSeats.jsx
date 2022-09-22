// import axios from "axios"
// import { useEffect, useState } from "react"
// import { useParams } from "react-router-dom"
// import Styles from "./EventBookingSeats.module.scss"



// export const Seats = () => {
//     const [seatData, setSeatData] = useState([])
//     const {event_id} = useParams(0)

//     useEffect(() => {
//         const getData = async () => {
//             try {
//                 const result = await axios.get(`https://api.mediehuset.net/detutroligeteater/seats/${event_id}`)
//                 setSeatData(result.data.items)
//             }
//             catch (error) {
//                 console.log(error)
//                 console.log("der er fejl i seats fetch")
//             }
//         }
//         getData()

//     }, [event_id])


//     return (

//         <section className={Styles.seatsContainer}>
//             {seatData && seatData.map((seat) => {
//                 return (
//                     // <div key={items.line}>
//                         <div key={seat.id}>
//                             <input type="checkbox" id="seats[]" value={seat.id} {...register} />{seat.id}
//                         </div>
//                     // </div>
//                 )
   
                
//             })}
//         </section>
//     )
// }