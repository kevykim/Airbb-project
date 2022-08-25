import { useDispatch } from "react-redux";
// import { login } from "../../store/session";
import { thunkDemoUser } from "../../store/session";

const DemoUser = () => {
    const dispatch = useDispatch()
    // const user = useSelector(state => state.session)
    // console.log(user)

    // const username = 'Demo-lition'
    // const password = 'password'
    // console.log(user)

    // const payload = {
    //     username: 'Demo-lition',
    //     password: 'password'
    //     }
     const onClick = async (event) => {
    //    event.preventDefault();
    // await dispatch(login())
    await dispatch(thunkDemoUser())
        
     }


    return (
        <button onClick={onClick}>Demo User</button>
    )
}


export default DemoUser;