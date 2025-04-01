"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

const LoginPage = () => {
  const session = useSession();
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  if (session.status === "authenticated") return push("/dashboard");

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      await signIn("google");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background Image */}
      {/* <div className="absolute inset-0 z-0">
        <Image
          src="/background-image.jpg"
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="w-full h-full"
        />
      </div> */}

      <div className="relative z-10 flex flex-1">
        {/* Left Section - Animation/Video */}
        <div className="hidden lg:flex lg:w-1/2 relative bg-blue-50 bg-opacity-75">
          <div className="absolute inset-0 flex items-center justify-center p-10">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-blue-900 mb-4">
                Share Your Success Stories
              </h2>
              <p className="text-blue-700 text-lg mb-6">
                Create and showcase powerful testimonials that build trust and
                credibility
              </p>
              <div className="w-full h-64 relative">
                <Image
                  src="/testimonial-illustration.svg"
                  alt="Testimonial Platform Illustration"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Login */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white bg-opacity-90">
          <div className="w-full max-w-md space-y-8 flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
            <div className="text-center w-full">
              <h1 className="text-5xl font-bold text-gray-900 mb-2">
                Welcome Back
              </h1>
              <p className="text-lg text-gray-600">
                Sign in to manage your testimonials
              </p>
            </div>

            <div className="w-full">
              <button
                className="w-full flex items-center justify-center gap-3 px-6 py-3 border border-gray-300 rounded-lg text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleGoogleLogin}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
                ) : (
                  <Image
                    src="/google-icon.svg"
                    alt="Google Logo"
                    width={20}
                    height={20}
                  />
                )}
                {isLoading ? "Signing in..." : "Sign in with Google"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      {/* <footer className="relative z-10 bg-white bg-opacity-90 py-4 text-center">
        <p className="text-gray-600">© 2025 Reviews. All rights reserved.</p>
        <div className="mt-2">
          <a href="/privacy" className="text-blue-500 hover:underline mx-2">
            Privacy Policy
          </a>
          <a href="/terms" className="text-blue-500 hover:underline mx-2">
            Terms of Service
          </a>
        </div>
      </footer> */}
    </div>
  );
};

export default LoginPage;
