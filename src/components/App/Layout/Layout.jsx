// Hooks, react
import { useEffect } from 'react'

import Styles from "./Layout.module.scss"

// Function Component til side-hovede layout, med props property (kan hedde hest)
const Layout = props => {
    const hidetitle = (props.hidetitle) ? props.hidetitle : false;
    // UseEffect til at styre rendering. Renderer når dependency array fanger en ændring
    useEffect(() => {
        // dokument titel
        document.title = props.title
        // Eksisterer description på props objekt (condition), så =
        if(props.description) {
            // gå ind i document, brug query selector til at finde metatag
            document.querySelector('meta[name="description"]')
                // Set attribut i content til værdi props.desc
                .setAttribute('content', props.description)
        }
        // Dependency array holder øje med ændringer i titel og description
    }, [props.title, props.description])

    // Returnering i DOM
    return (
        //React fragment som top-level element
        <>
            {!props.hidetitle &&
                <h1 className={Styles.MainHeaders}>{props.title}</h1>
            }
            {/* indsætter fremover descendants/children i tilhørende placering */}
            <section>{props.children}</section>
            
        </>
    )
}

// Named Export af Layout

export { Layout }