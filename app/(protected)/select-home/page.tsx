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
           
            {await checkAnyHome(user_id ?? '') ? (
                <div>
                    <div>
                        <h1>Welcome, {userHome}!</h1>
                        <p>Your home ID is: {userHome?.id}</p>
                       
                    </div>

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
