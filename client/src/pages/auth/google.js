const GoogleLoginButton = () => {
    const handleLogin = () => {
        window.location.href = 'https://localhost:3000/auth/google';
    };

    return (
        <button onClick={handleLogin}>
            Sign in with Google
        </button>
    );
};

export default GoogleLoginButton;
