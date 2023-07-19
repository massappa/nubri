"use client";
import React, { useEffect } from "react";
import HeartOutline from "@/components/icons/heart-outline";
import HeartSolid from "@/components/icons/heart-solid";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { setPostUnlike } from "@/actions/set-post-unlike";

interface UnlikeButtonProps {
  slug?: string;
  likes?: number;
}

const UnlikeButton: React.FC<UnlikeButtonProps> = ({
  slug = "",
  likes = 0,
}) => {
  const [isHovering, setIsHovered] = React.useState(false);
  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);
  const [unliking, setUnliking] = React.useState(false);
  const router = useRouter();

  return (
    <button
      type="button"
      disabled={unliking}
      onClick={async () => {
        setUnliking(true);
        const response = await setPostUnlike(slug);
        if (response) {
          setUnliking(false);
          toast.success("Амжилттай");
          router.refresh();
        } else {
          setUnliking(false);
          toast.error("Алдаа гарлаа");
        }
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="relative inline-flex items-center mx-auto justify-center py-2 rounded-md border border-dashed border-slate-500/50 w-full"
    >
      {isHovering ? (
        <HeartOutline className="-ml-0.5 h-5 w-5 text-gray-400" />
      ) : (
        <HeartSolid className="-ml-0.5 h-5 w-5 text-red-600" />
      )}
      <span className="absolute -top-[10px] -right-[5px] font-semibold text-xs text-gray-600 bg-gray-300 rounded-full px-[4px]">
        {likes}
      </span>
      <span className="ml-2 text-sm text-gray-400 hover:text-gray-900">
        Unlike
      </span>
    </button>
  );
};

export default UnlikeButton;