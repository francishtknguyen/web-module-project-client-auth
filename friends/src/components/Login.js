import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'
import axiosWithAuth from '../utils/axiosWithAuth'


const initialFormValues = {
    username:'',
    password:'',
}

const Login = (props) => {
    const [formValues, setFormValues] = useState(initialFormValues)
    const history = useHistory();

    const handleChange = e => {
        setFormValues({
            ...formValues, 
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axiosWithAuth()
            .post("/api/login", formValues)
            .then((res) => {
            localStorage.setItem("token", res.data.payload);
            history.push("/friends");
            })
            .catch((err) => console.log(err))
        setFormValues(initialFormValues)
    }


    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label>Username
                <input
                    type='text'
                    name='username'
                    value={formValues.username}
                    onChange={handleChange}
                    />
                </label>
                <label>Password
                <input
                    type='password'
                    name='password'
                    value={formValues.password}
                    onChange={handleChange}
                    />
                </label>
                <button>Log In</button> 
            </form>

        </div>
    )
}

export default Login;