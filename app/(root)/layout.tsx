import MobileNav from "@/components/MobileNav";
import SideBar from "@/components/SideBar";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { useReducer } from "react";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const router = useRouter();
  const loggedIn = await getLoggedInUser();

  if(!loggedIn) redirect('/sign-in');

  return (
    <main className="flex h-screen w-full font-inter">
        <SideBar user={loggedIn}></SideBar>

        <div className="flex size-full flex-col">
          <div className="root-layout">
            <Image src="/icons/logo.svg" width={30} height={30} alt="logo"></Image>
            <div>
              <MobileNav user = {loggedIn}></MobileNav>
            </div>
          </div>
          {children}
        </div>
        
    </main>
  );
}
