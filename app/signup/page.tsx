import { SignupForm } from "@/components/signup-form";

export default function SignupPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-foreground">
          Sign Up
        </h1>
        <SignupForm />
      </div>
    </div>
  );
}
