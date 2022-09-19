import Styles from './Footer.module.scss'

import { FaFacebookSquare, FaInstagramSquare, FaLinkedin } from 'react-icons/fa'

export const Footer = () => {
    return (
      <footer className={Styles.footerContainer}>
        <div>
          <h2>Adresse</h2>
          <p>Det Utrolige Teater</p>
          <p>Havnegade 901</p>
          <p>9000 Aalborg</p>
          <p>EAN 5798003279845</p>
          <p>CVR 1001 0012</p> <br />
          <p>Find vej på kort</p>
        </div>

        <div>
          <h2>billetservice</h2>
          <p>Se åbningstider</p>
          <p>Billettelefon: +45 96 31 80 80</p>
          <p>billet@dut.dk</p> 
          <br /><br /><br />
          <h2>administration</h2>
          <p>Telefon: +45 96 31 80 90</p>
          <p>adm@dut.dk</p>
        </div>

        <div>
          <h2>praktisk info</h2> 
          <p>Kontakt</p> 
          <p>Kom trygt i teatret</p> 
          <p>Presseside</p> 
          <p>Skoleforestillinger</p> 
          <p>Teatercaféen</p> 
          <p>Handlesbetingelser</p> 
        </div>

        <div>
         <FaFacebookSquare />
         <FaInstagramSquare />
         <FaLinkedin />
        </div>

      </footer>
    )
}