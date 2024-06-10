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
        
        
        <ResizablePanelGroup direction="horizontal">
            <ResizablePanel>
                <div className="flex">
                    <Sidebar user_name={name}  avatar_url={avatar_url} />

                </div>
    </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel>Two</ResizablePanel>      
        </ResizablePanelGroup>

        </div>
    );
    };
export default DashboardPage;