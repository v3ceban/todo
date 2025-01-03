import { redirect } from "next/navigation";
import Home from "~/app/page";

const PagedHome = async ({ params }: { params: Promise<{ page: string }> }) => {
  const page = (await params).page;
  const pageNumber = parseInt(page, 10);

  if (isNaN(pageNumber) || pageNumber < 1) {
    redirect(`/${page}`);
  }

  return <Home page={pageNumber} />;
};

export default PagedHome;
