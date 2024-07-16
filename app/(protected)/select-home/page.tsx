import { auth, signOut } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { checkUserInAnyHomeGroup } from '@/actions/select-home';
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger ,PopoverContent} from "@/components/ui/popover";
import { HomeForm } from "@/components/home/home-new-form";


const DashboardPage = async () => {
    const session = await auth();
    var name = session?.user.name;
    var user_id = session?.user.id;
    var avatar_url = session?.user.image;
    
    return (
        <div>
           
            {await checkUserInAnyHomeGroup(user_id ?? '') ? (
                <div>
                    {/* Code to display when checkUserInAnyHomeGroup is true */}
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
