"use client"


import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import AppContext, { ContextState, ContextDispatch } from "@/utils/context";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const pathname = usePathname();
  const searchParms = useSearchParams();
  const ID = pathname.split("/")[1];
  const TABLE = searchParms.get("table");
  const route = useRouter();
  if(!ID || ID == "")
    route.push("/");
  const [resto, setResto] = useState<any>({ _id: ID});
  const [items, setItems] = useState<any[]>([]);
  const [table, setTable] = useState(Number(TABLE) || -1);
   useEffect(()=>{
        const fetchData = async ()=>{
            // const slug = (await params).slug;
            // setSlug(slug);
            const res = await fetch(`/api/get/restaurant?resto=${resto._id}`);
            const data = await res.json();
            console.log("data we have is", data);
            if(data.error) 
                throw Error("resto not found")
            return data;
        }
        fetchData().then((resolve: any[]) => {
            setResto(resolve);
        }).catch((reason: any)=>{ 
            console.log("Error");
        });
    }, []);
  const contextState: ContextState = {
      resto, items, table
  };
  const contextDispatch: ContextDispatch = {
      setResto, setItems, setTable
  };
  return (
    <AppContext.Provider value={{ ...contextState, ...contextDispatch }}>
        {children}
    </AppContext.Provider>
  );
}