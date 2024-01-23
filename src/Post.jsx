import PropTypes from 'prop-types';

import './style/post.scss'

import { BsPersonCircle } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa";
import { FaRetweet } from "react-icons/fa";



function Post(props){
    return (

        <span>
            {props.postsInfo.map((info) => (
                <div className="post postConfigPadrao" key={info.id}>
                <span className='alinhamento'>
                    <BsPersonCircle className='userFoto'></BsPersonCircle>
                    <header className="conteudo">
                        <span className='linha1'>
                        <h3 className='userName'>{info.username}</h3>
                        <p className='data'>{info.data}</p>
                        </span>
                        <p className='texto'>{info.texto}</p>
                    </header>
                </span>


                <footer>
                {info.repostado ? (

                    <button className='postRepostado'><FaRetweet />{info.reposts}</button>
                ) : <button><FaRetweet/>{info.reposts}</button>}


                    
                    <button><FaRegComment />{info.comentarios}</button>

                    {info.curtido ? (

                        <button className='postCurtido'><FaHeart />{info.likes}</button>
                    ) : <button><FaRegHeart />{info.likes}</button>}
                    
                </footer>
                </div>
            ))}
    </span>
    )
}

Post.propTypes = {
    postsInfo: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        username: PropTypes.string.isRequired,
        data: PropTypes.string.isRequired,
        texto: PropTypes.string.isRequired,
      })
    ).isRequired,
  };

export default Post;