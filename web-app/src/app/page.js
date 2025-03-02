"use client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "./components/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from "./components/Table";
import { MoonLoader } from "react-spinners";

export default function Home() {

  const getCoinsData = async() => {
      const url = new URL("https://api.coingecko.com/api/v3/coins/markets");
      url.searchParams.set("vs_currency", "usd");
      url.searchParams.set("per_page", 5);
      url.searchParams.set("order", "market_cap_desc");

      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch");
      return response.json();
  }

  const { data, isLoading, isFetching, refetch, error } = useQuery({
    queryKey: ["coinMarket"],
    queryFn: getCoinsData
  });

  if (isLoading) return <div style={{marginTop: '15%'}} className="d-flex justify-content-center w-100 h-100"><MoonLoader/></div> ;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
  <>
    <div className={styles.page}>
      <Navbar/>    
        <Table
          data={data}  
          refetch={refetch}
          isLoading={isLoading}
          isFetching={isFetching}/>
    </div>
  </>
  );
}
