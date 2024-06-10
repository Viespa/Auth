import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


interface SidebarProps {
    user_name?: null | string | undefined;
    avatar_url?: string
}

export const Sidebar = ({user_name, avatar_url}: SidebarProps) => {
    const items = [
      { label: 'Inbox', count: 128, icon: '📥' },
      { label: 'Drafts', count: 9, icon: '📝' },
      { label: 'Sent', count: 0, icon: '📤' },
      { label: 'Junk', count: 23, icon: '🗑️' },
      { label: 'Trash', count: 0, icon: '🗑️' },
      { label: 'Archive', count: 0, icon: '📦' },
      { label: 'Social', count: 972, icon: '👥' },
      { label: 'Updates', count: 342, icon: '🔄' },
      { label: 'Forums', count: 128, icon: '💬' },
      { label: 'Shopping', count: 8, icon: '🛒' },
      { label: 'Promotions', count: 21, icon: '🎁' },
    ];



    

  
    return (
        <div className="fixed bottom-0 left-0 w-64 h-screen  text-white p-4">
            <div className="mb-8 flex items-center">
                <Avatar>
                    <AvatarImage src={avatar_url} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold ml-2">{user_name}</h2>
            </div>
            <ul>
                {items.map((item, index) => (
                    <li key={index} className="flex justify-between items-center p-2 hover:bg-gray-700 rounded-md">
                        <span className="flex items-center">
                            <span className="mr-2">{item.icon}</span> {item.label}
                        </span>
                        <span>{item.count}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
  };
  
  export default Sidebar;
  