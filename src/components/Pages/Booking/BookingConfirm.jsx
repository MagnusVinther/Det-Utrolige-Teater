import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useAuth } from "../../App/Auth/Auth"
import { Layout } from "../../App/Layout/Layout"
import Styles from "./BookingConfirm.module.scss"


export const BookingConfirm = () => {
    // const { event_id } = useParams(0)
    const { reservation_id } = useParams(0)
    const [ productData, setProductData] = useState([])
    const { loginData } = useAuth()

    useEffect(() => {
        const getProductData = async () => {
            const endpoint = `https://api.mediehuset.net/detutroligeteater/reservations/${reservation_id}`
            const options = {
                headers: {
                    Authorization: `Bearer ${loginData.access_token}`
                }
            }
            try {
                const result = await axios.get(endpoint, options)
                setProductData(result.data.items)
                // console.log(...result.data)
                console.log(result.data.item)

            }
            catch (error) {
                // console.log(error)
                console.log("fejl i fetch")
            }
            
            
        }
        getProductData()
    }, [reservation_id, loginData.access_token])

    return (
        
        <Layout title="Billetkøb" description="Godkend dit billetkøb" hidetitle="true">

            {productData ?
            (   
                <section className={Styles.ticketForm}>
                    <figure>
                        <img src={productData.image} alt={productData.title} />
                        <figcaption>
                            <h1>Godkend ordre</h1>
                            <hr />
                            <h2>PRODUKTER:</h2>
                            <b>FORESTILLING: {productData.stage_name}</b>

                        </figcaption>
                    </figure>

                </section>

            ) : null }

        </Layout>
    )
}