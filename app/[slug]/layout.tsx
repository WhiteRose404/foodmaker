"use client"

import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import AppContext, { ContextState, ContextDispatch } from "@/utils/context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const ID = pathname.split("/")[1];
  const TABLE = searchParams.get("table");
  const router = useRouter();
  
  // Add mounted state to prevent hydration mismatch
  const [mounted, setMounted] = useState(false);

  if (!ID || ID === "") {
    router.push("/");
  }

  // Initialize with default values first
  const [resto, setResto] = useState<any>({ _id: ID });
  const [items, setItems] = useState<any[]>([]);
  const [table, setTable] = useState(Number(TABLE) || -1);

  // Load localStorage data after initial mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedResto = localStorage.getItem(`resto_${ID}`);
      const savedItems = localStorage.getItem(`items_${ID}`);
      const savedTable = localStorage.getItem(`table_${ID}`);

      if (savedResto) setResto(JSON.parse(savedResto));
      if (savedItems) setItems(JSON.parse(savedItems));
      if (savedTable) setTable(Number(savedTable));
      
      setMounted(true);
    }
  }, [ID]);

  // Save to localStorage when data changes
  useEffect(() => {
    if (typeof window !== 'undefined' && mounted) {
      localStorage.setItem(`resto_${ID}`, JSON.stringify(resto));
      localStorage.setItem(`items_${ID}`, JSON.stringify(items));
      localStorage.setItem(`table_${ID}`, String(table));
    }
  }, [resto, items, table, ID, mounted]);

  // Fetch data only if needed
  useEffect(() => {
    const fetchData = async () => {
      if (Object.keys(resto).length > 1) return;

      try {
        const res = await fetch(`/api/get/restaurant?resto=${ID}`);
        const data = await res.json();
        
        if (data.error) {
          throw new Error("Restaurant not found");
        }
        
        setResto(data);
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      }
    };

    if (mounted) {
      fetchData();
    }
  }, [ID, resto, mounted]);

  const setRestoWrapper: Dispatch<SetStateAction<any>> = (value) => {
    setResto(value);
  };

  const setItemsWrapper: Dispatch<SetStateAction<any[]>> = (value) => {
    setItems(value);
  };

  const setTableWrapper: Dispatch<SetStateAction<number>> = (value) => {
    setTable(value);
  };

  const contextState: ContextState = {
    resto,
    items,
    table
  };

  const contextDispatch: ContextDispatch = {
    setResto: setRestoWrapper,
    setItems: setItemsWrapper,
    setTable: setTableWrapper
  };

  // If not mounted yet, render with initial values to match server
  if (!mounted) {
    const initialContextState: ContextState = {
      resto: { _id: ID },
      items: [],
      table: Number(TABLE) || -1
    };

    const initialContextDispatch: ContextDispatch = {
      setResto: setRestoWrapper,
      setItems: setItemsWrapper,
      setTable: setTableWrapper
    };

    return (
      <AppContext.Provider value={{ ...initialContextState, ...initialContextDispatch }}>
        {children}
      </AppContext.Provider>
    );
  }

  // After mounted, render with actual state
  return (
    <AppContext.Provider value={{ ...contextState, ...contextDispatch }}>
      {children}
    </AppContext.Provider>
  );
}


// "use client"


// import { useState, useEffect } from "react";
// import { useRouter, usePathname, useSearchParams } from "next/navigation";
// import AppContext, { ContextState, ContextDispatch } from "@/utils/context";


// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {

//   const pathname = usePathname();
//   const searchParms = useSearchParams();
//   const ID = pathname.split("/")[1];
//   const TABLE = searchParms.get("table");
//   const route = useRouter();
//   if(!ID || ID == "")
//     route.push("/");
//   const [resto, setResto] = useState<any>({ _id: ID});
//   const [items, setItems] = useState<any[]>([]);
//   const [table, setTable] = useState(Number(TABLE) || -1);
//    useEffect(()=>{
//         const fetchData = async ()=>{
//             // const slug = (await params).slug;
//             // setSlug(slug);
//             const res = await fetch(`/api/get/restaurant?resto=${resto._id}`);
//             const data = await res.json();
//             console.log("data we have is", data);
//             if(data.error) 
//                 throw Error("resto not found")
//             return data;
//         }
//         fetchData().then((resolve: any[]) => {
//             setResto(resolve);
//         }).catch((reason: any)=>{ 
//             console.log("Error");
//         });
//     }, []);
//   const contextState: ContextState = {
//       resto, items, table
//   };
//   const contextDispatch: ContextDispatch = {
//       setResto, setItems, setTable
//   };
//   return (
//     <AppContext.Provider value={{ ...contextState, ...contextDispatch }}>
//         {children}
//     </AppContext.Provider>
//   );
// }