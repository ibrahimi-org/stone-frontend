"use client";
import HomeSlider from "@/components/molecules/home/HomeSlider";
import ISlider from "../models/Slide";

const colors = [
  "primary",
  "secondary",
  "accent",
  "destructive",
  "info",
  "success",
  "warning",
  "error",
];
const colorVariants = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

const buttonVariants = {
  variant: ["default", "destructive", "outline", "secondary", "ghost", "link"],
  size: ["default", "lg", "sm", "icon"],
};

export default function Home() {
  const logOut = () => {
    // LogOutAPI()
    //   .then((res: any) => router.replace("/auth/sign-in"))
    //   .catch((err: any) => alert(err));
  };

  const slides: ISlider[] = [
    {
      image:
        "https://plus.unsplash.com/premium_photo-1728510320088-0b89856e726e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      image:
        "https://images.unsplash.com/photo-1728388939226-3fc095526a91?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      image:
        "https://images.unsplash.com/photo-1728324736111-03bbe42cd366?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <div className="container">
      <HomeSlider slides={slides} />
    </div>
  );
}
