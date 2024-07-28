import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger ,PopoverContent} from "@/components/ui/popover";
import { HomeForm } from "@/components/home/home-new-form";
import { checkAnyHome, getHome } from "@/actions/new-home";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DarkMode } from "@/components/ui/dark-mode";

const DashboardPage = async () => {
    const session = await auth();
    
    var name = session?.user.name;
    var user_id = session?.user.id;
    var avatar_url = session?.user.image;
    const userHome = await getHome(user_id ?? '');
    
    return (
        <div>
            {/* {JSON.stringify(session)} */}
            
            <div style={{ position: "absolute", top: "10px", right: "10px", background: "none", border: "none",  fontSize: "20px" }}>   
                <DarkMode />
            </div>
            <div style={{ position: "absolute", top: "10px", left: "10px", background: "none", border: "none",  fontSize: "20px" }}>
                <DropdownMenu > 
                    <DropdownMenuTrigger>
                        <Avatar>
                            <AvatarImage src={avatar_url ?? ''} />
                            <AvatarFallback>{name}</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <form action={async () =>{"use server";await signOut();}}>
                                <button type="submit">Sign Out</button>
                            </form>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
                
  
           
           
            {await checkAnyHome(user_id ?? '') ? (
                <div>
                    {/* Add your dropdown content here */}
                </div>
            ) : (
                <div style={{ display: "flex",  justifyContent: "center", alignItems: "center", height: "100vh"}}>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button >Add Home</Button>
                        </PopoverTrigger>
                        <div >
                            <PopoverContent>
                                <HomeForm  />
                            </PopoverContent>
                        </div> 
                    </Popover>
                </div>
            )}
        </div>
    );
    };
export default DashboardPage;
