import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRegister } from "@/hooks/auth/useRegister";
import { routes } from "@/utils/app.constants";
import { useState } from "react";
import Navbar from "../Landing/components/Navbar";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Lock } from "lucide-react";
import LoadingSpinner from "@/components/custom/utils/LoadingSpiner";

export default function RegisterPage() {
    const { registerForm, onSubmit, isRegistering } = useRegister();
    const [passwordVisible, setPasswordVisible] = useState(false);
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main className="container flex items-center justify-center h-screen mx-auto px-6 py-4">
                <div className="w-full max-w-md">
                    {/* Logo Area */}
                    <div className="mb-4 text-center">
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Register Portal
                        </h1>
                    </div>
                    {/* Card */}
                    <div className="bg-white rounded-xl shadow-lg p-8 ring-1 ring-gray-200">
                        <Form {...registerForm}>
                            <form
                                onSubmit={registerForm.handleSubmit(onSubmit)}
                                className="space-y-2"
                            >
                                <FormField
                                    control={registerForm.control}
                                    name="fullName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Full name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="John Wick"
                                                    type="text"
                                                    {...field}
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={registerForm.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="john@wick.com"
                                                    type="email"
                                                    {...field}
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={registerForm.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input
                                                        placeholder="********"
                                                        type={
                                                            passwordVisible
                                                                ? "text"
                                                                : "password"
                                                        }
                                                        {...field}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setPasswordVisible(
                                                                !passwordVisible
                                                            )
                                                        }
                                                        className="absolute top-1/2 right-2 transform -translate-y-1/2"
                                                    >
                                                        {passwordVisible ? (
                                                            <EyeOff className="h-4 w-4 text-gray-400" />
                                                        ) : (
                                                            <Eye className="h-4 w-4 text-gray-400" />
                                                        )}
                                                    </button>
                                                </div>
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button type="submit" disabled={isRegistering}>
                                    {isRegistering
                                        ? "Signing up..."
                                        : "Register"}
                                    {isRegistering && (
                                        <LoadingSpinner spinnerColor="text-white" />
                                    )}
                                </Button>
                            </form>
                        </Form>
                        {/* Register Link */}
                        <div className="mt-4 text-center">
                            <p className="text-sm text-gray-600">
                                Already have an account?{" "}
                                <Link
                                    to={routes.AUTH.LOGIN}
                                    className="text-primary hover:text-primary/80 font-medium"
                                >
                                    Login here
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
