import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PublishedPosts } from "@/components/user-posts/publishedposts";
import { tabs } from "@/lib/constants";
import { DraftPosts } from "./draftposts";
import { UserComments } from "./user-comments";

export async function MyPublications() {
    return (
        <Tabs defaultValue="published" className="w-full">
            <TabsList className="flex justify-start gap-4 border-b border-gray-200 mb-4 bg-transparent">
                {tabs.map((tab) => (
                    <TabsTrigger
                        key={tab.name.toLowerCase()}
                        value={tab.name.toLowerCase()}
                        className="max-w-fit flex-1 text-sm font-medium text-gray-500 relative group hover:text-gray-700 focus-visible:outline-none"
                    >
                        <div className="flex items-center justify-center gap-2">
                            <tab.icon className="w-4 h-4" />
                            {tab.name}
                        </div>
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 transition-transform duration-200 ease-in-out group-data-[state=active]:scale-x-100" />
                    </TabsTrigger>
                ))}
            </TabsList>
            <TabsContent value="published" className="py-2">
                <PublishedPosts />
            </TabsContent>
            <TabsContent value="drafts" className="py-2">
                <DraftPosts />
            </TabsContent>
            <TabsContent value="comments" className="py-2">
                <UserComments />
            </TabsContent>
        </Tabs>
    );
}
