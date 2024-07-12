import { useNavigate } from "react-router-dom"

const Logout = () => {
    const navigate = useNavigate();
    navigate('/All');
    return (
        <>Logout</>
    )
}
export default Logout