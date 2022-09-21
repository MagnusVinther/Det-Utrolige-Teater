import { Layout } from "../../App/Layout/Layout";
import { ActorList } from "./ActorList";

export const Actors = () => {
    return (
        <Layout title="Skuespillere" description="Her kan man se alle skuespillere" hidetitle="true">
        
            <ActorList />
        </Layout>
    )
}