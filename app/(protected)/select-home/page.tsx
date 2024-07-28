import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger ,PopoverContent} from "@/components/ui/popover";
import { HomeForm } from "@/components/home/home-new-form";
import { checkAnyHome, getHome } from "@/actions/new-home";


const DashboardPage = async () => {
    const session = await auth();
    
    var name = session?.user.name;
    var user_id = session?.user.id;
    var avatar_url = session?.user.image;
    const userHome = await getHome(user_id ?? '');
    
    return (
        <div>
           {JSON.stringify(session)}
    <form action={async () =>{
        "use server";
        await signOut();
    }}>
        <button type="submit">Sign out</button>
    </form>
            {await checkAnyHome(user_id ?? '') ? (
                <div>
                   

                </div>
            ) : (
               
                <div style={{ display: "flex",  justifyContent: "center", alignItems: "center", height: "100vh"}}>
                    <Popover>
                    <PopoverTrigger asChild>
                        <Button >Add Home</Button>
                    </PopoverTrigger>
                        <div >
                            <PopoverContent>
                                <HomeForm />
                            </PopoverContent>
                        </div> 
                    </Popover>

                </div>
            )}
            
        </div>
    );
    };
export default DashboardPage;
