import useAuth from "@/utils/hooks/useAuth";

export default function Home() {
  const { user } = useAuth({
    redirectOn: "logout",
    redirectTo: "/dashboard",
  });

  return user ? (
    <section className="bg-gray-50  h-screen">
      <div className="flex flex-col justify-center relative top-[50px] text-orange ">
        <h1 className="flex justify-center text-[25px] font-semibold">
          Welcome to our offical Login Page
        </h1>
        <h1 className="flex justify-center text-[25px] font-semibold">
          With firebase
        </h1>
      </div>
    </section>
  ) : null;
}
