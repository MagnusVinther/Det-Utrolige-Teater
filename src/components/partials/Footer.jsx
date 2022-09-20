import Styles from './Footer.module.scss'

import { FaFacebookSquare, FaInstagramSquare, FaLinkedin } from 'react-icons/fa'

export const Footer = () => {
    return (
      <footer className={Styles.footerContainer}>
        <div>
          <h2>Adresse</h2>
          <p><a href="#">Det Utrolige Teater</a></p>
          <p><a href="#">Havnegade 901</a></p>
          <p><a href="#">9000 Aalborg</a></p>
          <p><a href="#">EAN 5798003279845</a></p>
          <p><a href="#">CVR 1001 0012</a></p> <br />
          <p><a href="#">Find vej på kort</a></p>
        </div>

        <div>
          <h2>billetservice</h2>
          <p><a href="#">Se åbningstider</a></p>
          <p><a href="#">Billettelefon: +45 96 31 80 80</a></p>
          <p><a href="#">billet@dut.dk</a></p> 
          <br /><br /><br />
          <h2>administration</h2>
          <p><a href="#">Telefon: +45 96 31 80 90</a></p>
          <p><a href="#">adm@dut.dk</a></p>
        </div>

        <div>
          <h2>praktisk info</h2> 
          <p><a href="#">Kontakt</a></p> 
          <p><a href="#">Kom trygt i teatret</a></p> 
          <p><a href="#">Presseside</a></p> 
          <p><a href="#">Skoleforestillinger</a></p> 
          <p><a href="#">Teatercaféen</a></p> 
          <p><a href="#">Handlesbetingelser</a></p> 
        </div>

        <div>
         <a href="#"><FaFacebookSquare /></a>
         <a href="#"><FaInstagramSquare /></a>
         <a href="#"><FaLinkedin /></a>
        </div>

      </footer>
    )
}