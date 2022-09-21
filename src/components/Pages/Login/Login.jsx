//Hooks
import { useForm } from 'react-hook-form';
import { useState } from 'react';
//Komponenter
import { Layout } from '../../App/Layout/Layout';
import { useAuth } from '../../App/Auth/Auth';
//Fetch
import axios from 'axios';
//Styles
import Styles from "./Login.module.scss"

// Function Component til "Login"
export const Login = () => {

    // Opsætning af useForm hook. Destructer den variabler.
    const { register, handleSubmit, formState: {errors}} = useForm()

    // Destructure af useAuth, så den kan bruges.
    const { loginData, setLoginData } = useAuth()

    // Errorhandling besked
    const [ errMes, setErrMes ] = useState('')

    // Funktion til at håndterer data i sessionStorage, parser data til at udskrives som en læsbar string
    const handleSessionData = data => {
        if(data) {
            sessionStorage.setItem('token', JSON.stringify(data));
            // Setter nu logindata til at indhole data-property fra sessionstorage
            setLoginData(data)
        }
    }

    // Funktion til at kunne spørge api'en om tilladelse til at få data til form'en
    const sendLoginRequest = async data => {

        //variable til at lave ny form
        const formData = new FormData();
        // Appender username og password ned i en form.
        formData.append("username", data.username)
        formData.append("password", data.password)

        // Try/catch til errorhandling hvis nu det ikke er muligt at fange data fra Api'en
        try {
            // Result afventer api, og poster token i formdata, hvis den kan findes.
            const result = await axios.post('https://api.mediehuset.net/token', formData)

            // håndterer nu resultatet med en funktion som tager result.data som property
            handleSessionData(result.data)

            // Så man tydeligt kan se at man er logget ind i console
			console.log("Du er logget ind!")
        }
        // Hvis fejl =
        catch(err) {
            setErrMes('kunne ikke logge ind!')
        }
    }

    // Funktion til at logge ud.
    const LogOut = () => {
        // Fjerner token fra sessionStorage, og logger derved én ud.
        sessionStorage.removeItem('token')
        // Giver en tom værdi til loginData
        setLoginData('')

        // fortæller i console at man er logget ud
        console.log("du er logget ud!")
    }

    return (
        // Layout komponent
        <Layout title="Login" description="Her kan du logge ind" hidetitle="true">
            {/* ternary operator til at vise login-form, hvis man IKKE er logget ind */}
            {!loginData && !loginData.username ?
            (

                <div className={Styles.formContainer}>

                    <h1>Login side</h1>
                    {/* // Onsubmit event med Closure. ( Når en funktion tilgår/bruger variabler defineret uden for den ) */}
                    <form className={Styles.loginForm} onSubmit={handleSubmit(sendLoginRequest)}>

                        {/* Div til brugernavnsfelt, samt fejlvisning */}
                        <div>
                            <label htmlFor="username">Brugernavn: </label> <br />
                            <input type="text" id="username"
                            // React-hook-form registrerer "username" og kræver dens tilstedeværelse
                            {...register("username", {required: true})} />
                            {/* Hvis ikke den kan finde brugernavn i feltet udskrives en fejlmeddelelse */}
                            {errors.username && (
                                <span className={Styles.errorMessage}>Du skal indtaste brugernavn...</span>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password">Adgangskode: </label> <br />
                            <input type="password" id="password"
                            {...register("password", {required: true})} />
                            {errors.password && (
                                <span className={Styles.errorMessage}>Du skal indtaste adgangskode...</span>
                            )}
                        </div>

                        {errMes && (
                            <div>{errMes}</div>
                        )}

                        <button>Log Ind</button>
                    </form>
                </div>                            
            // Ternary operator "else"
            ) : (

            // Viser dette hvis man er logget ind
            <div className={Styles.formContainer}>
                <div className={Styles.logOutContainer}>
                    <p>Du er logget ind som <b>{loginData.username}</b></p>
                    <button className={Styles.logOutBtn} onClick={LogOut}>Log ud</button> 
                </div>
            </div>

            )}

        </Layout>
    )

}
