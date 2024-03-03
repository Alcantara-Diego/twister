import './style/feedbackMsg.scss'
import { FaCheckCircle } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";

function FeedbackMsg(props){
    return(
        <div id="feedbackDiv">
            <div id="feedbackSucesso" className='feedbackMsg'>
                <FaCheckCircle className='simbolo'/>
                <p>{props.mensagem}</p>
            </div>

            <div id="feedbackErro" className='feedbackMsg'>
                <IoIosWarning className='simbolo'/>
                <p>{props.mensagem}</p>
            </div>
        </div>
    )
}

export default FeedbackMsg;