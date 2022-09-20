
import { Layout } from "../../App/Layout/Layout"

// Komponenter
import { HomeBanner } from "./HomeBanner"
import { HomeCards } from "./HomeCards"


export const Home = () => {
    return (
        <Layout title="Forside" description="Her er forsiden">

            <HomeBanner />
            <HomeCards />
        </Layout>
    )
}
