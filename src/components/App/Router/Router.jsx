// Routing
import { Routes, Route } from 'react-router-dom'

// Pages og komponenter
import { Home } from "../../Pages/Home/Home"
import { Events } from "../../Pages/Events/Events"
import { EventDetails } from '../../Pages/Events/EventDetails'
import { Actors } from '../../Pages/Actors/Actors'
import { ActorDetails } from '../../Pages/Actors/ActorDetails'
import { Login } from '../../Pages/Login/Login'
import { EventBooking } from '../../Pages/Booking/EventBooking'
// import { AdminPage } from '../../Pages/Admin/AdminPage'
// import { AdminControl } from '../../Pages/Admin/AdminControl'

// Function Component til styring af pages og pathing
export const AppRouter = () => {
    return (
        <Routes>
            <Route index element={<Home />}></Route>
            <Route path="/events">
                <Route index element={<Events />}></Route>
                <Route path=":event_id" element={<EventDetails />}></Route>
                <Route path=":event_id/booking" element={<EventBooking />}></Route>
            </Route>
            <Route path="/actors">
                <Route index element={<Actors />}></Route>
                <Route path=":actor_id" element={<ActorDetails />}></Route>
            </Route>
            <Route path='/login' element={<Login />}></Route>

            {/* Content er igen en placeholder for en side hvori der skal laves api kald */}
            {/* <Route path='/content'>
                <Route index element={<Content />}></Route>
                <Route path='*1'>
                    <Route index element={<ContentList />}></Route>
                    <Route path='*2' element={<ContentDetails />}></Route>
                </Route>
            </Route>
            
            <Route path='/admin' element={<AdminPage />}></Route>
            <Route path="/admin/:comment_id" element={<AdminControl />}></Route> */}
        </Routes>
    )
}


// *1 = :defineret_desctructured_useParams_i_ContentList
// *2 = :defineret_desctructured_useParams_i_ContentDetails

// For at lave en subroute skal man først åbne en ny path, som skal have sit eget index element.
// Eksempel nedenfor

// <Route path="/content-forside"> (åbner ny path <Routes>)
//      <Route index element={<Content />}></Route> (angiver ny paths index element)

// Nu har man åbnet en ny path, og den har sit eget index element, og virker derfra.
// Derefter kan man, hvis der er behov for at komme længere ind, lave en ny subroute ved at åbne en ny path med sit eget index element.
