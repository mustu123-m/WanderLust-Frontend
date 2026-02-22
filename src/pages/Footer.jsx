function Footer(){
    return(
        <footer className="footer">
          
    <div className="f-info">
        <div className="f-info-socials">
            <i className="fa-brands fa-whatsapp"></i>
            <i className="fa-brands fa-instagram"></i>
            <i className="fa-brands fa-linkedin"></i>
        </div>
        <div className="wanderlust">WanderLust Private Limited</div>
       <div className="f-info-links">
        <a href="/privacy"  style={{textDecoration: "none", color: "black"}}>Privacy</a>
        <a href="/terms" style={{textDecoration: "none", color: "black"}}>Terms</a>
      

       </div>
    </div>
</footer>
    )
}
export default Footer;