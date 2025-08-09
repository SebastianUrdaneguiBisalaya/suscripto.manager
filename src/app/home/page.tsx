import UserProfile from "@/components/user-profile";

export default function HomePage() {
  return (
    <div
      className="max-w-6xl w-full h-full flex flex-col gap-8 justify-start p-8"
    >
      <header
        className="flex flex-row justify-between items-start"
      >
        <p className="font-sora text-lg sm:text-2xl font-semibold">
          suscripto
        </p>
        <UserProfile />
      </header>

      <main
        className=""
      >

      </main>
    </div>
  )
}