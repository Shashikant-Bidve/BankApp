import MobileNav from "@/components/MobileNav";
import SideBar from "@/components/SideBar";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const loggedIn = { firstName: 'Shashi', lastName: "Bidve"};

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
