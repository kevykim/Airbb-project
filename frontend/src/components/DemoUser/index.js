import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/session";

const DemoUser = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state)

    const username = 'Demo-lition'
    const password = 'password'
    console.log(user)

    const payload = {username, password}
     const onClick = async (event) => {
       event.preventDefault();
    await dispatch(login( payload))
        
     }


    return (
        <button onClick={onClick}>Demo User</button>
    )
}


export default DemoUser;