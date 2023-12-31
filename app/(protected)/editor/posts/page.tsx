import PostTableEmpty from "@/components/protected/post/post-emtpy-table";
import PostTable from "@/components/protected/post/post-table";
import PostTableHeader from "@/components/protected/post/post-table-header";
import TableTitle from "@/components/protected/table/table-title";
import TableWrapper from "@/components/protected/table/table-wrapper";
import Pagination from "@/components/shared/pagination";
import { postConfig } from "@/config/post";
import { Draft, Post } from "@/types/collection";
import type { Database } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import React, { FC } from "react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: postConfig.title,
  description: postConfig.description,
};

interface PostsPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const PostsPage: FC<PostsPageProps> = async ({ searchParams }) => {
  const supabase = createServerComponentClient<Database>({ cookies });
  // Fetch user data
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Fetch total pages
  const { count } = await supabase
    .from("drafts")
    .select("*", { count: "exact", head: true })
    .match({ author_id: user?.id });

  // Pagination
  const limit = 10;
  const totalPages = count ? Math.ceil(count / limit) : 0;
  const page =
    typeof searchParams.page === "string" &&
    +searchParams.page > 1 &&
    +searchParams.page <= totalPages
      ? +searchParams.page
      : 1;
  const from = (page - 1) * limit;
  const to = page ? from + limit : limit;

  // Fetch posts
  const { data, error } = await supabase
    .from("drafts")
    .select(`*, categories(*)`)
    .order("created_at", { ascending: false })
    .match({ author_id: user?.id })
    .range(from, to)
    .returns<Draft[]>();

  if (!data || error || !data.length) {
    notFound;
  }
  return (
    <>
      <div className="mx-auto max-w-5xl p-4 sm:p-6 lg:p-8">
        {data?.length && data?.length > 0 ? (
          <>
            <TableTitle
              title={postConfig.title}
              description={postConfig.description}
              isPost={true}
            />
            <TableWrapper>
              <PostTableHeader titles={postConfig.tableHeader} />
              <PostTable posts={data ? data : []} />
            </TableWrapper>
            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                page={page}
                perPage={limit}
                totalItems={count ? count : 0}
                totalPages={totalPages}
                baseUrl="/editor/posts"
                pageUrl="?page="
              />
            )}
          </>
        ) : (
          <PostTableEmpty />
        )}
      </div>
    </>
  );
};

export default PostsPage;
