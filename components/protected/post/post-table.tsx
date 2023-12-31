"use client";

import PostEditButton from "@/components/protected/post/post-edit-button";
import { Draft } from "@/types/collection";
import { format } from "date-fns";
import React, { FC } from "react";
import { v4 } from "uuid";

interface PostTableProps {
  posts?: Draft[];
}

const PostTable: FC<PostTableProps> = ({ posts }) => {
  return (
    <>
      <tbody className="divide-y divide-gray-200 bg-white">
        {posts &&
          posts.map((post) => (
            <tr key={v4()}>
              <td className="whitespace-nowrap border-r py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                {post.title}
              </td>
              <td className="whitespace-nowrap border-r px-3 py-4 text-center text-sm text-gray-500">
                {post.created_at
                  ? format(new Date(post.created_at), "yyyy-MM-dd")
                  : ""}
              </td>
              <td className="relative mx-auto flex items-center justify-center whitespace-nowrap py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-6">
                <PostEditButton id={post.id} />
              </td>
            </tr>
          ))}
      </tbody>
    </>
  );
};

export default PostTable;
