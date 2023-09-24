"use client";
import { InputSearch } from "@/components/InputSearch";
import { useState } from "react";
import { useQuery } from "react-query";

const findOptions = async () => {
  const repos = await fetch("/api/options");

  const options = await repos.json();
  //console.log(options);

  return options;
};

export default function Home() {
  const [search, setSearch] = useState("");
  const { data, isLoading, isError, refetch, isRefetching } = useQuery(
    "options",
    () => findOptions(),
    { refetchOnWindowFocus: false },
  );
  console.log(data);
  return (
    <>
      <main className="min-h-screen bg-gray-300 px-5 py-3">
        <InputSearch value={search} onChange={setSearch} />
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error</p>}
        {isRefetching && <p>Refetching...</p>}
        {data?.options &&
          data.options.length > 0 &&
          data.options.map((item) => (
            <p key={item.id} className="text-black">
              {item.name}
            </p>
          ))}
      </main>
    </>
  );
}
