import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PublishedPosts } from "@/components/publishedposts";
import { tabs } from "@/lib/constants";

export async function MyPostsTab() {
    return (
        <Tabs defaultValue="published" className="w-full">
            <TabsList className="flex justify-between border-b border-gray-200 mb-4 bg-transparent">
                {tabs.map((tab) => (
                    <TabsTrigger
                        key={tab.name.toLowerCase()}
                        value={tab.name.toLowerCase()}
                        className="flex-1 px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 focus-visible:outline-none relative group"
                    >
                        <div className="flex items-center justify-center">
                            <tab.icon className="w-4 h-4 mr-2" />
                            {tab.name}
                        </div>
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 transition-transform duration-200 ease-in-out group-data-[state=active]:scale-x-100" />
                    </TabsTrigger>
                ))}
            </TabsList>
            <TabsContent value="published" className="py-2">
                <h2 className="text-2xl font-semibold mb-4">Published Posts</h2>
                <PublishedPosts />
            </TabsContent>
            <TabsContent value="drafts" className="py-2">
                <h2 className="text-2xl font-semibold mb-4">Your Drafts</h2>
                <p>Your draft posts will appear here.</p>
            </TabsContent>
            <TabsContent value="comments" className="py-2">
                <h2 className="text-2xl font-semibold mb-4">Recent Comments</h2>
                <p>Comments on your posts will appear here.</p>
            </TabsContent>
        </Tabs>
    );
}
