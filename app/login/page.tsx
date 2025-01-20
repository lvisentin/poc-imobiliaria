import { LoginForm } from "../../components/login-form";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-foreground">
          Login
        </h1>
        <LoginForm />
      </div>
    </div>
  );
}
