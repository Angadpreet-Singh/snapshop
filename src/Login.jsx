import { useState } from 'react';
import './index.css'
import { useNavigate } from 'react-router-dom';
import { login } from './store/shop';
import { useDispatch } from 'react-redux';
import { client } from './sanity';
import { toast } from 'react-toastify'

function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [data, setData] = useState({
        shopId: ""
    });

    const onChange = (value, target) => {
        setData({
            ...data,
            [target]: value,
        });

    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const result = await client.fetch(`*[_type=='shop' && _id == "${data.shopId}"]`)
            if (result) {
                dispatch(login({
                    shopName: result[0].name,
                    shopId: result[0]._id
                }))
                toast.success('🦄 Login Successfull', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                navigate("/")
            }
        }
        catch (error) {
            console.log(error)
            toast.error('🦄 Login failed', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    return (
        <>
            <div className='signIn-wrapper bg-dark d-flex align-item-center justify-content-center w-full'>
                <div className='signIn'>
                    <h2 className='mb-3'>Login In</h2>
                    <form>
                        <div className='form-group mb-2'>
                            <label htmlFor="emailOrPhone" className='form-label'>Shop ID</label>
                            <input id='emailOrPhone' className="form-control" required onChange={e => onChange(e.target.value, 'shopId')} />
                        </div>
                        {/* <div className='form-group mb-2'>
                            <label htmlFor="password" className='form-label'>Password</label>
                            <input type="password" id='password' className="form-control" required onChange={e => onChange(e.target.value, 'password')} />
                        </div> */}
                        <button className='btn btn-dark w-100 mt-2' onClick={e => handleSubmit(e)}>LOGIN</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;