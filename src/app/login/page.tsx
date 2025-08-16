"use client";

import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";
import { SignInWithGoogle } from "../api/auth/actions";

export default function LoginPage() {
    return (
        <div
            className="w-full h-screen grid grid-cols-1 md:grid-cols-2 overflow-x-hidden overflow-y-hidden"
        >
            <div
                className="h-full w-full hidden md:block mask-fade-to-right overflow-x-hidden overflow-y-hidden"
            >
                <ShaderGradientCanvas
                >
                    <ShaderGradient
                        control="query"
                        urlString="https://www.shadergradient.co/customize?animate=on&axesHelper=off&bgColor1=%23000000&bgColor2=%23000000&brightness=1&cAzimuthAngle=180&cDistance=2.8&cPolarAngle=80&cameraZoom=11.2&color1=%230066ffd9&color2=%238d7dca&color3=%23ffffff&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=45&frameRate=10&gizmoHelper=hide&grain=on&lightType=3d&pixelDensity=1.1&positionX=0&positionY=0&positionZ=0&range=enabled&rangeEnd=80&rangeStart=0&reflection=0.1&rotationX=50&rotationY=0&rotationZ=-60&shader=defaults&type=sphere&uAmplitude=1&uDensity=1.5&uFrequency=0&uSpeed=0.3&uStrength=1.5&uTime=8&wireframe=false&zoomOut=false"
                    />
                </ShaderGradientCanvas>

            </div>
            <div
                className="h-screen w-full p-8 flex flex-col gap-8 justify-center items-center overflow-x-hidden overflow-y-hidden"
            >
                <div
                    className="flex flex-col items-center justify-center gap-2"
                >
                    <p className="font-sora text-lg sm:text-2xl font-semibold text-white-cream">suscripto</p>
                    <p
                        className="text-base sm:text-xl font-medium font-geist text-center max-w-2xl text-white-cream/80"
                    >
                        Controla tus suscripciones en un solo lugar
                    </p>
                </div>
                <button
                    className="relative flex flex-row items-center gap-3 px-4 py-3 cursor-pointer rounded-lg border border-gray-500
                    overflow-hidden
                    [&::after]:content-['']
                    [&::after]:absolute [&::after]:inset-0
                    [&::after]:bg-blue-600
                    [&::after]:scale-x-0
                    [&::after]:origin-left
                    [&::after]:transition-transform [&::after]:duration-300 [&::after]:ease-in-out
                    hover:[&::after]:scale-x-100 hover:[&::after]:origin-right
                    hover:shadow-[3px_3px_0px_rgba(0,102,255,0.4)]
                    "
                    type="button"
                    onClick={SignInWithGoogle}
                >
                    <span
                        className="z-10 relative w-fit h-fit flex justify-center items-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 128 128"><path fill="#fff" d="M44.59 4.21a63.28 63.28 0 0 0 4.33 120.9a67.6 67.6 0 0 0 32.36.35a57.13 57.13 0 0 0 25.9-13.46a57.44 57.44 0 0 0 16-26.26a74.3 74.3 0 0 0 1.61-33.58H65.27v24.69h34.47a29.72 29.72 0 0 1-12.66 19.52a36.2 36.2 0 0 1-13.93 5.5a41.3 41.3 0 0 1-15.1 0A37.2 37.2 0 0 1 44 95.74a39.3 39.3 0 0 1-14.5-19.42a38.3 38.3 0 0 1 0-24.63a39.25 39.25 0 0 1 9.18-14.91A37.17 37.17 0 0 1 76.13 27a34.3 34.3 0 0 1 13.64 8q5.83-5.8 11.64-11.63c2-2.09 4.18-4.08 6.15-6.22A61.2 61.2 0 0 0 87.2 4.59a64 64 0 0 0-42.61-.38"/><path fill="#e33629" d="M44.59 4.21a64 64 0 0 1 42.61.37a61.2 61.2 0 0 1 20.35 12.62c-2 2.14-4.11 4.14-6.15 6.22Q95.58 29.23 89.77 35a34.3 34.3 0 0 0-13.64-8a37.17 37.17 0 0 0-37.46 9.74a39.25 39.25 0 0 0-9.18 14.91L8.76 35.6A63.53 63.53 0 0 1 44.59 4.21"/><path fill="#f8bd00" d="M3.26 51.5a63 63 0 0 1 5.5-15.9l20.73 16.09a38.3 38.3 0 0 0 0 24.63q-10.36 8-20.73 16.08a63.33 63.33 0 0 1-5.5-40.9"/><path fill="#587dbd" d="M65.27 52.15h59.52a74.3 74.3 0 0 1-1.61 33.58a57.44 57.44 0 0 1-16 26.26c-6.69-5.22-13.41-10.4-20.1-15.62a29.72 29.72 0 0 0 12.66-19.54H65.27c-.01-8.22 0-16.45 0-24.68"/><path fill="#319f43" d="M8.75 92.4q10.37-8 20.73-16.08A39.3 39.3 0 0 0 44 95.74a37.2 37.2 0 0 0 14.08 6.08a41.3 41.3 0 0 0 15.1 0a36.2 36.2 0 0 0 13.93-5.5c6.69 5.22 13.41 10.4 20.1 15.62a57.13 57.13 0 0 1-25.9 13.47a67.6 67.6 0 0 1-32.36-.35a63 63 0 0 1-23-11.59A63.7 63.7 0 0 1 8.75 92.4"/></svg>
                    </span>
                    <span
                        className="z-10 relative font-geist text-sm sm:text-base text-center text-white-cream"
                    >
                        Iniciar sesión con Google
                    </span>
                </button>
            </div>   
        </div>
    )
}