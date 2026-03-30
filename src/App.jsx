import { RouterProvider } from "react-router"
import { router } from "./router";
import { AuthProvider } from "./contexts/Auth";
import MessageToast from "./components/MessageToast";

function App() {
  return (
    <AuthProvider>
      <MessageToast />
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
