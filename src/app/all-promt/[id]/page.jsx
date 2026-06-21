
import PromptContent from "@/components/allpromt/PromptContent";
import PromptHeader from "@/components/allpromt/PromptHeader";
import PromptSidebar from "@/components/allpromt/PromptSidebar";
import ReviewForm from "@/components/allpromt/ReviewForm";
import ReviewList from "@/components/allpromt/ReviewList";
import { getPromptById } from "@/lib/api/prompt";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";



const PromptDetailsPage = async ({ params }) => {
  const { id } = await params;
  const prompt = await getPromptById(id);
  const user = await getUserSession()
  if (!user) {
      redirect('/auth/signin')
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2 space-y-6">
          <PromptHeader prompt={prompt} user={user} />
          <PromptContent prompt={prompt} />
          <ReviewList prompt={prompt} />
          <ReviewForm promptId={id} />
        </div>

        <PromptSidebar prompt={prompt} />
      </div>
    </div>
  );
};

export default PromptDetailsPage;