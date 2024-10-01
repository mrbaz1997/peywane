export const BACKEND_BASE_URL =
    process.env.NODE_ENV === "production"
        ? "https://peywane.xyz" // Replace with your production domain
        : "http://localhost:5000"; // Use localhost for development
