"use client";
import Link from "next/link";
import { useEffect } from "react";

// import { signOut } from "next-auth/react";
// import { useSession } from "next-auth/react";
import Image from "next/image";

function Sidebar() {
  // Contiene los datos del usuario
//   const { data: session } = useSession();

  function handlebtnclick() {
    document.getElementById("sidebar")?.classList.toggle("hidden");
    // document.getElementById("capa-sidebar")?.classList.toggle("hidden");
  }
  function btnclickperfil() {
    document.getElementById("card-perfil")?.classList.toggle("hidden");
  }
  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      localStorage.getItem("theme") === "dark"
    );
  }, []);

  function toggleTheme() {
    localStorage.setItem(
      "theme",
      localStorage.getItem("theme") === "light" ? "dark" : "light"
    );
    document.documentElement.classList.toggle("dark");
  }

  return (
    <>
      <header className="bg-zinc-950 border border-zinc-900 h-16 shadow-sm  text-white fixed w-full flex items-center justify-between px-4 md:px-8">
        <a className="flex gap-1 items-center" href="/dashboard">
          {/* <img className="w-12" src="/logo.png" alt="logo ajaxsoft" /> */}
          <span className="text-2xl font-medium text-white ">
            AjaxSoft
          </span>
        </a>

        {/* <div className="flex items-center justify-center gap-4">
          <p>{session?.user?.role}</p>
          {session?.user?.image ? (
            <Image
              onClick={btnclickperfil}
              className="w-9 h-9 rounded-full cursor-pointer"
              src={session?.user?.image}
              width={24}
              height={24}
              alt="perfil"
            />
          ) : (
            <div
              onClick={btnclickperfil}
              className="w-9 h-9 rounded-full cursor-pointer bg-zinc-800 flex items-center justify-center "
            >
              <h1 className=" text-center text-xl">
                {session?.user?.name?.charAt(0)?.toUpperCase() || ""}
              </h1>
            </div>
          )}

          <button
            onClick={handlebtnclick}
            className="md:hidden bg-zinc-800 rounded-full p-0.5"
          >
            <svg
              className="w-6 h-6 text-zinc-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
                d="M5 7h14M5 12h14M5 17h14"
              />
            </svg>
          </button>
        </div> */}
      </header>

      <div
        onClick={handlebtnclick}
        id="capa-sidebar"
        className="hidden bg-zinc-950 border border-zinc-800 h-screen top-16 fixed w-full opacity-60 "
      ></div>

      <aside
        id="sidebar"
        className="bg-zinc-950 border-r border-zinc-800 w-72 md:w-60  h-screen text-white   fixed top-16  hidden  md:block px-4 py-8"
      >
        <nav className="">
          <ul className="grid  pt-8 ">
            <li className="hover:bg-zinc-950 rounded-md px-4 py-2 ">
              <Link
                onClick={handlebtnclick}
                href="/dashboard"
                className="flex items-center gap-3"
              >
                <svg
                  className="w-5 h-5 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"
                  />
                </svg>
                <span>Inicio</span>
              </Link>
            </li>

            <li className=" hover:bg-zinc-950 rounded-md px-4 py-2">
              <Link
                onClick={handlebtnclick}
                href="/dashboard/administrators"
                className="flex items-center gap-3"
              >
                <svg
                  className="w-5 h-5 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="2"
                    d="M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3.05A2.5 2.5 0 1 1 9 5.5M19.5 17h.5a1 1 0 0 0 1-1 3 3 0 0 0-3-3h-1m0-3.05a2.5 2.5 0 1 0-2-4.45m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3 1 1 0 0 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
                  />
                </svg>

                <span>Administradores</span>
              </Link>
            </li>
            <li className=" hover:bg-zinc-950 rounded-md px-4 py-2">
              <Link
                onClick={handlebtnclick}
                href="/dashboard/sales"
                className="flex items-center gap-3"
              >
                <svg
                  className="w-5 h-5 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 10V6a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v4m3-2 .917 11.923A1 1 0 0 1 17.92 21H6.08a1 1 0 0 1-.997-1.077L6 8h12Z"
                  />
                </svg>

                <span>Ventas</span>
              </Link>
            </li>
            <li className=" hover:bg-zinc-950 rounded-md px-4 py-2">
              <Link
                onClick={handlebtnclick}
                href="/dashboard/products"
                className="flex items-center gap-3"
              >
                <svg
                  className="w-5 h-5 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15.583 8.445h.01M10.86 19.71l-6.573-6.63a.993.993 0 0 1 0-1.4l7.329-7.394A.98.98 0 0 1 12.31 4l5.734.007A1.968 1.968 0 0 1 20 5.983v5.5a.992.992 0 0 1-.316.727l-7.44 7.5a.974.974 0 0 1-1.384.001Z"
                  />
                </svg>

                <span>Productos</span>
              </Link>
            </li>
            <li className=" hover:bg-zinc-950 rounded-md px-4 py-2">
              <Link
                onClick={handlebtnclick}
                href="/dashboard/customers"
                className="flex items-center gap-3"
              >
                <svg
                  className="w-5 h-5 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="2"
                    d="M16 19h4a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-2m-2.236-4a3 3 0 1 0 0-4M3 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>

                <span>Clientes</span>
              </Link>
            </li>
            <li className=" hover:bg-zinc-950 rounded-md px-4 py-2">
              <Link
                onClick={handlebtnclick}
                href="/dashboard/transactions"
                className="flex items-center gap-3"
              >
                <svg
                  className="w-5 h-5 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 10h18M6 14h2m3 0h5M3 7v10a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1Z"
                  />
                </svg>

                <span>Transacciones</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      <div
        id="card-perfil"
        className="fixed hidden w-fit h-fit text-sm bg-zinc-950 border border-zinc-800 rounded-b-md top-16 right-4 p-4 md:right-10 shadow-md"
      >
        {/* <div className="flex  items-center">
          {session?.user?.image ? (
            <Image
              width={40}
              height={40}
              className="w-10 m-auto h-10 rounded-full"
              src={session.user.image}
              alt="profile image"
            />
          ) : (
            <div className="w-9 h-9 rounded-full cursor-pointer  bg-zinc-800 flex items-center justify-center ">
              {session?.user?.name?.charAt(0)?.toUpperCase() || ""}
            </div>
          )}

          <div className="p-2 ">
            <p className="text-white">{session?.user?.name}</p>
            <p>{session?.user?.email}</p>
          </div>
        </div> */}
        <ul onClick={btnclickperfil} className="grid gap-2 ">
          <li onClick={btnclickperfil}>
            <Link
              onClick={btnclickperfil}
              href="/dashboard/profile"
              className="flex items-center"
            >
              <svg
                className="w-5 h-5 text-zinc-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
              <span>Tu perfil</span>
            </Link>
          </li>
          <li onClick={btnclickperfil}>
            <Link
              onClick={btnclickperfil}
              href="/dashboard/assists"
              className="flex items-center"
            >
              <svg
                className="w-5 h-5 text-zinc-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>

              <span>Asistencia</span>
            </Link>
          </li>

        
          {/* <li onClick={() => signOut()} className=" cursor-pointer"> */}
          <li className=" cursor-pointer">
            <button className="text-red-500 flex items-center">
              <svg
                className="w-5 h-5 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"
                />
              </svg>
              <span>Cerrar sesion</span>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
