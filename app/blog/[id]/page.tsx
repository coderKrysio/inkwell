import { BackButton } from "@/components/backbutton";
import { ButtonAction } from "@/components/buttonaction";

export default function Page() {
    return (
        <div className="w-full flex flex-col gap-4">
            <BackButton />
            <h1 className="text-3xl font-bold mt-4 mb-8">Post One</h1>
            <ButtonAction />
            <p className="text-slate-700">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Facere, deleniti? Laboriosam, unde officiis velit quisquam
                exercitationem natus, quam repudiandae eos incidunt ratione quo
                ipsa alias consequatur ipsum fuga dolor tenetur.
            </p>
        </div>
    );
}
