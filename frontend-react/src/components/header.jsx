import logo from '../assets/images/logo.png'

function Header(){
    return (
        <>
        <header id='header'>
            <a href='/'> <img src={logo} alt="logo de la asociación" style={{width :'100px'}} className='logo'></img></a>
            <h1>Asociación Abderitana de Agua Natural</h1>
        </header>
        </>
    )
}

export default Header