import './style/nav.scss'
import { GiTwister } from "react-icons/gi";
import { IoPersonSharp } from "react-icons/io5";

function Nav() {
    return (
        <nav className='bordaGradient'>
            <h1 className="logo">
                <span className="titulo">TWISTER</span>
                <GiTwister className='icone' />
</h1>
            <div>login<IoPersonSharp />
</div>
        </nav>
    )
}

export default Nav;