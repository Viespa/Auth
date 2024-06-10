import { auth, signOut } from "@/auth";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
  } from "@/components/ui/resizable";
  import Sidebar  from '@/components/ui/sidebar';

const DashboardPage = async () => {
    const session = await auth();
    var name = session?.user.name
    var avatar_url = session?.user.image
    return (
<div>
        {JSON.stringify(session)}
        <form action={async () =>{
            "use server";
            await signOut();
        }}>
            <button type="submit">Sign out</button>
        </form>
        </div>
    );
    };
export default DashboardPage;