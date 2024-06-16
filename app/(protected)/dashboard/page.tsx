import { auth, signOut } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


const DashboardPage = async () => {
    const session = await auth();
    var name = session?.user.name
    var avatar_url = session?.user.image
    return (
        <div>
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            {JSON.stringify(session)}
            <form
                action={async () => {
                    "use server";
                    await signOut();
                }}
            >
                <button type="submit">Sign out</button>
            </form>

            <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ fontSize: "100px" }}>👹</div>
                <div style={{ fontSize: "100px" }}>👹</div>
                <div style={{ fontSize: "100px" }}>👹</div>
            </div>
        </div>
    );
    };
export default DashboardPage;