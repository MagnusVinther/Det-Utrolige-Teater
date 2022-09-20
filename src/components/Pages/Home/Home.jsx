
import { Layout } from "../../App/Layout/Layout"

// Komponenter
import { HomeBanner } from "./HomeBanner"


export const Home = () => {
    return (
        <Layout title="Forside" description="Her er forsiden">

            <HomeBanner />
        </Layout>
    )
}
