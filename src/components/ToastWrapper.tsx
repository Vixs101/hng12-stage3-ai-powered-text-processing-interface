import { Toaster } from "react-hot-toast"

export default function ToastWrapper() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 5000,
        style: {
          background: "#051731",
          color: "#fff",
          border: "1px solid #7B47FE",
        },
        success: {
          duration: 3000,
          iconTheme: {
            primary: "#4CAF50",
            secondary: "#fff",
          },
        },
        error: {
          duration: 5000,
          iconTheme: {
            primary: "#E57373",
            secondary: "#fff",
          },
        },
      }}
    />
  )
}

