import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GoogleAuth = () => {
    const navigate = useNavigate();

    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const userInfo = await axios.get(
                    'https://www.googleapis.com/oauth2/v3/userinfo',
                    { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
                );

                // Send user information to your backend for sign-in/sign-up
                const res = await axios.post('/auth/google', {
                    token: tokenResponse.access_token,
                    profile: userInfo.data,
                });

                if (res.data.token) {
                    // Store token and redirect to the homepage or dashboard
                    localStorage.setItem('token', res.data.token);
                    navigate('/');
                }
            } catch (error) {
                console.error('Google login failed', error);
            }
        },
        onError: (error) => {
            console.error('Google login error', error);
        },
    });

    return (
        <button onClick={login} className="google-login-btn">
            Login with Google
        </button>
    );
};

export default GoogleAuth;
