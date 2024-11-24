import "../../globals.css";
import Sidebar from "@/components/dashboard/sidebar/SideBar";

export const metadata = {
  title: "AjaxSoft",
  description: "Pagina de inico de ajax soft",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={" antialiased bg-zinc-950 text-zinc-400"}>
        <Sidebar />

        <div className=" px-4 pt-20 md:pl-64">{children}</div>
      </body>
    </html>
  );
}
