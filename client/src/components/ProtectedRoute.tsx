import { Navigate } from "react-router-dom"

export default function ProtectedRoute({ children }: any) {

const token = sessionStorage.getItem("admin_token")

if (!token) {
return <Navigate to="/admin-login" replace />
}

return children
}
