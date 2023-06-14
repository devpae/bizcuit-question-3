"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface BeerData {
  name: string;
  style: string;
  hop: string;
  yeast: string;
  malts: string;
  ibu: number;
  alcohol: string;
  blg: string;
  randomCount: number;
}

async function getData() {
  const res = await fetch('http://localhost:3000/beer/random');

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default function Home() {
  const [data, setData] = useState<BeerData | null>(null);

  const [previousData, setPreviousData] = useState<BeerData | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const beerData = await getData();
      setPreviousData(data);
      setData(beerData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleNextClick = () => {
    fetchData();
  };

  const handlePreviousClick = () => {
    if (previousData) {
      setData(previousData);
      setPreviousData(null);
    } else {
      alert('No previous data available');
    }
  };

  return (
    <div>
      {/* Navigation Bar */}
      <div className="w-full h-16 bg-black text-white py-5">
        <div className="font-bold flex justify-between">
          <div className="px-5 cursor-pointer" onClick={handlePreviousClick}>Previous</div>
          <div>RANDOM BEER</div>
          <div className="px-5 cursor-pointer" onClick={handleNextClick}>
            Next
          </div>
        </div>
      </div>
      {/* Content */}
      {data && (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 px-16 mt-10">
          {/* Beer Bottle */}
          <div className="font-bold flex justify-center">
            <Image
              src="/bottle.svg"
              alt="Bottle"
              width={350}
              height={500}
              className="sm:w-full lg:p-10"
            />
          </div>

          {/* Beer Info */}
          <div className="flex justify-center lg:justify-left lg:my-16">
            <div>
              <div className="text-4xl lg:text-7xl font-bold">{data.name}</div>
              <div className="text-2xl lg:text-5xl font-bold">{data.style}</div>
              <div className="lg:text-4xl lg:my-12">
                <div className="my-3">Style: {data.style}</div>
                <div className="my-3">Hop: {data.hop}</div>
                <div className="my-3">Yeast: {data.yeast}</div>
                <div className="my-3">Malts: {data.malts}</div>
                <div className="my-3">IBU: {data.ibu}</div>
                <div className="my-3">Alcohol: {data.alcohol}</div>
                <div className="my-3">Blg: {data.blg}</div>
                <div className="my-3">Random Count: {data.randomCount}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
