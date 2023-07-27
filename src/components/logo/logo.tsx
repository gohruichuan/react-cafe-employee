import logo from "../../assets/logo.png"

import "./logo.scss"

interface LogoProps{
    className: string
}

export default function Logo({className}: LogoProps){

    const logoStyle = "logoSize "+ className;
    return (
        <img src={logo} className={logoStyle} alt="logo" />
    )
}